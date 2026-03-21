import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Security & Transparency | Creativoxa',
  description: 'Understand how Creativoxa collects, protects, and manages your data in accordance with global digital standards.',
};

export default function PrivacyPage() {
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
                Security Framework
              </p>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85]">
                DATA <br /> <span className="text-primary">PRIVACY.</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">
                Last Revision
              </p>
              <p className="text-foreground font-bold">{effectiveDate}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Sidebar: Sticky Navigation */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
          <div className="space-y-4 border-l-2 border-primary pl-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">
              Protocol Summary
            </p>
            <p className="text-sm leading-relaxed text-foreground/70 italic">
              "We prioritize your digital sovereignty. Data is treated as a high-security asset, 
              managed with encryption and ethical transparency."
            </p>
          </div>
        </aside>

        {/* Main Privacy Content */}
        <div className="lg:col-span-9">
          <div className="prose dark:prose-invert max-w-none 
            prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tighter
            prose-h2:text-3xl prose-h2:border-b prose-h2:border-default prose-h2:pb-4 prose-h2:mt-16
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-lg
            prose-li:text-foreground/80 prose-strong:text-foreground prose-strong:font-black
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            
            <p>
              At Creativoxa, we recognize that privacy is the foundation of digital trust. 
              This policy details our protocols for collecting, safeguarding, and managing 
              the information you entrust to our studio.
            </p>

            <h2>01. Data Architecture (Collection)</h2>
            <p>
              We collect specific data points required to engineer your digital solutions:
            </p>
            <ul>
              <li><strong>Identifiable Assets:</strong> Names, email addresses, and phone numbers provided via inquiry.</li>
              <li><strong>Business Metadata:</strong> Company details, billing addresses, and project-specific credentials.</li>
              <li><strong>Technical Logs:</strong> IP addresses, browser versions, and user behavior analytics to optimize our site performance.</li>
            </ul>

            <h2>02. Strategic Usage</h2>
            <p>
              Collected data is utilized strictly for the advancement of your project:
            </p>
            <ul>
              <li><strong>Execution:</strong> Building websites, managing ad campaigns, and delivering media.</li>
              <li><strong>Communication:</strong> Project milestones, strategy updates, and direct support.</li>
              <li><strong>Optimization:</strong> Analyzing traffic patterns to improve the Creativoxa user experience.</li>
            </ul>

            <h2>03. Tracking & Cookies</h2>
            <p>
              We utilize "cookies" as diagnostic tools. These small data files allow us to remember 
              your preferences and track engagement patterns. You may opt-out of cookie tracking 
              via your browser settings, though some architectural features of the site may 
              be limited.
            </p>

            <h2>04. Information Distribution</h2>
            <p>
              <strong>We do not sell data.</strong> Information is only shared with trusted 
              partners necessary for project completion, such as:
            </p>
            <ul>
              <li>Cloud hosting infrastructure (Vercel, AWS).</li>
              <li>Payment gateways (Razorpay, Stripe).</li>
              <li>Official ad networks (Google Ads, Meta).</li>
            </ul>

            <h2>05. Security Protocols</h2>
            <p>
              All data transmitted through our platform is secured via SSL encryption (HTTPS). 
              While we implement high-level security barriers, no digital transmission is 
              indestructible. We treat every data point with the highest degree of studio 
              confidentiality.
            </p>

            <h2>06. Your Digital Rights</h2>
            <p>
              You maintain full sovereignty over your data. At any point, you may request:
            </p>
            <ul>
              <li>Full access to your stored data points.</li>
              <li>Correction of any inaccurate information.</li>
              <li>Complete deletion of your record within our database (subject to legal billing requirements).</li>
            </ul>

            <h2>07. Policy Updates</h2>
            <p>
              Creativoxa reserves the right to modify this Security Framework as digital 
              regulations evolve. Continued engagement with our studio indicates acceptance 
              of the most current protocols.
            </p>

            <div className="mt-20 p-8 rounded-3xl bg-background dark:bg-slate-900 border border-default text-foreground dark:text-foreground">
              <h3 className="mt-0 text-foreground dark:text-foreground">Data Protection Officer</h3>
              <p className="text-sm mb-0 text-foreground dark:text-foreground">
                Creativoxa Digital Agency<br />
                Naresh More, Siliguri, West Bengal<br />
                Inquiries: <Link href="mailto:contact@creativoxa.in" className="text-primary">contact@creativoxa.in</Link><br />
                Direct: +91 76795 87581
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}