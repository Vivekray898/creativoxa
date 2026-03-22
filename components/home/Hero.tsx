import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background py-20 lg:py-32 overflow-hidden border-b border-default/30">
      
      {/* 🌐 Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,#000_20%,transparent_100%)] pointer-events-none"></div>
      
      {/* Subtle Primary Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* 🧱 Left Column: Copywriting & CTAs (Spans 7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left pt-10 lg:pt-0">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-3 bg-foreground/5 border border-default px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-foreground w-fit mx-auto lg:mx-0 mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Siliguri's Premier Growth Agency
            </div>

            {/* Monumental Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tighter text-foreground leading-[0.9] mb-8">
              ENGINEERING CLICKS INTO <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 pb-2 inline-block">
                REVENUE.
              </span>
            </h1>

            {/* Authoritative Subtext */}
            <p className="text-lg sm:text-xl text-muted mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Stop losing market share. We engineer high-performance web architecture and data-driven acquisition systems for ambitious brands ready to scale.
            </p>

            {/* Premium Interactive Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm font-black tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-foreground/10 w-full sm:w-auto"
              >
                {/* Hover Fill Effect */}
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"></div>
                
                <span className="relative z-10">Start a Project</span>
                <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform duration-300"></i>
              </Link>

              <Link 
                href="/All-Services" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-black tracking-widest uppercase text-foreground border border-default hover:bg-foreground/5 transition-all duration-300 active:scale-95 w-full sm:w-auto"
              >
                Explore Systems
              </Link>
            </div>
          </div>

          {/* 🖼️ Right Column: Engineered Visuals (Spans 5 columns) */}
          <div className="lg:col-span-5 relative hidden md:block">
            
            {/* The "Engineered Frame" */}
            <div className="relative p-2 rounded-[2.5rem] border border-default bg-background/50 backdrop-blur-sm shadow-2xl">
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-foreground/[0.02] border border-default/50 group">
                
                {/* Image Overlay/Hover Effect */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
                
                <Image 
                  src="/images/hero-dashboard-mockup.png" 
                  alt="Creativoxa Dashboard & Analytics" 
                  fill 
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" 
                  priority 
                />
              </div>
            </div>

            {/* Floating Glassmorphism Data Badge */}
            <div className="absolute top-10 -left-12 p-5 rounded-2xl bg-background/80 backdrop-blur-xl border border-default shadow-2xl z-20 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-0.5">Avg. Client ROI</p>
                  <p className="text-xl font-black text-foreground leading-none">+340%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}