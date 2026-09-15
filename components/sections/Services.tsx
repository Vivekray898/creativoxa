import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { serviceCategories } from "@/lib/data/services";

const categoryIcons: Record<string, Parameters<typeof Icon>[0]["name"]> = {
  "digital-advertising": "target",
  "search-local-growth": "search",
  "social-media": "users",
  "web-digital": "code",
  "business-digital-management": "headset",
};

export default function Services() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to build a stronger digital presence."
            description="Five areas of work, one coordinated plan. Start with what matters most now and expand as your business grows."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-6">
          {serviceCategories.map((category, i) => (
            <Reveal
              key={category.id}
              delay={i * 60}
              className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
            >
              <div className="card card-hover flex h-full flex-col p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon name={categoryIcons[category.id] ?? "globe"} className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {category.label}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {category.services.map((s) => (
                    <li key={s.name} className="flex items-start gap-2.5 text-sm text-muted">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {s.name}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link
                    href="/services"
                    className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    Discuss your needs →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <ArrowLink href="/services">See how we work across every service</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
