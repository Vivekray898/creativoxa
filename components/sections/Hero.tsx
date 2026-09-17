import { ButtonLink, Container } from "@/components/ui/primitives";
import Icon from "@/components/ui/Icon";

// Illustrative UI only — explicitly labeled as a composition, never real metrics.
const consoleRows = [
  { icon: "search" as const, label: "Search", detail: "Ads · SEO · Maps", tone: "text-amber", tile: "bg-tint-amber" },
  { icon: "megaphone" as const, label: "Meta", detail: "Ads · Social", tone: "text-accent-2", tile: "bg-tint-sky" },
  { icon: "monitor" as const, label: "Website", detail: "Fast · Clear", tone: "text-accent", tile: "bg-tint-violet" },
  { icon: "pin" as const, label: "Listings", detail: "GBP · IndiaMART", tone: "text-mint", tile: "bg-tint-mint" },
];

const consoleMetrics = [
  { icon: "cursor" as const, label: "Visitors" },
  { icon: "phone" as const, label: "Calls" },
  { icon: "inbox" as const, label: "Enquiries" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* quiet structural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 [mask-image:radial-gradient(ellipse_75%_65%_at_35%_0%,black,transparent)]"
      />

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Digital growth partner</p>
            <h1 className="display-xl max-w-2xl text-balance">
              Digital marketing that turns attention into business.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Creativoxa plans and manages your advertising, search presence, social media,
              website and listings as one connected system — so a customer who finds you once
              finds a business worth contacting.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="primary">
                Start a Project
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                Explore Our Services
              </ButtonLink>
            </div>
            <p className="mt-7 text-sm text-faint">
              Based in Siliguri, working with businesses across India.
            </p>
          </div>

          {/* Illustrative channel console — clearly labeled UI, not client data */}
          <div className="lg:col-span-5" aria-hidden="true">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="card relative z-10 overflow-hidden p-5 shadow-card">
                {/* header */}
                <div className="flex items-center justify-between border-b border-line pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-tint-coral" />
                    <span className="h-2.5 w-2.5 rounded-full bg-tint-amber" />
                    <span className="h-2.5 w-2.5 rounded-full bg-tint-mint" />
                  </div>
                  <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-faint">
                    Illustrative
                  </span>
                </div>

                {/* channel rows */}
                <div className="mt-4 space-y-2.5">
                  {consoleRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 rounded-xl border border-line bg-background p-2.5 transition-colors hover:border-line-strong"
                    >
                      <span className={`icon-tile h-9 w-9 ${row.tile} ${row.tone}`}>
                        <Icon name={row.icon} className="h-4.5 w-4.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{row.label}</p>
                        <p className="truncate text-xs text-muted">{row.detail}</p>
                      </div>
                      <span className="flex h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
                    </div>
                  ))}
                </div>

                {/* activity bar */}
                <div className="mt-4 rounded-xl border border-line bg-surface-2/60 p-3.5">
                  <div className="flex items-end justify-between gap-1.5" aria-hidden="true">
                    {[38, 55, 42, 68, 50, 76, 60, 88, 72].map((h, i) => (
                      <span
                        key={i}
                        className="w-full rounded-t-sm bg-primary/25 last:bg-primary/70"
                        style={{ height: `${h * 0.5}px` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    {consoleMetrics.map((m) => (
                      <span
                        key={m.label}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted"
                      >
                        <Icon name={m.icon} className="h-3.5 w-3.5 text-primary" />
                        {m.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* accent card behind — layered depth */}
              <div
                className="absolute -bottom-5 -right-3 -z-0 h-24 w-40 rounded-2xl border border-line bg-gradient-to-br from-tint-sky to-tint-violet sm:-right-5"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
