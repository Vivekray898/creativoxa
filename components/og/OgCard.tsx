import { site } from "@/lib/site";

/**
 * Shared frame for every generated OpenGraph card, so the default card and the
 * per-route cards stay visually consistent.
 *
 * Only inline styles are used: `ImageResponse` (Satori) has no access to the
 * project's CSS, and the brand font is not loadable inside the edge runtime.
 */
export default function OgCard({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: "72px",
        fontFamily: "sans-serif",
        borderTop: "12px solid #111827",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 28, color: "#6b7280", letterSpacing: 2, display: "flex" }}>
          {eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: title.length > 60 ? 56 : 68,
            lineHeight: 1.12,
            fontWeight: 700,
            color: "#111827",
            display: "flex",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 22,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#4b5563",
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 28,
          color: "#111827",
        }}
      >
        <div style={{ display: "flex", fontWeight: 600 }}>{site.name}</div>
        <div style={{ display: "flex", color: "#9ca3af" }}>•</div>
        <div style={{ display: "flex" }}>
          {site.address.city}, {site.address.region}
        </div>
        <div style={{ display: "flex", color: "#9ca3af" }}>•</div>
        <div style={{ display: "flex" }}>{footer ?? "creativeoxa.com"}</div>
      </div>
    </div>
  );
}