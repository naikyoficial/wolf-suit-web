"use client";

const ITEMS = [
  "Sitios web corporativos",
  "Tiendas online a medida",
  "Landing pages de conversión",
  "SEO técnico",
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
        /* Banda semitransparente — se integra con cualquier fondo de imagen */
        background: "rgba(6,5,4,0.72)",
        backdropFilter: "blur(0px)",
      }}
    >
      {/* Fundidos laterales — usan rgba transparente para no romper el fondo */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "10%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right, rgba(6,5,4,.72), transparent)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "10%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to left, rgba(6,5,4,.72), transparent)" }} />

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
                color: "rgba(200,193,180,.38)",
                whiteSpace: "nowrap",
                padding: "0 clamp(24px, 2.8vw, 48px)",
              }}
            >
              {item}
            </span>
            <span aria-hidden style={{
              width: 3, height: 3, flexShrink: 0,
              background: "rgba(212,160,32,.35)",
              transform: "rotate(45deg)",
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}
