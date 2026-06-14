"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";
const GOLD_BORDER = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const TAGS = ["Estrategia", "Diseño", "Tecnología", "Resultados"];

export function Hero() {
  const [ctaHovered, setCtaHovered] = useState(false);
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

      {/* ── Background wolf ── */}
      <motion.div aria-hidden style={{ position: "absolute", inset: 0, scale: bgScale }}>
        <Image
          src="/wolf-hero.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 18%" }}
        />
      </motion.div>

      {/* ── Vignette — edges dark, center clear ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 85% 80% at 50% 38%, rgba(4,4,4,.08) 0%, rgba(4,4,4,.52) 65%, rgba(4,4,4,.97) 100%)",
      }} />
      {/* ── Bottom gradient — content readability ── */}
      <div aria-hidden style={{
        position: "absolute", inset: "45% 0 0 0",
        background: "linear-gradient(to top, rgba(4,4,4,.98) 0%, rgba(4,4,4,.72) 40%, transparent 100%)",
      }} />
      {/* ── Top gradient — navbar blend ── */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "22%",
        background: "linear-gradient(to bottom, rgba(4,4,4,.5) 0%, transparent 100%)",
      }} />

      {/* ── Isotipo — top center ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        style={{ position: "absolute", top: "clamp(72px, 9vh, 100px)", zIndex: 10 }}
      >
        <Image
          src="/isotipo.png"
          alt="Suitwolf"
          width={38}
          height={38}
          priority
          style={{
            objectFit: "contain",
            filter: "sepia(0.85) saturate(2.5) hue-rotate(-20deg) brightness(1.1) drop-shadow(0 0 18px rgba(212,160,32,.65))",
          }}
        />
      </motion.div>

      {/* ── Content — anchored to bottom ── */}
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
          paddingBottom: "clamp(48px, 7vh, 88px)",
          paddingLeft: "clamp(1.5rem, 6vw, 7.5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 7.5rem)",
          width: "100%",
        }}
      >

        {/* Line 1 — white serif */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 5.2vw, 76px)",
            fontWeight: 400,
            letterSpacing: "-.01em",
            lineHeight: 1.0,
            color: "var(--color-text)",
            textTransform: "uppercase",
            marginBottom: 0,
          }}
        >
          Diseñamos experiencias.
        </motion.p>

        {/* Line 2 — gold */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.78, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 5.2vw, 76px)",
            fontWeight: 600,
            letterSpacing: "-.01em",
            lineHeight: 1.0,
            textTransform: "uppercase",
            marginBottom: "clamp(22px, 3vw, 36px)",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 6s ease-in-out infinite",
          }}
        >
          Construimos legado.
        </motion.p>

        {/* Tags row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(24px, 3.5vw, 38px)" }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "rgba(212,160,32,.65)" }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(212,160,32,.4)", display: "inline-block" }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* SUITWOLF wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25, ease: EASE }}
          style={{ marginBottom: 10 }}
        >
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 2vw, 24px)",
            fontWeight: 400,
            letterSpacing: ".55em",
            color: "var(--color-text)",
            textTransform: "uppercase",
            display: "block",
          }}>
            Suitwolf
          </span>
        </motion.div>

        {/* Sub — AGENCIA DIGITAL DE ALTO NIVEL */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
          style={{ marginBottom: "clamp(32px, 4.5vw, 52px)" }}
        >
          <span style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--color-text-4)" }}>
            Agencia digital de{" "}
          </span>
          <span style={{
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
          style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}
        >
          <div style={{
            display: "inline-block", padding: "1px",
            background: GOLD_BORDER, backgroundSize: "280% 100%",
            animation: "metalShimmer 4s ease-in-out infinite",
          }}>
            <Link
              href="/evaluacion"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 22,
                padding: "15px 44px",
                background: ctaHovered ? "var(--color-gold)" : "rgba(4,4,4,.85)",
                color: ctaHovered ? "#080808" : "var(--color-text)",
                fontFamily: "var(--font-body)", fontSize: 10,
                letterSpacing: ".35em", textTransform: "uppercase",
                textDecoration: "none",
                backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                transition: "background .35s, color .35s",
              }}
            >
              Iniciar proceso
              <span style={{
                position: "relative", display: "inline-flex", alignItems: "center",
                width: ctaHovered ? 34 : 22, height: 1,
                background: "currentColor", flexShrink: 0, transition: "width .3s",
              }}>
                <span style={{
                  position: "absolute", right: -1, top: -3,
                  width: 6, height: 6,
                  borderRight: "1px solid currentColor", borderTop: "1px solid currentColor",
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
          transition={{ duration: 0.8, delay: 2 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(212,160,32,.4), transparent)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(212,160,32,.5)" }} />
        </motion.div>

      </motion.div>
    </section>
  );
}
