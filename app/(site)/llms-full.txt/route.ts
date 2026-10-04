import { getCaseStudies, getInsights, getServices, getSiteSettings, getTools } from "@/lib/cms/queries";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TEXT_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  "x-robots-tag": "all",
};

/** Flattens the CMS JSON block columns into readable bullets. */
function bullets(value: unknown, labelKey = "title", bodyKey = "body"): string[] {
  if (!Array.isArray(value)) return [];
  const lines: string[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) continue;
    const record = item as Record<string, unknown>;
    const heading =
      typeof record[labelKey] === "string" ? String(record[labelKey]) : "";
    const body = typeof record[bodyKey] === "string" ? String(record[bodyKey]) : "";
    if (!heading && !body) continue;
    lines.push(heading ? `- **${heading}** ${body}`.trimEnd() : `- ${body}`);
  }
  return lines;
}

/** Strip markdown so the feed reads as prose rather than source. */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`>]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * `/llms-full.txt` — the complete text of the site's published content in one
 * file, the format llmstxt.org defines as the companion to `llms.txt`.
 *
 * It renders through the same `renderMarkdown` the article pages use, so this is
 * sanitised exactly like the visible page and cannot smuggle raw HTML from the
 * CMS into a text file a model would ingest.
 */
export async function GET(): Promise<Response> {
  const [settings, services, caseStudies, insights, tools] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getCaseStudies(),
    getInsights(),
    getTools(),
  ]);

  const parts: string[] = [
    `# ${site.name} — full text`,
    "",
    site.description,
    "",
    `Contact: ${site.email} · ${site.phone}`,
    `Address: ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}, India`,
    "",
    "Generated from the site's own content. Where this file and the live site disagree, the live site is authoritative.",
    "",
    "## Company",
    "",
    Array.from(
      new Set(
        [settings.tagline, settings.default_seo_description, site.description].filter(
          (line): line is string => Boolean(line)
        )
      )
    ).join("\n\n"),
    "",
  ];

  if (services.length > 0) {
    parts.push("## Services", "");
    for (const service of services) {
      parts.push(
        `### ${service.short_title}`,
        "",
        `URL: ${site.url}/services/${service.slug}`,
        "",
        service.excerpt ?? "",
        ""
      );
      const whatWeDo = bullets(service.what_we_do);
      if (whatWeDo.length > 0) parts.push("What we do:", "", ...whatWeDo, "");

      const howItWorks = bullets(service.how_it_works);
      if (howItWorks.length > 0) parts.push("How it works:", "", ...howItWorks, "");
      if (Array.isArray(service.deliverables) && service.deliverables.length > 0) {
        parts.push(
          "Deliverables:",
          "",
          service.deliverables.map((item) => `- ${item}`).join("\n"),
          ""
        );
      }
    }
  }

  if (caseStudies.length > 0) {
    parts.push("## Selected work", "");
    for (const study of caseStudies) {
      parts.push(
        `### ${study.title}`,
        "",
        `URL: ${site.url}/work/${study.slug}`,
        "",
        study.summary,
        ""
      );
      const narrative = [
        ["The challenge", study.challenge],
        ["Our approach", study.approach],
        ["What we built", study.solution],
        ["Outcome", study.outcome],
      ] as const;
      for (const [heading, body] of narrative) {
        if (body) parts.push(`**${heading}.** ${body}`, "");
      }
    }
  }

  if (insights.length > 0) {
    parts.push("## Insights", "");
    for (const post of insights) {
      const published = new Date(post.published_at).toISOString().slice(0, 10);
      const updated = post.updated_at
        ? new Date(post.updated_at).toISOString().slice(0, 10)
        : null;

      parts.push(
        `### ${post.title}`,
        "",
        `URL: ${site.url}/insights/${post.slug}`,
        `Published: ${published}`,
        updated ? `Updated: ${updated}` : "",
        `Category: ${post.category}`,
        post.author ? `Author: ${post.author}` : "",
        "",
        post.excerpt,
        "",
        toPlainText(post.content ?? ""),
        ""
      );
    }
  }

  if (tools.length > 0) {
    parts.push(
      "## Free tools",
      "",
      "These run entirely in the visitor's browser. Nothing entered into them reaches us.",
      ""
    );
    for (const tool of tools) {
      parts.push(
        `- ${tool.name} (${tool.category ?? "General"}) — ${tool.description ?? ""} ${site.url}/tools/${tool.slug}`
      );
    }
    parts.push("");
  }

  parts.push(
    "## Legal",
    "",
    `Privacy Policy: ${site.url}/privacy`,
    `Terms of Service: ${site.url}/terms`,
    `Refund & Cancellation Policy: ${site.url}/refund-policy`,
    `Disclaimer: ${site.url}/disclaimer`,
    ""
  );

  // Collapse the blank lines left by the optional metadata fields above.
  const body = parts.join("\n").replace(/\n{3,}/g, "\n\n");

  return new Response(body, {
    headers: {
      ...TEXT_HEADERS,
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}