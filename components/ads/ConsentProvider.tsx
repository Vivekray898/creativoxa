"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_SIGNALS,
  CONSENT_STORAGE_KEY,
  type ConsentCategory,
} from "@/lib/consent";

type ConsentRecord = Record<ConsentCategory, boolean>;

const DEFAULT_CONSENT: ConsentRecord = { ads: false, analytics: false };

type ConsentContextValue = {
  /** `null` until the stored decision has been read, so we never act on a guess. */
  consent: ConsentRecord | null;
  granted: (category: ConsentCategory) => boolean;
  setConsent: (next: ConsentRecord) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Mirrors a decision into gtag as a Consent Mode v2 `update` command. */
function pushToGtag(consent: ConsentRecord) {
  if (typeof window === "undefined") return;
  const send: (...args: unknown[]) => void =
    typeof window.gtag === "function"
      ? window.gtag
      : (...args: unknown[]) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(args);
        };
  send("consent", "update", {
    ad_storage: consent.ads ? "granted" : "denied",
    ad_user_data: consent.ads ? "granted" : "denied",
    ad_personalization: consent.ads ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
  });
}

/**
 * Holds the visitor's consent decision and keeps gtag in sync with it.
 *
 * Google-certified consent is handled by Funding Choices, loaded separately in
 * `CmpLoader`. This provider only mirrors the resulting decision so the rest of
 * the app can gate script loading on it.
 */
export default function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentRecord | null>(null);

  useEffect(() => {
    let stored: ConsentRecord | null = null;
    try {
      const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as ConsentRecord;
    } catch {
      stored = null;
    }

    // Until a decision exists, ads and analytics stay denied — which is the
    // state the blocking default script already set in <head>.
    setConsentState(stored ?? DEFAULT_CONSENT);

    // Funding Choices reports the visitor's choice here once they dismiss it.
    window.addEventListener("cv:consent", syncFromCmp as EventListener);
    return () => window.removeEventListener("cv:consent", syncFromCmp as EventListener);

    function syncFromCmp(event: Event) {
      const detail = (event as CustomEvent<ConsentRecord>).detail;
      if (detail) setConsentState(detail);
    }
  }, []);

  const setConsent = useCallback((next: ConsentRecord) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private-mode storage failures are non-fatal — consent still applies for
      // the current page view.
    }
    pushToGtag(next);
    setConsentState(next);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      granted: (category) => Boolean(consent?.[category]),
      setConsent,
    }),
    [consent, setConsent]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}

export { CONSENT_SIGNALS };