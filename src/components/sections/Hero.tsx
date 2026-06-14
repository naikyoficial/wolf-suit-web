"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFx } from "@/components/sections/HeroFx";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";

const TAGS = ["Estrategia", "Diseño", "Tecnología", "Resultados"];

export function Hero() {
  const { scrollY } = useScroll();
  const contentOp = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY  = useTransform(scrollY, [0, 500], [0, -52]);
  const bgScale   = useTransform(scrollY, [0, 700], [1, 1.1]);

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

      {/* ── Background wolf image ── */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          scale: bgScale,
          willChange: "transform",
        }}
      >
        <Image
          src="/wolf-hero.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "50% 32%",
            filter: "contrast(1.14) saturate(1.1) brightness(1.02)",
          }}
        />
      </motion.div>

      {/* ── Overlays ── */}

      {/* Vignette — edges dark, wolf face area clear */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 90% 80% at 50% 36%, rgba(4,4,4,.04) 0%, rgba(4,4,4,.48) 62%, rgba(4,4,4,.97) 100%)",
      }} />

      {/* Content backdrop — darkens the text area specifically */}
      <div aria-hidden style={{
        position: "absolute", inset: "40% 0 0 0",
        background: "linear-gradient(to top, rgba(4,4,4,.99) 0%, rgba(4,4,4,.75) 38%, transparent 100%)",
      }} />

      {/* Top gradient — blends into navbar */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "20%",
        background: "linear-gradient(to bottom, rgba(4,4,4,.55) 0%, transparent 100%)",
      }} />

      {/* ── 3D animated FX layer ── */}
      <HeroFx />

      {/* ── Isotipo — top center ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        style={{ position: "absolute", top: "clamp(68px, 9vh, 96px)", zIndex: 10, pointerEvents: "none" }}
      >
        <Image
          src="/isotipo.png"
          alt="Suitwolf"
          width={36}
          height={36}
          priority
          style={{
            objectFit: "contain",
            filter: "sepia(0.85) saturate(2.5) hue-rotate(-20deg) brightness(1.1) drop-shadow(0 0 18px rgba(212,160,32,.7))",
          }}
        />
      </motion.div>

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
          paddingBottom: "clamp(44px, 6.5vh, 82px)",
          paddingLeft:   "clamp(1.5rem, 6vw, 7.5rem)",
          paddingRight:  "clamp(1.5rem, 6vw, 7.5rem)",
        }}
      >

        {/* Headline line 1 — white serif */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5.4vw, 78px)",
            fontWeight: 400,
            letterSpacing: "-.01em",
            lineHeight: 1.0,
            color: "var(--color-text)",
            textTransform: "uppercase",
            margin: 0,
            textShadow: "0 2px 40px rgba(0,0,0,.8)",
          }}
        >
          Diseñamos experiencias.
        </motion.p>

        {/* Headline line 2 — gold shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.72, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5.4vw, 78px)",
            fontWeight: 600,
            letterSpacing: "-.01em",
            lineHeight: 1.0,
            textTransform: "uppercase",
            marginBottom: "clamp(18px, 2.5vw, 32px)",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 6s ease-in-out infinite",
            filter: "drop-shadow(0 2px 20px rgba(212,160,32,.35))",
          }}
        >
          Construimos legado.
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.98, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "clamp(20px, 3vw, 34px)",
          }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontSize: 10,
                letterSpacing: ".38em",
                textTransform: "uppercase",
                color: "rgba(240,200,64,.88)",
                textShadow: "0 0 24px rgba(212,160,32,.7), 0 1px 16px rgba(0,0,0,.9)",
              }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{
                  width: 3, height: 3, borderRadius: "50%",
                  background: "rgba(212,160,32,.55)",
                  boxShadow: "0 0 6px rgba(212,160,32,.6)",
                  display: "inline-block",
                  flexShrink: 0,
                }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* SUITWOLF wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.18, ease: EASE }}
          style={{ marginBottom: 8 }}
        >
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(15px, 1.8vw, 23px)",
            fontWeight: 400,
            letterSpacing: ".58em",
            color: "var(--color-text)",
            textTransform: "uppercase",
            display: "block",
            textShadow: "0 0 30px rgba(212,160,32,.2)",
          }}>
            Suitwolf
          </span>
        </motion.div>

        {/* Sub — AGENCIA DIGITAL DE ALTO NIVEL */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.32, ease: EASE }}
          style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}
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
            animation: "metalShimmer 7s ease-in-out infinite",
            animationDelay: "-3s",
          }}>
            alto nivel
          </span>
        </motion.div>

        {/* Continuar scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.55 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(212,160,32,.5), transparent)" }} />
          <span style={{
            fontSize: 9,
            letterSpacing: ".52em",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)",
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 5s ease-in-out infinite",
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
