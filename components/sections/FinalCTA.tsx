import { Container, ButtonLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

type FinalCTAProps = {
  href?: string;
  label?: string;
  secondary?: { href: string; label: string };
  title?: string;
  body?: string;
};

export default function FinalCTA({
  href = "/contact",
  label = "Start a Project",
  secondary,
  title = "Have a project in mind?",
  body = "Tell us what you're working on. We'll come back with practical next steps — what we'd do first, what it costs, and what to expect.",
}: FinalCTAProps) {
  return (
    <section className="border-t border-line">
      <Container className="py-20 lg:py-28">
        <Reveal className="card mx-auto max-w-4xl px-6 py-12 text-center sm:px-12 lg:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">{body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={href} variant="primary">
              {label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="outline">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
