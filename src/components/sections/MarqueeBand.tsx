"use client";

const WORDS = ["Percepción", "Autoridad", "Conversión", "Precisión", "Nivel"];

/* Banda editorial — palabras gigantes en contorno desfilando en loop infinito.
   Cada segunda palabra va en itálica dorada llena para romper la monotonía. */
export function MarqueeBand() {
  // El track se duplica para que el loop de translateX(-50%) sea perfecto
  const track = [...WORDS, ...WORDS];

  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(28px, 4vh, 48px) 0",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        background: "#0A0A0A",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "clamp(40px, 5vw, 90px)",
          width: "max-content",
          animation: "marqueeSlow 36s linear infinite",
          willChange: "transform",
          paddingLeft: "clamp(40px, 5vw, 90px)",
        }}
      >
        {track.map((word, i) => (
          <span key={i} style={{ display: "flex", alignItems: "baseline", gap: "clamp(40px, 5vw, 90px)", flexShrink: 0 }}>
            <span
              className={i % 2 === 1 ? undefined : "text-outline"}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.4rem, 7vw, 7rem)",
                lineHeight: 1,
                whiteSpace: "nowrap",
                ...(i % 2 === 1
                  ? {
                      fontStyle: "italic",
                      background: "linear-gradient(95deg, #A87214 0%, #D4A020 40%, #F0CC50 55%, #D4A020 70%, #A87214 100%)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : {}),
              }}
            >
              {word}
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "rgba(212,160,32,.4)",
                flexShrink: 0,
                alignSelf: "center",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
