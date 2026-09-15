import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Creativoxa's policies on project cancellations, refund eligibility and settlement timelines.",
};

export default function RefundPolicyPage() {
  return (
    <LegalShell
      title="Refund & Cancellation Policy"
      kicker="Legal"
      intro="Our services involve customised work and reserved capacity, so refunds and cancellations follow the structured policy below."
    >
      <h2>1. Cancellations</h2>
      <ul>
        <li>
          <strong>Ongoing marketing services:</strong> 30 days&apos; written notice by email. Work
          performed during the notice period remains billable.
        </li>
        <li>
          <strong>Web development:</strong> Cancellations after design approval forfeit the
          initial deposit.
        </li>
        <li>
          <strong>Media production:</strong> Booking advances secure specific dates and are
          non-refundable.
        </li>
      </ul>

      <h2>2. Refund eligibility</h2>
      <p>Refunds are processed in the following situations:</p>
      <ul>
        <li><strong>Duplicate payment:</strong> full refund of accidental double-billing.</li>
        <li>
          <strong>Non-commencement:</strong> full refund if we are unable to begin a project for
          reasons within our control.
        </li>
      </ul>

      <h2>3. Non-refundable items</h2>
      <ul>
        <li>Completed and approved milestones.</li>
        <li>Third-party costs already incurred: domains, hosting, ad spend, licences.</li>
        <li>Initial audit and setup fees, once performed.</li>
      </ul>

      <h2>4. Settlement</h2>
      <p>
        Approved refunds are returned to the original payment source within 7–10 business days.
        Payment-gateway transaction fees are non-reimbursable.
      </p>

      <div className="contact-box">
        <h3>Billing support</h3>
        <p>
          Creativoxa<br />
          Naresh More, East Chayan Para, Siliguri, West Bengal 734006<br />
          Email: <Link href="mailto:contact@creativoxa.in">contact@creativoxa.in</Link><br />
          Phone: +91 76795 87581
        </p>
      </div>
    </LegalShell>
  );
}

function LegalShell({
  title,
  kicker,
  intro,
  children,
}: {
  title: string;
  kicker: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-14 lg:py-20">
          <p className="eyebrow mb-4">{kicker}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>
        </Container>
      </section>
      <section className="py-12 lg:py-16">
        <Container>
          <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
