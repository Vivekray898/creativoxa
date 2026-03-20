export default function WhyChooseUs() {
  const points = [
    { title: "Local Market Intel", desc: "We know the North Bengal audience better than any 'big city' agency.", icon: "fa-map-marker-alt" },
    { title: "Data-Driven Only", desc: "No guesswork. We use heatmaps and analytics to track every single rupee.", icon: "fa-chart-pie" },
    { title: "No Long Contracts", desc: "We believe in earning your business every month through actual results.", icon: "fa-file-signature" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-primary font-bold uppercase text-sm mb-3">Why Work With Us</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Built by Strategists, Not Just Designers.</h3>
            <p className="text-muted mb-8">Most agencies focus on making things look "pretty." We focus on making things "sell." Our approach combines psychology with high-end tech.</p>
            <div className="space-y-6">
              {points.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                    <i className={`fas ${p.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{p.title}</h4>
                    <p className="text-muted text-sm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background rounded-3xl p-8 relative border border-default">
             <div className="absolute -top-4 -right-4 bg-primary text-white p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold italic">"Best in Siliguri"</p>
                <p className="text-sm opacity-80">- Multiple Client Awards</p>
             </div>
             <img src="/images/strategy-meeting.webp" alt="Creativoxa Strategy" className="rounded-2xl w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}