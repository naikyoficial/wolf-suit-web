"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { METHOD_INTRO, METHOD_STEPS } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

function Step({ step, isLast }: { step: (typeof METHOD_STEPS)[number]; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-38% 0px -38% 0px" });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        paddingLeft: "clamp(28px, 3.4vw, 56px)",
        paddingBottom: isLast ? 0 : "clamp(52px, 9vh, 110px)",
      }}
    >
      {/* Riel vertical + nodo */}
      <span aria-hidden style={{
        position: "absolute", left: 0, top: 10, bottom: 0,
        width: 1,
        background: isLast ? "transparent" : "rgba(255,255,255,.08)",
      }} />
      <motion.span
        aria-hidden
        animate={{
          background: inView ? "#D4A020" : "rgba(255,255,255,.18)",
          scale: inView ? 1 : 0.6,
          boxShadow: inView ? "0 0 18px rgba(212,160,32,.5)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: "absolute", left: -3.5, top: 8,
          width: 8, height: 8, borderRadius: "50%",
        }}
      />

      {/* Numeral fantasma */}
      <motion.span
        aria-hidden
        animate={{ opacity: inView ? 1 : 0.28 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          right: 0,
          top: "-0.28em",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(4.4rem, 9vw, 9rem)",
          lineHeight: 1,
          pointerEvents: "none",
          ...(inView
            ? {
                background: "linear-gradient(180deg, rgba(212,160,32,.34) 0%, rgba(212,160,32,.04) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : { color: "rgba(255,255,255,.05)" }),
        }}
      >
        {step.num}
      </motion.span>

      <motion.h3
        animate={{ color: inView ? "rgba(248,245,240,.98)" : "rgba(248,245,240,.42)" }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.9rem, 3.6vw, 3.2rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: 0,
          marginBottom: "clamp(14px, 2vh, 22px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {step.name}
      </motion.h3>

      <motion.p
        animate={{ color: inView ? "#ABA8A2" : "#6B6862" }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "clamp(14px, 1.05vw, 16px)",
          lineHeight: 1.75,
          maxWidth: "30em",
          margin: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {step.body}
      </motion.p>
    </div>
  );
}

/* 04 — Método. Encabezado sticky a la izquierda; los cinco pasos se
   encienden a medida que atraviesan el centro del viewport. */
export function Method() {
  return (
    <section
      id="metodo"
      style={{
        position: "relative",
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 72px)" }}>
          04 — Método
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]" style={{ gap: "clamp(48px, 6vw, 110px)", alignItems: "start" }}>
        {/* Columna izquierda — sticky en desktop */}
        <div className="lg:sticky lg:top-[120px]">
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.6vw, 4.2rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                color: "var(--color-text)",
                margin: 0,
                marginBottom: "clamp(22px, 3.4vh, 36px)",
                maxWidth: "10em",
              }}
            >
              La excelencia no es un objetivo;{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(95deg, #B8820A 0%, #D4A020 30%, #F0CC50 50%, #D4A020 70%, #B8820A 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingRight: "0.06em",
              }}>
                es el punto de partida.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{
              fontSize: "clamp(14px, 1.05vw, 16px)",
              lineHeight: 1.75,
              color: "var(--color-text-3)",
              maxWidth: "30em",
              margin: 0,
            }}>
              {METHOD_INTRO.aside}
            </p>
          </Reveal>
        </div>

        {/* Columna derecha — pasos */}
        <div>
          {METHOD_STEPS.map((step, i) => (
            <Step key={step.num} step={step} isLast={i === METHOD_STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
