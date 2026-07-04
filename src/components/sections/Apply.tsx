"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/config/site";

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

/* Cierre — proceso de selección + CTA definitivo. */
export function Apply() {
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "var(--section-py) var(--section-px) clamp(6rem, 12vh, 10rem)",
        overflow: "hidden",
      }}
    >
      {/* Resplandor central de fondo */}
      <div aria-hidden style={{
        position: "absolute",
        left: "50%", top: "42%",
        transform: "translate(-50%,-50%)",
        width: "min(1100px, 120vw)", height: "70%",
        background: "radial-gradient(ellipse at center, rgba(160,105,10,.09) 0%, rgba(160,105,10,.03) 45%, transparent 72%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: "var(--grid-max)", margin: "0 auto" }}>
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 80px)" }}>
            06 — Proceso de selección
          </p>
        </Reveal>

        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 4.8vw, 4.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.005em",
              color: "var(--color-text)",
              margin: 0,
              marginBottom: "clamp(20px, 3vh, 34px)",
              maxWidth: "12em",
            }}
          >
            Si llegaste hasta acá, ya entendiste que{" "}
            <span style={{
              fontStyle: "italic",
              background: "linear-gradient(95deg, #B8820A 0%, #D4A020 30%, #F0CC50 50%, #D4A020 70%, #B8820A 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingRight: "0.06em",
            }}>
              esto no es para cualquiera.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{
            fontSize: "clamp(14px, 1.1vw, 17px)",
            lineHeight: 1.7,
            color: "var(--color-text-2)",
            maxWidth: "38em",
            margin: 0,
            marginBottom: "clamp(48px, 8vh, 90px)",
          }}>
            Trabajamos con proyectos selectos — comenzamos con una evaluación sin costo
            para confirmar que podemos generar un impacto real.
          </p>
        </Reveal>

        {/* Pasos — tres columnas con hairlines */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,.08)",
            marginBottom: "clamp(48px, 8vh, 90px)",
          }}
        >
          {STEPS.map((s, i) => (
            <Reveal
              key={s.num}
              delay={i * 0.1}
              className={i > 0 ? "md:border-l" : undefined}
              style={{
                padding: "clamp(26px, 4vh, 40px) clamp(0px, 2vw, 32px) clamp(26px, 4vh, 40px) 0",
                borderLeftColor: "rgba(255,255,255,.07)",
                paddingLeft: i > 0 ? "clamp(16px, 2vw, 32px)" : 0,
              }}
            >
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-gold)",
                margin: 0,
                marginBottom: 14,
              }}>
                {s.num}
              </p>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                color: "var(--color-text)",
                margin: 0,
                marginBottom: 12,
                lineHeight: 1.1,
              }}>
                {s.label}
              </p>
              <p style={{
                fontSize: "clamp(13px, 0.98vw, 15px)",
                lineHeight: 1.65,
                color: "var(--color-text-3)",
                margin: 0,
                maxWidth: "26em",
              }}>
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA + microcopy */}
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 26 }}>
            <Magnetic strength={0.22}>
              <Link
                href="/evaluacion"
                data-cursor-hover
                onMouseEnter={() => setCtaHov(true)}
                onMouseLeave={() => setCtaHov(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "clamp(20px, 2vw, 26px) clamp(44px, 4.4vw, 68px)",
                  background: ctaHov ? "var(--color-gold-peak)" : "var(--color-gold)",
                  color: "#0A0A0A",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background .35s",
                  boxShadow: ctaHov
                    ? "0 10px 54px rgba(212,160,32,.38)"
                    : "0 8px 40px rgba(212,160,32,.22)",
                }}
              >
                Solicitar evaluación
                <span aria-hidden style={{
                  position: "relative", display: "inline-flex", alignItems: "center",
                  width: ctaHov ? 32 : 22, height: 1,
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

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "var(--color-text-4)",
              margin: 0,
            }}>
              Respondemos en un máximo de 72 horas
              <span aria-hidden style={{ margin: "0 12px", color: "rgba(212,160,32,.4)" }}>·</span>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor-hover
                style={{ color: "var(--color-text-3)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,.15)", paddingBottom: 2 }}
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
