export default function AboutHero() {
  return (
    <section className="relative bg-background py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
          We didn’t start an agency.<br />
          <span className="text-primary">
            We started a movement.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
          Creativoxa was born out of a simple frustration: Siliguri businesses were being sold "vanity metrics" instead of actual revenue. We’re here to change that.
        </p>
      </div>
    </section>
  );
}