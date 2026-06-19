"use client";

import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export function Duality() {
  const isMobile = useMobile();
  return (
    <section
      id="duality"
      className="relative"
      style={{
        padding: "clamp(48px, 7vh, 160px) clamp(1.5rem, 8vw, 7.5rem)",
        zIndex: 10,
        background: "rgba(7,6,4,.8)",
        textAlign: "center",
      }}
    >
      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(140,85,5,.08) 0%, transparent 70%)",
      }} />
      {/* Top fade */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 20,
      }} />
      {/* Bottom fade */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 20,
      }} />

      <div className="w-full max-w-[1100px] mx-auto" style={{ position: "relative", zIndex: 1 }}>

        {/* Eyebrow */}
        <Reveal y={16} blur={4} style={{ marginBottom: "clamp(24px, 3.5vh, 52px)" }}>
          <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
            Dualidad
          </ShimmerLabel>
        </Reveal>

        {/* Line 1 — contrast statement */}
        <div style={{ marginBottom: 12 }}>
          <SplitWords
            as="h2"
            delay={0}
            stagger={0.032}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.5vw, 80px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-.03em",
              color: "var(--color-text-2)",
            }}
          >
            Una empresa pequeña puede parecer líder de su sector.
          </SplitWords>
        </div>

        {/* Line 2 — counter — gold shimmer */}
        <div style={{ marginBottom: "clamp(16px, 2.5vh, 40px)" }}>
          <SplitWords
            as="h2"
            delay={0.12}
            stagger={0.028}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.5vw, 80px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-.03em",
              background: GOLD,
              backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 10s ease-in-out infinite",
            }}
          >
            Una gran empresa puede parecer amateur.
          </SplitWords>
        </div>

        {/* Pivot line */}
        <div style={{ marginBottom: "clamp(22px, 3.5vh, 56px)" }}>
          <SplitWords
            as="p"
            delay={0.22}
            stagger={0.025}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.2vw, 30px)",
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: "-.015em",
              color: "rgba(240,235,225,.6)",
            }}
          >
            La diferencia está en cómo se presenta al mundo.
          </SplitWords>
        </div>

        {/* Gold line — animated draw */}
        <Reveal delay={0.6} y={0} blur={0} style={{ marginBottom: "clamp(18px, 2.8vh, 44px)" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } : { duration: 1.1, delay: 0.7, ease: EASE }}
            style={{
              width: 44, height: 1, margin: "0 auto",
              background: GOLD,
              backgroundSize: "260% 100%",
              animation: "metalShimmer 8s ease-in-out infinite",
              transformOrigin: "center",
            }}
          />
        </Reveal>

        {/* Narrative paragraph */}
        <Reveal delay={0.75} y={24} blur={6} style={{ marginBottom: "clamp(24px, 4vh, 64px)" }}>
          <p style={{
            fontSize: 17,
            color: "var(--color-text-3)",
            lineHeight: 1.85,
            maxWidth: 560,
            margin: "0 auto",
            letterSpacing: "-.01em",
          }}>
            Transformamos tu identidad digital en una herramienta de autoridad.
            Diseño que justifica tu valor. Posicionamiento que abre oportunidades
            que el precio solo no puede abrir.
          </p>
        </Reveal>

        {/* Closing statement */}
        <Reveal delay={0.95} y={20} blur={5}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.4vw, 32px)",
            fontWeight: 300,
            color: "rgba(236,232,223,.55)",
            letterSpacing: "-.01em",
            lineHeight: 1.3,
            maxWidth: 680,
            margin: "0 auto",
          }}>
            Tu empresa no necesita ser la número uno para verse como tal.
            Solo necesita el traje correcto.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
