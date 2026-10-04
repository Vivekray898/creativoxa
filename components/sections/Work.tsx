import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { getCaseStudies } from "@/lib/cms/queries";
import type { CaseStudyRow } from "@/types/cms";
import type { HomeSectionProps } from "./types";

/** Fallback panel for projects whose screenshot is not uploaded yet. */
function ProjectVisual({
  study,
  className,
  sizes,
}: {
  study: CaseStudyRow;
  className: string;
  sizes: string;
}) {
  if (study.featured_image) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <Image
          src={study.featured_image}
          alt={`${study.title} project`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-tint-blue to-tint-violet ${className}`}
    >
      <span className="font-display px-6 text-center text-lg font-bold tracking-tight text-primary">
        {study.title}
      </span>
    </div>
  );
}

export default async function Work({ index, title, description }: HomeSectionProps) {
  const studies = await getCaseStudies();
  if (studies.length === 0) return null;

  const featured = studies.find((study) => study.featured) ?? studies[0];
  const supporting = studies.filter((study) => study.id !== featured.id).slice(0, 4);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            index={index}
            title={title ?? "Digital work for real businesses."}
            description={
              description ??
              "Every project below is live. Each started with a business problem — visibility, enquiries, or a website that wasn't pulling its weight."
            }
          />
          <ArrowLink href="/work" className="shrink-0">
            View all work
          </ArrowLink>
        </Reveal>

        {/* Featured project */}
        <Reveal className="mt-12 lg:mt-16">
          <Link href={`/work/${featured.slug}`} className="group block">
            <article className="card card-hover overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ProjectVisual
                  study={featured}
                  className="h-64 border-b border-line sm:h-80 lg:h-auto lg:min-h-[380px] lg:border-b-0 lg:border-r"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="eyebrow">Featured project</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {featured.title}
                  </h3>
                  {featured.industry ? (
                    <p className="mt-1 text-xs font-medium uppercase tracking-widest text-faint">
                      {featured.industry}
                    </p>
                  ) : null}
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {featured.summary}
                  </p>
                  {featured.services.length > 0 ? (
                    <p className="mt-5 flex flex-wrap gap-1.5">
                      {featured.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {service}
                        </span>
                      ))}
                    </p>
                  ) : null}
                  <p className="mt-7 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    View the project →
                  </p>
                </div>
              </div>
            </article>
          </Link>
        </Reveal>

        {/* Supporting projects */}
        {supporting.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supporting.map((study, i) => (
              <Reveal key={study.id} delay={i * 50}>
                <Link href={`/work/${study.slug}`} className="group block h-full">
                  <article className="card card-hover flex h-full flex-col overflow-hidden">
                    <ProjectVisual
                      study={study}
                      className="aspect-[16/10] border-b border-line"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      {study.industry ? (
                        <p className="text-[11px] font-medium uppercase tracking-widest text-faint">
                          {study.industry}
                        </p>
                      ) : null}
                      <h3 className="mt-1.5 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {study.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
                        {study.summary}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
