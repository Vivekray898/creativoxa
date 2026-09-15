import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of the Creativoxa website and engagement of our digital marketing services.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      kicker="Legal"
      intro="These terms govern your use of this website and any services provided by Creativoxa. Specific projects are governed by their own written agreement."
    >
      <h2>1. Services</h2>
      <p>
        Creativoxa provides digital marketing, advertising management, SEO, social media
        management, website development and related services. Deliverables, timelines and fees for
        any engagement are defined in a written proposal or statement of work.
      </p>

      <h2>2. Client responsibilities</h2>
      <ul>
        <li>Timely provision of brand assets, content and platform access.</li>
        <li>Prompt feedback within agreed review windows to keep projects on schedule.</li>
        <li>Accurate business information for listings, profiles and campaigns.</li>
      </ul>

      <h2>3. Fees & payment</h2>
      <p>
        <strong>Deposits:</strong> Projects generally begin after an agreed upfront payment.
        <br />
        <strong>Ongoing services:</strong> Retainers are billed monthly in advance.
        <br />
        <strong>Overdue accounts:</strong> We may pause campaigns or services if invoices remain
        unpaid past the agreed grace period.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        Upon final payment, you own the final deliverables created for your project (website,
        creative, copy). We retain ownership of our internal tooling, templates and processes.
        Unless otherwise agreed, we may reference your project in our portfolio.
      </p>

      <h2>5. Performance disclaimer</h2>
      <p>
        We follow established, ethical practices — but we do not guarantee specific rankings,
        lead volumes or revenue outcomes. Search and advertising platforms control their own
        systems, and results vary by market, budget and execution. We commit to honest reporting
        of what happened and why.
      </p>

      <h2>6. Termination</h2>
      <p>
        Either party may end an ongoing engagement with 30 days&apos; written notice. Work
        completed and expenses incurred up to termination remain payable.
      </p>

      <h2>7. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Disputes fall under the jurisdiction of the
        courts of Siliguri, West Bengal.
      </p>

      <div className="contact-box">
        <h3>Legal enquiries</h3>
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
