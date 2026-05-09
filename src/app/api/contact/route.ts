/**
 * POST /api/contact
 *
 * Handles quote-request form submissions:
 *  1. Validates the request body with Zod.
 *  2. Verifies the reCAPTCHA v3 token — skipped silently when not configured.
 *  3. Sends a notification email via Resend.
 *     - If Resend is not configured, returns a clear 503 to the client.
 *     - reCAPTCHA degrades to a no-op when its env vars are absent.
 *
 * No database is used. Resend is the sole delivery channel.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendEmail, buildQuoteRequestEmail } from "@/lib/email";
import { getResendConfig } from "@/lib/env";

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
  // Returns { success: true, skipped: true } when not configured — never blocks.
  const recaptchaResult = await verifyRecaptcha(data.recaptchaToken);
  if (!recaptchaResult.success) {
    return NextResponse.json({ error: recaptchaResult.error }, { status: 400 });
  }

  // 3. Guard: Resend must be configured
  const resendConfig = getResendConfig();
  if (!resendConfig.enabled) {
    console.error(
      "[contact] Resend is not configured. " +
        "Set RESEND_API_KEY and RECIPIENT_EMAIL in your environment to enable email delivery.",
    );
    return NextResponse.json(
      {
        error:
          "Le service d'envoi d'email n'est pas configuré. Merci de nous contacter directement par téléphone.",
      },
      { status: 503 },
    );
  }

  // 4. Send notification email
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
    console.error("[contact] Email send failed:", emailResult.error);
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous appeler directement.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
