import type { Metadata } from "next";
import { Container, ButtonLink, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { whyPoints, processSteps } from "@/lib/data/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Who We Are & How We Work",
  description:
    "Creativoxa is a digital marketing and growth partner based in Siliguri. Learn what we do, how we work, and why businesses choose us.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">About</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              A practical digital partner for growing businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Creativoxa exists because good businesses were being let down by their digital
              presence — not for lack of effort, but because the pieces were never built to work
              together.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Why we exist
                </h2>
                <p>
                  Most businesses don&apos;t suffer from a shortage of marketing options — they
                  suffer from fragmentation. One vendor runs ads, another built the website years
                  ago, social media stops and starts, the Google profile is half-finished, and
                  nobody is responsible for how it all works together.
                </p>
                <p>
                  Creativoxa was started in Siliguri to be the alternative: one partner that plans
                  the whole digital presence, executes it properly, and reports on it in terms a
                  business owner can act on. Sometimes that means building a website. Sometimes
                  it means running campaigns. Often it means managing all of it, month after
                  month.
                </p>
                <p>
                  We&apos;re a small, focused team by design. That keeps our work close to the
                  businesses we serve — and keeps us honest about what we can take on and do well.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-5">
              <div className="card p-7">
                <p className="col-label">At a glance</p>
                <dl className="mt-5 space-y-5">
                  {[
                    { k: "What we are", v: "A digital marketing & growth partner" },
                    { k: "Where we are", v: `${site.address.city}, ${site.address.region}, India` },
                    { k: "Who we serve", v: "Small & growing businesses across India" },
                    { k: "How we engage", v: "Projects or rolling monthly management" },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-faint">
                        {row.k}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">{row.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 border-t border-line pt-5">
                  <ArrowLink href="/work">See the work</ArrowLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="border-y border-line bg-surface py-16 lg:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">Our approach</p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What working with us actually means.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 50}>
                <div className="card card-hover h-full p-6">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">The process</p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Simple enough to follow. Disciplined enough to repeat.
            </h2>
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
        </Container>
      </section>

      {/* Location strip */}
      <section className="border-t border-line bg-surface py-14">
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Rooted in Siliguri, working across India.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                We understand local businesses because we work alongside them — and the same
                practical approach travels well to clients anywhere.
              </p>
            </div>
            <ButtonLink href="/contact" variant="primary" className="shrink-0">
              Start a Project
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <FinalCTA
        title="Sound like the kind of partner you're looking for?"
        body="Send us a short note about your business. If we're the right fit, we'll tell you how we'd start. If we're not, we'll say that too."
        label="Talk to Creativoxa"
        secondary={{ href: "/work", label: "View Our Work" }}
      />
    </>
  );
}
