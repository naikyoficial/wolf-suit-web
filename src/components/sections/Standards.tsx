"use client";

import { Reveal } from "@/components/ui/Reveal";
import { STANDARDS } from "@/content";

export function Standards() {
  return (
    <section
      aria-label="Lo que incluye cada proyecto"
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        background: "#0B0A09",
      }}
    >
      <div
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "0 var(--section-px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
        }}
      >
        {STANDARDS.map((st, i) => (
          <Reveal
            key={st.title}
            delay={i * 0.07}
            style={{
              padding: "clamp(28px, 4.5vh, 48px) clamp(12px, 2vw, 28px)",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,.06)" : undefined,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px, 1.4vh, 14px)",
            }}
          >
            {/* Marcador dorado */}
            <span
              aria-hidden
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "linear-gradient(to right, #D4A020, rgba(212,160,32,.3))",
                marginBottom: 4,
              }}
            />

            {/* Título del beneficio */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
                lineHeight: 1.25,
                letterSpacing: "-0.015em",
                color: "rgba(248,245,240,.92)",
                margin: 0,
              }}
            >
              {st.title}
            </p>

            {/* Descripción */}
            <p
              style={{
                fontSize: "clamp(11.5px, 0.82vw, 13px)",
                lineHeight: 1.65,
                color: "var(--color-text-4)",
                margin: 0,
              }}
            >
              {st.desc}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
