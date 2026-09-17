import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

const models = [
  {
    name: "Focused project",
    body: "One website, one campaign, one clear requirement — delivered to a fixed scope and a fixed price.",
  },
  {
    name: "Ongoing management",
    body: "Continuous management of specific channels — ads, social, SEO or listings — month to month, with clear reporting.",
  },
  {
    name: "Growth partner",
    body: "Multiple channels managed together as one program: the full digital presence, planned and maintained as a system.",
  },
];

export default function WaysToWork() {
  return (
    <section className="border-t border-line">
      <Container className="py-16 lg:py-20">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Ways to work together"
              index="07"
              title="Engagements that fit the stage of your business."
            />
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {models.map((m) => (
                <div key={m.name} className="bg-background p-6">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {m.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{m.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-faint">
              Every engagement starts with the same conversation — what the business needs, and
              what it will take to get there.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
