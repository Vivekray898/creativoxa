import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/lib/data/projects";

export default function Work() {
  const featured = projects.slice(0, 6);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Digital work for real businesses."
            description="A selection of projects we've delivered. Each one started with a business problem — visibility, enquiries or a website that wasn't pulling its weight."
          />
          <ArrowLink href="/work" className="shrink-0">View all work</ArrowLink>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 50}>
              <Link href={`/work/${project.slug}`} className="group block h-full">
                <article className="card card-hover flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} website`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-medium uppercase tracking-widest text-faint">
                      {project.industry}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <p className="mt-4 flex flex-wrap gap-1.5 pt-1">
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
  );
}
