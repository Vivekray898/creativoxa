export default function Process() {
  const steps = [
    { 
      id: "01",
      title: "Discovery & Audit", 
      desc: "We don't guess. We analyze your current digital footprint, dissect competitor strategies, and identify the exact bottlenecks restricting your revenue." 
    },
    { 
      id: "02",
      title: "Strategic Blueprint", 
      desc: "We architect a custom, step-by-step digital roadmap. No generic templates—just highly calculated frameworks tailored to your specific growth goals." 
    },
    { 
      id: "03",
      title: "Engineered Execution", 
      desc: "Our in-house specialists deploy the strategy. From high-conversion web development to aggressive SEO campaigns, we build assets that perform." 
    },
    { 
      id: "04",
      title: "Scale & Optimize", 
      desc: "Deployment is just the beginning. We track micro-interactions, analyze real-time data, and continuously optimize to multiply your ROI." 
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 🔥 Premium Left-Aligned Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 pl-1">
            The Methodology
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
            ENGINEERED <br />
            <span className="text-muted">PRECISION.</span>
          </h2>
        </div>
        
        {/* 🧱 Architectural Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div 
              key={step.id} 
              className="group relative p-8 md:p-10 rounded-[2rem] border border-default bg-background/50 backdrop-blur-xl hover:bg-foreground/[0.02] hover:border-primary/40 transition-all duration-500 flex flex-col h-full min-h-[320px] shadow-sm hover:shadow-xl overflow-hidden"
            >
              
              {/* Massive Watermark Number (Fades in and colors on hover) */}
              <span className="absolute -top-10 -right-4 text-[12rem] font-black text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors duration-700 pointer-events-none select-none leading-none">
                {step.id}
              </span>

              {/* Top Indicator */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                  <span className="font-bold text-sm tracking-tighter">{step.id}</span>
                </div>
                {/* Visual Connector Line (Only visible on hover) */}
                <div className="h-px bg-default flex-grow opacity-50 group-hover:bg-primary group-hover:opacity-100 transition-all duration-500 relative z-10"></div>
              </div>

              {/* Content */}
              <div className="mt-auto relative z-10">
                <h4 className="text-2xl font-black text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Progress Bar Effect at Bottom */}
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out opacity-50"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}