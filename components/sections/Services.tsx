import Link from "next/link";
import { Container, SectionHeading, ArrowLink, AccentText } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { getServiceCategories, getServices } from "@/lib/cms/queries";
import type { ServiceRow } from "@/types/cms";
import type { HomeSectionProps } from "./types";

const DEFAULT_TITLE = "Everything you need to build a *stronger digital presence.*";

// Tints cycle by position so each category has its own identity without adding
// new colours to the palette.
const tints = [
  { tile: "bg-tint-amber", tone: "text-amber" },
  { tile: "bg-tint-sky", tone: "text-accent-2" },
  { tile: "bg-tint-coral", tone: "text-coral" },
  { tile: "bg-tint-violet", tone: "text-accent" },
  { tile: "bg-tint-mint", tone: "text-mint" },
  { tile: "bg-tint-blue", tone: "text-primary" },
];

type Group = {
  id: string;
  label: string;
  description: string | null;
  href: string;
  cta: string;
  icon: IconName;
  items: ServiceRow[];
  featured: boolean;
};

function iconName(service: ServiceRow | undefined): IconName {
  return (service?.icon || "layers") as IconName;
}

export default async function Services({ index, title, description }: HomeSectionProps) {
  const [services, categories] = await Promise.all([getServices(), getServiceCategories()]);

  const groups: Group[] = categories.map((category) => {
    const items = services.filter((service) => service.category_id === category.id);
    const lead = items[0];
    return {
      id: category.id,
      label: category.label,
      description: category.description,
      href: lead ? `/services/${lead.slug}` : "/services",
      cta: lead ? `Explore ${lead.short_title}` : "Compare all services",
      icon: iconName(lead),
      items,
      featured: items.some((service) => service.featured),
    };
  });

  // Services saved without a category still appear, so nothing is invisible
  // simply because it was filed loosely.
  const uncategorised = services.filter(
    (service) => !service.category_id || !categories.some((c) => c.id === service.category_id)
  );
  if (uncategorised.length > 0) {
    groups.push({
      id: "uncategorised",
      label: "More services",
      description: null,
      href: uncategorised[0] ? `/services/${uncategorised[0].slug}` : "/services",
      cta: uncategorised[0] ? `Explore ${uncategorised[0].short_title}` : "Compare all services",
      icon: iconName(uncategorised[0]),
      items: uncategorised,
      featured: false,
    });
  }

  if (groups.length === 0) return null;

  const featuredIndex = groups.findIndex((group) => group.featured);
  const featuredAt = featuredIndex === -1 ? -1 : featuredIndex;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            index={index}
            title={<AccentText text={title || DEFAULT_TITLE} />}
            description={description ?? undefined}
          />
          <ArrowLink href="/services" className="shrink-0">
            Compare all services
          </ArrowLink>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {groups.map((group, i) => {
            const tint = tints[i % tints.length];
            const isFeatured = i === featuredAt;
            return (
              <Reveal
                key={group.id}
                delay={i * 60}
                className={isFeatured ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <Link href={group.href} className="group block h-full">
                  <article
                    className={`card card-hover relative flex h-full flex-col overflow-hidden p-6 ${
                      isFeatured
                        ? "border-primary/25 bg-gradient-to-br from-tint-blue via-surface to-surface sm:flex-row sm:items-center sm:gap-8 sm:p-8"
                        : ""
                    }`}
                  >
                    {isFeatured ? (
                      <span className="absolute right-5 top-5 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        Featured
                      </span>
                    ) : null}

                    <span
                      className={`icon-tile mb-5 h-14 w-14 shrink-0 ${tint.tile} ${tint.tone} ${
                        isFeatured ? "sm:mb-0 sm:h-20 sm:w-20" : ""
                      }`}
                    >
                      <Icon name={group.icon} className={isFeatured ? "h-9 w-9" : "h-6.5 w-6.5"} />
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-xs font-semibold tabular-nums text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`font-display mt-1 font-bold tracking-tight text-foreground ${
                          isFeatured ? "text-2xl sm:text-[1.7rem]" : "text-lg"
                        }`}
                      >
                        {group.label}
                      </h3>
                      {group.description ? (
                        <p className="mt-2.5 text-sm leading-relaxed text-muted">
                          {group.description}
                        </p>
                      ) : null}

                      {group.items.length > 0 ? (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {group.items.map((service) => (
                            <li
                              key={service.id}
                              className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted"
                            >
                              {service.short_title}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <span className="mt-5 inline-flex items-center gap-2 pt-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        {group.cta}
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
      </Container>
    </section>
  );
}
