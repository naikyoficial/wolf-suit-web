"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { HERO_CONTENT } from "@/content";
import { useLenis } from "@/contexts/LenisContext";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

/* Oro refinado — champán/oro antiguo, cálido y desaturado. Nada de amarillo neón. */
const GOLD_ACCENT =
  "linear-gradient(100deg, #B98A3E 0%, #D9B36A 32%, #F1DCA4 50%, #D9B36A 68%, #B98A3E 100%)";

/* Ruido fino para textura — feTurbulence embebido, sin requests externos */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const TRUST = ["Sin plantillas", "Performance 90+", "Respuesta en 72h"];

export function Hero() {
  const lenis = useLenis();
  const [ctaHov, setCtaHov] = useState(false);

  function scrollToId(id: string) {
    const el = document.querySelector(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100svh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#08080A",
      }}
    >
      {/* ══════════ FONDO ══════════ */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Base — degradado cálido arriba que cae a casi negro */}
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(135% 95% at 50% 2%, #1E170D 0%, #100D0C 40%, #08080A 100%)",
        }} />

        {/* Luz central — el foco dorado detrás del título, respirando */}
        <div style={{
          position: "absolute", left: "50%", top: "44%",
          width: "min(1280px, 135vw)", height: "min(820px, 96vh)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(210,170,98,.34) 0%, rgba(184,142,74,.14) 36%, transparent 68%)",
          animation: "heroGlow 12s ease-in-out infinite",
          willChange: "opacity, transform",
        }} />

        {/* Aurora — tres manchas suaves que derivan lento */}
        <div style={{
          position: "absolute", left: "24%", top: "26%",
          width: "48vw", height: "48vw", maxWidth: 720, maxHeight: 720,
          background: "radial-gradient(circle at center, rgba(205,165,96,.30) 0%, transparent 62%)",
          filter: "blur(36px)",
          animation: "heroAurora1 22s ease-in-out infinite",
          willChange: "transform",
        }} />
        <div style={{
          position: "absolute", right: "20%", top: "34%",
          width: "42vw", height: "42vw", maxWidth: 640, maxHeight: 640,
          background: "radial-gradient(circle at center, rgba(150,110,54,.22) 0%, transparent 60%)",
          filter: "blur(44px)",
          animation: "heroAurora2 26s ease-in-out infinite",
          animationDelay: "-6s",
          willChange: "transform",
        }} />
        <div style={{
          position: "absolute", left: "42%", top: "14%",
          width: "34vw", height: "34vw", maxWidth: 520, maxHeight: 520,
          background: "radial-gradient(circle at center, rgba(224,196,138,.16) 0%, transparent 60%)",
          filter: "blur(40px)",
          animation: "heroAurora3 19s ease-in-out infinite",
          animationDelay: "-3s",
          willChange: "transform, opacity",
        }} />

        {/* Grilla de puntos muy tenue — sensación técnica / agencia */}
        <div className="hero-dotgrid" style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 0%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 0%, transparent 78%)",
          opacity: 0.6,
        }} />

        {/* Textura de ruido */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: NOISE,
          backgroundSize: "180px 180px",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }} />

        {/* Viñeta — enfoca el centro */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(120% 100% at 50% 45%, transparent 52%, rgba(6,6,8,.62) 100%)",
        }} />

        {/* Fundido inferior — mezcla con la siguiente sección */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "22%",
          background: "linear-gradient(to top, #08080A 0%, transparent 100%)",
        }} />
      </div>

      {/* ══════════ CONTENIDO ══════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1080,
          padding: "0 clamp(1.4rem, 5vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Eyebrow — pill con punto */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(201,162,92,.24)",
            background: "rgba(201,162,92,.05)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            marginBottom: "clamp(26px, 4vh, 40px)",
          }}
        >
          <span aria-hidden style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#D9B36A",
            animation: "pulseDot 3.2s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(10px, 0.85vw, 12px)",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "rgba(226,220,208,.72)",
          }}>
            {HERO_CONTENT.eyebrow}
          </span>
        </motion.div>

        {/* Título — centrado, sans moderna, tight */}
        <h1
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(2.5rem, 6vw, 5.4rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "#F5F2EC",
            margin: 0,
            marginBottom: "clamp(22px, 3.4vh, 34px)",
            maxWidth: "16em",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.0, delay: 0.32, ease: EASE }}
            style={{ display: "block" }}
          >
            {HERO_CONTENT.headlineLead}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.0, delay: 0.46, ease: EASE }}
            style={{ display: "block", whiteSpace: "nowrap" }}
          >
            <span style={{ color: "rgba(245,242,236,.9)" }}>{HERO_CONTENT.headlineRest} </span>
            <span style={{
              background: GOLD_ACCENT,
              backgroundSize: "220% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "heroSheen 9s ease-in-out infinite",
            }}>
              {HERO_CONTENT.headlineAccent}
            </span>
            <span style={{ color: "#F5F2EC" }}>.</span>
          </motion.span>
        </h1>

        {/* Bajada */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
          style={{
            fontSize: "clamp(15px, 1.15vw, 18px)",
            lineHeight: 1.62,
            color: "var(--color-text-2)",
            maxWidth: "36em",
            margin: 0,
            marginBottom: "clamp(34px, 5vh, 52px)",
          }}
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.78, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 2.4vw, 28px)", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Magnetic>
            <Link
              href="/evaluacion"
              data-cursor-hover
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                padding: "clamp(16px, 1.5vw, 20px) clamp(32px, 3.2vw, 46px)",
                borderRadius: 4,
                background: ctaHov ? "#F1DCA4" : "#D9B36A",
                color: "#141007",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .35s, box-shadow .35s",
                boxShadow: ctaHov
                  ? "0 10px 48px rgba(201,162,92,.32)"
                  : "0 6px 30px rgba(201,162,92,.18)",
              }}
            >
              {HERO_CONTENT.cta}
              <span aria-hidden style={{
                position: "relative", display: "inline-flex", alignItems: "center",
                width: ctaHov ? 28 : 20, height: 1,
                background: "currentColor", flexShrink: 0,
                transition: "width .35s",
              }}>
                <span style={{
                  position: "absolute", right: -1, top: -3,
                  width: 6, height: 6,
                  borderRight: "1px solid currentColor",
                  borderTop: "1px solid currentColor",
                  transform: "rotate(45deg)",
                }} />
              </span>
            </Link>
          </Magnetic>

          <a
            href="#servicios"
            data-cursor-hover
            onClick={(e) => { e.preventDefault(); scrollToId("#servicios"); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "clamp(16px, 1.5vw, 20px) clamp(24px, 2.4vw, 32px)",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,.14)",
              color: "rgba(236,232,223,.82)",
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color .3s, color .3s, background .3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,162,92,.5)";
              e.currentTarget.style.color = "#F5F2EC";
              e.currentTarget.style.background = "rgba(201,162,92,.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
              e.currentTarget.style.color = "rgba(236,232,223,.82)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {HERO_CONTENT.ctaSecondary}
          </a>
        </motion.div>

        {/* Señales de confianza — microcopy discreto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.0 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "clamp(14px, 2vw, 26px)", flexWrap: "wrap",
            marginTop: "clamp(30px, 4.5vh, 48px)",
          }}
        >
          {TRUST.map((t, i) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(14px, 2vw, 26px)" }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(9.5px, 0.8vw, 11px)",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "rgba(200,193,180,.5)",
              }}>
                {t}
              </span>
              {i < TRUST.length - 1 && (
                <span aria-hidden style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(201,162,92,.5)" }} />
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Indicador de scroll — abajo centro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        aria-hidden
        style={{
          position: "absolute",
          bottom: "clamp(20px, 3.5vh, 34px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: "rgba(200,193,180,.38)",
        }}>
          Scroll
        </span>
        <span style={{ width: 1, height: 32, background: "rgba(255,255,255,.1)", position: "relative", overflow: "hidden", display: "block" }}>
          <span style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #D9B36A, rgba(201,162,92,.1))",
            animation: "scrollHint 2.6s cubic-bezier(0.77,0,0.18,1) infinite",
            display: "block",
          }} />
        </span>
      </motion.div>
    </section>
  );
}
