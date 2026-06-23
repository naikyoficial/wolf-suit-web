"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const STEPS = [
  {
    num: "01",
    label: "Aplicación",
    desc: "Completás el formulario. Nos contás quién sos y qué querés construir.",
  },
  {
    num: "02",
    label: "Evaluación",
    desc: "Analizamos si hay una oportunidad real de impacto. Solo avanzamos cuando la hay.",
  },
  {
    num: "03",
    label: "Conversación",
    desc: "Si hay alineación genuina, coordinamos el siguiente paso juntos.",
  },
];

export function Apply() {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMobile();

  return (
    <section
      id="contact"
      className="relative"
      style={{
        padding: "clamp(80px,12vh,160px) clamp(1.5rem,8vw,7.5rem)",
        background: "#050403",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Dramatic center glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(168,108,5,.10) 0%, transparent 68%), radial-gradient(ellipse 45% 35% at 50% 110%, rgba(120,75,5,.09) 0%, transparent 70%)",
      }} />
      {/* Subtle dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.28,
        backgroundImage: "radial-gradient(circle, rgba(212,160,32,.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Top edge fade */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 160,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 20,
      }} />

      <div className="w-full max-w-[1100px] mx-auto" style={{ position: "relative", zIndex: 5 }}>

        {/* ── Eyebrow ── */}
        <Reveal style={{ textAlign: "center", marginBottom: "clamp(36px,5vh,64px)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ width: 36, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.4))" }} />
            <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase" }}>
              Proceso de selección
            </ShimmerLabel>
            <div style={{ width: 36, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.4))" }} />
          </div>
        </Reveal>

        {/* ── Headline ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px,3vh,32px)" }}>
          <SplitWords
            as="h2"
            delay={0.05}
            stagger={0.042}
            style={{
              fontSize: "clamp(38px,5.5vw,76px)",
              lineHeight: 1.03,
              letterSpacing: "-.028em",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
            }}
          >
            Si llegaste hasta acá,
          </SplitWords>
          <SplitWords
            as="h2"
            delay={0.32}
            stagger={0.038}
            style={{
              fontSize: "clamp(38px,5.5vw,76px)",
              lineHeight: 1.03,
              letterSpacing: "-.028em",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
            }}
          >
            ya entendiste que esto no es para cualquiera.
          </SplitWords>
        </div>

        {/* ── Single supporting line ── */}
        <Reveal delay={0.3} y={16} blur={4} style={{ textAlign: "center", marginBottom: "clamp(56px,8vh,104px)" }}>
          <p style={{
            fontSize: "clamp(14px,1.05vw,17px)",
            color: "var(--color-text-3)",
            lineHeight: 1.75,
            maxWidth: 460,
            margin: "0 auto",
          }}>
            Trabajamos con proyectos selectos — comenzamos con una evaluación
            para confirmar que podemos generar un impacto real.
          </p>
        </Reveal>

        {/* ── Three panels ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          border: "1px solid rgba(212,160,32,.14)",
          marginBottom: "clamp(64px,9vh,112px)",
        }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={isMobile ? { opacity: 0, y: 18 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={isMobile
                ? { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as const }
                : { duration: 0.95, delay: 0.35 + i * 0.14, ease: EASE }
              }
              style={{
                position: "relative",
                padding: "clamp(32px,4vw,52px) clamp(28px,3vw,44px) clamp(36px,5vw,56px)",
                borderRight: !isMobile && i < STEPS.length - 1
                  ? "1px solid rgba(212,160,32,.14)" : "none",
                borderBottom: isMobile && i < STEPS.length - 1
                  ? "1px solid rgba(212,160,32,.14)" : "none",
                overflow: "hidden",
              }}
            >
              {/* Ghost number — large decorative element */}
              <div aria-hidden style={{
                position: "absolute",
                bottom: -20,
                right: -10,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(110px,13vw,168px)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-.06em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(212,160,32,.065)",
                userSelect: "none",
                pointerEvents: "none",
              }}>
                {s.num}
              </div>

              {/* Top shimmer bar */}
              <div aria-hidden style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: GOLD, backgroundSize: "260% 100%",
                animation: `metalShimmer ${8 + i * 2.5}s ease-in-out infinite`,
                animationDelay: `${-i * 3}s`,
                opacity: 0.35,
              }} />

              {/* Step number — gold shimmer */}
              <p style={{
                fontSize: 9,
                letterSpacing: ".42em",
                textTransform: "uppercase",
                marginBottom: "clamp(22px,3vw,36px)",
                background: GOLD, backgroundSize: "260% 100%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: `metalShimmer ${11 + i * 2}s ease-in-out infinite`,
                position: "relative", zIndex: 1,
              }}>
                {s.num}
              </p>

              {/* Step name */}
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px,3vw,42px)",
                fontWeight: 300,
                letterSpacing: "-.022em",
                lineHeight: 1.04,
                marginBottom: "clamp(16px,2vw,24px)",
                color: "var(--color-text)",
                position: "relative", zIndex: 1,
              }}>
                {s.label}
              </h3>

              {/* Gold accent line */}
              <div style={{
                width: 28, height: 1,
                background: "linear-gradient(to right, rgba(212,160,32,.75), rgba(212,160,32,.2))",
                marginBottom: "clamp(16px,2vw,24px)",
                position: "relative", zIndex: 1,
              }} />

              {/* Description */}
              <p style={{
                fontSize: 13,
                color: "var(--color-text-3)",
                lineHeight: 1.85,
                position: "relative", zIndex: 1,
              }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center" }}>
          <Reveal delay={0.5} y={22} blur={4} style={{ marginBottom: 28 }}>
            <div style={{
              display: "inline-block",
              padding: "1px",
              background: GOLD,
              backgroundSize: "280% 100%",
              animation: "metalShimmer 4s ease-in-out infinite",
            }}>
              <Link
                href="/evaluacion"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                data-cursor-hover
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 24,
                  padding: "20px 60px",
                  background: hovered ? "var(--color-gold)" : "#060606",
                  color: hovered ? "#080808" : "var(--color-text)",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: ".32em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background .38s, color .38s",
                }}
              >
                Iniciar proceso
                <span style={{
                  position: "relative", display: "inline-flex", alignItems: "center",
                  width: hovered ? 40 : 26,
                  height: 1,
                  background: "currentColor",
                  flexShrink: 0,
                  transition: "width .38s",
                }}>
                  <span style={{
                    position: "absolute", right: -1, top: -3,
                    width: 7, height: 7,
                    borderRight: "1px solid currentColor",
                    borderTop: "1px solid currentColor",
                    transform: "rotate(45deg)",
                  }} />
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.7} y={10} blur={3}>
            <p style={{
              fontSize: 10,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--color-text-4)",
            }}>
              Respondemos cada solicitud en un plazo máximo de 72 horas.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
