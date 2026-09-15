import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { whyPoints } from "@/lib/data/content";

export default function WhyCreativoxa() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Why Creativoxa"
                title="A partner, not another vendor."
                description="Plenty of people can run ads or post content. Few take responsibility for how the whole digital presence performs together."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {whyPoints.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 50}
                  className={`border-line p-0 py-6 sm:px-8 ${
                    i % 2 === 0 ? "sm:border-r sm:pl-0" : ""
                  } ${i < whyPoints.length - 2 ? "border-b" : ""} ${
                    i === 3 || i === 4 ? "sm:border-b sm:last:border-b-0" : ""
                  }`}
                >
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
