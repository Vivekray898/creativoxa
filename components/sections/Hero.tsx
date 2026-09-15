import { ButtonLink, Container } from "@/components/ui/primitives";

const capabilities = [
  { label: "Google Ads", detail: "Search & PMax" },
  { label: "Meta Ads", detail: "Facebook · Instagram" },
  { label: "SEO", detail: "Search & local" },
  { label: "Social", detail: "Content & publishing" },
  { label: "Website", detail: "Fast & conversion-focused" },
  { label: "Listings", detail: "GBP · IndiaMART" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* quiet structural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,black,transparent)]"
      />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Digital growth partner</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.9rem]">
              Digital marketing built around real business growth.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              We help businesses strengthen their digital presence through strategy, advertising,
              content, websites and ongoing digital management — planned as one system, measured by
              the enquiries it produces.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="primary">
                Start a Project
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                Explore Our Services
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-faint">
              Based in Siliguri, working with businesses across India.
            </p>
          </div>

          {/* Capability composition — communicates MARKETING + CREATIVE + DIGITAL */}
          <div className="lg:col-span-5">
            <div className="card relative p-2">
              <div className="rounded-[10px] border border-line bg-surface-2/60 p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-faint">
                    What we manage
                  </p>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Active
                  </span>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {capabilities.map((c) => (
                    <li
                      key={c.label}
                      className="rounded-lg border border-line bg-surface p-3 transition-colors hover:border-line-strong"
                    >
                      <p className="text-sm font-semibold text-foreground">{c.label}</p>
                      <p className="mt-0.5 text-xs text-faint">{c.detail}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2.5">
                  <p className="text-xs text-muted">Search → Ad → Website → Enquiry</p>
                  <span className="rounded bg-primary-soft px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    One system
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
