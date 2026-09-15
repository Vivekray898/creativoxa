import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function WhatWeDo() {
  return (
    <section className="border-b border-line">
      <Container className="py-16 lg:py-20">
        <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <p className="text-2xl font-medium leading-snug tracking-tight text-foreground lg:col-span-8 lg:text-[1.7rem]">
            Creativoxa is a <span className="text-primary">digital growth partner</span>. We plan
            and manage the moving parts of your online presence — advertising, search, social,
            website, listings — so they work as one system that attracts the right audience and
            turns attention into enquiries.
          </p>
          <div className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            <p className="text-sm leading-relaxed text-muted">
              Strategy + Creative + Technology + Marketing — applied in the proportions your
              business actually needs, not the package someone wants to sell.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
