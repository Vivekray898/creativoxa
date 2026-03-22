import Link from 'next/link';

type FinalCTAProps = {
  href?: string;
  label?: string;
  subtext?: string;
};

export default function FinalCTA({ 
  href = '/contact', 
  label = "Start a Project", 
  subtext = 'No commitment required. Just expert engineering.' 
}: FinalCTAProps) {
  return (
    <section className="py-32 md:py-48 bg-background relative overflow-hidden flex items-center justify-center border-t border-default/30">
      
      {/* Engineered Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>
      
      {/* Massive Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Architect Label */}
        <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6">
          Project Initiation
        </p>
        
        {/* Monumental Typography */}
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-[0.85] mb-8">
          READY TO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 pb-2 md:pb-4 inline-block">
            DOMINATE?
          </span>
        </h2>
        
        <p className="text-muted text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          Stop guessing and start scaling. Get a comprehensive technical audit and a custom-engineered roadmap to multiply your revenue.
        </p>
        
        {/* Premium Interactive Button */}
        <Link 
          href={href} 
          className="group relative inline-flex items-center justify-center gap-4 bg-foreground text-background px-10 py-5 md:px-12 md:py-6 rounded-full text-lg font-black tracking-wide uppercase overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-foreground/20"
        >
          {/* Button Hover Fill Effect (Slides up from bottom) */}
          <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"></div>
          
          <span className="relative z-10">{label}</span>
          <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-2 transition-transform duration-300"></i>
        </Link>
        
        {/* Subtle Footer Text */}
        <p className="text-muted text-[10px] md:text-xs font-bold uppercase tracking-widest mt-8">
          {subtext}
        </p>
        
      </div>
    </section>
  );
}