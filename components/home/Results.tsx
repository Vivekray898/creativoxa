export default function Results() {
  const stats = [
    { label: "Increase in Organic Traffic", value: "147%", sub: "for a local Siliguri brand in 3 months." },
    { label: "Revenue from One Campaign", value: "₹2.5L+", sub: "for an e-commerce client using Google Ads." },
    { label: "Higher Lead Conversion", value: "4X", sub: "after our website redesign and CRO." }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Proven Results</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground">We Deliver Results That Matter.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="bg-background p-10 rounded-2xl border border-default hover:scale-105 transition-transform duration-300">
              <p className="font-extrabold text-5xl text-primary mb-2">
                {stat.value}
              </p>
              <h4 className="font-bold text-lg text-foreground">{stat.label}</h4>
              <p className="text-sm text-muted mt-2">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}