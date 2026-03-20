export default function Philosophy() {
  const pillars = [
    {
      title: "ROI > Likes",
      desc: "We don't care about Instagram likes if they don't turn into bank deposits. Every strategy we build is tied to your bottom line.",
      icon: "fa-chart-line"
    },
    {
      title: "The 1% Rule",
      desc: "We only work with a handful of clients at a time. This ensures your business gets the 'Deep Work' it deserves, not a template.",
      icon: "fa-gem"
    },
    {
      title: "Local Pulse, Global Tech",
      desc: "We use the same high-end tools as Silicon Valley agencies, but with the ground-level understanding of the Siliguri market.",
      icon: "fa-microchip"
    }
  ];

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">The Creativoxa Way</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Our Performance Philosophy</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((p, i) => (
            <div key={i} className="bg-background p-8 rounded-2xl border border-default hover:border-primary transition-colors">
              <div className="text-primary text-3xl mb-6"><i className={`fas ${p.icon}`}></i></div>
              <h4 className="text-xl font-bold text-foreground mb-4">{p.title}</h4>
              <p className="text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}