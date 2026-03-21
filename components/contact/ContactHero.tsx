export default function ContactHero() {
  return (
    <section className="bg-background py-20 text-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] -z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          Let’s Build Your <br />
          <span className="text-primary">Digital Empire.</span>
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
          Stop wondering why your competitors are ahead. Book a consultation today and get a clear roadmap to dominate your local market in Siliguri.
        </p>
      </div>
    </section>
  );
}