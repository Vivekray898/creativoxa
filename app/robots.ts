import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Paths that must never be indexed or crawled. `/admin` is additionally gated
// server-side, but blocking it here keeps it out of the index and out of
// crawl-budget spend. `/api` returns JSON, never HTML.
const disallowed = ["/api/", "/admin", "/private/"];

// Reputable AI crawlers get an explicit allow. They are already covered by the
// `*` rule, but naming them makes the intent auditable and keeps them working if
// a future rule is added to the wildcard group.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowed,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: disallowed,
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}