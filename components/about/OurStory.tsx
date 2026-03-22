export default function OurStory() {
  return (
    <section className="py-24 lg:py-40 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* 📝 Left: Editorial Text */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Origin Log</h2>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              From a Freelance Desk to a Digital Powerhouse.
            </h3>
            
            <div className="space-y-6 text-muted text-lg font-medium leading-relaxed mb-10">
              <p>
                Creativoxa didn't start in a fancy boardroom. It started in Siliguri with a laptop and a realization: most local businesses were being overcharged for digital architecture that didn't work and marketing systems that didn't convert.
              </p>
              <p>
                We decided to build something different. An agency that treats your budget like our own capital. We spent years mastering the "Science of Search" and the "Art of Conversion" to ensure that when we deploy a system, it creates wealth.
              </p>
            </div>

            {/* Terminal Quote Block */}
            <div className="bg-foreground/[0.03] p-6 md:p-8 rounded-2xl border-l-2 border-primary border-y border-r border-default/30 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full pointer-events-none"></div>
              <i className="fas fa-quote-left text-primary/20 text-4xl absolute top-4 right-4"></i>
              <p className="text-foreground font-black text-xl md:text-2xl tracking-tight relative z-10 italic">
                "We don't just build digital assets; we engineer legacies."
              </p>
            </div>
          </div>
          
          {/* 🖼️ Right: Engineered Visual Frame */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-violet-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative aspect-[4/5] md:aspect-square bg-foreground/[0.02] rounded-[2rem] border border-default/50 p-4 backdrop-blur-sm overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.02]">
               <img 
                 src="/images/about-story-visual.webp" 
                 alt="Creativoxa Workspace" 
                 className="w-full h-full object-cover rounded-3xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
               />
               
               {/* Overlay Tech Specs */}
               <div className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-md border border-default/50 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-foreground shadow-xl">
                 Siliguri HQ // EST. 2021
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}