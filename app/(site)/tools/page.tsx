import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import AdSlot from "@/components/ads/AdSlot";
import { getTools } from "@/lib/cms/queries";
import { AD_SLOTS } from "@/lib/consent";
import { JsonLd, absoluteUrl, assertSeoLength, itemListSchema } from "@/lib/seo";

export const revalidate = 3600;

const TITLE = "Free Online Tools for SEO & Design";
const DESCRIPTION =
  "Free browser tools from Creativoxa: word and SEO counter, image compressor and unit converter. No signup, nothing to install.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
};

assertSeoLength(TITLE, DESCRIPTION);

export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <JsonLd
          data={itemListSchema(
            "Creativoxa free tools",
            tools.map((tool) => ({
              name: tool.name,
              url: absoluteUrl(`/tools/${tool.slug}`),
            }))
          )}
        />

        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }]} />

        <Reveal className="mt-6 max-w-2xl">
          <p className="eyebrow mb-4">Free tools</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Small utilities, free to use.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            A few simple tools we built for our own workflow and share with anyone who finds them
            useful.
          </p>
        </Reveal>

        {tools.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Reveal key={tool.id}>
                <Link href={`/tools/${tool.slug}`} className="group block h-full">
                  <article className="card card-hover flex h-full flex-col p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Icon name="layers" className="h-5 w-5" />
                    </span>
                    <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                      {tool.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {tool.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      Open tool
                      <Icon
                        name="arrowRight"
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="card mx-auto mt-12 max-w-lg px-6 py-14 text-center">
            <p className="font-semibold text-foreground">Tools are being set up.</p>
            <p className="mt-2 text-sm text-muted">Check back soon.</p>
          </div>
        )}

        <AdSlot slot={AD_SLOTS.toolsIndex} height={280} />

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