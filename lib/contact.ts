import type { SiteSettingsRow, SocialLinks } from "@/types/cms";

/** `tel:` links must be digits and a leading +, never spaces. */
export function telHref(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.length >= 6 ? `tel:${digits}` : null;
}

export function mailHref(email: string | null | undefined): string | null {
  return email ? `mailto:${email}` : null;
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

const SOCIAL_LABELS: Record<keyof SocialLinks, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X (Twitter)",
  pinterest: "Pinterest",
};

/** Ordered, labelled social entries — never raw profile URLs. */
export function socialEntries(socials: SocialLinks | null | undefined) {
  if (!socials) return [];
  return (Object.keys(SOCIAL_LABELS) as (keyof SocialLinks)[])
    .map((key) => ({ name: SOCIAL_LABELS[key], href: socials[key] }))
    .filter((entry): entry is { name: string; href: string } => Boolean(entry.href));
}

export function formatAddress(settings: Pick<
  SiteSettingsRow,
  "address_street" | "address_city" | "address_region" | "address_postal_code" | "address_country"
>): string | null {
  const parts = [
    settings.address_street,
    settings.address_city,
    settings.address_region,
    settings.address_postal_code,
  ].filter(Boolean);
  if (parts.length === 0) return null;
  const country = settings.address_country === "IN" ? "India" : settings.address_country;
  return [parts.join(", "), country].filter(Boolean).join(", ");
}

export function cityLine(settings: Pick<SiteSettingsRow, "address_city" | "address_region">): string {
  return [settings.address_city, settings.address_region].filter(Boolean).join(", ");
}

/** Replaces the `{year}` token so the footer copyright never goes stale. */
export function copyrightText(text: string | null | undefined): string {
  const fallback = "© {year} Creativoxa. All rights reserved.";
  return (text || fallback).replace(/\{year\}/g, String(new Date().getFullYear()));
}
