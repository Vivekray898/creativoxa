export default function ServiceHero() {
  return (
    <section className="relative bg-background pt-20 sm:pt-28 md:pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden border-b border-default/30 flex items-end min-h-[70vh]">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none"></div>
      
      {/* Subtle Primary Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Capability Badge */}
        <div className="inline-flex items-center gap-3 bg-foreground/5 border border-default px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground mb-8 backdrop-blur-md">
          <i className="fas fa-layer-group text-primary"></i>
          Core Capabilities
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-foreground leading-[0.85] mb-12">
          WE BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 pb-2 md:pb-4 inline-block">
            DIGITAL WEAPONS.
          </span>
        </h1>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-muted text-lg md:text-xl font-medium leading-relaxed border-l-4 border-primary pl-6 py-2">
              We don't provide "services." We provide unfair advantages. Every line of code and every ad campaign is engineered to help you out-earn your competition.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}