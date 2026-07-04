"use client";

import { Reveal } from "@/components/ui/Reveal";
import { STANDARDS } from "@/content";

export function Standards() {
  return (
    <section
      aria-label="Estándares de Suitwolf"
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        background: "#0B0A09",
      }}
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "0 var(--section-px)",
        }}
      >
        {STANDARDS.map((st, i) => (
          <Reveal
            key={st.label}
            delay={i * 0.07}
            className={i > 0 ? "lg:border-l" : undefined}
            style={{
              padding: "clamp(32px, 5.5vh, 58px) clamp(12px, 2vw, 32px)",
              borderLeftColor: "rgba(255,255,255,.06)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 4.4vw, 4rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                margin: 0,
                marginBottom: 10,
                background: "linear-gradient(180deg, #F0CC50 0%, #D4A020 55%, #A87214 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {st.value}
              {st.suffix && (
                <span style={{ fontSize: "0.52em", verticalAlign: "0.3em", marginLeft: "0.06em" }}>{st.suffix}</span>
              )}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(9.5px, 0.78vw, 11px)",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(248,245,240,.72)",
                margin: 0,
                marginBottom: 7,
              }}
            >
              {st.label}
            </p>
            <p
              style={{
                fontSize: "clamp(11.5px, 0.85vw, 13px)",
                lineHeight: 1.55,
                color: "var(--color-text-4)",
                margin: 0,
              }}
            >
              {st.note}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
