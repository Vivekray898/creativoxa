import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import FinalCTA from "@/components/sections/FinalCTA";
import { getServicePage, servicePages } from "@/lib/data/services";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { whyPoints } from "@/lib/data/content";

export const metadataBase = new URL(site.url);

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const otherServices = servicePages.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
              <Link href="/services" className="transition-colors hover:text-foreground">
                Services
              </Link>
              <span className="mx-2 text-faint">/</span>
              <span className="text-foreground">{service.shortTitle}</span>
            </nav>
            <p className="eyebrow mb-4">{service.categoryLabel}</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {service.heroHeadline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {service.heroSubline}
            </p>
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
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow mb-4">The problem</p>
              <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
                {service.problem.title}
              </h2>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {service.problem.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="border-y border-line bg-surface py-16 lg:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              The work, in concrete terms.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {service.whatWeDo.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 60}>
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

      {/* How it works */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A predictable process, month after month.
            </h2>
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.howItWorks.map((step) => (
              <li key={step.step} className="border-t border-line py-6">
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

      {/* Deliverables + Who it's for */}
      <section className="border-y border-line bg-surface py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-7">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  What&apos;s included
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-muted">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card h-full p-7">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Who it&apos;s for
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.whoItsFor.map((w) => (
                    <li key={w} className="flex items-start gap-3 text-sm text-muted">
                      <Icon name="arrowRight" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

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
            {whyPoints.slice(0, 3).map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 50}>
                <div className="border-t-2 border-primary pt-4">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
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
              {service.faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  open={i === 0}
                  className="group border-b border-line py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <Icon
                      name="plus"
                      className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Other services */}
      <section className="py-14">
        <Container>
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-faint">
              Other services
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card card-hover p-5"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                  {s.categoryLabel}
                </p>
                <p className="mt-1.5 font-semibold tracking-tight text-foreground">
                  {s.shortTitle}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA
        title={`Ready to talk about ${service.shortTitle.toLowerCase()} for your business?`}
        body="Send an enquiry with a little context about your business. We'll reply with honest next steps — even if that's advice on doing it yourself."
        label="Send an Enquiry"
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
