// Local fallback content.
//
// Used in exactly two situations: the Supabase environment variables are not
// configured, or a query fails (for example before the migrations have been
// applied). It is never merged with database content — when the CMS responds,
// its answer is authoritative, including when the answer is "nothing published".
//
// This mirrors the rows created by `supabase/migrations/00{4,5}_seed_*.sql`, so
// the site looks identical either way.

import { industries as localIndustries, homepageFaqs, processSteps } from "@/lib/data/content";
import { projects } from "@/lib/data/projects";
import { serviceCategories, servicePages } from "@/lib/data/services";
import { site } from "@/lib/site";
import type {
  CaseStudyRow,
  FaqRow,
  HomepageSettingsRow,
  IndustryRow,
  NavigationItemRow,
  PageSectionRow,
  ServiceCategoryRow,
  ServiceRow,
  SiteSettingsRow,
  ToolRow,
} from "@/types/cms";

const NOW = "1970-01-01T00:00:00.000Z";

const SERVICE_ICON: Record<string, string> = {
  "digital-marketing": "layers",
  "google-ads": "target",
  "meta-ads": "megaphone",
  seo: "search",
  "social-media": "users",
  "web-development": "code",
  "local-marketing": "pin",
};

const SERVICE_CATEGORY: Record<string, string> = {
  "digital-marketing": "business-digital-management",
  "google-ads": "digital-advertising",
  "meta-ads": "digital-advertising",
  seo: "search-local-growth",
  "social-media": "social-media",
  "web-development": "web-digital",
  "local-marketing": "search-local-growth",
};

const INDUSTRY_ICONS = [
  "pin",
  "building",
  "heart",
  "graduation",
  "users",
  "briefcase",
  "map",
  "cursor",
  "layers",
  "bolt",
];

export const DEFAULT_SERVICE_CATEGORIES: ServiceCategoryRow[] = serviceCategories.map((c, i) => ({
  id: c.id,
  slug: c.id,
  label: c.label,
  description: c.description,
  sort_order: i + 1,
  published: true,
  created_at: NOW,
  updated_at: NOW,
}));

export const DEFAULT_SERVICES: ServiceRow[] = servicePages.map((s, i) => ({
  id: `local-service-${s.slug}`,
  slug: s.slug,
  category_id: SERVICE_CATEGORY[s.slug] ?? null,
  name: s.title,
  short_title: s.shortTitle,
  category_label: s.categoryLabel,
  excerpt: s.excerpt,
  hero_headline: s.heroHeadline,
  hero_subline: s.heroSubline,
  problem_title: s.problem.title,
  problem_body: s.problem.body,
  what_we_do: s.whatWeDo,
  how_it_works: s.howItWorks,
  deliverables: s.deliverables,
  who_its_for: s.whoItsFor,
  icon: SERVICE_ICON[s.slug] ?? "layers",
  image_url: null,
  featured: true,
  published: true,
  sort_order: i + 1,
  seo_title: s.seo.title,
  seo_description: s.seo.description,
  created_at: NOW,
  updated_at: NOW,
}));

export const DEFAULT_INDUSTRIES: IndustryRow[] = localIndustries.map((industry, i) => ({
  id: `local-industry-${i}`,
  slug: industry.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-"),
  name: industry.name,
  short_description: industry.note,
  description: null,
  icon: INDUSTRY_ICONS[i % INDUSTRY_ICONS.length],
  image_url: null,
  featured: i < 6,
  published: true,
  sort_order: i + 1,
  seo_title: null,
  seo_description: null,
  created_at: NOW,
  updated_at: NOW,
}));

export const DEFAULT_CASE_STUDIES: CaseStudyRow[] = projects.map((project, i) => ({
  id: `local-project-${project.slug}`,
  slug: project.slug,
  title: project.name,
  client_name: project.name,
  industry: project.industry,
  summary: project.description,
  challenge: project.challenge ?? null,
  approach: project.strategy ?? null,
  solution: project.overview ?? null,
  outcome: project.results?.join(" ") ?? null,
  featured_image: project.screenshot,
  url: project.url,
  services: project.services,
  featured: i === 0,
  published: true,
  sort_order: i + 1,
  seo_title: null,
  seo_description: null,
  created_at: NOW,
  updated_at: NOW,
}));

export const DEFAULT_FAQS: FaqRow[] = [
  ...servicePages.flatMap((service) =>
    service.faqs.map((faq, i) => ({
      id: `local-faq-${service.slug}-${i}`,
      question: faq.q,
      answer: faq.a,
      category: "services",
      service_id: `local-service-${service.slug}`,
      published: true,
      sort_order: i + 1,
      created_at: NOW,
      updated_at: NOW,
    }))
  ),
  ...homepageFaqs.map((faq, i) => ({
    id: `local-faq-home-${i}`,
    question: faq.q,
    answer: faq.a,
    category: "homepage",
    service_id: null,
    published: true,
    sort_order: i + 1,
    created_at: NOW,
    updated_at: NOW,
  })),
];

export const DEFAULT_HOMEPAGE: HomepageSettingsRow = {
  id: true,
  hero_badge: "Digital growth partner",
  hero_title: "Digital marketing that turns attention into business.",
  hero_description:
    "Creativoxa plans and manages your advertising, search presence, social media, website and listings as one connected system — so a customer who finds you once finds a business worth contacting.",
  hero_primary_cta: "Start a Project",
  hero_primary_url: "/contact",
  hero_secondary_cta: "Explore Our Services",
  hero_secondary_url: "/services",
  hero_image: null,
  hero_note: "Based in Siliguri, working with businesses across India.",
  services_section_title: "Everything you need to build a *stronger digital presence.*",
  services_section_description:
    "Five areas of work, planned as one system. Start with what matters most now — expand as the business grows.",
  industries_section_title: "Different businesses. *Different digital strategies.*",
  industries_section_description:
    "We don't claim to be specialists in every industry. We claim something more useful: we take the time to understand how your business wins customers — then build the digital presence around that.",
  process_section_title: "From first conversation to *ongoing growth.*",
  process_section_description:
    "A process simple enough to follow and disciplined enough to repeat. You always know what stage you're in and what happens next.",
  work_section_title: "Digital work for *real businesses.*",
  work_section_description:
    "Every project below is live. Each started with a business problem — visibility, enquiries, or a website that wasn't pulling its weight.",
  insights_section_title: "Notes on digital marketing *that works.*",
  insights_section_description:
    "Practical writing on search, ads, websites and the digital habits of growing businesses.",
  final_cta_title: "Let's work out what your business actually needs.",
  final_cta_description:
    "Tell us where your business is, what you're trying to achieve, and where your digital presence stands today. We'll come back with a practical recommendation — what we'd do first, what it costs, and what to expect.",
  final_cta_label: "Start a Conversation",
  updated_at: NOW,
};

export const DEFAULT_SITE_SETTINGS: SiteSettingsRow = {
  id: true,
  company_name: site.name,
  tagline: site.description,
  email: site.email,
  phone: site.phone,
  whatsapp: site.whatsapp,
  address_street: site.address.street,
  address_city: site.address.city,
  address_region: site.address.region,
  address_postal_code: site.address.postalCode,
  address_country: site.address.country,
  gstin: site.gstin,
  socials: { ...site.socials },
  footer_description:
    "Digital marketing and digital growth support for businesses — strategy, advertising, search, social and web, managed as one system.",
  copyright_text: "© {year} Creativoxa. All rights reserved.",
  default_seo_title: "Creativoxa — Digital Marketing & Growth Partner",
  default_seo_description: site.description,
  og_image: "/images/creativoxa-logo-645-x-160.png",
  updated_at: NOW,
};

const SECTION_LABELS: [string, string][] = [
  ["hero", "Hero"],
  ["trust-strip", "Platforms we manage"],
  ["what-we-do", "Positioning statement"],
  ["services", "Services"],
  ["problems", "Problems we solve"],
  ["outcomes", "What clients get"],
  ["work", "Selected work"],
  ["ways-to-work", "Ways to work together"],
  ["process", "Process"],
  ["why", "Why Creativoxa"],
  ["ecosystem", "Digital ecosystem"],
  ["industries", "Industries"],
  ["testimonials", "Testimonials"],
  ["insights", "Insights preview"],
  ["about-teaser", "About teaser"],
  ["final-cta", "Final call to action"],
  ["contact", "Contact block"],
];

export const DEFAULT_PAGE_SECTIONS: PageSectionRow[] = SECTION_LABELS.map(
  ([section_key, label], i) => ({
    id: `local-section-${section_key}`,
    page_slug: "home",
    section_key,
    label,
    enabled: true,
    sort_order: i + 1,
  })
);

const HEADER_LINKS: [string, string][] = [
  ["Work", "/work"],
  ["About", "/about"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
];

const HEADER_SERVICES: [string, string, string][] = [
  ["Digital Marketing", "/services/digital-marketing", "One coordinated plan across channels"],
  ["Google Ads", "/services/google-ads", "Search campaigns built around enquiries"],
  ["Meta Ads", "/services/meta-ads", "Facebook & Instagram advertising"],
  ["SEO", "/services/seo", "Practical, honest search optimization"],
  ["Social Media", "/services/social-media", "Management, content and publishing"],
  ["Web Development", "/services/web-development", "Fast, conversion-focused websites"],
  ["Local Marketing", "/services/local-marketing", "Google Business Profile, maps & IndiaMART"],
];

const FOOTER_SERVICES = HEADER_SERVICES.slice(0, 6).map(
  ([label, href]) => [label, href] as [string, string]
);

const FOOTER_COMPANY: [string, string][] = [...HEADER_LINKS, ["Free Tools", "/tools"]];

const FOOTER_LEGAL: [string, string][] = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
  ["Refund Policy", "/refund-policy"],
  ["Disclaimer", "/disclaimer"],
];

function nav(
  location: NavigationItemRow["location"],
  rows: [string, string, string?][]
): NavigationItemRow[] {
  return rows.map(([label, href, description], i) => ({
    id: `local-nav-${location}-${i}`,
    location,
    label,
    href,
    description: description ?? null,
    parent_id: null,
    sort_order: i + 1,
    visible: true,
    open_in_new_tab: false,
    created_at: NOW,
    updated_at: NOW,
  }));
}

export const DEFAULT_NAVIGATION: NavigationItemRow[] = [
  ...nav("header", HEADER_LINKS),
  ...nav("header-services", HEADER_SERVICES),
  ...nav("footer-services", FOOTER_SERVICES),
  ...nav("footer-company", FOOTER_COMPANY),
  ...nav("footer-legal", FOOTER_LEGAL),
];

/** Homepage process steps stay in code — they are part of how the agency works. */
export const HOMEPAGE_PROCESS_STEPS = processSteps;

/**
 * Tools mirror `supabase/migrations/006_tools.sql` exactly, including the
 * `component` keys in `lib/tools-registry.ts`. No tool is listed here that has no
 * built component, so an unconfigured deployment never renders an empty page.
 */
export const DEFAULT_TOOLS: ToolRow[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "word-counter",
    name: "Word & SEO Counter",
    description: "Professional real-time text analysis for SEO and content length.",
    component: "WordCounter",
    category: "Content",
    created_at: NOW,
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "image-compressor",
    name: "Ultra Image Compressor",
    description: "Lossless browser-based compression to boost your page speed scores.",
    component: "ImageCompressor",
    category: "Performance",
    created_at: NOW,
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "unit-converter",
    name: "Digital Unit Converter",
    description: "Convert between pixels, REM, and EM for modern responsive design.",
    component: "UnitConverter",
    category: "Developer",
    created_at: NOW,
  },
];

/** Contact-form service options shown on the enquiry form. */
export const ENQUIRY_SERVICE_OPTIONS = [
  "Digital Marketing",
  "Meta Ads",
  "Google Ads",
  "SEO",
  "Social Media",
  "Website",
  "Local/Google Business",
  "Full Digital Management",
  "Other",
];
