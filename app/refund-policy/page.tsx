import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Creativoxa',
  description: 'Review our professional guidelines regarding project cancellations, service terminations, and refund eligibility.',
};

export default function RefundPolicyPage() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="bg-background min-h-screen pb-12 md:pb-24">
      {/* 1. ARCHITECTURAL HERO */}
      <header className="pt-24 pb-12 md:pt-32 md:pb-16 border-b border-default">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div className="max-w-4xl">
              <p className="text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 text-[9px] md:text-[10px]">
                Fiscal Framework
              </p>
              {/* Responsive Heading: text-4xl for small mobile, scaling up to 8xl */}
              <h1 className="text-[2.6rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.9] md:leading-[0.85] break-words uppercase">
                Refund & <br className="hidden xs:block" /> 
                <span className="text-primary">Cancellation.</span>
              </h1>
            </div>
            <div className="text-left md:text-right flex md:flex-col gap-2 md:gap-0 items-center md:items-end">
              <p className="text-muted text-[9px] md:text-[10px] font-black uppercase tracking-widest md:mb-2">
                Policy Active
              </p>
              <p className="text-foreground font-bold text-sm md:text-base">{effectiveDate}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        
        {/* Mobile Summary (Visible only on small screens) */}
        <div className="lg:hidden p-6 rounded-2xl bg-muted/30 border border-default">
           <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">
              Quick Summary
            </p>
            <p className="text-sm leading-relaxed text-foreground/70 italic">
              "Refunds are evaluated based on project stage and technical investment as we allocate dedicated resources to every project."
            </p>
        </div>

        {/* Left Sidebar: Sticky Summary (Desktop only) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
          <div className="space-y-4 border-l-2 border-primary pl-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">
              Quick Summary
            </p>
            <p className="text-sm leading-relaxed text-foreground/70 italic">
              "As a studio that allocates dedicated manpower and resources to every project, 
              we operate on a milestone-based fiscal model. Refunds are evaluated based 
              on project stage and technical investment."
            </p>
          </div>
        </aside>

        {/* Main Legal Content */}
        <div className="lg:col-span-9">
          <div className="prose dark:prose-invert max-w-none 
            prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tighter
            prose-h2:text-2xl md:text-3xl prose-h2:border-b prose-h2:border-default prose-h2:pb-4 prose-h2:mt-10 md:prose-h2:mt-16
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg
            prose-li:text-foreground/80 prose-li:text-base md:prose-li:text-lg prose-strong:text-foreground prose-strong:font-black
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            
            <p>
              Creativoxa is committed to delivering digital excellence. Because our services 
              involve customized labor, technical resource allocation, and irreversible 
              strategic work, we follow the structured refund and cancellation protocols 
              outlined below.
            </p>

            <h2>01. Termination Protocols</h2>
            <p>
              Project cancellations vary by service type to account for the specific 
              manpower assigned:
            </p>
            <ul>
              <li><strong>Digital Marketing:</strong> Requires a 30-day written notice via email. Work produced during the notice period remains billable.</li>
              <li><strong>Web Development:</strong> Cancellations after the "Design Approval" phase will result in the forfeiture of the initial deposit.</li>
              <li><strong>Videography:</strong> Booking advances are non-refundable as they secure specific production dates.</li>
            </ul>

            <h2>02. Refund Eligibility</h2>
            <p>
              Refunds are exclusively processed under the following technical scenarios:
            </p>
            <ul>
              <li><strong>Duplicate Transaction:</strong> 100% refund of any accidental double-billing.</li>
              <li><strong>Non-Commencement:</strong> Full refund if Creativoxa is unable to begin a project due to internal unforeseen circumstances.</li>
            </ul>

            <h2>03. Non-Refundable Scenarios</h2>
            <p>
              The following investments are non-recoverable:
            </p>
            <ul>
              <li><strong>Setup Fees:</strong> Initial SEO audits and server environment configurations.</li>
              <li><strong>Third-Party Outflow:</strong> Payments for domain names, hosting, or paid ad-spend (Google/Meta Ads).</li>
              <li><strong>Completed Milestones:</strong> Funds for approved and delivered project milestones are final.</li>
            </ul>

            <h2>04. Settlement Processing</h2>
            <p>
              Approved refunds are credited back to the original source within <strong>7–10 business days</strong>. Please note that gateway transaction fees (Razorpay/Stripe) are non-reimbursable.
            </p>

            {/* Contact Box */}
            <div className="mt-12 md:mt-20 p-6 md:p-8 rounded-3xl bg-muted/30 border border-default">
              <h3 className="mt-0 text-foreground !text-xl">Billing Support</h3>
              <p className="text-sm md:text-base mb-0 text-foreground/80">
                Creativoxa Accounts Department<br />
                Naresh More, East Chayan Para, Siliguri<br />
                Email: <Link href="mailto:contact@creativoxa.in" className="text-primary font-bold">contact@creativoxa.in</Link><br />
                Phone: +91 76795 87581
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}