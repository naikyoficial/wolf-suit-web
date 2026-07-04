"use client";

const ITEMS = [
  "Sitios web corporativos",
  "Tiendas online a medida",
  "Landing pages de conversión",
  "Aplicaciones web & SaaS",
  "SEO técnico",
  "Software a medida",
  "Identidad digital",
];

export function MarqueeBand() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(14px, 2vh, 20px) 0",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        background: "#0C0B09",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "10%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right, #0C0B09, transparent)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "10%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to left, #0C0B09, transparent)" }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: "marqueeSlow 48s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(10px, 0.85vw, 12px)",
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "rgba(200,193,180,.42)",
                whiteSpace: "nowrap",
                padding: "0 clamp(24px, 2.8vw, 48px)",
              }}
            >
              {item}
            </span>
            <span aria-hidden style={{
              width: 3, height: 3, flexShrink: 0,
              background: "rgba(212,160,32,.4)",
              transform: "rotate(45deg)",
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}
