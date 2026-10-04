import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import {
  getFaqs,
  getRelatedServices,
  getServiceBySlug,
  getServices,
  getSiteSettings,
} from "@/lib/cms/queries";
import { JsonLd, faqSchema, serviceSchema, assertSeoLength } from "@/lib/seo";
import { whyPoints } from "@/lib/data/content";
import type { ContentBlock, ProcessStep } from "@/types/cms";

export const revalidate = 300;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found", robots: { index: false, follow: true } };

  const title = service.seo_title || service.short_title;
  const description = service.seo_description || service.excerpt;
  assertSeoLength(title, description);

  const url = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function asBlocks(value: unknown): ContentBlock[] {
  return Array.isArray(value) ? (value as ContentBlock[]) : [];
}

function asSteps(value: unknown): ProcessStep[] {
  return Array.isArray(value) ? (value as ProcessStep[]) : [];
}

function asStrings(value: unknown): string[] {
  return Array.isArray(value) ? (value as string[]).filter((item) => typeof item === "string") : [];
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [faqs, related, settings] = await Promise.all([
    getFaqs({ serviceId: service.id }),
    getRelatedServices(slug),
    getSiteSettings(),
  ]);

  const whatWeDo = asBlocks(service.what_we_do);
  const howItWorks = asSteps(service.how_it_works);
  const deliverables = asStrings(service.deliverables);
  const whoItsFor = asStrings(service.who_its_for);

  return (
    <>
      {faqs.length > 0 ? <JsonLd data={faqSchema(faqs)} /> : null}
      <JsonLd data={serviceSchema(service, settings)} />

      {/* Hero */}
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <Breadcrumbs
              className="mb-6"
              items={[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: service.short_title, path: `/services/${service.slug}` },
              ]}
            />
            {service.category_label ? (
              <p className="eyebrow mb-4">{service.category_label}</p>
            ) : null}
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {service.hero_headline || service.short_title}
            </h1>
            {service.hero_subline ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {service.hero_subline}
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="primary">
                Discuss This Service
              </ButtonLink>
              <ButtonLink href="/work" variant="outline">
                See Our Work
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Problem */}
      {service.problem_title ? (
        <section className="py-16 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="eyebrow mb-4">The problem</p>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
                  {service.problem_title}
                </h2>
              </Reveal>
              {service.problem_body ? (
                <Reveal delay={80} className="lg:col-span-7">
                  <p className="text-base leading-relaxed text-muted sm:text-lg">
                    {service.problem_body}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* What we do */}
      {whatWeDo.length > 0 ? (
        <section className="border-y border-line bg-surface py-16 lg:py-20">
          <Container>
            <Reveal>
              <p className="eyebrow mb-4">What we do</p>
              <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                The work, in concrete terms.
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {whatWeDo.map((item, i) => (
                <Reveal key={`${item.title}-${i}`} delay={(i % 2) * 60}>
                  <div className="card h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-xs font-semibold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3.5 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* How it works */}
      {howItWorks.length > 0 ? (
        <section className="py-16 lg:py-20">
          <Container>
            <Reveal>
              <p className="eyebrow mb-4">How it works</p>
              <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                A predictable process, month after month.
              </h2>
            </Reveal>
            <ol className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, i) => (
                <li key={`${step.step}-${i}`} className="border-t border-line py-6">
                  <span className="text-sm font-semibold text-primary">{step.step}</span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      {/* Deliverables + Who it's for */}
      {deliverables.length > 0 || whoItsFor.length > 0 ? (
        <section className="border-y border-line bg-surface py-16 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {deliverables.length > 0 ? (
                <Reveal>
                  <div className="card h-full p-7">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      What&apos;s included
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-muted">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}
              {whoItsFor.length > 0 ? (
                <Reveal delay={80}>
                  <div className="card h-full p-7">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      Who it&apos;s for
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {whoItsFor.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-muted">
                          <Icon name="arrowRight" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Why Creativoxa for this */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">Why Creativoxa</p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What you get that a freelancer marketplace won&apos;t give you.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.slice(0, 3).map((point, i) => (
              <Reveal key={point.title} delay={(i % 3) * 50}>
                <div className="border-t-2 border-primary pt-4">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {faqs.length > 0 ? (
        <section className="border-t border-line bg-surface py-16 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className="eyebrow mb-4">FAQ</p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Common questions
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Something we haven&apos;t covered? Ask directly — we answer honestly.
                </p>
                <div className="mt-5">
                  <ArrowLink href="/contact">Ask a question</ArrowLink>
                </div>
              </Reveal>
              <div className="lg:col-span-8">
                {faqs.map((faq, i) => (
                  <details key={faq.id} open={i === 0} className="group border-b border-line py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <Icon
                        name="plus"
                        className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45"
                      />
                    </summary>
                    <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Other services */}
      {related.length > 0 ? (
        <section className="py-14">
          <Container>
            <Reveal>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-faint">
                Other services
              </h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((other) => (
                <Link key={other.id} href={`/services/${other.slug}`} className="card card-hover p-5">
                  {other.category_label ? (
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      {other.category_label}
                    </p>
                  ) : null}
                  <p className="mt-1.5 font-semibold tracking-tight text-foreground">
                    {other.short_title}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <FinalCTA
        title={`Ready to talk about ${service.short_title.toLowerCase()} for your business?`}
        body="Send an enquiry with a little context about your business. We'll reply with honest next steps — even if that's advice on doing it yourself."
        label="Send an Enquiry"
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
