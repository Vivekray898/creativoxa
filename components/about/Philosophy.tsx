export default function Philosophy() {
  const pillars = [
    {
      title: "ROI > Vanity Metrics",
      desc: "We don't care about Instagram likes if they don't turn into bank deposits. Every system we deploy is strictly tied to your bottom line.",
      icon: "fa-chart-line"
    },
    {
      title: "The 1% Rule",
      desc: "We only partner with a handful of clients at a time. This ensures your business gets dedicated 'Deep Work', not a copy-pasted template.",
      icon: "fa-gem"
    },
    {
      title: "Local Pulse, Global Tech",
      desc: "We utilize the exact same high-end tech stacks as Silicon Valley agencies, but with a ground-level understanding of the Siliguri market.",
      icon: "fa-microchip"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative z-10 border-t border-default/30">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">The Creativoxa Protocol</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">Operating Principles.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div key={i} className="group relative p-8 md:p-10 bg-foreground/[0.02] border border-default/50 hover:border-primary/50 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 backdrop-blur-xl overflow-hidden">
              
              {/* Decorative Glowing Orb */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>

              <div className="w-14 h-14 rounded-2xl bg-background border border-default flex items-center justify-center mb-8 text-muted group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                <i className={`fas ${p.icon} text-xl`}></i>
              </div>
              
              <h4 className="text-2xl font-black tracking-tight text-foreground mb-4 relative z-10">{p.title}</h4>
              <p className="text-muted text-sm font-medium leading-relaxed relative z-10">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}