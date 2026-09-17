import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { projects } from "@/lib/data/projects";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — ${project.industry}`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.industry}`,
      description: project.description,
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hasCaseStudy = Boolean(project.overview || project.challenge || project.strategy);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.name, path: `/work/${project.slug}` },
        ])}
      />
      <section className="border-b border-line">
        <Container className="py-14 lg:py-20">
          <Reveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
              <Link href="/work" className="transition-colors hover:text-foreground">
                Work
              </Link>
              <span className="mx-2 text-faint">/</span>
              <span className="text-foreground">{project.name}</span>
            </nav>
            <p className="eyebrow mb-4">{project.industry}</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-1.5">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <Reveal>
            <div className="card overflow-hidden">
              <div className="relative aspect-[16/10] border-b border-line bg-surface-2">
                <Image
                  src={project.screenshot}
                  alt={`${project.name} website`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 76rem"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="card p-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="col-label">Client</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">{project.name}</dd>
                  </div>
                  <div>
                    <dt className="col-label">Industry</dt>
                    <dd className="mt-1 text-sm text-muted">{project.industry}</dd>
                  </div>
                  <div>
                    <dt className="col-label">Services</dt>
                    <dd className="mt-1 text-sm text-muted">{project.services.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="col-label">Live site</dt>
                    <dd className="mt-1">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-primary hover:text-primary-hover"
                      >
                        {project.url.replace(/^https?:\/\//, "")} ↗
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              {hasCaseStudy ? (
                <div className="space-y-10">
                  {project.overview && (
                    <Reveal>
                      <h2 className="text-xl font-semibold tracking-tight text-foreground">Overview</h2>
                      <p className="mt-3 text-base leading-relaxed text-muted">{project.overview}</p>
                    </Reveal>
                  )}
                  {project.challenge && (
                    <Reveal>
                      <h2 className="text-xl font-semibold tracking-tight text-foreground">The challenge</h2>
                      <p className="mt-3 text-base leading-relaxed text-muted">{project.challenge}</p>
                    </Reveal>
                  )}
                  {project.strategy && (
                    <Reveal>
                      <h2 className="text-xl font-semibold tracking-tight text-foreground">What we did</h2>
                      <p className="mt-3 text-base leading-relaxed text-muted">{project.strategy}</p>
                    </Reveal>
                  )}
                  {project.results && project.results.length > 0 && (
                    <Reveal>
                      <h2 className="text-xl font-semibold tracking-tight text-foreground">Results</h2>
                      <ul className="mt-3 space-y-2">
                        {project.results.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 text-sm text-muted">
                            <span className="mt-2 h-1 w-4 shrink-0 bg-primary" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )}
                </div>
              ) : (
                <Reveal>
                  <div className="border-l-2 border-primary pl-6">
                    <p className="text-base leading-relaxed text-muted sm:text-lg">
                      {project.description}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-faint">
                      A full case study — challenge, strategy, execution and results — is being
                      prepared for this project. In the meantime, visit the live site to see the
                      work in the real world.
                    </p>
                    <div className="mt-6">
                      <ButtonLink href={project.url} variant="outline" external>
                        Visit Live Site
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Other projects */}
      <section className="border-t border-line py-14">
        <Container>
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-faint">
              More work
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {projects
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="card card-hover p-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-faint">
                    {p.industry}
                  </p>
                  <p className="mt-1.5 font-semibold tracking-tight text-foreground">{p.name}</p>
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <FinalCTA
        title="Could your business be our next project?"
        body="Tell us where your digital presence is falling short — we'll tell you honestly what we'd do about it."
        label="Start a Project"
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
