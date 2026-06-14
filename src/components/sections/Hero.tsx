"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD_BORDER = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";
const GOLD_WORDMARK = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";

export function Hero() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const { scrollY } = useScroll();
  const contentOp = useTransform(scrollY, [0, 420], [1, 0]);
  const contentY  = useTransform(scrollY, [0, 500], [0, -56]);
  const bgScale   = useTransform(scrollY, [0, 700], [1, 1.12]);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(100dvh - 4rem)" }}
    >
      <h1 className="sr-only">Agencia de Diseño y Desarrollo Web Premium — Suitwolf</h1>

      {/* ── Background wolf — parallax scale on scroll ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        <Image
          src="/wolf-hero.jpg"
          alt=""
          fill
          priority
          quality={100}
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
      </motion.div>

      {/* ── Vignette overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 75% at 50% 42%, rgba(4,4,4,.22) 0%, rgba(4,4,4,.58) 62%, rgba(4,4,4,.96) 100%)",
        }}
      />
      {/* ── Bottom fade — ensures content area is readable ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgba(4,4,4,.98) 0%, rgba(4,4,4,.65) 38%, transparent 100%)",
        }}
      />
      {/* ── Top fade — matches navbar ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0"
        style={{
          height: "18%",
          background: "linear-gradient(to bottom, rgba(4,4,4,.55) 0%, transparent 100%)",
        }}
      />

      {/* ── Content — centered ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          opacity: contentOp,
          y: contentY,
          padding: "clamp(80px,10vh,120px) clamp(1.5rem,6vw,7.5rem) clamp(60px,8vh,100px)",
          width: "100%",
        }}
      >

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
        >
          <div style={{ width: 36, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.6))" }} />
          <span style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase", color: "var(--color-gold)" }}>
            Identidades digitales premium
          </span>
          <div style={{ width: 36, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.6))" }} />
        </motion.div>

        {/* SUITWOLF wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.75, ease: EASE }}
        >
          <ScrambleText
            text="SUITWOLF"
            delay={0.75}
            duration={1200}
            className="font-display font-semibold"
            style={{
              fontSize: "clamp(34px, 5.5vw, 76px)",
              letterSpacing: ".4em",
              background: GOLD_WORDMARK,
              backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 6s ease-in-out infinite",
              display: "block",
            }}
          />
        </motion.div>

        {/* Gold separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.55 }}
          style={{
            width: 28,
            height: 1,
            background: "rgba(212,160,32,.35)",
            margin: "22px auto 26px",
            transformOrigin: "center",
          }}
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.65, ease: EASE }}
          style={{
            fontSize: "clamp(18px, 2.3vw, 31px)",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            letterSpacing: "-.02em",
            lineHeight: 1.22,
            maxWidth: 520,
            marginBottom: 16,
          }}
        >
          Las empresas extraordinarias no deberían parecer comunes.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.95 }}
          style={{
            fontSize: 12,
            color: "var(--color-text-4)",
            lineHeight: 1.9,
            maxWidth: 380,
            marginBottom: 52,
            letterSpacing: "-.005em",
          }}
        >
          Diseñamos y desarrollamos experiencias digitales exclusivas para empresas que entienden que la percepción es una ventaja competitiva.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.15, ease: EASE }}
        >
          <div style={{
            display: "inline-block",
            padding: "1px",
            background: GOLD_BORDER,
            backgroundSize: "280% 100%",
            animation: "metalShimmer 4s ease-in-out infinite",
          }}>
            <Link
              href="/evaluacion"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 22,
                padding: "17px 48px",
                background: ctaHovered ? "var(--color-gold)" : "rgba(5,5,5,.88)",
                color: ctaHovered ? "#080808" : "var(--color-text)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .35s, color .35s",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              Iniciar proceso
              <span style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                width: ctaHovered ? 36 : 24,
                height: 1,
                background: "currentColor",
                flexShrink: 0,
                transition: "width .3s",
              }}>
                <span style={{
                  position: "absolute",
                  right: -1, top: -3,
                  width: 7, height: 7,
                  borderRight: "1px solid currentColor",
                  borderTop: "1px solid currentColor",
                  transform: "rotate(45deg)",
                }} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 56,
            color: "rgba(212,160,32,.3)",
            fontSize: 10,
            letterSpacing: ".25em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(212,160,32,.3), transparent)" }} />
          <span>Continuar</span>
        </motion.div>

      </motion.div>
    </section>
  );
}
