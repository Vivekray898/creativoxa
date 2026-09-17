import { Container } from "@/components/ui/primitives";
import Icon from "@/components/ui/Icon";

// The channels where the work happens — an active marquee adds life without
// a single fabricated claim. Duplicated array = seamless loop.
const platforms = [
  { name: "Google", icon: "search" as const, tone: "text-amber", tile: "bg-tint-amber" },
  { name: "Meta", icon: "megaphone" as const, tone: "text-accent-2", tile: "bg-tint-sky" },
  { name: "Instagram", icon: "heart" as const, tone: "text-coral", tile: "bg-tint-coral" },
  { name: "WhatsApp Business", icon: "whatsapp" as const, tone: "text-mint", tile: "bg-tint-mint" },
  { name: "Google Business Profile", icon: "pin" as const, tone: "text-accent", tile: "bg-tint-violet" },
  { name: "IndiaMART", icon: "briefcase" as const, tone: "text-accent-2", tile: "bg-tint-sky" },
  { name: "Google Ads", icon: "cursor" as const, tone: "text-amber", tile: "bg-tint-amber" },
  { name: "Meta Ads", icon: "funnel" as const, tone: "text-accent", tile: "bg-tint-violet" },
];

export default function TrustStrip() {
  const items = [...platforms, ...platforms];

  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-8">
        <p className="eyebrow justify-center text-center">
          <span className="text-faint">01</span>
          The channels we manage every day
        </p>
        <div className="marquee relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="marquee-track items-center gap-10 pr-10">
            {items.map((p, i) => (
              <li
                key={`${p.name}-${i}`}
                aria-hidden={i >= platforms.length}
                className="flex shrink-0 items-center gap-2.5"
              >
                <span className={`icon-tile h-8 w-8 ${p.tile} ${p.tone}`}>
                  <Icon name={p.icon} className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-muted">
                  {p.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
