"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { HERO_CONTENT } from "@/content";
import { useLenis } from "@/contexts/LenisContext";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

/* Oro refinado — champán/oro antiguo, cálido y desaturado. Nada de amarillo neón. */
const GOLD_ACCENT =
  "linear-gradient(100deg, #B98A3E 0%, #D9B36A 32%, #F1DCA4 50%, #D9B36A 68%, #B98A3E 100%)";

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
        marginTop: -72,
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* ══════════ FONDO ══════════ */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Foto de fondo — pizarra negra con vetas doradas */}
        <Image
          src="/background-suitwolf.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />

        {/* Capa oscura — garantiza legibilidad del título */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "rgba(0, 0, 0, 0.52)",
        }} />

        {/* Calor dorado central — conecta la foto con el acento del título */}
        <div style={{
          position: "absolute", left: "50%", top: "44%",
          width: "min(900px, 110vw)", height: "min(600px, 75vh)",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at center, rgba(180,130,60,.10) 0%, rgba(130,95,35,.04) 42%, transparent 68%)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* Viñeta perimetral — oscurece bordes, concentra la vista en el centro */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(110% 90% at 50% 44%, transparent 38%, rgba(0,0,0,.72) 100%)",
        }} />

        {/* Fundido inferior — mezcla con la siguiente sección */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "28%",
          background: "linear-gradient(to top, #08080A 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }} />
      </div>

      {/* ══════════ CONTENIDO ══════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1080,
          padding: "72px clamp(1.4rem, 5vw, 3rem) 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Título — centrado, sans moderna, tight */}
        <h1
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(1.7rem, 6vw, 5.4rem)",
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
          Construimos sitios web que transforman visitantes en clientes. Desde cero, a medida y ajustándonos a tus necesidades.
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
              className="cta-gold"
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                padding: "clamp(16px, 1.5vw, 20px) clamp(32px, 3.2vw, 46px)",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                textDecoration: "none",
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
