"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

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
    desc: "Si hay alineación genuina, agendamos una llamada estratégica. Sin presentaciones genéricas — una conversación real sobre tu empresa.",
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
      }}
    >
      {/* ── Top: Eyebrow + Headline — centered ── */}
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, rgba(201,164,90,.4))" }} />
            <p style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase", color: "var(--color-gold)" }}>
              Proceso de Selección
            </p>
            <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, rgba(201,164,90,.4))" }} />
          </div>
        </Reveal>

        <Reveal delay={0.1} y={40} style={{ maxWidth: 840, margin: "0 auto" }}>
          <SplitWords
            as="h2"
            delay={0.1}
            stagger={0.04}
            style={{
              fontSize: "clamp(40px, 5.2vw, 70px)",
              lineHeight: 1.04,
              letterSpacing: "-.025em",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
            }}
          >
            No somos para todos. Y eso es exactamente el punto.
          </SplitWords>
        </Reveal>
      </div>

      {/* ── Middle: Two-column — copy left, steps right ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(40px, 7vw, 110px)",
          alignItems: "start",
          marginBottom: 88,
        }}
      >
        {/* Left: Body copy — left-aligned for readability */}
        <Reveal delay={0.25} y={28} blur={6}>
          <p
            style={{
              fontSize: 16,
              color: "var(--color-text-2)",
              lineHeight: 1.95,
              marginBottom: 32,
              letterSpacing: "-.01em",
            }}
          >
            Si buscás que tu empresa se vea como una más, sin distinción real, sin criterio detrás — no somos para vos.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-text-3)",
              lineHeight: 1.95,
              letterSpacing: "-.01em",
            }}
          >
            Pero si llegaste hasta acá, ya sabemos algo muy importante: no querés ser uno más.
          </p>
        </Reveal>

        {/* Right: Steps — vertical stack */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: 28, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.13, ease: EASE }}
              style={{
                padding: "28px 0",
                borderBottom: i < STEPS.length - 1
                  ? "1px solid rgba(201,164,90,.07)"
                  : "none",
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: ".4em",
                  color: "var(--color-gold)",
                  opacity: 0.5,
                  flexShrink: 0,
                  paddingTop: 2,
                  minWidth: 28,
                }}
              >
                {s.num}
              </span>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "var(--color-text-2)",
                    marginBottom: 9,
                  }}
                >
                  {s.label}
                </p>
                <p style={{ fontSize: 13, color: "var(--color-text-4)", lineHeight: 1.85 }}>
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom: CTA + fine print — centered ── */}
      <div style={{ textAlign: "center" }}>
        <Reveal delay={0.6} y={20} blur={4}>
          <Link
            href="/aplicar"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 22,
              padding: "18px 48px",
              border: "1px solid rgba(201,164,90,.45)",
              background: hovered ? "var(--color-gold)" : "transparent",
              color: hovered ? "#111" : "var(--color-text)",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: ".3em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background .35s, color .35s",
            }}
          >
            Iniciar proceso
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                width: hovered ? 36 : 24,
                height: 1,
                background: "currentColor",
                flexShrink: 0,
                transition: "width .3s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: -1,
                  top: -3,
                  width: 7,
                  height: 7,
                  borderRight: "1px solid currentColor",
                  borderTop: "1px solid currentColor",
                  transform: "rotate(45deg)",
                }}
              />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.8} y={10} blur={2}>
          <p style={{ marginTop: 28, fontSize: 11, letterSpacing: ".15em", color: "var(--color-text-4)" }}>
            Respondemos toda aplicación en un máximo de 72 horas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
