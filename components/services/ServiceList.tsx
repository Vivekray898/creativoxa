const services = [
  {
    id: "01",
    title: "Performance Web Design",
    desc: "We build websites that load in under 2 seconds and guide users toward the 'Buy' button. No templates, no bloat—just pure performance.",
    features: ["Conversion Rate Optimization", "Next.js & React Architecture", "E-commerce Solutions", "Speed Optimization"],
    icon: "fa-laptop-code"
  },
  {
    id: "02",
    title: "Search Authority (SEO)",
    desc: "Rank #1 for the keywords that actually drive money. We specialize in Local SEO for Siliguri businesses and National SEO for E-commerce.",
    features: ["Local GMB Domination", "Technical SEO Audits", "Authority Backlink Building", "Content Strategy"],
    icon: "fa-search-dollar"
  },
  {
    id: "03",
    title: "Revenue Marketing",
    desc: "Paid Ads shouldn't be an expense; they should be an investment. We manage high-scale Meta and Google Ad campaigns with a focus on ROAS.",
    features: ["Meta (FB/IG) Ads", "Google Search & Shopping", "Retargeting Funnels", "Copywriting & Creative"],
    icon: "fa-chart-line"
  },
  {
    id: "04",
    title: "Visual Storytelling",
    desc: "In a world of noise, high-quality video stands out. We provide professional videography and social content that builds brand prestige.",
    features: ["Brand Documentaries", "Commercial Videography", "Social Media Management", "Graphic Design"],
    icon: "fa-video"
  }
];

export default function ServiceList() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-32">
          {services.map((s, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-1 text-primary font-black text-2xl opacity-70">
                {s.id}
              </div>
              <div className="lg:col-span-5">
                <h3 className="text-4xl font-black tracking-tight mb-6">{s.title}</h3>
                <p className="text-muted text-lg leading-relaxed mb-8">{s.desc}</p>
                <div className="w-16 h-1 bg-primary"></div>
              </div>
              <div className="lg:col-span-6 bg-background p-8 md:p-12 rounded-3xl border border-default">
                <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">What's Included</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {s.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <i className="fas fa-check text-primary text-[10px]"></i>
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