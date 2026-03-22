export default function Results() {
  const stats = [
    { 
      label: "Organic Traffic Growth", 
      value: "147%", 
      sub: "Achieved for a local Siliguri brand within the first 90 days of deployment." 
    },
    { 
      label: "Campaign Revenue", 
      value: "₹2.5L+", 
      sub: "Generated for an e-commerce client through precision-targeted Google Ads." 
    },
    { 
      label: "Lead Conversion Rate", 
      value: "4X", 
      sub: "Increase in qualified leads following our custom UI/UX redesign and CRO audit." 
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Subtle Analytics Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 🔥 Premium Header (Split Layout) */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 pl-1">
              Performance Metrics
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              QUANTIFIABLE <br />
              <span className="text-muted">IMPACT.</span>
            </h2>
          </div>
          
          <div className="max-w-md md:border-l-2 md:border-primary md:pl-8">
            <p className="text-muted text-lg font-medium leading-relaxed">
              We don't measure success by vanity metrics. We measure it by traffic, conversions, and direct revenue engineered into your bottom line.
            </p>
          </div>
        </div>

        {/* 📊 Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="group relative p-8 md:p-10 rounded-[2rem] border border-default bg-background/80 backdrop-blur-xl hover:bg-foreground/[0.02] hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden"
            >
              
              {/* Background Glow on Hover */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>

              {/* Animated Trend Arrow */}
              <div className="absolute top-8 right-8 text-muted/30 group-hover:text-primary transition-all duration-500 transform group-hover:-translate-y-2 group-hover:translate-x-2">
                <i className="fas fa-arrow-trend-up text-3xl"></i>
              </div>

              {/* Top Section */}
              <div className="relative z-10 mb-12">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary mb-6 pr-12">
                  {stat.label}
                </p>
                <h3 className="text-6xl lg:text-7xl font-black tracking-tighter text-foreground group-hover:scale-105 origin-left transition-transform duration-500">
                  {stat.value}
                </h3>
              </div>

              {/* Bottom Section with Animated Border */}
              <div className="pt-6 border-t border-default relative z-10">
                {/* Magic Hover Line */}
                <div className="absolute top-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
                
                <p className="text-muted text-sm font-medium leading-relaxed pr-4">
                  {stat.sub}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}