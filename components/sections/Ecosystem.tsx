import { Container, ButtonLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

const nodes = [
  { label: "Website", icon: "code" as const, note: "The hub: fast, clear, trustworthy" },
  { label: "Google", icon: "search" as const, note: "Search & Maps visibility" },
  { label: "Meta", icon: "megaphone" as const, note: "Ads & social presence" },
  { label: "Social", icon: "users" as const, note: "Content & community" },
  { label: "Listings", icon: "map" as const, note: "GBP, IndiaMART, directories" },
  { label: "Enquiries", icon: "inbox" as const, note: "Calls, forms, messages" },
  { label: "Follow-up", icon: "headset" as const, note: "Response & lead handling" },
  { label: "Growth", icon: "chart" as const, note: "Measured, compounding results" },
];

export default function Ecosystem() {
  return (
    <section className="border-y border-ink bg-ink py-20 text-ink-foreground lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="text-ink-faint">10</span>
            The bigger picture
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-ink-foreground sm:text-4xl">
            Your digital presence is a chain.{" "}
            <span className="bg-gradient-to-r from-sky-400 via-primary to-violet-400 bg-clip-text text-transparent">
              It performs at its weakest link.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
            Ads feed the website. The website feeds enquiries. Listings feed trust. We manage the
            chain as a whole — because fixing one link while ignoring the rest wastes the money
            you spend on all of them.
          </p>
        </Reveal>

        {/* Flow */}
        <Reveal className="mt-12 lg:mt-16">
          <ol className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nodes.map((n, i) => (
              <li
                key={n.label}
                className="group relative rounded-[10px] border border-ink-line bg-ink-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-line-strong"
              >
                {/* connector (desktop) */}
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-ink-faint lg:block"
                  >
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </span>
                )}
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-accent-soft text-primary">
                    <Icon name={n.icon} className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-ink-foreground">{n.label}</p>
                  <span className="ml-auto text-[10px] font-medium text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{n.note}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <ButtonLink href="/contact" variant="primary">
            Discuss Your Business
          </ButtonLink>
          <p className="mt-4 text-sm text-ink-faint">
            A conversation first — no obligation, no jargon.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
