import Link from 'next/link';

type FinalCTAProps = {
  href?: string;
  label?: string;
  subtext?: string;
};

export default function FinalCTA({ href = '/contacts', label = "Let's Talk Business", subtext = 'No commitment required. Just expert advice.' }: FinalCTAProps) {
  return (
    <section className="py-24 bg-background text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">
          Ready to dominate your market?
        </h2>
        <p className="text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Stop guessing and start growing. Get a free, no-obligation technical audit of your website and a custom marketing strategy today.
        </p>
        <Link 
          href={href} 
          className="btn-primary inline-block text-lg py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-transform active:scale-95"
        >
          {label} <i className="fas fa-arrow-right ml-2"></i>
        </Link>
        <p className="text-muted text-sm mt-6 opacity-80">
          {subtext}
        </p>
      </div>
    </section>
  );
}