import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { outcomes } from "@/lib/data/content";

export default function Outcomes() {
  return (
    <section className="border-y border-line bg-surface py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How we help"
            index="05"
            title="The outcome is the point."
            description="Services only matter for what they produce. Here's the chain we build for every client — from visibility to steady growth."
          />
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {outcomes.map((o, i) => (
            <li key={o.title} className="bg-surface">
              <Reveal delay={i * 50} className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon name={o.icon} className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{o.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
