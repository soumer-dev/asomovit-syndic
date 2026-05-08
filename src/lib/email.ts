/**
 * Server-only email utility using Resend.
 *
 * IMPORTANT: Never import this file in a "use client" component.
 * It reads RESEND_API_KEY which must stay server-side only.
 */

import { Resend } from "resend";
import { getResendConfig, getAppUrl } from "./env";

export type SendEmailOptions = {
  /** Subject line of the email. */
  subject: string;
  /** Plain-text body (used as fallback when html is provided). */
  text: string;
  /** Optional HTML body. */
  html?: string;
  /** Override recipients for this specific email (defaults to RECIPIENT_EMAIL). */
  to?: string[];
  /** Reply-to address, typically the form submitter's email. */
  replyTo?: string;
};

export type SendEmailResult =
  | { success: true; id: string }
  | { success: false; error: string };

/**
 * Send an email via Resend.
 *
 * Returns a typed result object — never throws — so callers can handle
 * failures gracefully without try/catch boilerplate.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const config = getResendConfig();

  if (!config.enabled) {
    const msg =
      "Email sending is not configured. Set RESEND_API_KEY and RECIPIENT_EMAIL in your environment.";
    console.warn(`[email] ${msg}`);
    return { success: false, error: msg };
  }

  const resend = new Resend(config.apiKey);
  const recipients = options.to ?? config.recipients;

  // Derive a sender domain from APP_URL when available, otherwise use a
  // safe default. The domain must be verified in your Resend account.
  const appUrl = getAppUrl();
  const senderDomain = appUrl
    ? new URL(appUrl).hostname.replace(/^www\./, "")
    : "asomovit-syndic.ma";
  const from = `ASOMOVIT SYNDIC <noreply@${senderDomain}>`;

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error("[email] Resend API error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id ?? "unknown" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[email] Unexpected error:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------

/**
 * Build the HTML email body for a new quote request.
 */
export function buildQuoteRequestEmail(data: {
  name: string;
  email: string;
  phone: string;
  residence_name?: string | null;
  lots_count?: string | null;
  message: string;
}): { subject: string; text: string; html: string } {
  const subject = `Nouvelle demande de devis – ${data.name}`;

  const text = [
    `Nouvelle demande de devis reçue via le site ASOMOVIT SYNDIC.`,
    ``,
    `Nom       : ${data.name}`,
    `Email     : ${data.email}`,
    `Téléphone : ${data.phone}`,
    data.residence_name ? `Résidence : ${data.residence_name}` : null,
    data.lots_count ? `Lots      : ${data.lots_count}` : null,
    ``,
    `Message :`,
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2d4f8a 0%,#3663a7 100%);padding:28px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.02em;">
                ASOMOVIT SYNDIC
              </h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">
                Nouvelle demande de devis
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
                Une nouvelle demande de devis a été soumise via le formulaire de contact.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                ${row("Nom complet", data.name)}
                ${row("Email", `<a href="mailto:${data.email}" style="color:#3663a7;">${data.email}</a>`)}
                ${row("Téléphone", `<a href="tel:${data.phone}" style="color:#3663a7;">${data.phone}</a>`)}
                ${data.residence_name ? row("Résidence", data.residence_name) : ""}
                ${data.lots_count ? row("Nombre de lots", data.lots_count) : ""}
              </table>

              <div style="margin-top:24px;background:#f9fafb;border-left:4px solid #d97706;border-radius:4px;padding:16px 20px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">
                  Message
                </p>
                <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5e7eb;">
                <a href="mailto:${data.email}"
                   style="display:inline-block;background:#d97706;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
                  Répondre à ${data.name}
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
                © ${new Date().getFullYear()} ASOMOVIT SYNDIC — Marrakech, Maroc
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function row(label: string, value: string): string {
  return `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:12px 16px;background:#f9fafb;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#6b7280;white-space:nowrap;width:140px;">
        ${label}
      </td>
      <td style="padding:12px 16px;font-size:14px;color:#111827;">
        ${value}
      </td>
    </tr>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
