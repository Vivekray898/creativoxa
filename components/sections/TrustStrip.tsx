import { Container } from "@/components/ui/primitives";

const platforms = [
  "Google",
  "Meta",
  "Instagram",
  "Facebook",
  "Google Business Profile",
  "IndiaMART",
  "Website",
  "Content",
  "SEO",
];

export default function TrustStrip() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-sm text-sm font-medium leading-relaxed text-muted">
            Built for businesses that want their digital presence to work harder — across the
            platforms your customers already use.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {platforms.map((p) => (
              <li
                key={p}
                className="text-sm font-semibold tracking-tight text-faint transition-colors hover:text-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
