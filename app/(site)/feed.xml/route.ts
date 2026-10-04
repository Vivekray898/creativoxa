import { getInsights } from "@/lib/cms/queries";
import { site } from "@/lib/site";

export const revalidate = 3600;

// Build-time stamp, used when there are no posts to date the feed from. A
// request-time `new Date()` would claim the feed changed on every fetch.
const buildStamp = new Date();

/** XML text must be entity-escaped or a stray "&" in a title breaks the feed. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed for published insights.
 *
 * Served as a route handler rather than a static file so the feed always
 * reflects the CMS. `app/layout.tsx` already advertises it in
 * `alternates.types`, which is what puts `<link rel="alternate">` in every page
 * head and gets the feed discovered without a submission.
 */
export async function GET(): Promise<Response> {
  const posts = await getInsights();

  // Newest first, and never emit an undated item — RFC 822 needs a real date.
  const items = posts
    .filter((post) => post.published_at)
    .map((post) => {
      const url = `${site.url}/insights/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.seo_title || post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.seo_description || post.excerpt)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n");
    });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${site.name} — Insights`)}</title>`,
    `    <link>${site.url}/insights</link>`,
    `    <description>${escapeXml(site.description)}</description>`,
    "    <language>en-in</language>",
    `    <lastBuildDate>${(posts[0]?.published_at ? new Date(posts[0].published_at) : buildStamp).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}