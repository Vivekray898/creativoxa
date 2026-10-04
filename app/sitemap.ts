import type { MetadataRoute } from "next";
import { getCaseStudies, getInsights, getServices, getTools } from "@/lib/cms/queries";
import { site } from "@/lib/site";

export const revalidate = 3600;

// Static pages have no row to take `lastModified` from. A build-time stamp is
// used instead of `new Date()` at request time, which would otherwise tell every
// crawler every URL on the site had just changed.
const buildStamp = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;

  const [services, caseStudies, insights, tools] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getInsights(),
    getTools(),
  ]);

  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updated_at),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: new Date(study.updated_at),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // `getInsights` already filters to `published = true`, so drafts never reach
  // the sitemap.
  const insightUrls: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.updated_at ?? post.published_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // The `tools` table has no `updated_at` column, so `created_at` is the only
  // honest last-modified value available.
  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.created_at),
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
      { url: `${baseUrl}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
      { url: `${baseUrl}/work`, changeFrequency: "monthly" as const, priority: 0.8 },
      { url: `${baseUrl}/about`, changeFrequency: "yearly" as const, priority: 0.6 },
      { url: `${baseUrl}/insights`, changeFrequency: "weekly" as const, priority: 0.7 },
      { url: `${baseUrl}/tools`, changeFrequency: "monthly" as const, priority: 0.5 },
      { url: `${baseUrl}/contact`, changeFrequency: "yearly" as const, priority: 0.8 },
      { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${baseUrl}/refund-policy`, changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${baseUrl}/disclaimer`, changeFrequency: "yearly" as const, priority: 0.3 },
    ] satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: buildStamp }));

  return [...staticPages, ...serviceUrls, ...projectUrls, ...insightUrls, ...toolUrls];
}