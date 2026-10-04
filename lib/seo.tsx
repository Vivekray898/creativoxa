import type { SiteSettingsRow } from "@/types/cms";
import { socialEntries } from "./contact";
import { site } from "./site";

// Canonical domain + fallbacks live in lib/site.ts; everything else is passed in
// from the CMS so structured data always matches what the site displays.

/** Same template the root layout applies, so lengths are checked on the real title. */
export const TITLE_TEMPLATE = `%s | ${site.name}`;

/**
 * Search engines truncate around 60 characters for titles and 155 for
 * descriptions. This runs in development only, so a CMS author editing a page
 * title past the limit finds out immediately instead of in Search Console.
 *
 * Pass the *base* title exactly as it appears in `metadata.title` — the
 * `%s | Creativoxa` suffix the layout appends is added here before measuring,
 * so authors are never told a 40-character title is fine when it renders as 55.
 */
export function assertSeoLength(title: string, description: string) {
  if (process.env.NODE_ENV !== "development") return;
  const warn = (kind: string, value: string, max: number) => {
    if (value.length > max) {
      console.warn(`[seo] ${kind} is ${value.length} chars (max ${max}): ${JSON.stringify(value)}`);
    }
  };
  const rendered = title.includes(site.name) ? title : `${title} | ${site.name}`;
  warn("title", rendered, 60);
  warn("description", description, 155);
}

export function organizationSchema(settings: SiteSettingsRow) {
  const sameAs = socialEntries(settings.socials).map((entry) => entry.href);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: settings.company_name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/creativoxa-logo-645-x-160.png"),
    },
    image: absoluteUrl("/images/creativoxa-logo-645-x-160.png"),
    description: settings.tagline || settings.default_seo_description || site.description,
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.address_street || settings.address_city
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address_street,
            addressLocality: settings.address_city,
            addressRegion: settings.address_region,
            postalCode: settings.address_postal_code,
            addressCountry: settings.address_country,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * LocalBusiness layer for the geo/local-pack use case. `ProfessionalService` is
 * already a LocalBusiness subtype, so this carries the same real facts and adds
 * the geo coordinates and service area. No opening hours or ratings are asserted
 * here — those aren't recorded in lib/site.ts.
 */
export function localBusinessSchema(settings: SiteSettingsRow) {
  const sameAs = socialEntries(settings.socials).map((entry) => entry.href);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: settings.company_name,
    url: site.url,
    description: settings.tagline || settings.default_seo_description || site.description,
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.address_street || settings.address_city
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address_street,
            addressLocality: settings.address_city,
            addressRegion: settings.address_region,
            postalCode: settings.address_postal_code,
            addressCountry: settings.address_country,
          },
        }
      : {}),
    // Siliguri, West Bengal — coordinates for the city centre.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.7271,
      longitude: 88.3953,
    },
    areaServed: [
      { "@type": "City", name: "Siliguri" },
      { "@type": "State", name: "West Bengal" },
      { "@type": "Country", name: "India" },
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteSchema(settings: SiteSettingsRow) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: settings.company_name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceSchema(
  service: { short_title: string; excerpt: string; slug: string },
  settings: SiteSettingsRow
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${service.slug}#service`,
    name: service.short_title,
    description: service.excerpt,
    serviceType: service.short_title,
    provider: {
      "@type": "ProfessionalService",
      name: settings.company_name,
      url: site.url,
      ...(settings.phone ? { telephone: settings.phone } : {}),
    },
    areaServed: { "@type": "City", name: "Siliguri" },
    url: `${site.url}/services/${service.slug}`,
  };
}

/**
 * SoftwareApplication for the free browser tools. `applicationCategory` is
 * `UtilitiesApplication` because every tool in `lib/tools-registry.ts` runs
 * entirely client-side in the visitor's browser.
 */
export function webApplicationSchema(tool: {
  slug: string;
  name: string;
  description: string | null;
  category?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${site.url}/tools/${tool.slug}#app`,
    name: tool.name,
    description: tool.description ?? undefined,
    url: `${site.url}/tools/${tool.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any modern web browser",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** ItemList for index pages that enumerate CMS content (insights, tools). */
export function itemListSchema(
  name: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleSchema(
  article: {
    slug: string;
    title: string;
    excerpt: string;
    author: string | null;
    published_at: string;
    updated_at?: string | null;
    featured_image: string | null;
  },
  settings: SiteSettingsRow
) {
  const url = `${site.url}/insights/${article.slug}`;
  const published = article.published_at;
  const modified = article.updated_at ?? published;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: article.title,
    description: article.excerpt,
    datePublished: published,
    dateModified: modified,
    ...(article.featured_image ? { image: [absoluteUrl(article.featured_image)] } : {}),
    author: {
      "@type": "Person",
      name: article.author || settings.company_name,
      ...(article.author ? {} : { worksFor: { "@id": `${site.url}/#organization` } }),
    },
    publisher: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/#website` },
    inLanguage: "en-IN",
  };
}

export function absoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${site.url}${pathOrUrl}`;
}