export default function MapSection() {
  return (
    <section className="py-16 md:py-24 bg-background relative px-6 max-w-7xl mx-auto">
      
      {/* Architectural Header for Context */}
      <div className="mb-10 md:mb-12 text-center md:text-left">
        <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-3">
          Global Reach, Local Presence
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
          OPERATIONAL HQ.
        </h2>
      </div>

      {/* Engineered Frame */}
      <div className="relative p-1.5 md:p-2 rounded-[2rem] md:rounded-[2.5rem] border border-default bg-foreground/[0.02] shadow-2xl overflow-hidden md:overflow-visible">
        <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] h-[400px] md:h-[500px] w-full group bg-muted">
          
          {/* Subtle Overlay to make it feel integrated */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none"></div>
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.683759937661!2d88.45787757621649!3d26.722548068235685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441511ea3e63d%3A0x7e1277301db1cb88!2sCreativoxa!5e0!3m2!1sen!2sin!4v1774181373475!5m2!1sen!2sin" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            className="w-full h-full grayscale-[80%] group-hover:grayscale-0 transition-all duration-1000 ease-in-out border-0" 
            allowFullScreen 
            title="Creativoxa Headquarters Location"
          />
        </div>

        {/* Floating Glassmorphism Coordinate Badge - Optimized for Mobile */}
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:bottom-10 md:left-14 p-4 md:p-6 rounded-2xl bg-background/90 backdrop-blur-xl border border-default shadow-2xl z-20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary relative flex-shrink-0">
              <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping opacity-20"></div>
              {/* Using a simple SVG since FontAwesome might not be loaded */}
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted mb-0.5 md:mb-1">
                Siliguri Hub
              </p>
              <p className="text-xs md:text-sm font-black text-foreground tracking-tight">
                26.7225481° N, 88.4578776° E
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}