export default function Stats() {
  const stats = [
    { label: "Ad Spend Managed", value: "₹50L+" },
    { label: "Leads Generated", value: "12,000+" },
    { label: "Local Partners", value: "65+" },
    { label: "Coffee Consumed", value: "∞" },
  ];

  return (
    <div className="bg-background py-12 border-b border-default">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted font-semibold uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}