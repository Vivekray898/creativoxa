export default function TrustLogos() {
  const brands = ["SpiceNest", "HimalayanStays", "SiliguriRetail", "EduCare Hub", "CityHealth"];
  
  return (
    <section className="bg-background py-10 border-b border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-6">
          Trusted by 50+ Growing Brands in North Bengal
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <h3 key={brand} className="text-2xl font-bold text-foreground hover:text-primary cursor-default transition-colors">
              {brand}
            </h3>
          ))}
        </div>
      </div>
    </section>
  );
}