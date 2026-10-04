import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { assertSeoLength } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Creativoxa collects, uses and protects your information when you use our website or engage our services.",
  alternates: { canonical: "/privacy" },
};

assertSeoLength("Privacy Policy", "How Creativoxa collects, uses and protects your information when you use our website or engage our services.");

export default function PrivacyPage() {
  return (
    <LegalShell
      path="/privacy"
      title="Privacy Policy"
      kicker="Legal"
      intro="This policy explains what information Creativoxa collects through this website, how we use it, and the choices you have."
    >
      <h2>1. Information we collect</h2>
      <p>
        When you submit an enquiry or otherwise contact us, we collect the details you provide:
        your name, business name, email address, phone number, website, and the content of your
        message. We also collect standard technical information (such as browser type and pages
        visited) through privacy-respecting analytics.
      </p>

      <h2>2. How we use it</h2>
      <ul>
        <li>To respond to your enquiry and provide the services you request.</li>
        <li>To communicate about ongoing work, proposals and support.</li>
        <li>To improve this website and understand which content is useful.</li>
      </ul>
      <p><strong>We do not sell your data.</strong></p>

      <h2>3. Sharing</h2>
      <p>
        Information is shared only with services necessary to run our business: hosting
        infrastructure, our database provider (Supabase), email delivery (Resend), and advertising
        platforms where you are a client. Each processes data under its own terms.
      </p>

      <h2>4. Cookies & tracking</h2>
      <p>
        We use cookies and similar technologies for analytics and advertising measurement
        (including Google Ads conversion tracking, the Meta Pixel and Microsoft Clarity). You can
        control cookies through your browser settings; parts of the site may function differently
        without them.
      </p>

      <h2>5. Advertising & personalisation</h2>
      <p>
        This site displays advertising. We use Google AdSense, and in some cases other advertising
        partners, to show ads based on your prior visits to this and other websites.
      </p>
      <ul>
        <li>
          <strong>Google&apos;s use of advertising cookies</strong> enables it and its partners to
          serve ads based on your visit to this site and/or other sites on the internet.
        </li>
        <li>
          You can opt out of personalised advertising at{" "}
          <a href="https://www.google.com/settings/ads" rel="nofollow noreferrer" target="_blank">
            Google Ads Settings
          </a>
          , and opt out of third-party vendor cookies at{" "}
          <a href="https://www.aboutads.info/choices/" rel="nofollow noreferrer" target="_blank">
            aboutads.info
          </a>
          .
        </li>
      </ul>
      <p>
        Third-party vendors set cookies directly in your browser to serve and measure ads. You may
        opt out of their use of cookies at{" "}
        <a
          href="https://www.aboutads.info/choices/"
          rel="nofollow noreferrer"
          target="_blank"
        >
          aboutads.info
        </a>{" "}
        or{" "}
        <a
          href="https://www.youronlinechoices.com/"
          rel="nofollow noreferrer"
          target="_blank"
        >
          Your Online Choices
        </a>
        .
      </p>
      <p>
        Google&apos;s practices are described in the{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          rel="nofollow noreferrer"
          target="_blank"
        >
          Google privacy &amp; terms page
        </a>
        .
      </p>

      <h2>6. Consent</h2>
      <p>
        Advertising and analytics scripts are blocked by default. They load only after you make a
        choice through our consent banner, and your choice is stored so we do not ask again on
        every visit. You can change your choice at any time by clearing this site&apos;s cookies in
        your browser. Our Google-certified consent platform records your decision for audit.
      </p>

      <h2>7. Service providers</h2>
      <p>
        The following providers process data on our behalf in order to run this website:
      </p>
      <ul>
        <li>Vercel — website hosting and content delivery.</li>
        <li>Supabase — database and file storage for site content and enquiries.</li>
        <li>Resend — transactional email delivery for enquiries and confirmations.</li>
        <li>Google — advertising and, where consented, analytics.</li>
        <li>Meta — advertising measurement where consented.</li>
        <li>Microsoft Clarity — session recordings where consented.</li>
      </ul>
      <p>
        Each provider handles data under its own privacy policy and terms. Our advertising partners
        may set cookies directly in your browser; see section 5 for how to opt out.
      </p>

      <h2>8. Security</h2>
      <p>
        Data transmitted through this site is protected with SSL encryption (HTTPS). Access to
        stored enquiries is limited to the Creativoxa team and secured by our infrastructure
        providers.
      </p>

      <h2>9. Your rights</h2>
      <p>You may request at any time:</p>
      <ul>
        <li>Access to the information we hold about you.</li>
        <li>Correction of inaccurate information.</li>
        <li>Deletion of your records, subject to legal or billing retention needs.</li>
      </ul>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy as our practices or regulations evolve. Significant changes will
        be reflected on this page.
      </p>

      <div className="contact-box">
        <h3>Contact</h3>
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
  path,
  title,
  kicker,
  intro,
  children,
}: {
  path: string;
  title: string;
  kicker: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-14 lg:py-20">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", path: "/" },
              { name: title, path },
            ]}
          />
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
