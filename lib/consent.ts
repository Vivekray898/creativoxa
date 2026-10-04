/**
 * Consent Mode v2 signal names. These are the four signals Google requires
 * before personalised advertising or analytics can run.
 */
export const CONSENT_SIGNALS = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

export type ConsentSignal = (typeof CONSENT_SIGNALS)[number];

export type ConsentCategory = "ads" | "analytics";

/** localStorage key holding the visitor's recorded consent decision. */
export const CONSENT_STORAGE_KEY = "cv-consent";

/**
 * Google-certified CMP id (Google Funding Choices / Privacy & messaging in the
 * AdSense or Google Ads console). Unset locally, in which case no CMP loads and
 * every signal stays denied — ad and analytics scripts simply never run.
 */
export const CMP_ID = process.env.NEXT_PUBLIC_CMP_ID ?? "";

/**
 * AdSense publisher id. Defaults to the placeholder used in `public/ads.txt` so
 * nothing breaks locally; replace via the environment in production.
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "pub-XXXXXXXXXXXXXXXX";

/**
 * Ad unit ids, keyed by placement. Each is the AdSense slot id (a numeric
 * string) from the ad unit's own settings page.
 *
 * An empty value means "no unit configured for this placement yet", and
 * `AdSlot` renders nothing at all in that case rather than reserving an empty
 * box. That is deliberate: an unfilled hole is worse for the page than no ad.
 */
export const AD_SLOTS = {
  insightsIndex: process.env.NEXT_PUBLIC_ADSLOT_INSIGHTS_INDEX ?? "",
  insightsDetail: process.env.NEXT_PUBLIC_ADSLOT_INSIGHTS_DETAIL ?? "",
  toolsIndex: process.env.NEXT_PUBLIC_ADSLOT_TOOLS_INDEX ?? "",
  toolsDetail: process.env.NEXT_PUBLIC_ADSLOT_TOOLS_DETAIL ?? "",
} as const;