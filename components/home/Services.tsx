const services = [
  { title: "SEO & Local Search", desc: "Dominate Google rankings in Siliguri. We optimize your GMB profile so customers find you first.", icon: "fa-search", color: "blue" },
  { title: "Web Design & Dev", desc: "Lightning-fast, mobile-friendly websites designed specifically to convert visitors into leads.", icon: "fa-laptop-code", color: "violet" },
  { title: "Performance Marketing", desc: "Targeted Facebook, Instagram, and Google Ads that deliver instant, trackable ROI.", icon: "fa-bullseye", color: "orange" },
];

export default function Services() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Integrated Digital Solutions.</h3>
          <p className="text-muted text-lg">Predictable growth engines for your business.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border border-default hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:rotate-12 transition-transform">
                <i className={`fas ${s.icon}`}></i>
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{s.title}</h4>
              <p className="text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}