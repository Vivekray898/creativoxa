import { Container, SectionHeading, ButtonLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { industries } from "@/lib/data/content";

// Rotating tint palette — every industry gets its own visual identity without
// inventing new colors. Tints cycle through the accent system.
const tileStyles = [
  { tile: "bg-tint-amber", tone: "text-amber" },
  { tile: "bg-tint-sky", tone: "text-accent-2" },
  { tile: "bg-tint-violet", tone: "text-accent" },
  { tile: "bg-tint-mint", tone: "text-mint" },
  { tile: "bg-tint-coral", tone: "text-coral" },
  { tile: "bg-tint-blue", tone: "text-primary" },
];

const icons = ["building", "heart", "graduation", "briefcase", "users", "monitor"] as const;

export default function Industries() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who we work with"
            index="11"
            title="Different businesses. Different digital strategies."
            description="We don't claim to be specialists in every industry. We claim something more useful: we take the time to understand how your business wins customers — then build the digital presence around that."
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
          {industries.map((ind, i) => {
            const style = tileStyles[i % tileStyles.length];
            return (
              <Reveal key={ind.name} delay={(i % 5) * 40} as="li">
                <div className="group h-full rounded-xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card">
                  <span className={`icon-tile h-10 w-10 ${style.tile} ${style.tone}`}>
                    <Icon name={icons[i % icons.length]} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3.5 text-sm font-semibold tracking-tight text-foreground">
                    {ind.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{ind.note}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-sm text-muted">
            Don&apos;t see your industry? The approach travels — tell us how your business wins
            customers.
          </p>
          <ButtonLink href="/contact" variant="outline">
            Discuss Your Business
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
