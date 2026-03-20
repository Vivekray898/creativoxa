const faqs = [
  { q: "Why is local SEO important for Siliguri?", a: "Local SEO targets customers right in your neighborhood. When someone searches 'Best Cafe in Siliguri', we make sure you're at the top." },
  { q: "How long does it take to see results?", a: "Paid ads show results in 48 hours. SEO takes 3-6 months for sustainable, long-term organic growth." },
  { q: "Do you offer custom packages?", a: "Yes. Every business is different. We audit your needs and provide a custom quote tailored to your growth goals." }
];

export default function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold uppercase text-sm mb-3">FAQ</h2>
          <h3 className="text-3xl font-extrabold text-foreground">Your Questions, Answered.</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-background rounded-xl border border-default open:bg-background/90 open:ring-2 open:ring-primary/20 transition-all">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-foreground">
                {f.q}
                <span className="transition group-open:rotate-180"><i className="fas fa-chevron-down text-primary"></i></span>
              </summary>
              <div className="px-6 pb-6 text-muted text-sm">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}