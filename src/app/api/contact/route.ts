/**
 * POST /api/contact
 *
 * Handles quote-request form submissions:
 *  1. Validates the request body with Zod.
 *  2. Verifies the reCAPTCHA v3 token — skipped silently when not configured.
 *  3. Inserts the record into Supabase.
 *  4. Sends a notification email via Resend — skipped silently when not configured.
 *
 * The form submission succeeds as long as the Supabase insert succeeds.
 * All optional integrations (reCAPTCHA, Resend) degrade to no-ops when their
 * environment variables are missing or set to placeholder values.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendEmail, buildQuoteRequestEmail } from "@/lib/email";

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
// Supabase client (server-side, uses public anon key — RLS enforced)
// ---------------------------------------------------------------------------

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are not configured.");
  return createClient(url, key);
}

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

  // 3. Supabase insert
  try {
    const supabase = getSupabase();
    const { error: dbError } = await supabase.from("quote_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      residence_name: data.residence_name || null,
      lots_count: data.lots_count || null,
      message: data.message,
    });

    if (dbError) {
      console.error("[contact] Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'enregistrement. Merci de réessayer." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[contact] Supabase client error:", err);
    return NextResponse.json({ error: "Database configuration error." }, { status: 500 });
  }

  // 4. Send notification email
  // sendEmail() is a no-op when RESEND_API_KEY / RECIPIENT_EMAIL are not configured.
  // Its failure never affects the HTTP response — the record is already in Supabase.
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
