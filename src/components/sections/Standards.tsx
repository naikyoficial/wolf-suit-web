"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { STANDARDS } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

function BenefitCard({
  st,
  index,
}: {
  st: { title: string; desc: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.09 }}
      style={{
        position: "relative",
        padding: "clamp(32px, 4.5vh, 56px) clamp(24px, 3vw, 44px)",
        borderTop: "1px solid rgba(255,255,255,.07)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(14px, 2vh, 20px)",
        overflow: "hidden",
      }}
    >
      {/* Ghost numeral */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "clamp(12px, 2vw, 28px)",
          top: "clamp(12px, 2vh, 24px)",
          fontFamily: "var(--font-body)",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(4rem, 7vw, 7.5rem)",
          lineHeight: 1,
          background: "linear-gradient(180deg, rgba(212,160,32,.11) 0%, rgba(212,160,32,.01) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {num}
      </span>

      {/* Small index */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: ".22em",
          color: "var(--color-gold)",
          display: "block",
        }}
      >
        {num}
      </span>

      {/* Gold accent bar */}
      <span
        aria-hidden
        style={{
          display: "block",
          width: "clamp(28px, 3vw, 40px)",
          height: 1,
          background: GOLD,
          marginTop: -4,
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)",
          lineHeight: 1.18,
          letterSpacing: "-0.025em",
          color: "rgba(248,245,240,.95)",
          margin: 0,
          maxWidth: "18em",
        }}
      >
        {st.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "clamp(13px, 0.9vw, 14.5px)",
          lineHeight: 1.72,
          color: "var(--color-text-3)",
          margin: 0,
          maxWidth: "32em",
        }}
      >
        {st.desc}
      </p>
    </motion.div>
  );
}

export function Standards() {
  return (
    <section
      aria-label="Lo que incluye cada proyecto"
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        background: "#0A0908",
      }}
    >
      <div
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "var(--section-py) var(--section-px)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px, 2.5vh, 24px)",
            marginBottom: "clamp(52px, 8vh, 88px)",
          }}
        >
          <Reveal>
            <p className="section-index">04 — Estándares</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(1.9rem, 3vw, 2.75rem)",
                lineHeight: 1.14,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                margin: 0,
                maxWidth: "20em",
              }}
            >
              Todo lo que incluye{" "}
              <span
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  fontWeight: 400,
                  background: GOLD,
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                cada proyecto.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                fontSize: "clamp(14px, 1.02vw, 16px)",
                lineHeight: 1.72,
                color: "var(--color-text-3)",
                margin: 0,
                maxWidth: "40em",
              }}
            >
              No son extras ni upgrades — son el punto de partida. Cada sitio que construimos cumple estos estándares sin excepción.
            </p>
          </Reveal>
        </div>

        {/* Benefit grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 0,
            borderLeft: "1px solid rgba(255,255,255,.07)",
            borderRight: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {STANDARDS.map((st, i) => (
            <div
              key={st.title}
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,.07)" : undefined,
              }}
            >
              <BenefitCard st={st} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
