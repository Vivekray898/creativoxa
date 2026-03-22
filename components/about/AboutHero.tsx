export default function AboutHero() {
  return (
    <section className="relative bg-background pt-32 pb-20 lg:pt-56 lg:pb-32 overflow-hidden border-b border-default/30 flex items-end min-h-[60vh]">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>
      
      {/* Subtle Primary Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Telemetry Badge */}
        <div className="inline-flex items-center gap-3 bg-foreground/5 border border-default px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground mb-8 backdrop-blur-md">
          <i className="fas fa-fingerprint text-primary"></i>
          Company Manifesto
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter text-foreground leading-[0.85] mb-10">
          WE DIDN'T START <br className="hidden md:block" />
          AN AGENCY. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 pb-2 inline-block">
            WE ENGINEERED A MOVEMENT.
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <p className="text-muted text-lg md:text-xl font-medium leading-relaxed border-l-4 border-primary pl-6 py-2">
              Creativoxa was born out of a simple frustration: Businesses were being sold "vanity metrics" instead of actual revenue. We’re here to rewrite the architecture of local marketing.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}