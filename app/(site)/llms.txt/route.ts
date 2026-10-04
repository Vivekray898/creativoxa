import { getCaseStudies, getInsights, getServices, getTools } from "@/lib/cms/queries";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TEXT_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  // Explicitly public: this file exists to be read by other people's crawlers.
  "x-robots-tag": "all",
};

/**
 * `/llms.txt` — the emerging convention (llmstxt.org) for telling a language
 * model what a site is and which URLs are worth reading.
 *
 * It is a plain-text index, not a prompt, and it is not a substitute for
 * robots.txt: that still governs whether a crawler may read anything at all.
 * Content here is generated from the same CMS queries the pages use, so it
 * cannot drift from what the site actually publishes.
 */
export async function GET(): Promise<Response> {
  const [services, caseStudies, insights, tools] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getInsights(),
    getTools(),
  ]);

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is a digital marketing and growth partner for businesses, based in ${site.address.city}, ${site.address.region}, India. It offers Google Ads, Meta Ads, SEO, social media management, website development, local marketing and ongoing digital management — either as one-off projects or as rolling monthly management.`,
    "",
    "All services are offered remotely across India. Email and WhatsApp enquiries are answered by a person.",
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- Phone: ${site.phone}`,
    `- Enquiry form: ${site.url}/contact`,
    "",
    "## Main pages",
    "",
    `- [Home](${site.url}/): What ${site.name} does and who it is for.`,
    `- [Services](${site.url}/services): Overview of every service, with links to each service page.`,
    `- [Work](${site.url}/work): Selected website and digital projects, with the challenge, approach and outcome.`,
    `- [About](${site.url}/about): Who the team is, how it works, and where it is based.`,
    `- [Insights](${site.url}/insights): Practical guides on SEO, Google Ads, Meta Ads, websites and local marketing, written for business owners.`,
    `- [Contact](${site.url}/contact): Enquiry form and direct contact channels.`,
    "",
    "## Services",
    "",
    ...services.map(
      (service) => `- [${service.short_title}](${site.url}/services/${service.slug}): ${service.excerpt ?? ""}`
    ),
    "",
    "## Free tools",
    "",
    "Browser-based utilities that run entirely on the visitor's device. No signup, no data sent to us.",
    "",
    ...tools.map((tool) => `- [${tool.name}](${site.url}/tools/${tool.slug}): ${tool.description ?? ""}`),
    "",
  ];

  if (caseStudies.length > 0) {
    lines.push(
      "## Selected work",
      "",
      ...caseStudies.map(
        (study) => `- [${study.title}](${site.url}/work/${study.slug}): ${study.summary}`
      ),
      ""
    );
  }

  if (insights.length > 0) {
    lines.push(
      "## Insights",
      "",
      ...insights.map(
        (post) =>
          `- [${post.title}](${site.url}/insights/${post.slug}) (${post.category}, ${new Date(post.published_at).toISOString().slice(0, 10)}): ${post.excerpt}`
      ),
      "",
      "An RSS feed of the same articles is available at " + `${site.url}/feed.xml`,
      ""
    );
  }

  lines.push(
    "## Legal",
    "",
    `- [Privacy Policy](${site.url}/privacy): What data is collected, cookies, advertising, consent and vendors.`,
    `- [Terms of Service](${site.url}/terms): Terms governing use of the site and engagement of services.`,
    `- [Refund & Cancellation Policy](${site.url}/refund-policy): Cancellation and refund terms.`,
    `- [Disclaimer](${site.url}/disclaimer): Limits of the claims and examples published on this site.`,
    "",
    "## Optional",
    "",
    `- [Full text of every page](${site.url}/llms-full.txt): Complete content, generated on request.`,
    `- [Sitemap](${site.url}/sitemap.xml): All indexable URLs.`,
    ""
  );

  return new Response(lines.join("\n"), {
    headers: {
      ...TEXT_HEADERS,
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}