"use client";

import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export function Duality() {
  return (
    <section
      id="duality"
      className="relative"
      style={{
        padding: "clamp(100px, 14vh, 160px) 8vw",
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
        <Reveal y={16} blur={4} style={{ marginBottom: 52 }}>
          <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
            Dualidad
          </ShimmerLabel>
        </Reveal>

        {/* Line 1 — what the client brings */}
        <div style={{ marginBottom: 12 }}>
          <SplitWords
            as="h2"
            delay={0.05}
            stagger={0.07}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6.5vw, 92px)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-.03em",
              color: "var(--color-text-2)",
            }}
          >
            Traés el potencial.
          </SplitWords>
        </div>

        {/* Line 2 — what SuitWolf builds — gold shimmer */}
        <div style={{ marginBottom: 56 }}>
          <SplitWords
            as="h2"
            delay={0.32}
            stagger={0.06}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6.5vw, 92px)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-.03em",
              background: GOLD,
              backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 10s ease-in-out infinite",
            }}
          >
            Nosotros construimos la percepción.
          </SplitWords>
        </div>

        {/* Gold line — animated draw */}
        <Reveal delay={0.6} y={0} blur={0} style={{ marginBottom: 44 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
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
        <Reveal delay={0.75} y={24} blur={6} style={{ marginBottom: 64 }}>
          <p style={{
            fontSize: 15,
            color: "var(--color-text-3)",
            lineHeight: 2,
            maxWidth: 620,
            margin: "0 auto",
            letterSpacing: "-.01em",
          }}>
            Venís con años de trabajo, una historia real y algo genuino para ofrecer al mercado.
            Sobre esa base construimos una identidad digital exclusiva: presencia que genera autoridad
            desde el primer segundo, diseño que justifica tu valor antes de una reunión y posicionamiento
            que abre oportunidades que el precio solo no puede abrir.
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
