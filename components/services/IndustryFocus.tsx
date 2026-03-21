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
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">Market Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter">Tailored for North Bengal.</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {industries.map((item, i) => (
            <div key={i} className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-background border border-default flex items-center justify-center text-2xl mb-4 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-2 transition-all duration-300">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}