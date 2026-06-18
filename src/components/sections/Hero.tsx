"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFx } from "@/components/sections/HeroFx";
import { useMobile } from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";

const TAGS = ["Diseño Web", "E-commerce", "Software a Medida"];

export function Hero() {
  const isMobile = useMobile();
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

      {/* Background image */}
      <div
        aria-hidden
        className="hero-image-wrap"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Image
          src="/wolf-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="hero-wolf-img"
          style={{
            objectFit: "contain",
            objectPosition: "50% 28%",
          }}
        />
      </div>

      {/* Side fades */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(4,4,4,.82) 0%, transparent 18%, transparent 82%, rgba(4,4,4,.82) 100%)",
      }} />

      {/* Vignette */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 90% 80% at 50% 36%, rgba(4,4,4,.02) 0%, rgba(4,4,4,.45) 62%, rgba(4,4,4,.97) 100%)",
      }} />

      {/* Content backdrop */}
      <div aria-hidden style={{
        position: "absolute", inset: "30% 0 0 0", pointerEvents: "none",
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, rgba(4,4,4,.88) 20%, rgba(4,4,4,.45) 48%, transparent 100%)",
      }} />

      {/* Bottom seal */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent 0%, rgba(4,4,4,.85) 40%, rgba(4,4,4,1) 70%, rgba(4,4,4,1) 100%)",
      }} />

      {/* Top gradient */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "18%", pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(4,4,4,.55) 0%, transparent 100%)",
      }} />

      {/* FX — desktop only (HeroFx returns null on touch) */}
      <HeroFx />

      {/* Content — no scroll parallax on mobile */}
      <motion.div
        style={{
          opacity: isMobile ? 1 : contentOp,
          y: isMobile ? 0 : contentY,
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          paddingBottom: "clamp(24px, 4vh, 48px)",
          paddingLeft:  "clamp(1.5rem, 6vw, 7.5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 7.5rem)",
        }}
      >

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.48, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(17px, 4vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            lineHeight: 1.1,
            color: "rgba(240,235,225,.58)",
            margin: 0,
            textTransform: "uppercase",
            textShadow: "0 2px 30px rgba(0,0,0,.95)",
          }}
        >
          ¿Tu presencia digital refleja
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.60, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4.8vw, 76px)",
            fontWeight: 400,
            letterSpacing: "-.02em",
            lineHeight: 1.0,
            textTransform: "uppercase",
            margin: "clamp(2px, 0.3vw, 6px) 0",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 13s ease-in-out infinite",
            animationDelay: "-5s",
            filter: "drop-shadow(0 2px 18px rgba(212,160,32,.35))",
          }}
        >
          el nivel de empresa
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(17px, 4vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            lineHeight: 1.1,
            color: "rgba(240,235,225,.58)",
            marginBottom: "clamp(18px, 2.8vw, 36px)",
            textTransform: "uppercase",
            textShadow: "0 2px 30px rgba(0,0,0,.95)",
          }}
        >
          que tienes en mente?
        </motion.p>

        {/* Tags — hidden on mobile, flex on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.88, ease: EASE }}
          className="hidden sm:flex"
          style={{
            alignItems: "center",
            gap: 12,
            marginBottom: "clamp(14px, 2.2vw, 28px)",
          }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                fontSize: 9,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(180,176,168,.55)",
                textShadow: "0 1px 12px rgba(0,0,0,.9)",
                whiteSpace: "nowrap",
              }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{
                  width: 3, height: 3, borderRadius: "50%",
                  background: "rgba(180,176,168,.28)",
                  display: "inline-block",
                  flexShrink: 0,
                }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* Sub */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
          style={{ marginBottom: "clamp(20px, 3.5vw, 44px)" }}
        >
          <span style={{
            fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase",
            color: "rgba(200,188,168,.5)",
            textShadow: "0 1px 12px rgba(0,0,0,.95)",
          }}>
            Agencia digital de{" "}
          </span>
          <span style={{
            fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase",
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

        {/* Scroll cue — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="hidden sm:flex"
          style={{ flexDirection: "column", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(212,160,32,.45), transparent)" }} />
          <span style={{
            fontSize: 8,
            letterSpacing: ".48em",
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
            style={{ width: 1, height: 16, background: "linear-gradient(to bottom, rgba(212,160,32,.3), transparent)" }}
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
