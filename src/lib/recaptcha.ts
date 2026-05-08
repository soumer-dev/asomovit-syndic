/**
 * Server-only reCAPTCHA v3 verification utility.
 *
 * IMPORTANT: Never import this file in a "use client" component.
 * It reads RECAPTCHA_SECRET_KEY which must stay server-side only.
 */

import { getRecaptchaSecretKey } from "./env";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/** Minimum score to consider a submission human (0.0 – 1.0). */
const MIN_SCORE = 0.5;

export type RecaptchaResult =
  | { success: true; score: number; skipped?: boolean }
  | { success: false; error: string };

/**
 * Verify a reCAPTCHA v3 token on the server.
 *
 * When reCAPTCHA is not configured (missing or placeholder secret key),
 * verification is silently skipped and the call returns success — in all
 * environments. This keeps forms working whether or not reCAPTCHA is set up.
 *
 * When reCAPTCHA IS configured, a missing or low-score token is rejected.
 *
 * Never throws — always returns a typed result.
 */
export async function verifyRecaptcha(token: string | null | undefined): Promise<RecaptchaResult> {
  const secretKey = getRecaptchaSecretKey();

  // Not configured → silently skip in all environments
  if (!secretKey) {
    return { success: true, score: 1, skipped: true };
  }

  // Configured but no token provided → reject
  if (!token) {
    return { success: false, error: "reCAPTCHA token is missing." };
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `reCAPTCHA verification request failed (HTTP ${res.status}).`,
      };
    }

    const json = (await res.json()) as {
      success: boolean;
      score?: number;
      "error-codes"?: string[];
    };

    if (!json.success) {
      const codes = json["error-codes"]?.join(", ") ?? "unknown";
      return { success: false, error: `reCAPTCHA verification failed: ${codes}` };
    }

    const score = json.score ?? 0;
    if (score < MIN_SCORE) {
      return {
        success: false,
        error: `reCAPTCHA score too low (${score}). Submission rejected as potential bot.`,
      };
    }

    return { success: true, score };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[recaptcha] Verification error:", message);
    return { success: false, error: `reCAPTCHA verification error: ${message}` };
  }
}
