import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { getTestimonials } from "@/lib/cms/queries";
import type { HomeSectionProps } from "./types";

/**
 * Renders nothing at all until real testimonials exist in the CMS.
 * No placeholder quotes, no invented clients — an empty section simply
 * disappears from the page.
 */
export default async function Testimonials({ index }: HomeSectionProps) {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Client feedback"
            index={index}
            title="What clients say about working with us."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={(i % 3) * 50}>
              <figure className="card flex h-full flex-col p-6">
                <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  {testimonial.photo_url ? (
                    <Image
                      src={testimonial.photo_url}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : null}
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </span>
                    {[testimonial.role, testimonial.company].filter(Boolean).length > 0 ? (
                      <span className="block text-xs text-faint">
                        {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                      </span>
                    ) : null}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
