"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

const STEPS = [
  { num: "01", label: "Aplicación",   desc: "Completás el formulario. Nos contás quién sos y qué quiere construir tu empresa." },
  { num: "02", label: "Evaluación",   desc: "Analizamos si hay alineación real entre tu proyecto y la forma en que trabajamos." },
  { num: "03", label: "Conversación", desc: "Si el proyecto tiene potencial, te contactamos para una llamada estratégica." },
];

export function Apply() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100vh",
        padding: "clamp(80px, 12vh, 140px) 8vw",
        background: "rgba(4,4,4,.97)",
        zIndex: 10,
      }}
    >
      {/* Eyebrow */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, rgba(201,164,90,.4))" }} />
          <p style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase", color: "var(--color-gold)" }}>
            Proceso de Selección
          </p>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, rgba(201,164,90,.4))" }} />
        </div>
      </Reveal>

      {/* Headline */}
      <Reveal delay={0.1} y={40} style={{ marginBottom: 32, maxWidth: 760 }}>
        <SplitWords
          as="h2"
          delay={0.1}
          stagger={0.05}
          style={{
            fontSize: "clamp(40px, 5.2vw, 70px)",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
          }}
        >
          No somos para todos. Y eso es exactamente el punto.
        </SplitWords>
      </Reveal>

      {/* Body copy */}
      <Reveal delay={0.3} y={24} blur={6} style={{ marginBottom: 80 }}>
        <p style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 1.95, maxWidth: 480 }}>
          Seleccionamos cada proyecto con criterio. Buscamos empresas que
          entiendan que la percepción es el activo más valioso que pueden
          construir — y que estén listas para jugar en otra categoría.
        </p>
      </Reveal>

      {/* Three-step process */}
      <div
        style={{
          display: "flex",
          gap: "clamp(28px, 5vw, 72px)",
          marginBottom: 88,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {STEPS.map((s, i) => (
          <Reveal key={s.num} delay={0.4 + i * 0.1} y={20} blur={4}>
            <div
              style={{
                maxWidth: 190,
                textAlign: "left",
                borderLeft: "1px solid rgba(201,164,90,.14)",
                paddingLeft: 20,
              }}
            >
              <p style={{ fontSize: 9, letterSpacing: ".5em", color: "var(--color-gold)", opacity: 0.55, marginBottom: 10 }}>
                {s.num}
              </p>
              <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-2)", marginBottom: 10 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.8 }}>
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.7} y={20} blur={4}>
        <Link
          href="/aplicar"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            padding: "18px 42px",
            border: "1px solid rgba(201,164,90,.45)",
            background: hovered ? "var(--color-gold)" : "transparent",
            color: hovered ? "#111" : "var(--color-text)",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: ".28em",
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
              width: hovered ? 36 : 26,
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

      {/* Fine print */}
      <Reveal delay={0.9} y={10} blur={2}>
        <p style={{ marginTop: 32, fontSize: 11, letterSpacing: ".15em", color: "var(--color-text-4)" }}>
          Respondemos toda aplicación en un máximo de 72 horas.
        </p>
      </Reveal>
    </section>
  );
}
