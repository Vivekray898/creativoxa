// Public content queries.
//
// Every function here returns *published* content only (Row Level Security
// enforces the same rule in the database, so a draft can never leak). Reads use
// the cookie-less anon client, which keeps the pages that call them cacheable.
//
// If Supabase is unconfigured or a query fails, the local fallback in
// `lib/cms/defaults.ts` is returned instead — that is what lets the site build
// and render correctly before the migrations have been applied. A successful
// response with zero rows is respected as-is (that is how unpublished and
// intentionally empty sections disappear).

import { isSupabaseConfigured, supabasePublic } from "@/lib/supabase/public";
import {
  DEFAULT_CASE_STUDIES,
  DEFAULT_FAQS,
  DEFAULT_HOMEPAGE,
  DEFAULT_INDUSTRIES,
  DEFAULT_NAVIGATION,
  DEFAULT_PAGE_SECTIONS,
  DEFAULT_SERVICE_CATEGORIES,
  DEFAULT_SERVICES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TOOLS,
} from "@/lib/cms/defaults";
import type {
  CaseStudyRow,
  FaqRow,
  HomepageSettingsRow,
  IndustryRow,
  InsightRow,
  NavigationItemRow,
  NavigationLocation,
  PageSectionRow,
  ServiceCategoryRow,
  ServiceRow,
  SiteSettingsRow,
  TestimonialRow,
  ToolRow,
} from "@/types/cms";

type ListResult<T> = { data: T[] | null; error: { message?: string } | null };
type SingleResult<T> = { data: T | null; error: { message?: string } | null };

function note(label: string, message: string | undefined) {
  console.warn(`[cms] ${label} unavailable — using local content (${message ?? "unknown error"})`);
}

async function list<T>(
  label: string,
  run: () => PromiseLike<ListResult<T>>,
  fallback: T[]
): Promise<T[]> {
  if (!isSupabaseConfigured) return fallback;
  try {
    const { data, error } = await run();
    if (error) {
      note(label, error.message);
      return fallback;
    }
    return data ?? [];
  } catch (error) {
    note(label, error instanceof Error ? error.message : undefined);
    return fallback;
  }
}

async function single<T>(
  label: string,
  run: () => PromiseLike<SingleResult<T>>,
  fallback: T
): Promise<T> {
  if (!isSupabaseConfigured) return fallback;
  try {
    const { data, error } = await run();
    if (error || !data) {
      if (error) note(label, error.message);
      return fallback;
    }
    return data;
  } catch (error) {
    note(label, error instanceof Error ? error.message : undefined);
    return fallback;
  }
}

// ── Services ────────────────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceRow[]> {
  return list(
    "services",
    () => supabasePublic.from("services").select("*").eq("published", true).order("sort_order"),
    DEFAULT_SERVICES
  );
}

export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  const fallback = DEFAULT_SERVICES.find((s) => s.slug === slug) ?? null;
  return single(
    `service:${slug}`,
    () =>
      supabasePublic
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle(),
    fallback
  );
}

export async function getServiceCategories(): Promise<ServiceCategoryRow[]> {
  return list(
    "service_categories",
    () =>
      supabasePublic
        .from("service_categories")
        .select("*")
        .eq("published", true)
        .order("sort_order"),
    DEFAULT_SERVICE_CATEGORIES
  );
}

/** Other services, preferring the same category so cross-links stay relevant. */
export async function getRelatedServices(slug: string, limit = 3): Promise<ServiceRow[]> {
  const services = await getServices();
  const current = services.find((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug);
  if (!current) return others.slice(0, limit);
  return [
    ...others.filter((s) => s.category_id && s.category_id === current.category_id),
    ...others.filter((s) => !s.category_id || s.category_id !== current.category_id),
  ].slice(0, limit);
}

// ── Industries ──────────────────────────────────────────────────────────────

export async function getIndustries(): Promise<IndustryRow[]> {
  return list(
    "industries",
    () => supabasePublic.from("industries").select("*").eq("published", true).order("sort_order"),
    DEFAULT_INDUSTRIES
  );
}

// ── Case studies ────────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudyRow[]> {
  return list(
    "case_studies",
    () =>
      supabasePublic.from("case_studies").select("*").eq("published", true).order("sort_order"),
    DEFAULT_CASE_STUDIES
  );
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyRow | null> {
  const fallback = DEFAULT_CASE_STUDIES.find((c) => c.slug === slug) ?? null;
  return single(
    `case-study:${slug}`,
    () =>
      supabasePublic
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle(),
    fallback
  );
}

// ── Testimonials (no fallback: none exist yet, and none will be invented) ────

export async function getTestimonials(): Promise<TestimonialRow[]> {
  return list(
    "testimonials",
    () =>
      supabasePublic.from("testimonials").select("*").eq("published", true).order("sort_order"),
    []
  );
}

// ── FAQs ────────────────────────────────────────────────────────────────────

export async function getFaqs(options: { category?: string; serviceId?: string } = {}) {
  const fallback = DEFAULT_FAQS.filter((faq) => {
    if (options.category && faq.category !== options.category) return false;
    if (options.serviceId && faq.service_id !== options.serviceId) return false;
    return true;
  });

  return list<FaqRow>(
    "faqs",
    () => {
      let query = supabasePublic
        .from("faqs")
        .select("*")
        .eq("published", true)
        .order("sort_order");
      if (options.category) query = query.eq("category", options.category);
      if (options.serviceId) query = query.eq("service_id", options.serviceId);
      return query;
    },
    fallback
  );
}

// ── Insights ────────────────────────────────────────────────────────────────

export async function getInsights(limit?: number): Promise<InsightRow[]> {
  return list(
    "insights",
    () => {
      const query = supabasePublic
        .from("insights")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      return limit ? query.limit(limit) : query;
    },
    []
  );
}

export async function getInsightBySlug(slug: string): Promise<InsightRow | null> {
  return single(
    `insight:${slug}`,
    () =>
      supabasePublic.from("insights").select("*").eq("slug", slug).eq("published", true).maybeSingle(),
    null
  );
}

// ── Tools ───────────────────────────────────────────────────────────────────

export async function getTools(): Promise<ToolRow[]> {
  return list(
    "tools",
    () => supabasePublic.from("tools").select("*").order("sort_order"),
    DEFAULT_TOOLS
  );
}

export async function getToolBySlug(slug: string): Promise<ToolRow | null> {
  return single(
    `tool:${slug}`,
    () => supabasePublic.from("tools").select("*").eq("slug", slug).maybeSingle(),
    DEFAULT_TOOLS.find((t) => t.slug === slug) ?? null
  );
}

// ── Homepage, settings and navigation ───────────────────────────────────────

export async function getHomepageSettings(): Promise<HomepageSettingsRow> {
  return single(
    "homepage_settings",
    () => supabasePublic.from("homepage_settings").select("*").eq("id", true).maybeSingle(),
    DEFAULT_HOMEPAGE
  );
}

export async function getPageSections(pageSlug = "home"): Promise<PageSectionRow[]> {
  const fallback = DEFAULT_PAGE_SECTIONS.filter((s) => s.page_slug === pageSlug);
  return list(
    "page_sections",
    () =>
      supabasePublic
        .from("page_sections")
        .select("*")
        .eq("page_slug", pageSlug)
        .eq("enabled", true)
        .order("sort_order"),
    fallback
  );
}

export async function getSiteSettings(): Promise<SiteSettingsRow> {
  return single(
    "site_settings",
    () => supabasePublic.from("site_settings").select("*").eq("id", true).maybeSingle(),
    DEFAULT_SITE_SETTINGS
  );
}

export async function getNavigation(location: NavigationLocation): Promise<NavigationItemRow[]> {
  const fallback = DEFAULT_NAVIGATION.filter((item) => item.location === location);
  return list(
    "navigation_items",
    () =>
      supabasePublic
        .from("navigation_items")
        .select("*")
        .eq("location", location)
        .eq("visible", true)
        .order("sort_order"),
    fallback
  );
}

export async function getHeaderNavigation() {
  const [links, services] = await Promise.all([
    getNavigation("header"),
    getNavigation("header-services"),
  ]);
  return { links, services };
}

export async function getFooterNavigation() {
  const [services, company, legal] = await Promise.all([
    getNavigation("footer-services"),
    getNavigation("footer-company"),
    getNavigation("footer-legal"),
  ]);
  return { services, company, legal };
}
