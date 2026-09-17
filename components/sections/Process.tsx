import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/lib/data/content";

export default function Process() {
  return (
    <section className="border-y border-line bg-gradient-to-b from-tint-blue/50 to-transparent py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="How we work"
            index="08"
            title="From first conversation to ongoing growth."
            description="A process simple enough to follow and disciplined enough to repeat. You always know what stage you're in and what happens next."
          />
          <ArrowLink href="/about" className="shrink-0">
            More about how we work
          </ArrowLink>
        </Reveal>

        {/* Connected timeline: a continuous line on desktop, numbered nodes on mobile */}
        <div className="relative mt-14 lg:mt-16">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block"
          />
          <ol className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 70} as="li" className="relative">
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-bold text-primary shadow-card">
                    {s.step}
                  </span>
                  <div className="lg:mt-5">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
