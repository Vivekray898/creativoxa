import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getServiceCategories, getServices } from "@/lib/cms/queries";
import { assertSeoLength } from "@/lib/seo";
import { processSteps } from "@/lib/data/content";

export const revalidate = 300;

const TITLE = "Services — Ads, SEO, Social & Web";
const DESCRIPTION =
  "Explore Creativoxa's services: Google Ads, Meta Ads, SEO, social media management, website development, local marketing and full digital management.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
};

assertSeoLength(TITLE, DESCRIPTION);

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([getServices(), getServiceCategories()]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
          <Reveal className="mt-6 max-w-3xl">
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
      {services.length > 0 ? (
        <section className="py-16 lg:py-20">
          <Container>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Core services
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Each has a dedicated page with our approach, deliverables and FAQs.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={service.id} delay={(i % 3) * 50}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <article className="card card-hover flex h-full flex-col p-6">
                      {service.category_label ? (
                        <p className="text-xs font-medium uppercase tracking-widest text-primary">
                          {service.category_label}
                        </p>
                      ) : null}
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
                        {service.short_title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                        {service.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        Explore {service.short_title}
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
      ) : null}

      {/* Full capability matrix */}
      {categories.length > 0 ? (
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
              {categories.map((category, i) => {
                const items = services.filter((service) => service.category_id === category.id);
                return (
                  <Reveal key={category.id} delay={(i % 3) * 50}>
                    <div className="card h-full p-6">
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {category.label}
                      </h3>
                      {category.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {category.description}
                        </p>
                      ) : null}
                      {items.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                          {items.map((service) => (
                            <li key={service.id} className="flex items-start gap-2.5 text-sm text-muted">
                              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              <Link
                                href={`/services/${service.slug}`}
                                className="transition-colors hover:text-foreground"
                              >
                                {service.short_title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

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
            {processSteps.map((step) => (
              <li key={step.step} className="border-t border-line py-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-primary">{step.step}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{step.title}</h3>
                </div>
                <p className="mt-2 pl-9 text-sm leading-relaxed text-muted">{step.body}</p>
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
