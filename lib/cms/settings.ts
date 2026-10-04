import type { FieldDef } from "@/lib/cms/resources";

// Field groups for the two singleton settings screens.
//
// These reuse the resource field types, so the settings screens are rendered by
// the same control as every other admin form. `social_*` fields are flattened on
// the way in and re-nested into the `socials` jsonb column by the action.

export type SettingsGroup = {
  title: string;
  description?: string;
  fields: FieldDef[];
};

const EMPHASIS_HELP =
  "Wrap a phrase in *asterisks* to highlight it in brand blue, e.g. Keeping *every channel moving.*";

export const HOMEPAGE_GROUPS: SettingsGroup[] = [
  {
    title: "Hero",
    description: "The first thing a visitor reads, and the two actions you want them to take.",
    fields: [
      { name: "hero_badge", label: "Badge", type: "text", help: "Short label above the headline." },
      { name: "hero_note", label: "Small print", type: "text", help: "Optional line under the buttons." },
      {
        name: "hero_title",
        label: "Headline",
        type: "textarea",
        wide: true,
        help: "One clear sentence about what you do.",
      },
      { name: "hero_description", label: "Description", type: "textarea", wide: true },
      { name: "hero_primary_cta", label: "Primary button label", type: "text" },
      { name: "hero_primary_url", label: "Primary button link", type: "text" },
      { name: "hero_secondary_cta", label: "Secondary button label", type: "text" },
      { name: "hero_secondary_url", label: "Secondary button link", type: "text" },
      { name: "hero_image", label: "Hero image", type: "media", wide: true },
    ],
  },
  {
    title: "Section headings",
    description: "Each heading belongs to one homepage section. " + EMPHASIS_HELP,
    fields: [
      { name: "services_section_title", label: "Services heading", type: "text", wide: true },
      { name: "services_section_description", label: "Services description", type: "textarea", wide: true },
      { name: "industries_section_title", label: "Industries heading", type: "text", wide: true },
      {
        name: "industries_section_description",
        label: "Industries description",
        type: "textarea",
        wide: true,
      },
      { name: "process_section_title", label: "Process heading", type: "text", wide: true },
      { name: "process_section_description", label: "Process description", type: "textarea", wide: true },
      { name: "work_section_title", label: "Work heading", type: "text", wide: true },
      { name: "work_section_description", label: "Work description", type: "textarea", wide: true },
      { name: "insights_section_title", label: "Insights heading", type: "text", wide: true },
      {
        name: "insights_section_description",
        label: "Insights description",
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Final call to action",
    fields: [
      { name: "final_cta_title", label: "Heading", type: "text", wide: true },
      { name: "final_cta_description", label: "Description", type: "textarea", wide: true },
      { name: "final_cta_label", label: "Button label", type: "text" },
    ],
  },
];

export const SITE_SETTINGS_GROUPS: SettingsGroup[] = [
  {
    title: "Business details",
    description: "Used across the header, footer, contact page and structured data.",
    fields: [
      { name: "company_name", label: "Company name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "textarea", wide: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "phone", label: "Phone (displayed)", type: "text" },
      {
        name: "whatsapp",
        label: "WhatsApp link",
        type: "text",
        help: "Full wa.me / api.whatsapp.com URL, including the country code.",
        wide: true,
      },
      { name: "gstin", label: "GSTIN", type: "text" },
    ],
  },
  {
    title: "Registered address",
    fields: [
      { name: "address_street", label: "Street", type: "text", wide: true },
      { name: "address_city", label: "City", type: "text" },
      { name: "address_region", label: "State", type: "text" },
      { name: "address_postal_code", label: "PIN code", type: "text" },
      { name: "address_country", label: "Country", type: "text" },
    ],
  },
  {
    title: "Social profiles",
    description: "Leave a field empty to hide that icon everywhere on the site.",
    fields: [
      { name: "social_instagram", label: "Instagram URL", type: "text" },
      { name: "social_facebook", label: "Facebook URL", type: "text" },
      { name: "social_x", label: "X (Twitter) URL", type: "text" },
      { name: "social_pinterest", label: "Pinterest URL", type: "text" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { name: "footer_description", label: "Footer description", type: "textarea", wide: true },
      {
        name: "copyright_text",
        label: "Copyright line",
        type: "text",
        wide: true,
        help: "Use {year} for the current year.",
      },
    ],
  },
  {
    title: "SEO defaults",
    description: "Applied to any page that does not define its own metadata.",
    fields: [
      { name: "default_seo_title", label: "Default title", type: "text", wide: true, required: true },
      {
        name: "default_seo_description",
        label: "Default description",
        type: "textarea",
        wide: true,
        required: true,
      },
      { name: "og_image", label: "Social share image", type: "media", wide: true },
    ],
  },
];

export function flattenSocials(row: Record<string, unknown>, socials: Record<string, string | undefined>) {
  return {
    ...row,
    social_instagram: socials.instagram ?? "",
    social_facebook: socials.facebook ?? "",
    social_x: socials.x ?? "",
    social_pinterest: socials.pinterest ?? "",
  };
}
