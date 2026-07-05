"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/config/site";

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

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
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "var(--section-py) var(--section-px) clamp(6rem, 12vh, 10rem)",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,.06)",
      }}
    >
      {/* Resplandor de fondo */}
      <div aria-hidden style={{
        position: "absolute",
        left: "50%", top: "40%",
        transform: "translate(-50%,-50%)",
        width: "min(900px, 110vw)", height: "65%",
        background: "radial-gradient(ellipse at center, rgba(160,105,10,.07) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: "var(--grid-max)", margin: "0 auto" }}>
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 76px)" }}>
            06 — Proceso de selección
          </p>
        </Reveal>

        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]"
          style={{ gap: "clamp(40px, 6vw, 96px)", alignItems: "start", marginBottom: "clamp(52px, 9vh, 96px)" }}
        >
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(2rem, 3.4vw, 3rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              Si llegaste hasta acá,
              <br />
              ya entendiste que{" "}
              <span style={{
                display: "inline-block",
                fontStyle: "italic",
                background: GOLD,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                esto no es para cualquiera.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{
              fontSize: "clamp(14px, 1.08vw, 17px)",
              lineHeight: 1.72,
              color: "var(--color-text-2)",
              margin: 0,
            }}>
              Trabajamos con proyectos selectos — comenzamos con una evaluación sin costo
              para confirmar que podemos generar un impacto real.
            </p>
          </Reveal>
        </div>

        {/* Pasos */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,.07)",
            marginBottom: "clamp(52px, 9vh, 96px)",
          }}
        >
          {STEPS.map((s, i) => (
            <Reveal
              key={s.num}
              delay={i * 0.08}
              className={i > 0 ? "md:border-l" : undefined}
              style={{
                padding: "clamp(24px, 3.8vh, 38px) clamp(0px, 2vw, 28px) clamp(24px, 3.8vh, 38px) 0",
                borderLeftColor: "rgba(255,255,255,.06)",
                paddingLeft: i > 0 ? "clamp(16px, 2vw, 28px)" : 0,
              }}
            >
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".2em",
                color: "var(--color-gold)",
                margin: 0,
                marginBottom: 14,
              }}>
                {s.num}
              </p>
              <p style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 1.7vw, 1.45rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--color-text)",
                margin: 0,
                marginBottom: 10,
              }}>
                {s.label}
              </p>
              <p style={{
                fontSize: "clamp(13px, 0.95vw, 15px)",
                lineHeight: 1.68,
                color: "var(--color-text-3)",
                margin: 0,
              }}>
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
            <Magnetic strength={0.22}>
              <Link
                href="/evaluacion"
                data-cursor-hover
                onMouseEnter={() => setCtaHov(true)}
                onMouseLeave={() => setCtaHov(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "clamp(18px, 1.8vw, 24px) clamp(40px, 4vw, 62px)",
                  background: ctaHov ? "var(--color-gold-peak)" : "var(--color-gold)",
                  color: "#0A0A0A",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 11.5,
                  letterSpacing: ".26em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background .35s, box-shadow .35s",
                  boxShadow: ctaHov
                    ? "0 10px 50px rgba(212,160,32,.36)"
                    : "0 6px 36px rgba(212,160,32,.2)",
                }}
              >
                Solicitar evaluación
                <span aria-hidden style={{
                  position: "relative", display: "inline-flex", alignItems: "center",
                  width: ctaHov ? 30 : 20, height: 1,
                  background: "currentColor", flexShrink: 0,
                  transition: "width .35s",
                }}>
                  <span style={{
                    position: "absolute", right: -1, top: -2.5,
                    width: 5, height: 5,
                    borderRight: "1px solid currentColor",
                    borderTop: "1px solid currentColor",
                    transform: "rotate(45deg)",
                  }} />
                </span>
              </Link>
            </Magnetic>

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--color-text-4)",
              margin: 0,
            }}>
              Respondemos en un máximo de 72 horas
              <span aria-hidden style={{ margin: "0 10px", color: "rgba(212,160,32,.35)" }}>·</span>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor-hover
                style={{ color: "var(--color-text-3)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,.12)", paddingBottom: 2 }}
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
