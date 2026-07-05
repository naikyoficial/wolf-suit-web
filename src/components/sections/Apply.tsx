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
    desc: "Completás el formulario. Nos contás quién sos, qué querés construir y cuál es tu objetivo real.",
  },
  {
    num: "02",
    label: "Evaluación",
    desc: "Analizamos si existe una oportunidad real de impacto. No avanzamos si no la hay — te lo decimos sin rodeos.",
  },
  {
    num: "03",
    label: "Conversación",
    desc: "Si hay alineación real, coordinamos el próximo paso y definimos juntos cómo abordarlo.",
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
        left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: "min(1000px, 120vw)", height: "70%",
        background: "radial-gradient(ellipse at center, rgba(160,105,10,.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: "var(--grid-max)", margin: "0 auto" }}>
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 76px)" }}>
            06 — Proceso de selección
          </p>
        </Reveal>

        {/* Header */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]"
          style={{ gap: "clamp(32px, 5vw, 80px)", alignItems: "start", marginBottom: "clamp(52px, 9vh, 96px)" }}
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
              Trabajamos con pocos.<br />
              <span style={{
                display: "inline-block",
                fontStyle: "italic",
                fontWeight: 400,
                background: GOLD,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Nos importa el resultado,<br />no el volumen.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{
              fontSize: "clamp(14px, 1.08vw, 17px)",
              lineHeight: 1.75,
              color: "var(--color-text-2)",
              margin: 0,
            }}>
              Antes de arrancar cualquier proyecto hacemos una evaluación sin costo.
              Es la única forma de confirmar que lo que vamos a construir va a generar un impacto real en tu negocio.
            </p>
          </Reveal>
        </div>

        {/* Pasos */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,.07)",
            marginBottom: "clamp(64px, 11vh, 110px)",
          }}
        >
          {STEPS.map((s, i) => (
            <Reveal
              key={s.num}
              delay={i * 0.08}
              className={i > 0 ? "md:border-l" : undefined}
              style={{
                padding: "clamp(28px, 4.2vh, 44px) clamp(0px, 2vw, 32px) clamp(28px, 4.2vh, 44px) 0",
                borderLeftColor: "rgba(255,255,255,.06)",
                paddingLeft: i > 0 ? "clamp(20px, 2vw, 32px)" : 0,
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px, 1.4vh, 16px)",
              }}
            >
              {/* Número grande de fondo + número pequeño encima */}
              <div style={{ position: "relative", marginBottom: 4 }}>
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "-4px",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "clamp(3.5rem, 5vw, 5.5rem)",
                    lineHeight: 1,
                    color: "rgba(212,160,32,.07)",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {s.num}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: ".22em",
                  color: "var(--color-gold)",
                  position: "relative",
                  display: "block",
                  paddingTop: "clamp(28px, 3.5vh, 40px)",
                }}>
                  {s.num}
                </span>
              </div>

              <p style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--color-text)",
                margin: 0,
              }}>
                {s.label}
              </p>
              <p style={{
                fontSize: "clamp(13px, 0.95vw, 15px)",
                lineHeight: 1.7,
                color: "var(--color-text-3)",
                margin: 0,
              }}>
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA — centrado */}
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, textAlign: "center" }}>
            <Magnetic strength={0.18}>
              <Link
                href="/evaluacion"
                data-cursor-hover
                onMouseEnter={() => setCtaHov(true)}
                onMouseLeave={() => setCtaHov(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "clamp(16px, 1.6vw, 22px) clamp(44px, 4.5vw, 68px)",
                  background: ctaHov ? "rgba(212,160,32,.08)" : "transparent",
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 11.5,
                  letterSpacing: ".26em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: `1px solid ${ctaHov ? "rgba(212,160,32,.7)" : "rgba(212,160,32,.38)"}`,
                  transition: "background .4s, border-color .4s, box-shadow .4s",
                  boxShadow: ctaHov
                    ? "0 0 48px rgba(212,160,32,.14), inset 0 0 28px rgba(212,160,32,.04)"
                    : "none",
                }}
              >
                Solicitar evaluación
                <span aria-hidden style={{
                  position: "relative", display: "inline-flex", alignItems: "center",
                  width: ctaHov ? 30 : 20, height: 1,
                  background: "currentColor", flexShrink: 0,
                  transition: "width .4s",
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
              <span aria-hidden style={{ margin: "0 12px", color: "rgba(212,160,32,.3)" }}>·</span>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor-hover
                style={{ color: "var(--color-text-3)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 2 }}
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
