"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

/* Corner tick helper — renders two border sides only */
function CornerTick({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const size = 22;
  const color = "1px solid #b8954c";
  const style: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderTop:    (pos === "tl" || pos === "tr") ? color : undefined,
    borderBottom: (pos === "bl" || pos === "br") ? color : undefined,
    borderLeft:   (pos === "tl" || pos === "bl") ? color : undefined,
    borderRight:  (pos === "tr" || pos === "br") ? color : undefined,
    top:    (pos === "tl" || pos === "tr") ? -1 : undefined,
    bottom: (pos === "bl" || pos === "br") ? -1 : undefined,
    left:   (pos === "tl" || pos === "bl") ? -1 : undefined,
    right:  (pos === "tr" || pos === "br") ? -1 : undefined,
  };
  return <span aria-hidden style={style} />;
}

export function Duality() {
  const isMobile = useMobile();
  return (
    <section
      id="duality"
      className="relative"
      style={{
        paddingBlock: "clamp(80px, 12vh, 180px)",
        paddingInline: "clamp(1.5rem, 8vw, 7.5rem)",
        zIndex: 10,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image — full opacity so it's actually visible */}
      <Image
        src="/dualidad-bg.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        aria-hidden
      />

      {/* Dark overlay — replaces the old section background, sits on top of image */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "rgba(7,6,4,.78)",
      }} />

      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(140,85,5,.07) 0%, transparent 70%)",
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

      {/* ── Architectural frame ── */}
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          background: "linear-gradient(160deg, #161616, #0e0e0e)",
          border: "1px solid #262626",
          padding: "clamp(48px, 7vw, 100px) clamp(28px, 7vw, 90px)",
        }}
      >
        {/* Radial glow behind frame content */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 30%, rgba(194,152,74,.05), transparent 60%)",
          borderRadius: "inherit",
        }} />

        {/* Corner ticks */}
        <CornerTick pos="tl" />
        <CornerTick pos="tr" />
        <CornerTick pos="bl" />
        <CornerTick pos="br" />

        {/* Vertical accent line — centered at top of frame */}
        <div aria-hidden style={{
          position: "absolute",
          top: -36,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1,
          height: 36,
          background: "linear-gradient(to bottom, transparent, #b8954c)",
        }} />

        {/* Eyebrow */}
        <Reveal y={16} blur={4} style={{ marginBottom: "clamp(24px, 3.5vh, 52px)", position: "relative", zIndex: 1 }}>
          <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
            Dualidad
          </ShimmerLabel>
        </Reveal>

        {/* Line 1 — dimmed / receding */}
        <div style={{ marginBottom: 10, position: "relative", zIndex: 1 }}>
          <SplitWords
            as="h2"
            delay={0}
            stagger={0.032}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5.4vw, 76px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-.03em",
              color: "#56544f",
            }}
          >
            Una empresa pequeña puede parecer líder de su sector.
          </SplitWords>
        </div>

        {/* Line 2 — dominant / white */}
        <div style={{ marginBottom: "clamp(20px, 3vh, 48px)", position: "relative", zIndex: 1 }}>
          <SplitWords
            as="h2"
            delay={0.12}
            stagger={0.028}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5.6vw, 82px)",
              fontWeight: 700,
              lineHeight: 1.03,
              letterSpacing: "-.03em",
              color: "#f5f3ef",
            }}
          >
            Una gran empresa puede parecer amateur.
          </SplitWords>
        </div>

        {/* Gold separator — short, centered, between line 2 and pivot */}
        <Reveal delay={0.45} y={0} blur={0} style={{ marginBottom: "clamp(20px, 3vh, 48px)", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } : { duration: 1.1, delay: 0.5, ease: EASE }}
            style={{
              width: 44, height: 1, margin: "0 auto",
              background: "linear-gradient(90deg, transparent, #c2984a, transparent)",
              transformOrigin: "center",
            }}
          />
        </Reveal>

        {/* Pivot line — italic */}
        <div style={{ marginBottom: "clamp(22px, 3.5vh, 56px)", position: "relative", zIndex: 1 }}>
          <SplitWords
            as="p"
            delay={0.55}
            stagger={0.025}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.2vw, 30px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.3,
              letterSpacing: "-.015em",
              color: "rgba(240,235,225,.6)",
            }}
          >
            La diferencia está en cómo se presenta al mundo.
          </SplitWords>
        </div>

        {/* Narrative paragraph */}
        <Reveal delay={0.75} y={24} blur={6} style={{ marginBottom: "clamp(24px, 4vh, 64px)", position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: 17,
            color: "var(--color-text-3)",
            lineHeight: 1.85,
            maxWidth: 520,
            margin: "0 auto",
            letterSpacing: "-.01em",
          }}>
            Transformamos tu identidad digital en una herramienta de autoridad.
            Diseño que justifica tu valor. Posicionamiento que abre oportunidades
            que el precio solo no puede abrir.
          </p>
        </Reveal>

        {/* Closing statement */}
        <Reveal delay={1.0} y={20} blur={5} style={{ position: "relative", zIndex: 1 }}>
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
            Tu empresa no necesita ser la número uno para verse como tal.{" "}
            Solo necesita{" "}
            <em style={{ color: "#d8b25f", fontStyle: "italic" }}>el traje correcto</em>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
