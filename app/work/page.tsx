import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work — Websites & Digital Projects",
  description:
    "A selection of websites and digital projects delivered by Creativoxa for businesses in tourism, e-commerce, real estate, hospitality and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Selected work</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Websites and digital projects for real businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Every project below is live and serving a real business. They share one brief: present
              the business credibly and make contacting it effortless.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 50}>
                <Link href={`/work/${project.slug}`} className="group block h-full">
                  <article className="card card-hover flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} website`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-medium uppercase tracking-widest text-faint">
                          {project.industry}
                        </p>
                        <ArrowLink href={`/work/${project.slug}`} className="text-xs">
                          View Project
                        </ArrowLink>
                      </div>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
                        {project.name}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>
                      <p className="mt-4 flex flex-wrap gap-1.5">
                        {project.services.map((s) => (
                          <span
                            key={s}
                            className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA
        title="Want results like these for your business?"
        body="Tell us about your business and what you need — a website, campaigns, or a partner to manage the whole picture."
        label="Start a Project"
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
