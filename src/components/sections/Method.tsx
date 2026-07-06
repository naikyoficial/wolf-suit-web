"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { METHOD_INTRO, METHOD_STEPS } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

function Step({ step, isLast }: { step: (typeof METHOD_STEPS)[number]; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-36% 0px -36% 0px" });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        overflow: "visible",
        paddingLeft: "clamp(24px, 3vw, 48px)",
        paddingBottom: isLast ? 0 : "clamp(44px, 8vh, 96px)",
      }}
    >
      {/* Riel vertical */}
      <span aria-hidden style={{
        position: "absolute", left: 0, top: 12, bottom: 0,
        width: 1,
        background: isLast ? "transparent" : "rgba(255,255,255,.1)",
      }} />
      <motion.span
        aria-hidden
        animate={{
          background: inView ? "#D4A020" : "rgba(255,255,255,.18)",
          scale: inView ? 1 : 0.65,
          boxShadow: inView ? "0 0 14px rgba(212,160,32,.45)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          position: "absolute", left: -3.5, top: 10,
          width: 8, height: 8, borderRadius: "50%",
        }}
      />

      {/* Numeral fantasma — color sólido (background-clip: text recorta el
          voladizo de la itálica y desvanece el glifo a transparente) */}
      <motion.span
        aria-hidden
        animate={{ opacity: inView ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          right: "clamp(8px, 1vw, 14px)", top: "-0.12em",
          fontFamily: "var(--font-body)",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(2.8rem, 5vw, 5rem)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          color: inView ? "rgba(212,160,32,.32)" : "rgba(255,255,255,.06)",
          transition: "color .5s",
        }}
      >
        {step.num}
      </motion.span>

      <motion.h3
        animate={{ color: inView ? "rgba(248,245,240,.96)" : "rgba(248,245,240,.38)" }}
        transition={{ duration: 0.45 }}
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
          lineHeight: 1.18,
          letterSpacing: "-0.022em",
          margin: 0,
          marginBottom: "clamp(12px, 1.8vh, 20px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {step.name}
      </motion.h3>

      <motion.p
        animate={{ color: inView ? "#ABA8A2" : "#4A4744" }}
        transition={{ duration: 0.45 }}
        style={{
          fontSize: "clamp(14px, 1.02vw, 16px)",
          lineHeight: 1.72,
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

export function Method() {
  return (
    <section
      id="metodo"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Image
        src="/background2.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 50%" }}
        priority={false}
      />

      {/* Dark overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "rgba(4,3,2,.80)",
        zIndex: 1,
      }} />

      {/* Perimeter vignette */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(3,2,1,.65) 100%)",
        zIndex: 1,
      }} />

      {/* Top fade */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "40%",
        background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* Bottom fade */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "40%",
        background: "linear-gradient(to top, rgba(6,5,4,1) 0%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "var(--section-py) var(--section-px)",
        }}
      >
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 68px)" }}>
            05 — Método
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]" style={{ gap: "clamp(48px, 6vw, 110px)", alignItems: "start", overflow: "visible" }}>
          {/* Columna izquierda — sticky */}
          <div className="lg:sticky lg:top-[120px]">
            <Reveal>
              <h2
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
                  lineHeight: 1.16,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text)",
                  margin: 0,
                  marginBottom: "clamp(20px, 3vh, 32px)",
                }}
              >
                Nada queda{" "}
                <span style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  background: GOLD,
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  librado al azar.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{
                fontSize: "clamp(14px, 1.02vw, 16px)",
                lineHeight: 1.72,
                color: "var(--color-text-3)",
                margin: 0,
              }}>
                {METHOD_INTRO.aside}
              </p>
            </Reveal>
          </div>

          {/* Pasos */}
          <div style={{ overflow: "visible" }}>
            {METHOD_STEPS.map((step, i) => (
              <Step key={step.num} step={step} isLast={i === METHOD_STEPS.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
