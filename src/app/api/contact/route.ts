/**
 * POST /api/contact
 *
 * Handles quote-request form submissions:
 *  1. Validates the request body with Zod.
 *  2. Verifies the reCAPTCHA v3 token — skipped silently when not configured.
 *  3. Attempts to insert the record into Supabase — skipped silently when not
 *     configured or when the insert fails (logs the error server-side).
 *  4. Sends a notification email via Resend — skipped silently when not configured.
 *
 * All integrations (Supabase, reCAPTCHA, Resend) degrade gracefully to no-ops
 * when their environment variables are missing or set to placeholder values.
 * The form always returns success to the user as long as at least one of
 * Supabase or Resend is available — or even when neither is configured
 * (useful during local development).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendEmail, buildQuoteRequestEmail } from "@/lib/email";
import { getSupabaseConfig } from "@/lib/env";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  residence_name: z.string().trim().max(150).optional().or(z.literal("")),
  lots_count: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  recaptchaToken: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // 1. Parse & validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // 2. reCAPTCHA verification
  // verifyRecaptcha() returns { success: true, skipped: true } when the secret
  // key is not configured, so this never blocks submissions in that case.
  const recaptchaResult = await verifyRecaptcha(data.recaptchaToken);
  if (!recaptchaResult.success) {
    return NextResponse.json({ error: recaptchaResult.error }, { status: 400 });
  }

  // 3. Supabase insert (optional — degrades gracefully when not configured)
  const supabaseConfig = getSupabaseConfig();

  if (!supabaseConfig.enabled) {
    // Log a developer-facing warning; the user-facing flow continues normally.
    console.warn(
      "[contact] Supabase is not configured. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local " +
        "to persist form submissions to the database.",
    );
  } else {
    try {
      const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
      const { error: dbError } = await supabase.from("quote_requests").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        residence_name: data.residence_name || null,
        lots_count: data.lots_count || null,
        message: data.message,
      });

      if (dbError) {
        // Log the full technical error server-side; never expose it to the client.
        console.error("[contact] Supabase insert error:", dbError.message, dbError.details);
        // Fall through — the email step below is the backup delivery channel.
      }
    } catch (err) {
      // Unexpected client-level error (e.g. network failure, bad credentials).
      // Log it server-side and fall through to the email step.
      console.error(
        "[contact] Supabase client error:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  // 4. Send notification email
  // sendEmail() is a no-op when RESEND_API_KEY / RECIPIENT_EMAIL are not configured.
  const emailTemplate = buildQuoteRequestEmail({
    name: data.name,
    email: data.email,
    phone: data.phone,
    residence_name: data.residence_name,
    lots_count: data.lots_count,
    message: data.message,
  });

  const emailResult = await sendEmail({ ...emailTemplate, replyTo: data.email });

  if (!emailResult.success) {
    console.warn("[contact] Email notification skipped:", emailResult.error);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
