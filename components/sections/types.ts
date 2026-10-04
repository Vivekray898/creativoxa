import type { HomepageSettingsRow } from "@/types/cms";

/**
 * Props shared by every homepage section.
 *
 * The homepage renders sections from the `page_sections` table, so a section's
 * chapter number is its position in that order — not a constant baked into the
 * component. Sections accept the CMS heading overrides when they display one.
 */
export type HomeSectionProps = {
  /** Chapter number derived from the rendered position ("01", "02", …). */
  index: string;
  /** Optional heading override from Homepage → section titles. */
  title?: string | null;
  /** Optional description override. */
  description?: string | null;
  /** Homepage copy, used by the hero, final CTA and contact block. */
  settings: HomepageSettingsRow;
};
