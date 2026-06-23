"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

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
      {/* Texture — barely perceptible, adds depth without competing */}
      <Image
        src="/dualidad-bg.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "50% 50%", opacity: 0.05 }}
        aria-hidden
      />

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

      {/* Open editorial column — no card, typography is the design */}
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
              color: "rgba(255,255,255,.18)",
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
              color: "#f5f3ef",
            }}
          >
            Una gran empresa puede parecer amateur.
          </SplitWords>
        </div>

        {/* Gold rule */}
        <Reveal delay={0.36} y={0} blur={0} style={{ marginBottom: "clamp(40px, 6vh, 88px)" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={isMobile
              ? { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
              : { duration: 1.3, delay: 0.36, ease: EASE }
            }
            style={{
              width: 48, height: 1, margin: "0 auto",
              background: "linear-gradient(90deg, transparent, #c2984a, transparent)",
              transformOrigin: "center",
            }}
          />
        </Reveal>

        {/* Pivot — italic, editorial voice */}
        <div style={{ marginBottom: "clamp(36px, 5.5vh, 72px)" }}>
          <SplitWords
            as="p"
            delay={0.48}
            stagger={0.020}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 2.8vw, 40px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.22,
              letterSpacing: "-.012em",
              color: "rgba(240,235,225,.52)",
            }}
          >
            La diferencia está en cómo se presenta al mundo.
          </SplitWords>
        </div>

        {/* Body — Inter via --font-body, max contrast with Cormorant display */}
        <Reveal delay={0.68} y={18} blur={5} style={{ marginBottom: "clamp(36px, 5.5vh, 72px)" }}>
          <p style={{
            fontSize: "clamp(14px, 1.05vw, 17px)",
            color: "var(--color-text-3)",
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

        {/* Closing — very quiet, lets the em gold carry it */}
        <Reveal delay={0.92} y={14} blur={4}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontWeight: 300,
            color: "rgba(236,232,223,.34)",
            letterSpacing: "-.012em",
            lineHeight: 1.28,
            maxWidth: 620,
            margin: "0 auto",
          }}>
            Tu empresa no necesita ser la número uno para verse como tal.{" "}
            Solo necesita{" "}
            <em style={{ color: "#d8b25f", fontStyle: "italic", opacity: 0.9 }}>el traje correcto</em>.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
