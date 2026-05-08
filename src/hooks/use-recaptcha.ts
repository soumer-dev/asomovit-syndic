"use client";

/**
 * useRecaptcha — client-side reCAPTCHA v3 hook.
 *
 * Loads the reCAPTCHA script only when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is
 * configured. Returns an `execute` function that generates a token for a
 * given action, or returns null when reCAPTCHA is not available.
 */

import { useCallback, useEffect, useRef } from "react";
import { RECAPTCHA_SITE_KEY, isRecaptchaEnabled } from "@/lib/env";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SCRIPT_ID = "recaptcha-v3-script";

export function useRecaptcha() {
  const loadedRef = useRef(false);

  // Inject the reCAPTCHA script once when the hook mounts
  useEffect(() => {
    if (!isRecaptchaEnabled || loadedRef.current) return;
    if (document.getElementById(SCRIPT_ID)) {
      loadedRef.current = true;
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    loadedRef.current = true;
  }, []);

  /**
   * Generate a reCAPTCHA v3 token for the given action name.
   * Returns null when reCAPTCHA is not configured or not yet loaded.
   */
  const execute = useCallback(async (action: string): Promise<string | null> => {
    if (!isRecaptchaEnabled || !window.grecaptcha) return null;

    return new Promise((resolve) => {
      window.grecaptcha!.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action });
          resolve(token);
        } catch (err) {
          console.warn("[recaptcha] Token generation failed:", err);
          resolve(null);
        }
      });
    });
  }, []);

  return { execute, isEnabled: isRecaptchaEnabled };
}
