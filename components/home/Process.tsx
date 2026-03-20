export default function Process() {
  const steps = [
    { title: "Discovery", desc: "We audit your current online presence and understand your business goals." },
    { title: "Strategy", desc: "We build a custom, step-by-step digital roadmap tailored to your budget." },
    { title: "Execution", desc: "Our in-house experts build the assets, write the content, and launch campaigns." },
    { title: "Scale & Report", desc: "We track data, send transparent reports, and optimize for higher ROI." }
  ];

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Our Process</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-16">Transparent steps for transparent results.</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-4 border-default z-10 relative">
                {i + 1}
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{step.title}</h4>
              <p className="text-muted text-sm">{step.desc}</p>
              {/* Optional Connector Line for Desktop */}
              {i < 3 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-default -z-0"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}