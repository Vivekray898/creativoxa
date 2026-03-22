export default function IndustryFocus() {
  const industries = [
    { name: "Hotels & Tourism", icon: "fa-mountain" },
    { name: "Real Estate", icon: "fa-building" },
    { name: "Healthcare", icon: "fa-hospital-user" },
    { name: "Local Retail", icon: "fa-store" },
    { name: "Education", icon: "fa-graduation-cap" },
    { name: "E-commerce", icon: "fa-shopping-bag" },
  ];

  return (
    <section className="py-32 bg-background border-t border-default/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Matrix Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 bg-foreground/5 border border-default px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Sector Specialization
          </div>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            DOMINATING <br className="md:hidden" /> NORTH BENGAL.
          </h3>
        </div>
        
        {/* Glassmorphic Target Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
          {industries.map((item, i) => (
            <div key={i} className="group relative p-6 bg-foreground/[0.02] border border-default/50 hover:border-primary/50 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col items-center justify-center gap-5 cursor-default overflow-hidden">
              
              {/* Subtle Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-background border border-default flex items-center justify-center text-2xl text-muted group-hover:text-primary transition-colors duration-300 relative z-10 shadow-sm">
                <i className={`fas ${item.icon}`}></i>
              </div>
              
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center text-foreground relative z-10">
                {item.name}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}