import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/cms/queries";
import { assertSeoLength } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Project Not Found", robots: { index: false, follow: true } };

  const title = study.seo_title || (study.industry ? `${study.title} — ${study.industry}` : study.title);
  const description = study.seo_description || study.summary;
  assertSeoLength(title, description);

  const url = `/work/${study.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const all = await getCaseStudies();
  const others = all.filter((item) => item.slug !== slug).slice(0, 3);
  const services = Array.isArray(study.services) ? study.services : [];

  // Only the narrative the business can actually stand behind is rendered —
  // an empty block disappears rather than showing "N/A".
  const narrative = [
    { heading: "The challenge", body: study.challenge },
    { heading: "Our approach", body: study.approach },
    { heading: "What we built", body: study.solution },
    { heading: "Outcome", body: study.outcome },
  ].filter((block): block is { heading: string; body: string } => Boolean(block.body));

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-14 lg:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumbs
              className="mb-6"
              items={[
                { name: "Home", path: "/" },
                { name: "Work", path: "/work" },
                { name: study.title, path: `/work/${study.slug}` },
              ]}
            />
            {study.industry ? <p className="eyebrow mb-4">{study.industry}</p> : null}
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {study.summary}
            </p>
            {services.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-1.5">
                {services.map((service) => (
                  <span
                    key={service}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {service}
                  </span>
                ))}
              </div>
            ) : null}
          </Reveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          {study.featured_image ? (
            <Reveal>
              <div className="card overflow-hidden">
                <div className="relative aspect-[16/10] border-b border-line bg-surface-2">
                  <Image
                    src={study.featured_image}
                    alt={`${study.title} project`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 76rem"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          ) : null}

          <div className={`grid grid-cols-1 gap-10 lg:grid-cols-12 ${study.featured_image ? "mt-12" : ""}`}>
            <Reveal className="lg:col-span-4">
              <div className="card p-6">
                <dl className="space-y-4">
                  {study.client_name ? (
                    <div>
                      <dt className="col-label">Client</dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">
                        {study.client_name}
                      </dd>
                    </div>
                  ) : null}
                  {study.industry ? (
                    <div>
                      <dt className="col-label">Industry</dt>
                      <dd className="mt-1 text-sm text-muted">{study.industry}</dd>
                    </div>
                  ) : null}
                  {services.length > 0 ? (
                    <div>
                      <dt className="col-label">Services</dt>
                      <dd className="mt-1 text-sm text-muted">{services.join(", ")}</dd>
                    </div>
                  ) : null}
                  {study.url ? (
                    <div>
                      <dt className="col-label">Live site</dt>
                      <dd className="mt-1">
                        <a
                          href={study.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-primary hover:text-primary-hover"
                        >
                          {study.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              {narrative.length > 0 ? (
                <div className="space-y-10">
                  {narrative.map((block) => (
                    <Reveal key={block.heading}>
                      <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {block.heading}
                      </h2>
                      <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted">
                        {block.body}
                      </p>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal>
                  <div className="border-l-2 border-primary pl-6">
                    <p className="text-base leading-relaxed text-muted sm:text-lg">{study.summary}</p>
                    <p className="mt-4 text-sm leading-relaxed text-faint">
                      A full case study — challenge, approach, execution and outcome — is being
                      prepared for this project. In the meantime, visit the live site to see the
                      work in the real world.
                    </p>
                    {study.url ? (
                      <div className="mt-6">
                        <ButtonLink href={study.url} variant="outline" external>
                          Visit Live Site
                        </ButtonLink>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Other projects */}
      {others.length > 0 ? (
        <section className="border-t border-line py-14">
          <Container>
            <Reveal>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-faint">More work</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {others.map((item) => (
                <Link key={item.id} href={`/work/${item.slug}`} className="card card-hover p-5">
                  {item.industry ? (
                    <p className="text-xs font-medium uppercase tracking-widest text-faint">
                      {item.industry}
                    </p>
                  ) : null}
                  <p className="mt-1.5 font-semibold tracking-tight text-foreground">{item.title}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <FinalCTA
        title="Could your business be our next project?"
        body="Tell us where your digital presence is falling short — we'll tell you honestly what we'd do about it."
        label="Start a Project"
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
