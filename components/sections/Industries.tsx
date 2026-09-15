import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { industries } from "@/lib/data/content";

export default function Industries() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who we work with"
            title="We adapt our strategy to the way your business actually operates."
            description="We don't claim to be specialists in every industry. We claim something more useful: we take the time to understand how your business wins customers — then build the digital presence around that."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:border-t lg:border-line">
          {industries.map((ind, i) => (
            <Reveal
              key={ind.name}
              delay={(i % 5) * 40}
              className="border-b border-line px-0 py-5 sm:px-6 lg:px-5 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:nth-child(5n+1))]:border-l"
            >
              <h3 className="text-sm font-semibold tracking-tight text-foreground">{ind.name}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{ind.note}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
