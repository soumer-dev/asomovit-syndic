/**
 * Environment variable validation and feature flags.
 *
 * Boundary rules:
 * - NEXT_PUBLIC_* variables are inlined at build time and safe to read
 *   anywhere (server components, client components, hooks).
 * - All other variables are server-only. Never import this file in a
 *   "use client" component — the server-only exports will be undefined
 *   on the client and could expose secrets if bundled.
 *
 * An integration is disabled when its variable is:
 *   - missing / undefined
 *   - an empty string
 *   - a known placeholder value (see PLACEHOLDERS below)
 */

// ---------------------------------------------------------------------------
// Placeholder detection
// ---------------------------------------------------------------------------

const PLACEHOLDERS = new Set([
  // GTM
  "GTM-XXXXXXX",
  // reCAPTCHA
  "your_recaptcha_site_key",
  "your_recaptcha_secret_key",
  // Resend
  "re_your_api_key_here",
  "your_resend_api_key",
  // Generic
  "your_recipient_email",
  "your_supabase_url",
  "your_supabase_anon_key",
  "",
]);

/** Returns true when the value is absent or a known placeholder. */
function isPlaceholder(value: string | undefined): boolean {
  if (value === undefined || value === null) return true;
  return PLACEHOLDERS.has(value.trim());
}

/** Returns true when the value is present and not a placeholder. */
function isConfigured(value: string | undefined): boolean {
  return !isPlaceholder(value);
}

// ---------------------------------------------------------------------------
// ① Google Tag Manager  (client-safe — NEXT_PUBLIC_)
// ---------------------------------------------------------------------------

/** Raw GTM container ID from the environment, e.g. "GTM-ABCDE12". */
export const GTM_ID: string = process.env.NEXT_PUBLIC_GTM_ID ?? "";

/**
 * True when GTM is properly configured and its script should be loaded.
 * Requires a non-placeholder value that matches the GTM-XXXXXXX format.
 */
export const isGtmEnabled: boolean =
  isConfigured(GTM_ID) && /^GTM-[A-Z0-9]{4,}$/.test(GTM_ID.trim());

// ---------------------------------------------------------------------------
// ② Google reCAPTCHA v3  (site key is client-safe; secret key is server-only)
// ---------------------------------------------------------------------------

/** reCAPTCHA v3 site key (public — safe to use in client code). */
export const RECAPTCHA_SITE_KEY: string = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

/**
 * True when the reCAPTCHA site key is properly configured.
 * The client uses this to decide whether to load the reCAPTCHA script.
 */
export const isRecaptchaEnabled: boolean = isConfigured(RECAPTCHA_SITE_KEY);

/**
 * Returns the reCAPTCHA secret key, or null when not configured.
 * SERVER-ONLY — never call this from a client component.
 */
export function getRecaptchaSecretKey(): string | null {
  const key = process.env.RECAPTCHA_SECRET_KEY ?? "";
  return isConfigured(key) ? key : null;
}

// ---------------------------------------------------------------------------
// ③ Resend email  (entirely server-only)
// ---------------------------------------------------------------------------

/**
 * Returns the Resend configuration object.
 * SERVER-ONLY — never call this from a client component.
 *
 * `enabled` is false when either RESEND_API_KEY or RECIPIENT_EMAIL is
 * missing, empty, or a placeholder. When disabled, sendEmail() is a no-op.
 */
export function getResendConfig(): {
  enabled: boolean;
  apiKey: string;
  recipients: string[];
} {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  const recipientRaw = process.env.RECIPIENT_EMAIL ?? "";

  if (!isConfigured(apiKey) || !isConfigured(recipientRaw)) {
    return { enabled: false, apiKey: "", recipients: [] };
  }

  const recipients = recipientRaw
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return { enabled: false, apiKey: "", recipients: [] };
  }

  return { enabled: true, apiKey, recipients };
}

/**
 * True when Resend is properly configured.
 * SERVER-ONLY — never call this from a client component.
 */
export function isResendEnabled(): boolean {
  return getResendConfig().enabled;
}

// ---------------------------------------------------------------------------
// ④ Application URL  (server-only helper)
// ---------------------------------------------------------------------------

/**
 * Returns the configured APP_URL without a trailing slash.
 * Falls back to an empty string when not configured so callers can decide
 * whether to use an absolute or relative URL.
 * SERVER-ONLY — never call this from a client component.
 */
export function getAppUrl(): string {
  const url = process.env.APP_URL ?? "";
  return isConfigured(url) ? url.replace(/\/$/, "") : "";
}
