import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/lib/data/projects";

export default function Work() {
  const [featured, ...rest] = projects;
  const supporting = rest.slice(0, 4);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            index="06"
            title="Digital work for real businesses."
            description="Every project below is live. Each started with a business problem — visibility, enquiries, or a website that wasn't pulling its weight."
          />
          <ArrowLink href="/work" className="shrink-0">
            View all work
          </ArrowLink>
        </Reveal>

        {/* Featured project */}
        <Reveal className="mt-12 lg:mt-16">
          <Link href={`/work/${featured.slug}`} className="group block">
            <article className="card card-hover overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 border-b border-line bg-surface-2 sm:h-80 lg:h-auto lg:min-h-[380px] lg:border-b-0 lg:border-r">
                  <Image
                    src={featured.screenshot}
                    alt={`${featured.name} website`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="eyebrow">Featured project</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {featured.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-faint">
                    {featured.industry}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {featured.description}
                  </p>
                  <p className="mt-5 flex flex-wrap gap-1.5">
                    {featured.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </p>
                  <p className="mt-7 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    View the project →
                  </p>
                </div>
              </div>
            </article>
          </Link>
        </Reveal>

        {/* Supporting projects */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supporting.map((project, i) => (
            <Reveal key={project.slug} delay={i * 50}>
              <Link href={`/work/${project.slug}`} className="group block h-full">
                <article className="card card-hover flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} website`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-faint">
                      {project.industry}
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {project.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
                      {project.description}
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
