"use client";

const ITEMS = ["PERCEPCIÓN", "AUTORIDAD", "EXCELENCIA", "ESTRATEGIA", "DISEÑO", "TECNOLOGÍA", "CRITERIO", "PRECISIÓN"];
const TRACK = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

export function Marquee() {
  return (
    <div
      aria-hidden
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(178,192,204,.08)",
        borderBottom: "1px solid rgba(178,192,204,.08)",
        padding: "14px 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "3rem",
          width: "max-content",
          animation: "marquee 28s linear infinite",
        }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: 10,
              letterSpacing: ".42em",
              textTransform: "uppercase",
              color: "rgba(178,192,204,.35)",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-body)",
            }}
          >
            {item}
            <span style={{ marginLeft: "3rem", opacity: .5 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
