import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCaseStudies } from "@/lib/cms/queries";
import { assertSeoLength } from "@/lib/seo";

export const revalidate = 300;

const TITLE = "Work — Websites & Digital Projects";
const DESCRIPTION =
  "A selection of websites and digital projects delivered by Creativoxa for businesses in tourism, e-commerce, real estate, hospitality and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/work" },
};

assertSeoLength(TITLE, DESCRIPTION);

export default async function WorkPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]} />
          <Reveal className="mt-6 max-w-3xl">
            <p className="eyebrow mb-4">Selected work</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Websites and digital projects for real businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Every project below is live and serving a real business. They share one brief: present
              the business credibly and make contacting it effortless.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          {studies.length === 0 ? (
            <div className="card mx-auto max-w-2xl px-8 py-16 text-center">
              <p className="text-lg font-semibold text-foreground">Project write-ups are coming.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                We publish a project once we can describe the work honestly. In the meantime, tell
                us what you&apos;re working on and we&apos;ll share relevant examples directly.
              </p>
              <div className="mt-6 flex justify-center">
                <ArrowLink href="/contact">Talk to us about your project</ArrowLink>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {studies.map((study, i) => (
                <Reveal key={study.id} delay={(i % 2) * 50}>
                  <Link href={`/work/${study.slug}`} className="group block h-full">
                    <article className="card card-hover flex h-full flex-col overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                        {study.featured_image ? (
                          <Image
                            src={study.featured_image}
                            alt={`${study.title} project`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-tint-blue to-tint-violet">
                            <span className="font-display px-6 text-center text-lg font-bold tracking-tight text-primary">
                              {study.title}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between gap-4">
                          {study.industry ? (
                            <p className="text-xs font-medium uppercase tracking-widest text-faint">
                              {study.industry}
                            </p>
                          ) : null}
                          <ArrowLink href={`/work/${study.slug}`} className="text-xs">
                            View Project
                          </ArrowLink>
                        </div>
                        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
                          {study.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{study.summary}</p>
                        {Array.isArray(study.services) && study.services.length > 0 ? (
                          <p className="mt-4 flex flex-wrap gap-1.5">
                            {study.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted"
                              >
                                {service}
                              </span>
                            ))}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <FinalCTA
        title="Want results like these for your business?"
        body="Tell us about your business and what you need — a website, campaigns, or a partner to manage the whole picture."
        label="Start a Project"
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
