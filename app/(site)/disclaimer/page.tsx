import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { assertSeoLength } from "@/lib/seo";
import { site } from "@/lib/site";

const TITLE = "Disclaimer";
const DESCRIPTION =
  "How to read the claims, examples and third-party references on the Creativoxa website, and the limits of what we can promise.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/disclaimer" },
};

assertSeoLength(TITLE, DESCRIPTION);

export default function DisclaimerPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-14 lg:py-20">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", path: "/" },
              { name: "Disclaimer", path: "/disclaimer" },
            ]}
          />
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Disclaimer
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            This page explains what the rest of the website does and does not promise. It is short
            on purpose — if something here is unclear, ask us before relying on it.
          </p>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary">
            <h2>1. General information</h2>
            <p>
              The content on this website is provided for general information only. It is not
              professional, legal, financial or tax advice, and it should not be relied on as a
              substitute for advice specific to your business.
            </p>

            <h2>2. Results and case studies</h2>
            <p>
              Marketing outcomes depend on factors outside anyone&apos;s control — your market,
              competition, budget, seasonality, product, pricing and offer. Figures and examples on
              this site illustrate work we have done; they are not a guarantee or projection of what
              a particular business will achieve. Every engagement is scoped and costed in a written
              proposal.
            </p>

            <h2>3. Platform policies</h2>
            <p>
              We work within the rules of the platforms we advertise on, including Google, Meta and
              their respective advertising policies. Approval of ads, account standing and campaign
              delivery are decided by those platforms, not by us, and can change at any time.
            </p>

            <h2>4. Third-party links and tools</h2>
            <p>
              This site links to, and contains free browser tools that may reference, third-party
              services and platforms. We do not control those sites and we are not responsible for
              their content, accuracy, availability or privacy practices. Our free tools run entirely
              in your browser; we do not receive the text, images or measurements you enter into
              them.
            </p>

            <h2>5. Advertising</h2>
            <p>
              This site displays advertising supplied by third-party networks. Advertisements are
              selected by those networks and may not reflect our recommendations or endorsement of
              the advertised product or service. See our{" "}
              <Link href="/privacy">Privacy Policy</Link> for how advertising cookies and consent are
              handled.
            </p>

            <h2>6. Accuracy and availability</h2>
            <p>
              We take reasonable care to keep the information on this site accurate and up to date,
              but we make no warranty that it is complete or error-free, and the site may be
              unavailable or changed at any time.
            </p>

            <h2>7. Contact</h2>
            <p>
              Questions about this disclaimer can go to{" "}
              <Link href={`mailto:${site.email}`}>{site.email}</Link> or{" "}
              <Link href={site.phoneHref}>{site.phone}</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}