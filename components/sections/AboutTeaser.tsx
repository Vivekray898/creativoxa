import { Container, ButtonLink, ArrowLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function AboutTeaser() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">About Creativoxa</p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
                Marketing should support the business behind the screen.
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Creativoxa is a digital marketing and growth partner based in Siliguri. We work
                  with businesses that need their digital presence — website, search, social,
                  advertising, listings — to actually contribute to revenue, not just exist.
                </p>
                <p>
                  We&apos;re deliberately practical. We&apos;d rather explain what we&apos;re doing
                  and why than hide behind jargon. We&apos;d rather grow with clients over years
                  than win them with inflated promises. And when something isn&apos;t working,
                  we say so.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/about" variant="outline">More About Us</ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="card p-7">
                <p className="col-label">How engagements start</p>
                <ul className="mt-5 space-y-5">
                  {[
                    {
                      t: "A conversation, not a pitch",
                      d: "We learn what your business sells, who buys it and what's currently getting in the way.",
                    },
                    {
                      t: "A written recommendation",
                      d: "You get a clear proposal: what we'd do first, what it costs, and what results to realistically expect.",
                    },
                    {
                      t: "Work you can see",
                      d: "Regular updates and plain-language reporting — you always know what was done and what it produced.",
                    },
                  ].map((item, i) => (
                    <li key={item.t} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.t}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-line pt-5">
                  <ArrowLink href="/contact">Start the conversation</ArrowLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
