"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD_GRADIENT = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";
const GOLD_BORDER   = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const goldText: CSSProperties = {
  display: "block",
  background: GOLD_GRADIENT,
  backgroundSize: "260% 100%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "metalShimmer 6s ease-in-out infinite",
};

const STATS = [
  { num: "100%", label: "Personalizado" },
  { num: "0",    label: "Templates" },
  { num: "∞",    label: "Criterio" },
];

export function Hero() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const { scrollY } = useScroll();
  const wrapOp = useTransform(scrollY, [0, 420], [1, 0]);
  const wrapY  = useTransform(scrollY, [0, 500], [0, -48]);
  const imgScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  return (
    <section
      className="relative flex items-center"
      style={{ minHeight: "calc(100dvh - 4rem)", padding: "clamp(60px,8vh,100px) 8vw" }}
    >
      <h1 className="sr-only">Agencia de Diseño y Desarrollo Web Premium — Suitwolf</h1>

      <motion.div
        style={{ opacity: wrapOp, y: wrapY, width: "100%" }}
        className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-20"
      >

        {/* ── Left column — text ── */}
        <div className="flex-1 w-full lg:max-w-[58%]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}
          >
            <div style={{ width: 28, height: 1, background: "var(--color-gold)", flexShrink: 0 }} />
            <span style={{ fontSize: 10, letterSpacing: ".42em", textTransform: "uppercase", color: "var(--color-gold)" }}>
              Identidades digitales premium
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            style={{ marginBottom: 28 }}
          >
            <h2
              aria-label="Diseñamos identidades. Construimos percepción."
              style={{
                fontSize: "clamp(40px, 5.8vw, 86px)",
                lineHeight: 1.02,
                letterSpacing: "-.03em",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              <span style={{ display: "block" }}>Diseñamos</span>
              <span style={{ ...goldText }}>identidades.</span>
              <span style={{ display: "block", marginTop: "0.05em" }}>Construimos</span>
              <span style={{ ...goldText, animationDelay: "-3s" }}>percepción.</span>
            </h2>
          </motion.div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            style={{
              fontSize: 13,
              color: "var(--color-text-3)",
              lineHeight: 1.9,
              maxWidth: 460,
              marginBottom: 44,
              letterSpacing: "-.005em",
            }}
          >
            Experiencias digitales exclusivas para empresas que entienden que la percepción es una ventaja competitiva. Sin templates. Todo desde cero.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
            style={{ display: "flex", gap: "clamp(20px, 4vw, 52px)", marginBottom: 50 }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.22 + i * 0.1, ease: EASE }}
                style={{ borderLeft: "1px solid rgba(212,160,32,.3)", paddingLeft: 16 }}
              >
                <p style={{
                  fontSize: "clamp(20px, 2.4vw, 30px)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  margin: 0,
                  background: GOLD_GRADIENT,
                  backgroundSize: "260% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "metalShimmer 6s ease-in-out infinite",
                  animationDelay: `${-i * 2}s`,
                }}>{s.num}</p>
                <p style={{
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--color-text-4)",
                  marginTop: 4,
                }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
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
                  padding: "17px 44px",
                  background: ctaHovered ? "var(--color-gold)" : "#060606",
                  color: ctaHovered ? "#080808" : "var(--color-text)",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background .35s, color .35s",
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
        </div>

        {/* ── Right column — wolf ── */}
        <motion.div
          className="flex-1 flex justify-center items-center lg:max-w-[42%] w-full relative"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.15, ease: EASE }}
        >
          {/* Radial gold ambient */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-20%",
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(212,160,32,.18) 0%, rgba(168,114,20,.07) 55%, transparent 72%)",
              pointerEvents: "none",
            }}
          />
          <motion.div style={{ scale: imgScale, position: "relative", zIndex: 1 }}>
            <Image
              src="/isotipo.png"
              alt="Suitwolf"
              width={460}
              height={460}
              quality={100}
              priority
              style={{
                width: "clamp(200px, 28vw, 460px)",
                height: "auto",
                objectFit: "contain",
                filter: [
                  "sepia(0.85)",
                  "saturate(2.6)",
                  "hue-rotate(-20deg)",
                  "brightness(1.05)",
                  "drop-shadow(0 0 70px rgba(212,160,32,.55))",
                  "drop-shadow(0 0 28px rgba(240,200,64,.35))",
                ].join(" "),
              }}
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
