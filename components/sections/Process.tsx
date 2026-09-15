import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/lib/data/content";

export default function Process() {
  return (
    <section className="border-y border-line bg-surface py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title="From first conversation to ongoing growth."
            description="A process simple enough to follow and disciplined enough to repeat. You always know what stage you're in and what happens next."
          />
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {processSteps.map((s, i) => (
            <Reveal
              key={s.step}
              delay={i * 50}
              as="li"
              className="group border-t border-line py-7"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-semibold text-primary">{s.step}</span>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 pl-10 text-sm leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
