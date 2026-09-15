import { Container, SectionHeading } from "@/components/ui/primitives";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Have a project in mind?"
              description="Tell us what you're working on and we'll get back to you with the next steps."
            />
            <div className="mt-8 space-y-4">
              {[
                { label: "Email", value: site.email, href: `mailto:${site.email}` },
                { label: "Phone", value: site.phone, href: site.phoneHref },
                { label: "WhatsApp", value: "Message us directly", href: site.whatsapp },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 border-b border-line pb-4">
                  <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-widest text-faint">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium text-foreground hover:text-primary"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-faint">
              Creativoxa · Naresh More, East Chayan Para, Siliguri, West Bengal 734006
            </p>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm formSource="Homepage" />
          </div>
        </div>
      </Container>
    </section>
  );
}
