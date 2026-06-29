"use client";

interface ArticleImageProps {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "square" | "portrait";
}

const ASPECTS: Record<string, number> = {
  wide: 56.25,     // 16:9
  square: 100,     // 1:1
  portrait: 133.3, // 3:4
};

export function ArticleImage({ src, alt, caption, aspect = "wide" }: ArticleImageProps) {
  const pb = ASPECTS[aspect];

  return (
    <figure style={{ margin: "clamp(36px,5vh,56px) 0" }}>
      <div style={{
        position: "relative",
        paddingBottom: `${pb}%`,
        overflow: "hidden",
        border: src ? "1px solid rgba(212,160,32,.12)" : "1px dashed rgba(212,160,32,.25)",
        background: src ? undefined : "rgba(212,160,32,.02)",
      }}>
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 14,
            padding: "clamp(24px,4vw,40px)",
          }}>
            {/* Camera icon */}
            <svg width="32" height="28" viewBox="0 0 32 28" fill="none" style={{ opacity: 0.25 }}>
              <rect x="1" y="6" width="30" height="21" rx="2" stroke="rgba(212,160,32,.8)" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="6" stroke="rgba(212,160,32,.8)" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="3" fill="rgba(212,160,32,.3)" />
              <rect x="9" y="1" width="14" height="6" rx="1" stroke="rgba(212,160,32,.8)" strokeWidth="1.5" />
            </svg>
            <div style={{ textAlign: "center", maxWidth: 420 }}>
              <p style={{
                fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
                color: "rgba(212,160,32,.35)", marginBottom: 8,
              }}>
                Imagen recomendada
              </p>
              <p style={{
                fontSize: 13,
                color: "rgba(180,174,164,.35)",
                lineHeight: 1.7,
                margin: 0,
              }}>
                {alt}
              </p>
            </div>
          </div>
        )}
      </div>

      {caption && (
        <figcaption style={{
          marginTop: 12,
          fontSize: 11,
          letterSpacing: ".06em",
          color: "rgba(160,155,145,.38)",
          textAlign: "center",
          lineHeight: 1.6,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
