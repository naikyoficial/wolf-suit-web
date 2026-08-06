"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppLink, WhatsAppIcon } from "@/components/ui/WhatsAppLink";
import { SITE } from "@/config/site";

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

const SIGNALS = [
  { label: "Respuesta el mismo día",   detail: "Lunes a viernes" },
  { label: "Directamente conmigo",     detail: "No un bot, no un asistente" },
  { label: "Reunión sin compromiso",   detail: "Coordinamos en el primer chat" },
];

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Image
        src="/background-trabajos.webp"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
        priority={false}
      />

      {/* Dark overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "rgba(4,3,2,.78)",
        zIndex: 1,
      }} />

      {/* Perimeter vignette */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(3,2,1,.6) 100%)",
        zIndex: 1,
      }} />

      {/* Top fade */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "42%",
        background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* Bottom fade */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "30%",
        background: "linear-gradient(to top, rgba(6,5,4,1) 0%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "var(--section-py) var(--section-px) clamp(6rem, 12vh, 10rem)",
        }}
      >
        <div style={{ maxWidth: "var(--grid-max)", margin: "0 auto" }}>
          <Reveal>
            <p className="section-index" style={{ marginBottom: "clamp(32px, 5vh, 60px)" }}>
              07 — Contacto
            </p>
          </Reveal>

          {/* Header — centrado, contundente */}
          <div style={{ textAlign: "center", marginBottom: "clamp(44px, 7vh, 72px)" }}>
            <Reveal>
              <h2
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "clamp(2.1rem, 3.4vw, 3.2rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text)",
                  margin: "0 auto clamp(20px, 3vh, 28px)",
                  maxWidth: "18ch",
                }}
              >
                Hablemos hoy mismo,{" "}
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
                  sin vueltas.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p style={{
                fontSize: "clamp(15px, 1.15vw, 17px)",
                lineHeight: 1.7,
                color: "var(--color-text-2)",
                margin: "0 auto",
                maxWidth: "38em",
              }}>
                Escribime por WhatsApp y coordinamos una reunión. Respondo yo personalmente —
                nada de formularios, filtros ni intermediarios.
              </p>
            </Reveal>
          </div>

          {/* CTA principal — botón dominante */}
          <Reveal delay={0.15}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(20px, 3vh, 28px)",
              marginBottom: "clamp(56px, 9vh, 88px)",
            }}>
              <Magnetic strength={0.14}>
                <WhatsAppLink
                  dataCursorHover
                  className="cta-primary"
                  ariaLabel="Escribime por WhatsApp"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "clamp(18px, 2vw, 24px) clamp(38px, 4.2vw, 60px)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: 12.5,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  <WhatsAppIcon size={22} />
                  Escribime por WhatsApp
                </WhatsAppLink>
              </Magnetic>

              {/* Fallback secundario — email */}
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--color-text-4)",
                margin: 0,
              }}>
                ¿Preferís email?{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  data-cursor-hover
                  style={{
                    color: "var(--color-text-2)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(217,179,106,.35)",
                    paddingBottom: 2,
                  }}
                >
                  {SITE.email}
                </a>
              </p>
            </div>
          </Reveal>

          {/* Trust signals — 3 columnas discretas */}
          <Reveal delay={0.22}>
            <div
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{
                borderTop: "1px solid rgba(255,255,255,.08)",
                borderBottom: "1px solid rgba(255,255,255,.08)",
                maxWidth: 780,
                margin: "0 auto",
              }}
            >
              {SIGNALS.map((s, i) => (
                <div
                  key={s.label}
                  className={i > 0 ? "sm:border-l" : undefined}
                  style={{
                    padding: "clamp(18px, 2.6vh, 26px) clamp(14px, 2vw, 24px)",
                    borderLeftColor: "rgba(255,255,255,.06)",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(13px, 0.98vw, 14px)",
                    fontWeight: 500,
                    color: "var(--color-text-2)",
                    letterSpacing: "-0.005em",
                    margin: 0,
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "var(--color-text-4)",
                    margin: 0,
                  }}>
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
