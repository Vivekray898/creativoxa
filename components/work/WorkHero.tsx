export default function WorkHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-default bg-background">
      
      {/* 1. FIXED WATERMARK: Changed to reliable opacity for Light/Dark modes */}
      <div className="absolute -top-10 -right-20 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05]">
        <span className="text-[15rem] md:text-[22rem] font-black text-foreground leading-none">
          02
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-8 md:gap-12">
          
          {/* 2. BREADCRUMB */}
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-primary"></span>
            <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">
              Portfolio Studio
            </p>
          </div>

          {/* 3. MAIN TITLE: Scaled to prevent horizontal scrolling on tablets/laptops */}
          <div className="max-w-5xl">
            <h1 className="text-6xl sm:text-7xl md:text-[8.5rem] font-black tracking-tighter text-foreground leading-[0.8]">
              CHOSEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-violet-500 pb-2 md:pb-4 inline-block">
                RESULTS.
              </span>
            </h1>
          </div>

          {/* 4. INFO GRID: Improved alignment and responsive stacking */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start md:items-end mt-4">
            
            <div className="md:col-span-5 border-l-2 border-primary pl-6 md:pl-8">
              <p className="text-muted text-lg md:text-xl leading-relaxed font-medium">
                We bridge the gap between <span className="text-foreground">aesthetic excellence</span> and <span className="text-foreground">technical conversion</span>.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 md:pl-10">
              <div className="flex flex-col">
                <p className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">50+</p>
                <p className="text-[9px] uppercase font-black tracking-widest text-muted mt-1">Brands Launched</p>
              </div>
              <div className="flex flex-col">
                <p className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">03</p>
                <p className="text-[9px] uppercase font-black tracking-widest text-muted mt-1">Continents</p>
              </div>
              <div className="col-span-2 md:col-span-1 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-default md:pl-8">
                <p className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Booking Live
                </p>
                <p className="text-[9px] font-bold text-muted mt-1 uppercase">Available Q2 2026</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}