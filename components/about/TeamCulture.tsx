export default function TeamCulture() {
  return (
    <section className="py-24 lg:py-40 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="relative group order-2 lg:order-1">
            {/* Background Tech Accent */}
            <div className="absolute -inset-1 bg-foreground/5 rounded-[2.5rem] transform -rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
            
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-default/50 shadow-2xl">
              <img 
                src="/images/siliguri-office.webp" 
                alt="Creativoxa Infrastructure" 
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Local Infrastructure</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              Empowering North Bengal’s Digital Economy.
            </h3>
            
            <div className="space-y-6 text-muted text-lg font-medium leading-relaxed mb-12">
              <p>
                We saw talented business owners in Siliguri, Matigara, and Bagdogra struggling to compete with national brands strictly because of poor digital presence. 
              </p>
              <p>
                Our mission isn't just "Marketing." It's about engineering the technical backbone so that a local hotel or restaurant can stand taller than a multi-national chain.
              </p>
            </div>
            
            {/* Verified Compliance Badge */}
            <div className="inline-flex items-center gap-5 p-4 pr-8 bg-foreground/[0.02] border border-default/50 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-green-500">
                <i className="fas fa-shield-check text-xl"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Entity Verification</p>
                <p className="text-sm font-black text-foreground tracking-wide">GST: 19EXRPP1056D1Z5</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}