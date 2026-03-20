import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-3/5 text-center lg:text-left">
          <div className="inline-block bg-primary/20 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-6 border border-primary/30">
            🏆 Siliguri&apos;s #1 ROI-Focused Agency
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            We Turn Clicks Into <span className="text-primary">Paying Customers.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Stop losing customers to your competitors. We help local businesses, startups, and e-commerce brands dominate the Siliguri market through expert SEO, Web Design, and Paid Ads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/contacts" className="btn-primary w-full sm:w-auto text-center">
              Get Your Free Growth Audit
            </Link>
            <Link href="/All-Services" className="btn-secondary w-full sm:w-auto text-center">
              Explore Services
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-2/5 hidden md:block relative h-[400px]">
          <Image src="/images/hero-dashboard-mockup.png" alt="Marketing Results" fill className="object-contain" priority />
        </div>
      </div>
    </section>
  );
}