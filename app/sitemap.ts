import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { projects } from "@/lib/data/projects";
import { servicePages } from "@/lib/data/services";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, published_at")
    .order("published_at", { ascending: false });

  const blogPosts: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceUrls: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
      { url: `${baseUrl}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
      { url: `${baseUrl}/work`, changeFrequency: "monthly" as const, priority: 0.8 },
      { url: `${baseUrl}/about`, changeFrequency: "yearly" as const, priority: 0.6 },
      { url: `${baseUrl}/insights`, changeFrequency: "weekly" as const, priority: 0.7 },
      { url: `${baseUrl}/contact`, changeFrequency: "yearly" as const, priority: 0.8 },
      { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${baseUrl}/refund-policy`, changeFrequency: "yearly" as const, priority: 0.3 },
    ] satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: new Date() }));

  return [...staticPages, ...serviceUrls, ...projectUrls, ...blogPosts];
}
