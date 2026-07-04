"use client";

/* Ticker de capacidades concretas — desfila en loop continuo.
   Reemplaza los sustantivos abstractos por servicios reales: se lee
   intencional y refuerza las keywords del negocio. */

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
        padding: "clamp(20px, 3vh, 30px) 0",
        borderTop: "1px solid rgba(255,255,255,.07)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        background: "#0A0908",
      }}
    >
      {/* Fundidos laterales para que el loop entre y salga suave */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "12%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right, #0A0908, transparent)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "12%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to left, #0A0908, transparent)" }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: "marqueeSlow 42s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
                letterSpacing: "0.01em",
                color: "rgba(236,232,223,.62)",
                whiteSpace: "nowrap",
                padding: "0 clamp(26px, 3vw, 52px)",
              }}
            >
              {item}
            </span>
            <span aria-hidden style={{
              width: 5, height: 5, flexShrink: 0,
              background: "rgba(212,160,32,.55)",
              transform: "rotate(45deg)",
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}
