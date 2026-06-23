"use client";

import Image from "next/image";
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
        paddingBlock: "clamp(120px, 18vh, 240px)",
        paddingInline: "clamp(1.5rem, 8vw, 7.5rem)",
        zIndex: 10,
        background: "#080808",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Texture */}
      <Image
        src="/dualidad-bg.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "50% 50%", opacity: 0.06 }}
        aria-hidden
      />

      {/* Warm center glow — lifts text off pure black */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(168,108,5,.07) 0%, transparent 70%)",
        zIndex: 1,
      }} />

      {/* Edge fades */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(to bottom, rgba(8,8,8,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 2,
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(to top, rgba(8,8,8,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Editorial column */}
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 3 }}>

        {/* Eyebrow */}
        <Reveal y={14} blur={4} style={{ marginBottom: "clamp(40px, 6vh, 80px)" }}>
          <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
            Dualidad
          </ShimmerLabel>
        </Reveal>

        {/* Line 1 — ghost / receding */}
        <div style={{ marginBottom: "clamp(2px, .4vh, 6px)" }}>
          <SplitWords
            as="h2"
            delay={0}
            stagger={0.026}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5.8vw, 84px)",
              fontWeight: 300,
              lineHeight: 1.03,
              letterSpacing: "-.025em",
              color: "rgba(255,255,255,.55)",
            }}
          >
            Una empresa pequeña puede parecer líder de su sector.
          </SplitWords>
        </div>

        {/* Line 2 — dominant */}
        <div style={{ marginBottom: "clamp(40px, 6vh, 88px)" }}>
          <SplitWords
            as="h2"
            delay={0.08}
            stagger={0.022}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5.8vw, 84px)",
              fontWeight: 700,
              lineHeight: 1.03,
              letterSpacing: "-.025em",
              color: "#ffffff",
            }}
          >
            Una gran empresa puede parecer amateur.
          </SplitWords>
        </div>

        {/* Gold rule */}
        <Reveal delay={0.36} y={0} blur={0} style={{ marginBottom: "clamp(36px, 5.5vh, 72px)" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={isMobile
              ? { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
              : { duration: 1.3, delay: 0.36, ease: EASE }
            }
            style={{
              width: 56, height: 1, margin: "0 auto",
              background: GOLD, backgroundSize: "260% 100%",
              animation: "metalShimmer 8s ease-in-out infinite",
              transformOrigin: "center",
            }}
          />
        </Reveal>

        {/* Pivot — "La diferencia está..." — Reveal for guaranteed visibility */}
        <Reveal delay={0.48} y={22} blur={4} style={{ marginBottom: "clamp(36px, 5.5vh, 72px)" }}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3vw, 44px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.18,
            letterSpacing: "-.015em",
            color: "rgba(240,235,225,.88)",
          }}>
            La diferencia está en cómo se presenta al mundo.
          </p>
        </Reveal>

        {/* Body */}
        <Reveal delay={0.64} y={18} blur={5} style={{ marginBottom: "clamp(36px, 5.5vh, 72px)" }}>
          <p style={{
            fontSize: "clamp(14px, 1.05vw, 17px)",
            color: "var(--color-text-2)",
            lineHeight: 1.95,
            maxWidth: 460,
            margin: "0 auto",
            letterSpacing: ".005em",
          }}>
            Transformamos tu identidad digital en una herramienta de autoridad.
            Diseño que justifica tu valor. Posicionamiento que abre oportunidades
            que el precio solo no puede abrir.
          </p>
        </Reveal>

        {/* Closing */}
        <Reveal delay={0.84} y={14} blur={4}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontWeight: 300,
            color: "rgba(236,232,223,.60)",
            letterSpacing: "-.012em",
            lineHeight: 1.28,
            maxWidth: 620,
            margin: "0 auto",
          }}>
            Tu empresa no necesita ser la número uno para verse como tal.{" "}
            Solo necesita{" "}
            <em style={{ color: "#d4a020", fontStyle: "italic" }}>el traje correcto</em>.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
