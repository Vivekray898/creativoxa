// Row types for the Creativoxa CMS (Supabase).
//
// These mirror `supabase/migrations/*.sql` by hand. The project has no Supabase
// CLI available in this environment, so `supabase gen types` output can't be
// generated — if you later run `supabase gen types typescript`, this file can be
// replaced by the generated `Database` type and the casts in `lib/cms/queries.ts`
// become unnecessary.

export type ContentStatus = "draft" | "published";

type Timestamps = {
  created_at: string;
  updated_at: string;
};

export type ProfileRow = Timestamps & {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "admin" | "editor";
};

export type ServiceCategoryRow = Timestamps & {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  sort_order: number;
  published: boolean;
};

/** Ordered content block used inside service pages (stored as jsonb). */
export type ContentBlock = { title: string; body: string };
export type ProcessStep = { step: string; title: string; body: string };

export type ServiceRow = Timestamps & {
  id: string;
  slug: string;
  category_id: string | null;
  name: string;
  short_title: string;
  category_label: string | null;
  excerpt: string;
  hero_headline: string | null;
  hero_subline: string | null;
  problem_title: string | null;
  problem_body: string | null;
  what_we_do: ContentBlock[];
  how_it_works: ProcessStep[];
  deliverables: string[];
  who_its_for: string[];
  icon: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

export type IndustryRow = Timestamps & {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

export type CaseStudyRow = Timestamps & {
  id: string;
  slug: string;
  title: string;
  client_name: string | null;
  industry: string | null;
  summary: string;
  challenge: string | null;
  approach: string | null;
  solution: string | null;
  outcome: string | null;
  featured_image: string | null;
  url: string | null;
  services: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

export type TestimonialRow = Timestamps & {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  quote: string;
  photo_url: string | null;
  published: boolean;
  featured: boolean;
  sort_order: number;
};

export type FaqRow = Timestamps & {
  id: string;
  question: string;
  answer: string;
  category: string;
  service_id: string | null;
  published: boolean;
  sort_order: number;
};

export type InsightRow = Timestamps & {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown source. Rendered + sanitised server-side before it reaches the page. */
  content: string;
  featured_image: string | null;
  author: string | null;
  category: string;
  published: boolean;
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
};

export type HomepageSettingsRow = {
  id: boolean;
  hero_badge: string | null;
  hero_title: string | null;
  hero_description: string | null;
  hero_primary_cta: string | null;
  hero_primary_url: string | null;
  hero_secondary_cta: string | null;
  hero_secondary_url: string | null;
  hero_image: string | null;
  hero_note: string | null;
  services_section_title: string | null;
  services_section_description: string | null;
  industries_section_title: string | null;
  industries_section_description: string | null;
  process_section_title: string | null;
  process_section_description: string | null;
  work_section_title: string | null;
  work_section_description: string | null;
  insights_section_title: string | null;
  insights_section_description: string | null;
  final_cta_title: string | null;
  final_cta_description: string | null;
  final_cta_label: string | null;
  updated_at: string;
};

export type PageSectionRow = {
  id: string;
  page_slug: string;
  section_key: string;
  label: string;
  enabled: boolean;
  sort_order: number;
};

export type NavigationItemRow = Timestamps & {
  id: string;
  location: NavigationLocation;
  label: string;
  href: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
  visible: boolean;
  open_in_new_tab: boolean;
};

// Social links live in site settings (single source of truth).
export type NavigationLocation =
  | "header"
  | "header-services"
  | "footer-services"
  | "footer-company"
  | "footer-legal";

export const NAVIGATION_LOCATIONS: { value: NavigationLocation; label: string }[] = [
  { value: "header", label: "Header — main links" },
  { value: "header-services", label: "Header — services menu" },
  { value: "footer-services", label: "Footer — services column" },
  { value: "footer-company", label: "Footer — company column" },
  { value: "footer-legal", label: "Footer — legal column" },
];

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  x?: string;
  pinterest?: string;
};

export type SiteSettingsRow = {
  id: boolean;
  company_name: string;
  tagline: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address_street: string | null;
  address_city: string | null;
  address_region: string | null;
  address_postal_code: string | null;
  address_country: string | null;
  gstin: string | null;
  socials: SocialLinks;
  footer_description: string | null;
  copyright_text: string | null;
  default_seo_title: string | null;
  default_seo_description: string | null;
  og_image: string | null;
  updated_at: string;
};

export type EnquiryStatus = "new" | "contacted" | "qualified" | "closed";

export const ENQUIRY_STATUSES: { value: EnquiryStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
];

export type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  website: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  form_source: string | null;
  status: EnquiryStatus;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
};

export type ToolRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  /** Component name used by the tools registry (falls back to the slug). */
  component?: string | null;
  category?: string | null;
  /** The `tools` table has no `updated_at`; `created_at` is the sitemap stamp. */
  created_at: string;
};

export type MediaObject = {
  name: string;
  url: string;
  size: number | null;
  createdAt: string | null;
};

/**
 * Minimal database description passed to the Supabase clients.
 *
 * The Supabase CLI is not available in this environment, so this is maintained
 * by hand instead of `supabase gen types`. It types *reads* strictly (which is
 * where it matters — every query returns a named row type) while keeping insert
 * and update payloads permissive; the server actions validate those explicitly.
 */
type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<ProfileRow>;
      service_categories: Table<ServiceCategoryRow>;
      services: Table<ServiceRow>;
      industries: Table<IndustryRow>;
      case_studies: Table<CaseStudyRow>;
      testimonials: Table<TestimonialRow>;
      faqs: Table<FaqRow>;
      insights: Table<InsightRow>;
      homepage_settings: Table<HomepageSettingsRow>;
      page_sections: Table<PageSectionRow>;
      navigation_items: Table<NavigationItemRow>;
      site_settings: Table<SiteSettingsRow>;
      enquiries: Table<EnquiryRow>;
      tools: Table<ToolRow>;
    };
    Views: Record<never, never>;
    Functions: {
      submit_enquiry: {
        Args: {
          p_name: string;
          p_email: string;
          p_phone?: string | null;
          p_business?: string | null;
          p_website?: string | null;
          p_service?: string | null;
          p_budget?: string | null;
          p_message?: string | null;
          p_form_source?: string | null;
        };
        Returns: string;
      };
      is_staff: { Args: Record<never, never>; Returns: boolean };
      is_admin: { Args: Record<never, never>; Returns: boolean };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

export const MEDIA_BUCKET = "website-media";
export const MEDIA_MAX_BYTES = 5 * 1024 * 1024;
export const MEDIA_ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];
export const MEDIA_ACCEPT = ".jpg,.jpeg,.png,.webp,.svg";
