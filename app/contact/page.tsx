import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Tell Creativoxa what you're working on. We'll review your enquiry and come back with practical next steps.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: "mail" as const,
  },
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    icon: "phone" as const,
  },
  {
    label: "WhatsApp",
    value: "Message us directly",
    href: site.whatsapp,
    icon: "whatsapp" as const,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Contact</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Have a project in mind?
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Tell us what you&apos;re working on and we&apos;ll get back to you with the next
              steps. Every enquiry is read by a person, not a bot.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Info column */}
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow=""
                  title="Talk to Creativoxa"
                  description="Prefer a direct channel? Reach us any of these ways."
                />
                <ul className="mt-8 space-y-4">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="card card-hover flex items-center gap-4 p-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                          <Icon name={c.icon} className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-xs font-semibold uppercase tracking-widest text-faint">
                            {c.label}
                          </span>
                          <span className="block text-sm font-medium text-foreground">{c.value}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="card mt-8 p-6">
                  <p className="col-label">What happens next</p>
                  <ol className="mt-4 space-y-4">
                    {[
                      "We read your enquiry and reply personally.",
                      "A short call to understand your business and goals.",
                      "A written recommendation: scope, cost and timeline.",
                    ].map((step, i) => (
                      <li key={step} className="flex gap-3 text-sm text-muted">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-faint">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    {site.address.street}, {site.address.city}, {site.address.region}{" "}
                    {site.address.postalCode}, India
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Form column */}
            <div className="lg:col-span-8">
              <EnquiryForm formSource="Contact Page" />
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="border-t border-line bg-surface py-14">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">Find us</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Based in Siliguri, West Bengal.
            </h2>
          </Reveal>
          <Reveal className="mt-8">
            <div className="card overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.683759937661!2d88.45787757621649!3d26.722548068235685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441511ea3e63d%3A0x7e1277301db1cb88!2sCreativoxa!5e0!3m2!1sen!2sin!4v1774181373475!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0"
                title="Creativoxa location map"
                allowFullScreen
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
