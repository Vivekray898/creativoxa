import { Container, SectionHeading } from "@/components/ui/primitives";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { formatAddress, mailHref, telHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/cms/queries";
import type { HomeSectionProps } from "./types";

export default async function Contact({ index }: HomeSectionProps) {
  const settings = await getSiteSettings();
  const email = mailHref(settings.email);
  const phone = telHref(settings.phone);
  const address = formatAddress(settings);

  const channels = [
    email && settings.email ? { label: "Email", value: settings.email, href: email } : null,
    phone && settings.phone ? { label: "Phone", value: settings.phone, href: phone } : null,
    settings.whatsapp
      ? { label: "WhatsApp", value: "Message us directly", href: settings.whatsapp }
      : null,
  ].filter((c): c is { label: string; value: string; href: string } => Boolean(c));

  return (
    <section id="contact" className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              index={index}
              title="Have a project in mind?"
              description="Tell us what you're working on and we'll get back to you with the next steps."
            />
            <div className="mt-8 space-y-4">
              {channels.map((item) => (
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
            {address ? (
              <p className="mt-6 text-xs leading-relaxed text-faint">
                {settings.company_name} · {address}
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm formSource="Homepage" />
          </div>
        </div>
      </Container>
    </section>
  );
}
