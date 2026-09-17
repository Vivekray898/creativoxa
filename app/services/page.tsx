import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import FinalCTA from "@/components/sections/FinalCTA";
import { serviceCategories, servicePages } from "@/lib/data/services";
import { processSteps } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Services — Advertising, SEO, Social, Web & Local Growth",
  description:
    "Explore Creativoxa's services: Google Ads, Meta Ads, SEO, social media management, website development, local marketing and full digital management.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Services</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Focused services, coordinated delivery.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Each service stands on its own, but they&apos;re designed to compound when managed
              together. Below is what we do and how we think about it — so you can decide what your
              business needs first.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Core service pages */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Core services
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              The seven areas businesses engage us for most often. Each has a dedicated page with
              our approach, deliverables and FAQs.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 50}>
                <Link href={`/services/${s.slug}`} className="group block h-full">
                  <article className="card card-hover flex h-full flex-col p-6">
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      {s.categoryLabel}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
                      {s.shortTitle}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{s.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      Explore {s.shortTitle}
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
        </Container>
      </section>

      {/* Full capability matrix */}
      <section className="border-y border-line bg-surface py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Full capability"
              title="Everything under management."
              description="Beyond the core services, this is the full scope of day-to-day work we handle for clients."
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat, i) => (
              <Reveal key={cat.id} delay={(i % 3) * 50}>
                <div className="card h-full p-6">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {cat.label}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {cat.services.map((s) => (
                      <li key={s.name} className="flex items-start gap-2.5 text-sm text-muted">
                        <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process summary */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How engagements run"
              title="Six steps, repeated until the results compound."
            />
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <li key={s.step} className="border-t border-line py-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-primary">{s.step}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                </div>
                <p className="mt-2 pl-9 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <ArrowLink href="/contact">Discuss which service fits your business</ArrowLink>
          </Reveal>
        </Container>
      </section>

      <FinalCTA
        title="Not sure which service you need?"
        body="That's normal — most businesses need two or three things done well, not everything at once. Tell us your goal and we'll recommend the shortest path."
        label="Discuss Your Goals"
        secondary={{ href: "/work", label: "See Our Work" }}
      />
    </>
  );
}
