import { ICON_NAMES, type IconName } from "@/components/ui/Icon";
import { ENQUIRY_STATUSES, NAVIGATION_LOCATIONS } from "@/types/cms";

// One declarative description per manageable entity.
//
// The admin's list, create and edit screens are all driven by these definitions,
// so adding a field (or a whole resource) never means writing a new form, and
// there is exactly one implementation of "text field", "publish toggle" and so
// on. Server-only: never import this from a client component.

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "number"
  | "boolean"
  | "select"
  | "slug"
  | "media"
  | "blocks"
  | "steps"
  | "lines"
  | "datetime";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  required?: boolean;
  placeholder?: string;
  /** Full width in the two-column form grid. */
  wide?: boolean;
  options?: { value: string; label: string }[];
  /** Options loaded from another resource at render time. */
  optionsFrom?: "service_categories" | "services" | "navigation_items";
  /** Never editable after creation (identity fields). */
  immutable?: boolean;
};

export type ColumnDef = {
  key: string;
  label: string;
  kind?: "text" | "muted" | "bool" | "order" | "icon";
  className?: string;
};

export type ResourceDef = {
  key: string;
  /** Database table name. */
  table: string;
  label: string;
  singular: string;
  plural: string;
  description: string;
  /** Admin route base, e.g. /admin/services */
  path: string;
  listColumns: ColumnDef[];
  fields: FieldDef[];
  hasPublish: boolean;
  hasSortOrder: boolean;
  hasPublicPage: boolean;
  searchKeys?: string[];
  /** Per-resource copy for the empty state. */
  emptyHint?: string;
};

const PUBLISH_FIELD: FieldDef = {
  name: "published",
  label: "Published",
  type: "boolean",
  help: "Drafts stay invisible on the public site.",
};

const SORT_FIELD: FieldDef = {
  name: "sort_order",
  label: "Order",
  type: "number",
  help: "Lower numbers appear first.",
};

const SEO_FIELDS: FieldDef[] = [
  {
    name: "seo_title",
    label: "SEO title",
    type: "text",
    help: "Shown in search results and the browser tab. Defaults to the name.",
    wide: true,
  },
  {
    name: "seo_description",
    label: "SEO description",
    type: "textarea",
    help: "One or two sentences describing the page. Defaults to the summary.",
    wide: true,
  },
];

export const RESOURCES: Record<string, ResourceDef> = {
  services: {
    key: "services",
    table: "services",
    label: "Services",
    singular: "service",
    plural: "services",
    description:
      "Each published service becomes a page at /services/<slug>, with its own process, deliverables, FAQs and SEO metadata.",
    path: "/admin/services",
    hasPublish: true,
    hasSortOrder: true,
    hasPublicPage: true,
    searchKeys: ["name", "short_title", "slug"],
    emptyHint: "Add your first service and it appears on the homepage and services page.",
    listColumns: [
      { key: "short_title", label: "Service" },
      { key: "category_label", label: "Category", kind: "muted" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "featured", label: "Featured", kind: "bool" },
      { key: "published", label: "Status", kind: "bool" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Meta Ads" },
      {
        name: "short_title",
        label: "Short title",
        type: "text",
        required: true,
        help: "Used in navigation, cards and cross-links.",
      },
      { name: "slug", label: "Slug", type: "slug", help: "Public URL: /services/<slug>" },
      {
        name: "category_id",
        label: "Category",
        type: "select",
        optionsFrom: "service_categories",
        help: "Groups the service on the homepage and services page.",
      },
      {
        name: "category_label",
        label: "Category label",
        type: "text",
        help: "Small label shown above the service name, e.g. “Search & performance advertising”.",
      },
      {
        name: "excerpt",
        label: "Summary",
        type: "textarea",
        required: true,
        help: "One sentence. Used on cards, in search results and as the fallback meta description.",
        wide: true,
      },
      { name: "hero_headline", label: "Hero headline", type: "text", wide: true },
      { name: "hero_subline", label: "Hero subline", type: "textarea", wide: true },
      { name: "problem_title", label: "Problem heading", type: "text", wide: true },
      { name: "problem_body", label: "Problem body", type: "textarea", wide: true },
      {
        name: "what_we_do",
        label: "What we do",
        type: "blocks",
        help: "One per line: Heading | Explanation",
        wide: true,
      },
      {
        name: "how_it_works",
        label: "How it works",
        type: "steps",
        help: "One per line: Number | Step title | Explanation",
        wide: true,
      },
      { name: "deliverables", label: "What's included", type: "lines", help: "One item per line.", wide: true },
      { name: "who_its_for", label: "Who it's for", type: "lines", help: "One item per line.", wide: true },
      {
        name: "icon",
        label: "Icon",
        type: "select",
        options: ICON_NAMES.map((name) => ({ value: name, label: name })),
      },
      { name: "image_url", label: "Image", type: "media", wide: true },
      { name: "featured", label: "Featured", type: "boolean", help: "Highlights the card on the homepage." },
      PUBLISH_FIELD,
      SORT_FIELD,
      ...SEO_FIELDS,
    ],
  },

  service_categories: {
    key: "service_categories",
    table: "service_categories",
    label: "Service categories",
    singular: "category",
    plural: "categories",
    description: "Groups services on the homepage and the services page.",
    path: "/admin/service-categories",
    hasPublish: true,
    hasSortOrder: true,
    hasPublicPage: false,
    searchKeys: ["label", "slug"],
    listColumns: [
      { key: "label", label: "Category" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "published", label: "Status", kind: "bool" },
    ],
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "description", label: "Description", type: "textarea", wide: true },
      PUBLISH_FIELD,
      SORT_FIELD,
    ],
  },

  industries: {
    key: "industries",
    table: "industries",
    label: "Industries",
    singular: "industry",
    plural: "industries",
    description: "The “who we work with” section on the homepage.",
    path: "/admin/industries",
    hasPublish: true,
    hasSortOrder: true,
    hasPublicPage: false,
    searchKeys: ["name", "slug"],
    listColumns: [
      { key: "name", label: "Industry" },
      { key: "icon", label: "Icon", kind: "icon" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "published", label: "Status", kind: "bool" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "short_description", label: "Short description", type: "textarea", wide: true },
      { name: "description", label: "Long description", type: "textarea", wide: true },
      {
        name: "icon",
        label: "Icon",
        type: "select",
        options: ICON_NAMES.map((name) => ({ value: name, label: name })),
      },
      { name: "image_url", label: "Image", type: "media", wide: true },
      { name: "featured", label: "Featured", type: "boolean" },
      PUBLISH_FIELD,
      SORT_FIELD,
      ...SEO_FIELDS,
    ],
  },

  case_studies: {
    key: "case_studies",
    table: "case_studies",
    label: "Case studies",
    singular: "case study",
    plural: "case studies",
    description:
      "Work with real clients. Narrative fields are optional — anything left empty simply doesn't appear on the page.",
    path: "/admin/case-studies",
    hasPublish: true,
    hasSortOrder: true,
    hasPublicPage: true,
    searchKeys: ["title", "client_name", "slug"],
    emptyHint: "Add a project to build out the work section.",
    listColumns: [
      { key: "title", label: "Project" },
      { key: "industry", label: "Industry", kind: "muted" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "featured", label: "Featured", kind: "bool" },
      { key: "published", label: "Status", kind: "bool" },
    ],
    fields: [
      { name: "title", label: "Project title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "slug", help: "Public URL: /work/<slug>" },
      { name: "client_name", label: "Client", type: "text" },
      { name: "industry", label: "Industry", type: "text" },
      { name: "summary", label: "Summary", type: "textarea", required: true, wide: true },
      {
        name: "challenge",
        label: "The challenge",
        type: "textarea",
        help: "What problem the client had. Leave empty if it isn't documented.",
        wide: true,
      },
      { name: "approach", label: "Our approach", type: "textarea", wide: true },
      { name: "solution", label: "What we built", type: "textarea", wide: true },
      {
        name: "outcome",
        label: "Outcome",
        type: "textarea",
        help: "Only describe results you can verify — no estimates.",
        wide: true,
      },
      { name: "featured_image", label: "Featured image", type: "media", wide: true },
      { name: "url", label: "Live site URL", type: "text", placeholder: "https://example.com" },
      { name: "services", label: "Services provided", type: "lines", help: "One per line.", wide: true },
      { name: "featured", label: "Featured", type: "boolean", help: "The large feature card on the homepage." },
      PUBLISH_FIELD,
      SORT_FIELD,
      ...SEO_FIELDS,
    ],
  },

  testimonials: {
    key: "testimonials",
    table: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    plural: "testimonials",
    description:
      "Real client quotes only. Until at least one is published, the testimonials section stays hidden on the homepage.",
    path: "/admin/testimonials",
    hasPublish: true,
    hasSortOrder: true,
    hasPublicPage: false,
    searchKeys: ["name", "company"],
    emptyHint: "The section is hidden on the site until you publish a real quote.",
    listColumns: [
      { key: "name", label: "Name" },
      { key: "company", label: "Company", kind: "muted" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "published", label: "Status", kind: "bool" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "company", label: "Company", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "quote", label: "Quote", type: "textarea", required: true, wide: true },
      { name: "photo_url", label: "Photo", type: "media", wide: true },
      { name: "featured", label: "Featured", type: "boolean" },
      PUBLISH_FIELD,
      SORT_FIELD,
    ],
  },

  faqs: {
    key: "faqs",
    table: "faqs",
    label: "FAQs",
    singular: "question",
    plural: "questions",
    description:
      "Category “homepage” feeds the homepage FAQ; link a question to a service to show it on that service page.",
    path: "/admin/faqs",
    hasPublish: true,
    hasSortOrder: true,
    hasPublicPage: false,
    searchKeys: ["question", "category"],
    listColumns: [
      { key: "question", label: "Question" },
      { key: "category", label: "Category", kind: "muted" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "published", label: "Status", kind: "bool" },
    ],
    fields: [
      { name: "question", label: "Question", type: "text", required: true, wide: true },
      { name: "answer", label: "Answer", type: "textarea", required: true, wide: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "homepage", label: "homepage" },
          { value: "services", label: "services" },
          { value: "general", label: "general" },
        ],
        help: "Use “homepage” for the homepage list.",
      },
      {
        name: "service_id",
        label: "Shown on service",
        type: "select",
        optionsFrom: "services",
        help: "Optional — links the question to one service page.",
      },
      PUBLISH_FIELD,
      SORT_FIELD,
    ],
  },

  insights: {
    key: "insights",
    table: "insights",
    label: "Insights",
    singular: "article",
    plural: "articles",
    description: "Articles behind /insights. Written in Markdown and rendered safely on the server.",
    path: "/admin/insights",
    hasPublish: true,
    hasSortOrder: false,
    hasPublicPage: true,
    searchKeys: ["title", "slug", "category"],
    emptyHint: "Publish your first article — the section shows an honest placeholder until then.",
    listColumns: [
      { key: "title", label: "Article" },
      { key: "category", label: "Category", kind: "muted" },
      { key: "published_at", label: "Date", kind: "muted" },
      { key: "published", label: "Status", kind: "bool" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "slug", label: "Slug", type: "slug", help: "Public URL: /insights/<slug>" },
      { name: "category", label: "Category", type: "text", placeholder: "SEO" },
      { name: "author", label: "Author", type: "text" },
      { name: "excerpt", label: "Summary", type: "textarea", required: true, wide: true },
      {
        name: "content",
        label: "Article",
        type: "markdown",
        required: true,
        wide: true,
        help: "Markdown supported: ## headings, **bold**, *italic*, lists, > quotes, [links](https://…), images, tables and code blocks.",
      },
      { name: "featured_image", label: "Featured image", type: "media", wide: true },
      { name: "published_at", label: "Published date", type: "datetime" },
      PUBLISH_FIELD,
      ...SEO_FIELDS,
    ],
  },

  navigation_items: {
    key: "navigation_items",
    table: "navigation_items",
    label: "Navigation",
    singular: "link",
    plural: "links",
    description:
      "Header and footer links. Social profiles are managed in Settings, and contact details come from Settings too.",
    path: "/admin/navigation",
    hasPublish: false,
    hasSortOrder: true,
    hasPublicPage: false,
    searchKeys: ["label", "href"],
    listColumns: [
      { key: "label", label: "Label" },
      { key: "location", label: "Location", kind: "muted" },
      { key: "href", label: "Link", kind: "muted" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "visible", label: "Visible", kind: "bool" },
    ],
    fields: [
      {
        name: "location",
        label: "Location",
        type: "select",
        options: NAVIGATION_LOCATIONS.map((location) => ({
          value: location.value,
          label: location.label,
        })),
        required: true,
      },
      { name: "label", label: "Label", type: "text", required: true },
      {
        name: "href",
        label: "Link",
        type: "text",
        required: true,
        placeholder: "/services/seo or https://…",
        help: "Internal paths start with /. Only http(s) external links are accepted.",
      },
      {
        name: "description",
        label: "Description",
        type: "text",
        help: "Optional supporting line, used by the header services menu.",
        wide: true,
      },
      {
        name: "parent_id",
        label: "Parent link",
        type: "select",
        optionsFrom: "navigation_items",
        help: "Optional — nest this link under another one.",
      },
      { name: "visible", label: "Visible", type: "boolean" },
      { name: "open_in_new_tab", label: "Open in new tab", type: "boolean" },
      SORT_FIELD,
    ],
  },

  page_sections: {
    key: "page_sections",
    table: "page_sections",
    label: "Homepage sections",
    singular: "section",
    plural: "sections",
    description:
      "Enable, disable and reorder the sections that make up the homepage. Chapter numbers renumber themselves automatically.",
    path: "/admin/pages/sections",
    hasPublish: false,
    hasSortOrder: true,
    hasPublicPage: false,
    searchKeys: ["label", "section_key"],
    listColumns: [
      { key: "label", label: "Section" },
      { key: "section_key", label: "Key", kind: "muted" },
      { key: "sort_order", label: "Order", kind: "order" },
      { key: "enabled", label: "Enabled", kind: "bool" },
    ],
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      {
        name: "section_key",
        label: "Section key",
        type: "text",
        help: "Matches a component in the section registry. Changing this can break the section.",
        immutable: true,
      },
      { name: "enabled", label: "Enabled", type: "boolean" },
      SORT_FIELD,
    ],
  },
};

export function getResource(key: string): ResourceDef | null {
  return RESOURCES[key] ?? null;
}

/** Statuses offered on the enquiries screen. */
export const enquiryStatusOptions = ENQUIRY_STATUSES;

/** Cards shown on the dashboard, in order. */
export const RESOURCE_SUMMARY: { table: string; label: string; href: string; icon: IconName }[] = [
  { table: "services", label: "Services", href: "/admin/services", icon: "layers" },
  { table: "case_studies", label: "Case studies", href: "/admin/case-studies", icon: "briefcase" },
  { table: "insights", label: "Insights", href: "/admin/insights", icon: "bulb" },
  { table: "faqs", label: "FAQs", href: "/admin/faqs", icon: "inbox" },
  { table: "industries", label: "Industries", href: "/admin/industries", icon: "building" },
  { table: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: "heart" },
];
