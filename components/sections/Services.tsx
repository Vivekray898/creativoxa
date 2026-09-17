import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { serviceCategories } from "@/lib/data/services";

// Visual identity per category — icon + tint create scannable variety while
// staying inside the palette. Deep links go to the closest service page.
const categoryLinks: Record<
  string,
  { href: string; label: string; icon: "cursor" | "search" | "users" | "code" | "briefcase"; tint: string; tone: string }
> = {
  "digital-advertising": {
    href: "/services/digital-marketing",
    label: "Explore Digital Advertising",
    icon: "cursor",
    tint: "bg-tint-amber",
    tone: "text-amber",
  },
  "search-local-growth": {
    href: "/services/seo",
    label: "Explore Search & Local",
    icon: "search",
    tint: "bg-tint-sky",
    tone: "text-accent-2",
  },
  "social-media": {
    href: "/services/social-media",
    label: "Explore Social Media",
    icon: "users",
    tint: "bg-tint-coral",
    tone: "text-coral",
  },
  "web-digital": {
    href: "/services/web-development",
    label: "Explore Web & Digital",
    icon: "code",
    tint: "bg-tint-violet",
    tone: "text-accent",
  },
  "business-digital-management": {
    href: "/services/digital-marketing",
    label: "Discuss Your Requirements",
    icon: "briefcase",
    tint: "bg-tint-mint",
    tone: "text-mint",
  },
};

export default function Services() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            index="02"
            title={
              <>
                Everything you need to build a{" "}
                <span className="text-primary">stronger digital presence.</span>
              </>
            }
            description="Five areas of work, planned as one system. Start with what matters most now — expand as the business grows."
          />
          <ArrowLink href="/services" className="shrink-0">
            Compare all services
          </ArrowLink>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {serviceCategories.map((category, i) => {
            const link = categoryLinks[category.id];
            return (
              <Reveal key={category.id} delay={i * 60} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                <Link href={link?.href ?? "/services"} className="group block h-full">
                  <article
                    className={`card card-hover relative flex h-full flex-col overflow-hidden p-6 ${
                      i === 0 ? "border-primary/25 bg-gradient-to-br from-tint-blue via-surface to-surface sm:flex-row sm:items-center sm:gap-8 sm:p-8" : ""
                    }`}
                  >
                    {i === 0 && (
                      <span className="absolute right-5 top-5 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        Most requested
                      </span>
                    )}

                    <span
                      className={`icon-tile mb-5 h-14 w-14 shrink-0 ${link?.tint ?? "bg-tint-blue"} ${
                        link?.tone ?? "text-primary"
                      } ${i === 0 ? "sm:mb-0 sm:h-20 sm:w-20" : ""}`}
                    >
                      <Icon name={link?.icon ?? "bolt"} className={i === 0 ? "h-9 w-9" : "h-6.5 w-6.5"} />
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-xs font-semibold tabular-nums text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`font-display mt-1 font-bold tracking-tight text-foreground ${
                          i === 0 ? "text-2xl sm:text-[1.7rem]" : "text-lg"
                        }`}
                      >
                        {category.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {category.description}
                      </p>

                      <ul className={`mt-4 flex flex-wrap gap-1.5 ${i === 0 ? "" : ""}`}>
                        {category.services.slice(0, i === 0 ? 6 : 4).map((s) => (
                          <li
                            key={s.name}
                            className="rounded-full border border-line bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted"
                          >
                            {s.name}
                          </li>
                        ))}
                        {category.services.length > (i === 0 ? 6 : 4) && (
                          <li className="rounded-full border border-line bg-background px-2.5 py-0.5 text-[11px] font-medium text-faint">
                            +{category.services.length - (i === 0 ? 6 : 4)} more
                          </li>
                        )}
                      </ul>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {link?.label ?? "Explore Services"}
                        <Icon
                          name="arrowRight"
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-10 text-center">
          <ArrowLink href="/services">See how we work across every service</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
