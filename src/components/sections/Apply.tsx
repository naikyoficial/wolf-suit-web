"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { Reveal }      from "@/components/ui/Reveal";
import { SplitWords }  from "@/components/ui/SplitWords";
import { TiltCard }    from "@/components/ui/TiltCard";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const STEPS = [
  {
    num: "01",
    label: "Aplicación",
    desc: "Completás el formulario. Nos contás quién sos y qué quiere construir tu empresa.",
  },
  {
    num: "02",
    label: "Evaluación",
    desc: "Analizamos si hay una oportunidad real de transformación. Solo aceptamos proyectos donde podemos generar impacto significativo.",
  },
  {
    num: "03",
    label: "Conversación",
    desc: "Si hay alineación genuina, confirmamos la solicitud del proyecto y pasamos a enviar nuestra propuesta de colaboración.",
  },
];

export function Apply() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="contact"
      className="relative"
      style={{
        minHeight: "100vh",
        padding: "clamp(80px, 12vh, 130px) 8vw",
        background: "rgba(4,4,4,.97)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Atmosphere — gold glow from center-top */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,108,5,.12) 0%, transparent 70%)",
      }} />
      {/* Top fade */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      {/* ── Eyebrow ── */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.35))" }} />
          <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase" }}>
            Proceso de Selección
          </ShimmerLabel>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.35))" }} />
        </div>
      </Reveal>

      {/* ── Headline ── */}
      <Reveal delay={0.1} y={40} style={{ maxWidth: 760, marginBottom: 40 }}>
        <SplitWords
          as="h2"
          delay={0.1}
          stagger={0.04}
          style={{
            fontSize: "clamp(36px, 4.8vw, 64px)",
            lineHeight: 1.06,
            letterSpacing: "-.025em",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
          }}
        >
          Si llegaste hasta acá, probablemente ya entendiste que esto no es para cualquiera.
        </SplitWords>
      </Reveal>

      {/* ── Body copy — centered ── */}
      <Reveal delay={0.25} y={24} blur={6} style={{ maxWidth: 580, marginBottom: 72 }}>
        <p style={{ fontSize: 16, color: "var(--color-text-3)", lineHeight: 1.85, letterSpacing: "-.01em", marginBottom: 22 }}>
          Si buscás una página rápida, genérica o construida sobre una plantilla, probablemente existan muchas opciones.
        </p>
        <p style={{ fontSize: 17, color: "var(--color-text-2)", lineHeight: 1.8, letterSpacing: "-.01em", marginBottom: 22 }}>
          Si buscás una presencia digital capaz de representar el verdadero nivel de tu empresa, estamos dispuestos a conversar.
        </p>
        <p style={{ fontSize: 16, color: "var(--color-text-3)", lineHeight: 1.85, letterSpacing: "-.01em" }}>
          Trabajamos con una cantidad limitada de proyectos porque creemos que la excelencia necesita tiempo, criterio y atención. Cada colaboración comienza con una evaluación estratégica para determinar si realmente podemos generar un impacto significativo.
        </p>
      </Reveal>

      {/* ── Steps — horizontal row ── */}
      <div
        style={{
          display: "flex",
          gap: "clamp(32px, 5vw, 64px)",
          marginBottom: 80,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {STEPS.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.13, ease: EASE }}
            style={{ display: "flex" }}
          >
            <TiltCard
              style={{
                width: 200,
                textAlign: "left",
                borderLeft: "1px solid rgba(212,160,32,.2)",
                paddingLeft: 20,
                paddingBottom: 24,
              }}
            >
              <p style={{ fontSize: 9, letterSpacing: ".5em", marginBottom: 10, color: "var(--color-text-4)" }}>{s.num}</p>
              <p style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--color-text-2)", marginBottom: 9 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.85 }}>
                {s.desc}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* ── CTA ── */}
      <Reveal delay={0.6} y={20} blur={4}>
        {/* Shimmer gradient border wrapper */}
        <div style={{
          display: "inline-block",
          padding: "1px",
          background: "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)",
          backgroundSize: "280% 100%",
          animation: "metalShimmer 4s ease-in-out infinite",
        }}>
          <Link
            href="/evaluacion"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 22,
              padding: "18px 48px",
              background: hovered ? "var(--color-gold)" : "#060606",
              color: hovered ? "#080808" : "var(--color-text)",
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
              width: hovered ? 36 : 24,
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
      </Reveal>

      <Reveal delay={0.8} y={10} blur={2}>
        <p style={{ marginTop: 28, fontSize: 11, letterSpacing: ".15em", color: "var(--color-text-4)" }}>
          Respondemos cada solicitud en un plazo máximo de 72 horas.
        </p>
      </Reveal>
    </section>
  );
}
