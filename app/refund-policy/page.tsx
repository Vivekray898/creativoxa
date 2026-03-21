import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Fiscal Framework | Creativoxa',
  description: 'Review our professional guidelines regarding project cancellations, service terminations, and refund eligibility.',
};

export default function RefundPolicyPage() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="bg-background min-h-screen pb-24">
      {/* 1. ARCHITECTURAL HERO */}
      <header className="pt-32 pb-16 border-b border-default">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-primary font-black uppercase tracking-[0.4em] mb-6 text-[10px]">
                Fiscal Framework
              </p>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85]">
                REFUND & <br /> <span className="text-primary">CANCELLATION.</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">
                Policy Active
              </p>
              <p className="text-foreground font-bold">{effectiveDate}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Sidebar: Sticky Summary */}
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
            prose-h2:text-3xl prose-h2:border-b prose-h2:border-default prose-h2:pb-4 prose-h2:mt-16
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-lg
            prose-li:text-foreground/80 prose-strong:text-foreground prose-strong:font-black
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            
            <p>
              Creativoxa is committed to delivering digital excellence. Because our services 
              involve customized labor, technical resource allocation, and irreversible 
              strategic work, we follow the structured refund and cancellation protocols 
              outlined below.
            </p>

            <h2>01. Termination Protocols (Cancellation)</h2>
            <p>
              Project cancellations vary by service type to account for the specific 
              manpower assigned:
            </p>
            <ul>
              <li><strong>Digital Marketing (Retainers):</strong> Requires a 30-day written notice via email before the next billing cycle. Work produced during the notice period remains billable.</li>
              <li><strong>Web Development:</strong> Cancellations after the "Design Approval" phase and the start of development will result in the forfeiture of the initial deposit.</li>
              <li><strong>Videography:</strong> Booking advances are non-refundable as they secure specific dates, preventing the studio from taking other commissions.</li>
            </ul>

            <h2>02. Refund Eligibility (Fiscal Recovery)</h2>
            <p>
              Refunds are exclusively processed under the following technical scenarios:
            </p>
            <ul>
              <li><strong>Duplicate Transaction:</strong> 100% refund of any accidental double-billing.</li>
              <li><strong>Non-Commencement:</strong> If Creativoxa is unable to begin a project due to internal unforeseen circumstances, a full refund of the deposit will be issued.</li>
            </ul>

            <h2>03. Non-Refundable Scenarios</h2>
            <p>
              The following investments are non-recoverable once a project is initiated:
            </p>
            <ul>
              <li><strong>Setup Fees:</strong> Initial SEO audits, server environment configurations, and ad-account setups.</li>
              <li><strong>Third-Party Outflow:</strong> Payments made for domain names, hosting, premium software licenses, or paid ad-spend (Google/Meta Ads) are final.</li>
              <li><strong>Completed Milestones:</strong> Once a project milestone (e.g., UI Design or First Draft) is approved and paid for, those funds are non-refundable.</li>
            </ul>

            <h2>04. Administrative Procedure</h2>
            <p>
              To initiate a review of your project status or request a settlement:
            </p>
            <ol>
              <li>Submit a formal request to <Link href="mailto:contact@creativoxa.in">contact@creativoxa.in</Link>.</li>
              <li>Include your Project ID and the specific reason for the request.</li>
              <li>Our management team will evaluate the resource usage and respond with a settlement statement within 5 business days.</li>
            </ol>

            <h2>05. Settlement Processing</h2>
            <p>
              Approved refunds are credited back to the original payment source within 7–10 
              business days. Please note that any transaction fees or currency conversion 
              costs deducted by payment gateways (Razorpay/Stripe) are non-reimbursable.
            </p>

            <div className="mt-20 p-8 rounded-3xl bg-background dark:bg-slate-900 border border-default text-foreground dark:text-foreground">
              <h3 className="mt-0 text-foreground dark:text-foreground">Billing Support</h3>
              <p className="text-sm mb-0 text-foreground dark:text-foreground">
                Creativoxa Accounts Department<br />
                Naresh More, East Chayan Para, Siliguri<br />
                Email: <Link href="mailto:contact@creativoxa.in" className="text-primary">contact@creativoxa.in</Link><br />
                Direct line for billing: +91 76795 87581
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}