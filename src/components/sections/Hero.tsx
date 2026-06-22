"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFx } from "@/components/sections/HeroFx";
import { useMobile } from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";

const TAGS = ["Diseño y Desarrollo Web", "E-commerce", "Software a Medida"];

export function Hero() {
  const isMobile = useMobile();
  const { scrollY } = useScroll();
  const contentOp = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY  = useTransform(scrollY, [0, 500], [0, -52]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100svh - 4rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      <h1 className="sr-only">Agencia de Diseño y Desarrollo Web Premium — Suitwolf</h1>

      {/* Background image — no transforms, pure objectFit cover for original quality */}
      <div
        aria-hidden
        className="hero-image-wrap"
        style={{ position: "absolute", inset: 0 }}
      >
        <Image
          src="/suitwolf-hero-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-wolf-img"
          style={{
            objectFit: "cover",
            objectPosition: "50% 44%",
          }}
        />
      </div>


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
          paddingBottom: "clamp(18px, 2.5vh, 40px)",
          paddingLeft:  "clamp(1.5rem, 6vw, 7.5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 7.5rem)",
        }}
      >

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.52, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            lineHeight: 1.05,
            color: "rgba(240,235,225,.6)",
            margin: 0,
            textTransform: "uppercase",
            textShadow: "0 2px 40px rgba(0,0,0,.95)",
          }}
        >
          ¿Tu presencia digital refleja
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.66, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.8vw, 76px)",
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
            filter: "drop-shadow(0 2px 20px rgba(212,160,32,.38))",
          }}
        >
          el nivel de empresa
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.80, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            lineHeight: 1.05,
            color: "rgba(240,235,225,.6)",
            marginBottom: "clamp(20px, 2.8vw, 36px)",
            textTransform: "uppercase",
            textShadow: "0 2px 40px rgba(0,0,0,.95)",
          }}
        >
          que tienes en mente?
        </motion.p>

        {/* Tags — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
          className="hidden sm:flex"
          style={{
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

        {/* Sub */}
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

        {/* Scroll cue — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.45 }}
          className="hidden sm:flex"
          style={{ flexDirection: "column", alignItems: "center", gap: 10 }}
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
