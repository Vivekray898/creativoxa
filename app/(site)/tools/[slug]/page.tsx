import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { getToolBySlug, getTools } from "@/lib/cms/queries";
import { AD_SLOTS } from "@/lib/consent";
import { JsonLd, assertSeoLength, webApplicationSchema } from "@/lib/seo";
import { renderTool } from "@/lib/tools-registry";

// Cached like the rest of the public site — the tools registry rarely changes.
export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  // notFound() renders this metadata on the 404 response, so a bad slug must not
  // inherit a canonical or OG image pointing at a page that doesn't exist.
  if (!tool) return { title: "Tool not found", robots: { index: false, follow: true } };

  const title = `${tool.name} — Free Online Tool`;
  const description =
    tool.description ??
    `${tool.name}, a free browser tool from Creativoxa. No signup required.`;
  assertSeoLength(title, description);

  const url = `/tools/${tool.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ToolPage({ params }: Params) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  // A real not-found, not a 200 page with "Tool not found" in the body — the old
  // version was indexable, so every typo'd tool URL was a soft 404 in Search
  // Console.
  //
  // The HTTP status is 200 rather than 404 because `app/(site)/loading.tsx`
  // opens a Suspense boundary and the CMS read above has already suspended, so
  // the response headers were sent before we got here. Next compensates with
  // `<meta name="robots" content="noindex">` on the response, which is the
  // supported outcome for a streamed not-found. A true 404 status would mean
  // moving the lookup above the Suspense boundary or checking it in the proxy;
  // the first is impossible (params must be awaited) and the second would put a
  // database round-trip on every request to match paths.
  if (!tool) notFound();

  const toolUi = renderTool(tool);

  return (
    <section className="py-14 lg:py-20">
      <Container>
        <JsonLd data={webApplicationSchema(tool)} />

        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]}
        />

        <Reveal className="mt-6 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{tool.description}</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="card p-5 sm:p-8">
            {toolUi ?? (
              <p className="py-14 text-center text-sm text-muted">
                This tool is being set up. Check back soon.
              </p>
            )}
          </div>
        </Reveal>

        <AdSlot slot={AD_SLOTS.toolsDetail} height={280} />

        <Reveal className="mt-6">
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 text-sm text-muted">
            <Icon name="briefcase" className="h-5 w-5 shrink-0 text-primary" />
            <p>
              Need help with your digital marketing instead?{" "}
              <Link href="/contact" className="font-semibold text-primary hover:text-primary-hover">
                Talk to us
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}