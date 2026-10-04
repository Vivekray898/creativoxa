import { Container, ButtonLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import type { HomeSectionProps } from "./types";

type FinalCTAProps = Partial<HomeSectionProps> & {
  href?: string;
  label?: string | null;
  secondary?: { href: string; label: string };
  title?: string | null;
  body?: string | null;
};

export default function FinalCTA({
  href = "/contact",
  label,
  secondary,
  title,
  body,
  settings,
}: FinalCTAProps) {
  // Precedence: explicit props (used by inner pages) → CMS homepage copy →
  // built-in default, so every page always renders something sensible.
  const heading = title ?? settings?.final_cta_title ?? "Let's work out what your business actually needs.";
  const description =
    body ??
    settings?.final_cta_description ??
    "Tell us where your business is, what you're trying to achieve, and where your digital presence stands today. We'll come back with a practical recommendation — what we'd do first, what it costs, and what to expect.";
  const ctaLabel = label ?? settings?.final_cta_label ?? "Start a Conversation";

  return (
    <section className="border-t border-line">
      <Container className="py-20 lg:py-28">
        <Reveal className="card mx-auto max-w-4xl px-6 py-12 text-center sm:px-12 lg:py-16">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={href} variant="primary">
              {ctaLabel}
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
