"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFx } from "@/components/sections/HeroFx";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";

const TAGS = ["Diseño y Desarrollo Web", "E-commerce", "Software a Medida"];

export function Hero() {
  const { scrollY } = useScroll();
  const contentOp = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY  = useTransform(scrollY, [0, 500], [0, -52]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100dvh - 4rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      <h1 className="sr-only">Agencia de Diseño y Desarrollo Web Premium — Suitwolf</h1>

      {/* ── Background image — shifted up ── */}
      <div
        aria-hidden
        style={{ position: "absolute", top: "-10%", left: 0, right: 0, bottom: 0 }}
      >
        <Image
          src="/wolf-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "contain",
            objectPosition: "50% 50%",
          }}
        />
      </div>

      {/* Side fades — aggressive blend of image edges into dark bg */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(4,4,4,1) 0%, rgba(4,4,4,.92) 18%, rgba(4,4,4,.5) 32%, transparent 46%, transparent 54%, rgba(4,4,4,.5) 68%, rgba(4,4,4,.92) 82%, rgba(4,4,4,1) 100%)",
      }} />

      {/* ── Overlays ── */}

      {/* Vignette — edges dark, wolf face area clear */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 90% 80% at 50% 36%, rgba(4,4,4,.04) 0%, rgba(4,4,4,.48) 62%, rgba(4,4,4,.97) 100%)",
      }} />

      {/* Content backdrop — darkens lower section behind text */}
      <div aria-hidden style={{
        position: "absolute", inset: "18% 0 0 0",
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, rgba(4,4,4,.90) 22%, rgba(4,4,4,.52) 50%, transparent 100%)",
      }} />

      {/* Bottom seal — guarantees solid black at the very bottom edge for seamless section transition */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
        background: "linear-gradient(to bottom, transparent 0%, rgba(4,4,4,.85) 40%, rgba(4,4,4,1) 70%, rgba(4,4,4,1) 100%)",
      }} />

      {/* Top gradient — blends into navbar */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "20%",
        background: "linear-gradient(to bottom, rgba(4,4,4,.55) 0%, transparent 100%)",
      }} />

      {/* ── 3D animated FX layer ── */}
      <HeroFx />

      {/* ── Content — anchored bottom ── */}
      <motion.div
        style={{
          opacity: contentOp,
          y: contentY,
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          paddingBottom: "clamp(18px, 2.5vh, 40px)",
          paddingLeft:   "clamp(1.5rem, 6vw, 7.5rem)",
          paddingRight:  "clamp(1.5rem, 6vw, 7.5rem)",
        }}
      >

        {/* Headline line 1 — white serif */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.58, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 84px)",
            fontWeight: 400,
            letterSpacing: "-.02em",
            lineHeight: 1.0,
            color: "var(--color-text)",
            textTransform: "uppercase",
            margin: 0,
            textShadow: "0 2px 60px rgba(0,0,0,.9)",
          }}
        >
          Diseñamos experiencias.
        </motion.p>

        {/* Headline line 2 — gold shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.74, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 84px)",
            fontWeight: 600,
            letterSpacing: "-.02em",
            lineHeight: 1.0,
            textTransform: "uppercase",
            marginBottom: "clamp(20px, 2.8vw, 36px)",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 13s ease-in-out infinite",
            animationDelay: "-5s",
            filter: "drop-shadow(0 2px 20px rgba(212,160,32,.32))",
          }}
        >
          Construimos legado.
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "clamp(18px, 2.8vw, 32px)",
          }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontSize: 10,
                letterSpacing: ".38em",
                textTransform: "uppercase",
                color: "rgba(180,176,168,.65)",
                textShadow: "0 1px 12px rgba(0,0,0,.9)",
              }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{
                  width: 3, height: 3, borderRadius: "50%",
                  background: "rgba(180,176,168,.35)",
                  display: "inline-block",
                  flexShrink: 0,
                }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* Sub — AGENCIA DIGITAL DE ALTO NIVEL */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          style={{ marginBottom: "clamp(24px, 3.5vw, 44px)" }}
        >
          <span style={{
            fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
            color: "rgba(200,188,168,.6)",
            textShadow: "0 1px 12px rgba(0,0,0,.95)",
          }}>
            Agencia digital de{" "}
          </span>
          <span style={{
            fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 13s ease-in-out infinite",
            animationDelay: "-5s",
          }}>
            alto nivel
          </span>
        </motion.div>

        {/* Continuar scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.45 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(212,160,32,.5), transparent)" }} />
          <span style={{
            fontSize: 9,
            letterSpacing: ".52em",
            textTransform: "uppercase",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 11s ease-in-out infinite",
          }}>
            Continuar
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 18, background: "linear-gradient(to bottom, rgba(212,160,32,.35), transparent)" }}
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
