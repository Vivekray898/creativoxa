const services = [
  {
    id: "01",
    title: "Performance Web Architecture",
    desc: "We build digital platforms that load in under 2 seconds and guide users directly toward the 'Buy' button. No templates, no bloat—just pure conversion performance.",
    features: ["Conversion Rate Optimization", "Next.js & React Architecture", "E-commerce Solutions", "Sub-second Load Times"],
    icon: "fa-laptop-code"
  },
  {
    id: "02",
    title: "Search Authority (SEO)",
    desc: "Rank #1 for the keywords that actually drive revenue. We engineer dominance in Local SEO for Siliguri businesses and National SEO for E-commerce.",
    features: ["Local GMB Domination", "Technical SEO Audits", "Authority Backlink Building", "Data-Driven Content Strategy"],
    icon: "fa-search-dollar"
  },
  {
    id: "03",
    title: "Revenue Marketing",
    desc: "Paid Ads shouldn't be an expense; they should be a scalable investment. We manage high-budget Meta and Google Ad systems strictly focused on ROAS.",
    features: ["Meta (FB/IG) Ad Systems", "Google Search & Shopping", "Omnichannel Retargeting", "High-Converting Creative"],
    icon: "fa-chart-line"
  },
  {
    id: "04",
    title: "Visual Storytelling",
    desc: "In a market of endless noise, high-production visual assets stand out. We provide professional videography that establishes immediate brand authority.",
    features: ["Brand Documentaries", "Commercial Videography", "Social Media Authority", "Premium Graphic Design"],
    icon: "fa-video"
  }
];

export default function ServiceList() {
  return (
    <section className="py-24 lg:py-40 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-32 md:space-y-48">
          {services.map((s, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start group">
              
              {/* 🧱 Left: Sticky Details Context */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 relative">
                {/* Background Number Ghost */}
                <div className="text-primary font-black text-6xl md:text-[8rem] opacity-10 group-hover:opacity-100 transition-opacity duration-700 absolute -top-10 md:-top-16 -left-4 -z-10 tracking-tighter leading-none">
                  {s.id}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-foreground">{s.title}</h3>
                <p className="text-muted text-lg font-medium leading-relaxed mb-8">{s.desc}</p>
                <div className="h-1.5 w-16 bg-foreground/10 group-hover:bg-primary transition-colors duration-500 rounded-full"></div>
              </div>
              
              {/* 📊 Right: Glassmorphic Specification Widget */}
              <div className="lg:col-span-7 bg-foreground/[0.02] p-8 md:p-12 rounded-[2.5rem] border border-default/50 hover:border-default transition-colors duration-500 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                
                {/* Internal Hover Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>
                
                <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-xs text-primary flex items-center gap-3">
                  <i className={`fas ${s.icon}`}></i> Included Specifications
                </h4>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 relative z-10">
                  {s.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm font-bold text-foreground tracking-wide">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                        <i className="fas fa-check text-primary text-[10px]"></i>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}