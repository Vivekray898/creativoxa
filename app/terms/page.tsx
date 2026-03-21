import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | The Creativoxa Agreement',
  description: 'Legal terms and service guidelines for engaging with Creativoxa Digital Agency.',
};

export default function TermsPage() {
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
                Legal Framework
              </p>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85]">
                TERMS OF <br /> <span className="text-primary">SERVICE.</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">
                Last Updated
              </p>
              <p className="text-foreground font-bold">{effectiveDate}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Sidebar: Quick Navigation */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
          <div className="space-y-4 border-l-2 border-primary pl-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">
              Summary
            </p>
            <p className="text-sm leading-relaxed text-foreground/70 italic">
              "By engaging our studio, you agree to a partnership built on transparency, 
              mutual respect, and clear intellectual property boundaries."
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
              Welcome to Creativoxa. These Terms and Conditions govern your use of our website and 
              the digital services provided by our agency. By accessing our platform or hiring 
              our studio, you agree to be bound by these terms.
            </p>

            <h2>01. Scope of Expertise</h2>
            <p>
              Creativoxa provides architectural-grade digital marketing, web design, development, 
              and videography services. Specific deliverables, timelines, and technical 
              specifications will be outlined in your bespoke Statement of Work (SOW).
            </p>

            <h2>02. Client Obligations</h2>
            <p>
              For us to build your digital future, we require timely access to:
            </p>
            <ul>
              <li>Brand assets, logos, and high-resolution imagery.</li>
              <li>Required credentials for hosting and social platforms.</li>
              <li>Prompt feedback within 48-72 hours to maintain project velocity.</li>
            </ul>

            <h2>03. Financial Architecture</h2>
            <p>
              <strong>Deposits:</strong> All projects require a non-refundable upfront 
              commitment fee (typically 50%) before the discovery phase begins.
            </p>
            <p>
              <strong>Late Fees:</strong> We reserve the right to pause active ad campaigns 
              or suspend website hosting if invoices remain unpaid past the 7-day grace period.
            </p>

            <h2>04. Intellectual Property</h2>
            <p>
              Upon final payment, the Client holds full ownership of the final "End Product." 
              However, Creativoxa retains ownership of all "Studio Assets" including raw 
              source code, unedited video footage, and rejected design concepts.
            </p>
            <p>
              Unless a specific NDA is signed, we reserve the right to showcase your project 
              within our <strong>Selected Works</strong> gallery.
            </p>

            <h2>05. Performance Disclaimer</h2>
            <p>
              While we use data-driven strategies to dominate search results, search engines 
              frequently update their algorithms. Creativoxa does not guarantee specific 
              monetary ROI or #1 rankings, as these are subject to third-party platforms.
            </p>

            <h2>06. Termination of Partnership</h2>
            <p>
              Either party may terminate the agreement with 30 days' written notice. 
              Creativoxa reserves the right to terminate immediately in cases of 
              unprofessional conduct or breach of confidentiality.
            </p>

            <h2>07. Contact & Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be settled 
              within the exclusive jurisdiction of the courts in <strong>Siliguri, West Bengal.</strong>
            </p>

            <div className="mt-20 p-8 rounded-3xl bg-background dark:bg-slate-900 border border-default text-foreground dark:text-foreground">
              <h3 className="mt-0 text-foreground dark:text-foreground">Legal Inquiries</h3>
              <p className="text-sm mb-0 text-foreground dark:text-foreground">
                Creativoxa Digital Agency<br />
                Naresh More, East Chayan Para, Siliguri<br />
                Email: <a href="mailto:contact@creativoxa.in" className="text-primary">contact@creativoxa.in</a><br />
                Phone: +91 76795 87581
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}