export default function ContactHero() {
  return (
    <section className="relative bg-background pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-default/30">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none"></div>
      
      {/* Subtle Primary Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          
          {/* 🧱 Left Column: Massive Typography (Spans 8) */}
          <div className="lg:col-span-8">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-3 bg-foreground/5 border border-default px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Accepting New Projects
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-foreground leading-[0.85] mb-6">
              PROJECT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 pb-2 inline-block">
                INITIATION.
              </span>
            </h1>
          </div>

          {/* 📋 Right Column: Context & Direct Info (Spans 4) */}
          <div className="lg:col-span-4 lg:pb-4 lg:border-l-2 lg:border-primary lg:pl-8">
            <p className="text-muted text-lg md:text-xl font-medium leading-relaxed mb-8">
              Stop wondering why your competitors are scaling. Secure a technical consultation and get a blueprint to engineer your market dominance.
            </p>
            
            {/* Quick Contact Metadata */}
            <div className="flex flex-col gap-4 text-sm font-bold tracking-widest uppercase">
              <a href="mailto:contact@creativoxa.in" className="group flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <i className="fas fa-envelope text-muted group-hover:text-primary transition-colors"></i>
                </div>
                contact@creativoxa.in
              </a>
              <a href="tel:+917679587581" className="group flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <i className="fas fa-phone text-muted group-hover:text-primary transition-colors"></i>
                </div>
                +91 76795 87581
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}