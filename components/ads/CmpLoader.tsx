"use client";

import Script from "next/script";
import { useCallback } from "react";
import { CMP_ID, type ConsentCategory } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

type GoogleFundingChoices = {
  cmd?: Record<string, unknown>;
  callbackQueue?: Array<(cmd: Record<string, unknown>) => void>;
};

/**
 * Loads Google Funding Choices, the Google-certified CMP available free through
 * the AdSense and Google Ads consoles.
 *
 * Nothing renders when `NEXT_PUBLIC_CMP_ID` is unset: rather than fall back to a
 * non-certified first-party banner — which would restrict EEA/UK ad serving —
 * ad and analytics scripts stay denied until a certified CMP is configured.
 */
export default function CmpLoader() {
  const { setConsent } = useConsent();

  const handleLoad = useCallback(() => {
    const fc = (window as unknown as { googlefc?: GoogleFundingChoices }).googlefc;
    if (!fc) return;

    fc.callbackQueue = fc.callbackQueue || [];

    // Funding Choices pushes a command describing the visitor's choice once they
    // interact with the certified banner. Defensive on purpose: if the shape
    // ever changes, the worst outcome is that consent stays denied rather than
    // ads loading without permission.
    fc.callbackQueue.push((cmd) => {
      const granted = readGranted(cmd);
      if (!granted) return;

      const next: Record<ConsentCategory, boolean> = {
        ads: Boolean(granted.ad_storage || granted.ad_personalization),
        analytics: Boolean(granted.analytics_storage),
      };
      setConsent(next);
      window.dispatchEvent(new CustomEvent("cv:consent", { detail: next }));
    });
  }, [setConsent]);

  if (!CMP_ID) return null;

  return (
    <Script
      id="google-funding-choices"
      src={`https://fundingchoicesmessages.google.com/i/pub?${CMP_ID}`}
      strategy="afterInteractive"
      onLoad={handleLoad}
      onReady={handleLoad}
    />
  );
}

function readGranted(cmd: Record<string, unknown>): Record<string, boolean> | null {
  const candidates = [cmd.consent, cmd.userConsent, cmd];
  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;
    const record = candidate as Record<string, unknown>;
    const signalKeys = [
      "ad_storage",
      "ad_user_data",
      "ad_personalization",
      "analytics_storage",
    ];
    if (signalKeys.some((key) => key in record)) {
      const out: Record<string, boolean> = {};
      for (const key of signalKeys) out[key] = record[key] === "granted" || record[key] === true;
      return out;
    }
  }
  return null;
}