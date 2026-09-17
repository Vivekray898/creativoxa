import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

const problems = [
  { icon: "chart" as const, text: "Getting traffic, but not enough enquiries", tint: "bg-tint-coral", tone: "text-coral" },
  { icon: "cursor" as const, text: "Running ads without a clear strategy", tint: "bg-tint-amber", tone: "text-amber" },
  { icon: "search" as const, text: "Weak visibility on Google and Maps", tint: "bg-tint-sky", tone: "text-accent-2" },
  { icon: "megaphone" as const, text: "Social media that starts, stops and starts again", tint: "bg-tint-violet", tone: "text-accent" },
  { icon: "inbox" as const, text: "Leads arriving but slipping through the cracks", tint: "bg-tint-mint", tone: "text-mint" },
  { icon: "monitor" as const, text: "A website that no longer reflects the business", tint: "bg-tint-blue", tone: "text-primary" },
  { icon: "refresh" as const, text: "Too many platforms, too little coordination", tint: "bg-tint-amber", tone: "text-amber" },
  { icon: "puzzle" as const, text: "No one accountable for how it all works together", tint: "bg-tint-coral", tone: "text-coral" },
];

export default function Problems() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Problems we solve"
            index="04"
            title="Your marketing shouldn't feel disconnected."
            description="Most businesses don't have a marketing problem — they have a connection problem. Sound familiar?"
            align="center"
          />
        </Reveal>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16">
          {problems.map((p, i) => (
            <Reveal key={p.text} delay={i * 40} as="li">
              <div className="group flex h-full items-center gap-3.5 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong">
                <span className={`icon-tile h-9 w-9 shrink-0 ${p.tint} ${p.tone}`}>
                  <Icon name={p.icon} className="h-4.5 w-4.5" />
                </span>
                <p className="text-sm font-medium leading-snug text-foreground">{p.text}</p>
                <Icon
                  name="close"
                  className="ml-auto h-3.5 w-3.5 shrink-0 text-faint/60 transition-colors group-hover:text-coral"
                />
              </div>
            </Reveal>
          ))}
        </ul>

        {/* The bridge — problems on the left, the system on the right */}
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div className="relative rounded-2xl border border-line bg-surface p-7 sm:p-9">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:block"
            />
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="col-label">Sound familiar?</p>
                <p className="mt-3 text-lg font-medium leading-snug text-muted">
                  Every one of these is a symptom of the same thing: pieces built separately,
                  managed separately, measured separately.
                </p>
              </div>
              <div className="lg:border-l lg:border-line lg:pl-8">
                <p className="col-label">How Creativoxa connects the pieces</p>
                <p className="mt-3 text-lg font-semibold leading-snug text-foreground">
                  One plan across every channel.{" "}
                  <span className="text-primary">One partner accountable for the whole picture.</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
