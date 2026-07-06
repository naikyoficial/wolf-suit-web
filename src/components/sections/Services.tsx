"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES, type ServiceItem } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

/* ─── Card ─────────────────────────────────────────────────────── */
function ServiceCard({ s, onOpen }: { s: ServiceItem; onOpen: () => void }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.button
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-hover
      aria-label={`Ver detalle de ${s.title}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
        height: "100%",
        gap: "clamp(14px, 2vh, 22px)",
        padding: "clamp(24px, 2.6vw, 38px)",
        minHeight: "clamp(220px, 26vh, 280px)",
        borderRadius: 4,
        border: `1px solid ${hov ? "rgba(212,160,32,.34)" : "rgba(255,255,255,.08)"}`,
        background: hov
          ? "linear-gradient(160deg, rgba(255,255,255,.055) 0%, rgba(255,255,255,.02) 100%)"
          : "linear-gradient(160deg, rgba(255,255,255,.028) 0%, rgba(255,255,255,.012) 100%)",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color .4s, background .4s, box-shadow .4s",
        boxShadow: hov
          ? "0 24px 60px -28px rgba(0,0,0,.7)"
          : "0 12px 40px -32px rgba(0,0,0,.5)",
      }}
    >
      {/* Resplandor dorado en hover */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-40%",
          right: "-20%",
          width: "70%",
          height: "80%",
          background: "radial-gradient(ellipse at center, rgba(212,160,32,.14) 0%, transparent 70%)",
          opacity: hov ? 1 : 0,
          transition: "opacity .5s",
          pointerEvents: "none",
        }}
      />

      {/* Fila superior: índice + categoría */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: ".18em",
            color: hov ? "var(--color-gold)" : "rgba(212,160,32,.42)",
            transition: "color .4s",
          }}
        >
          {s.index}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9.5,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: hov ? "rgba(200,193,180,.6)" : "rgba(200,193,180,.3)",
            transition: "color .4s",
          }}
        >
          {s.category}
        </span>
      </div>

      {/* Título + brief */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", gap: "clamp(10px, 1.4vh, 16px)" }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)",
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            color: hov ? "rgba(248,245,240,.98)" : "rgba(248,245,240,.9)",
            transition: "color .4s",
            margin: 0,
          }}
        >
          {s.title}
        </h3>
        <p
          style={{
            fontSize: "clamp(13px, 0.95vw, 14.5px)",
            lineHeight: 1.62,
            color: "var(--color-text-3)",
            margin: 0,
          }}
        >
          {s.brief}
        </p>
      </div>

      {/* Pie: ver detalle */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingTop: "clamp(6px, 1vh, 12px)",
          borderTop: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: hov ? "var(--color-gold)" : "rgba(200,193,180,.4)",
            transition: "color .4s",
          }}
        >
          Ver detalle
        </span>
        <span
          aria-hidden
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            width: hov ? 24 : 16,
            height: 1,
            background: hov ? "var(--color-gold)" : "rgba(200,193,180,.4)",
            transition: "width .4s, background .4s",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: -1,
              top: -2.5,
              width: 5,
              height: 5,
              borderRight: `1px solid ${hov ? "var(--color-gold)" : "rgba(200,193,180,.4)"}`,
              borderTop: `1px solid ${hov ? "var(--color-gold)" : "rgba(200,193,180,.4)"}`,
              transform: "rotate(45deg)",
              transition: "border-color .4s",
            }}
          />
        </span>
      </div>
    </motion.button>
  );
}

/* ─── Modal enfocado ───────────────────────────────────────────── */
function ServiceModal({ s, onClose }: { s: ServiceItem; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [closeHov, setCloseHov] = useState(false);
  const [ctaHov, setCtaHov] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px, 4vw, 48px)",
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(4,3,2,.75)",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* Panel — flex column so we can fix gold bar at top */}
      <motion.div
        role="dialog" aria-modal="true" aria-label={s.title}
        initial={{ opacity: 0, scale: 0.95, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          position: "relative",
          width: "min(820px, 100%)",
          maxHeight: "90vh",
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,.09)",
          background: "rgba(8, 7, 6, 0.82)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow: "0 60px 140px -36px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.05)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Gold top accent line */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 10,
          background: GOLD, backgroundSize: "200% 100%",
          animation: "heroSheen 9s ease-in-out infinite",
        }} />

        {/* Ghost numeral — large, bottom-right */}
        <span aria-hidden style={{
          position: "absolute", bottom: "-0.08em", right: "clamp(20px, 4vw, 52px)",
          fontFamily: "var(--font-body)", fontWeight: 700, fontStyle: "italic",
          fontSize: "clamp(9rem, 18vw, 18rem)", lineHeight: 1,
          color: "rgba(212,160,32,.055)",
          pointerEvents: "none", userSelect: "none",
        }}>
          {s.index}
        </span>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", flex: 1, paddingTop: 2 }}>

          {/* ── Header ── */}
          <div style={{ padding: "clamp(28px, 3.5vw, 52px) clamp(28px, 3.5vw, 52px) clamp(24px, 3vh, 38px)", position: "relative", zIndex: 1 }}>

            {/* Close */}
            <button
              onClick={onClose}
              onMouseEnter={() => setCloseHov(true)}
              onMouseLeave={() => setCloseHov(false)}
              data-cursor-hover
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: "clamp(18px, 2.5vw, 28px)", right: "clamp(18px, 2.5vw, 28px)",
                width: 34, height: 34, borderRadius: "50%",
                border: `1px solid ${closeHov ? "rgba(212,160,32,.5)" : "rgba(255,255,255,.1)"}`,
                background: closeHov ? "rgba(212,160,32,.07)" : "transparent",
                cursor: "pointer", transition: "border-color .3s, background .3s", zIndex: 2,
              }}
            >
              <span style={{ position: "absolute", left: "50%", top: "50%", width: 11, height: 1, background: closeHov ? "var(--color-gold)" : "rgba(248,245,240,.5)", transform: "translate(-50%,-50%) rotate(45deg)", transition: "background .3s" }} />
              <span style={{ position: "absolute", left: "50%", top: "50%", width: 11, height: 1, background: closeHov ? "var(--color-gold)" : "rgba(248,245,240,.5)", transform: "translate(-50%,-50%) rotate(-45deg)", transition: "background .3s" }} />
            </button>

            {/* Eyebrow */}
            <p className="section-index" style={{ marginBottom: "clamp(18px, 2.4vh, 28px)" }}>
              {s.index} — {s.category}
            </p>

            {/* Title */}
            <h3 style={{
              fontFamily: "var(--font-body)", fontWeight: 700,
              fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
              lineHeight: 1.06, letterSpacing: "-0.04em",
              color: "var(--color-text)",
              margin: "0 0 clamp(8px, 1.2vh, 14px)",
              paddingRight: "clamp(44px, 8vw, 80px)", maxWidth: "14em",
            }}>
              {s.title}
            </h3>

            {/* Subtitle */}
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.4,
              color: "rgba(248,245,240,.42)", margin: 0,
            }}>
              {s.subtitle}
            </p>
          </div>

          {/* Gradient divider */}
          <div aria-hidden style={{
            height: 1, margin: "0 clamp(28px, 3.5vw, 52px)",
            background: "linear-gradient(to right, rgba(212,160,32,.35) 0%, rgba(255,255,255,.06) 45%, transparent 100%)",
          }} />

          {/* ── Body ── */}
          <div
            style={{
              padding: "clamp(28px, 3.5vh, 44px) clamp(28px, 3.5vw, 52px) clamp(40px, 5.5vh, 64px)",
              position: "relative", zIndex: 1,
              display: "flex", flexDirection: "column",
              gap: "clamp(24px, 3.5vh, 36px)",
            }}
          >
            {/* Description */}
            <p style={{
              fontSize: "clamp(14px, 1.08vw, 16px)", lineHeight: 1.84,
              color: "var(--color-text-2)", margin: 0,
            }}>
              {s.desc}
            </p>

            {/* Deliverables — 3 items in a row */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ gap: "clamp(10px, 1.4vw, 16px)" }}
            >
              {s.deliverables.map((d) => (
                <div
                  key={d}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "clamp(14px, 1.8vh, 18px) clamp(14px, 1.6vw, 18px)",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 3,
                  }}
                >
                  <span aria-hidden style={{
                    width: 12, height: 1, background: "rgba(212,160,32,.5)",
                    flexShrink: 0, marginTop: 8,
                  }} />
                  <span style={{
                    fontSize: "clamp(12.5px, 0.9vw, 14px)",
                    color: "var(--color-text-2)", lineHeight: 1.5,
                  }}>
                    {d}
                  </span>
                </div>
              ))}
            </div>

            {/* Brief callout */}
            <blockquote style={{
              margin: 0,
              padding: "clamp(14px, 2vh, 18px) clamp(18px, 2.2vw, 24px)",
              borderLeft: "2px solid rgba(212,160,32,.38)",
              background: "rgba(212,160,32,.04)",
              borderRadius: "0 3px 3px 0",
            }}>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(13.5px, 1vw, 15.5px)", lineHeight: 1.7,
                color: "rgba(248,245,240,.5)", margin: 0,
              }}>
                {s.brief}
              </p>
            </blockquote>

            {/* CTA + nota */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "clamp(20px, 3vw, 36px)", flexWrap: "wrap",
              paddingTop: "clamp(4px, 0.6vh, 8px)",
            }}>
              <Link
                href="/evaluacion"
                data-cursor-hover
                onClick={onClose}
                className="cta-gold"
                onMouseEnter={() => setCtaHov(true)}
                onMouseLeave={() => setCtaHov(false)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 14,
                  padding: "clamp(13px, 1.4vw, 17px) clamp(28px, 3vw, 40px)",
                  fontFamily: "var(--font-mono)", fontWeight: 500,
                  fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Solicitar evaluación
                <span aria-hidden style={{
                  position: "relative", display: "inline-flex", alignItems: "center",
                  width: ctaHov ? 26 : 18, height: 1,
                  background: "currentColor", flexShrink: 0, transition: "width .35s",
                }}>
                  <span style={{
                    position: "absolute", right: -1, top: -2.5, width: 5, height: 5,
                    borderRight: "1px solid currentColor", borderTop: "1px solid currentColor",
                    transform: "rotate(45deg)",
                  }} />
                </span>
              </Link>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9.5,
                letterSpacing: ".18em", textTransform: "uppercase",
                color: "var(--color-text-4)",
              }}>
                Respondemos en 72 horas
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

/* ─── Sección ──────────────────────────────────────────────────── */
export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const activeService = active !== null ? SERVICES[active] : null;

  return (
    <section
      id="servicios"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src="/background-servicios.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center center" }}
      />

      {/* Overlay oscuro */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.56)",
        zIndex: 1,
      }} />

      {/* Viñeta perimetral */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(110% 90% at 50% 50%, transparent 38%, rgba(0,0,0,.7) 100%)",
      }} />

      {/* Fade superior */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, zIndex: 1, pointerEvents: "none",
        height: "58%",
        background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, rgba(6,5,4,.72) 40%, transparent 100%)",
      }} />

      {/* Fade inferior */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: "none",
        height: "55%",
        background: "linear-gradient(to bottom, transparent 0%, rgba(6,5,4,.78) 50%, rgba(6,5,4,1) 100%)",
      }} />

      {/* Contenido */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
      }}>
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 68px)" }}>
            03 — Servicios
          </p>
        </Reveal>

        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 7vh, 80px)" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                margin: "0 0 clamp(14px, 2vh, 20px)",
              }}
            >
              ¿Qué podemos construir{" "}
              <span style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "#D9B36A",
              }}>para tu empresa?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{
              fontSize: "clamp(14px, 1.05vw, 16px)",
              lineHeight: 1.72,
              color: "var(--color-text-2)",
              margin: "0 auto",
              maxWidth: "42em",
            }}>
              Cada proyecto es único — adaptamos el alcance a tu situación específica.
              <span style={{
                display: "block",
                marginTop: 8,
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(11px, 0.85vw, 12.5px)",
                letterSpacing: ".06em",
                color: "var(--color-text-3)",
              }}>
                Tocá cualquier servicio para ver el detalle completo.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Grid de cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(16px, 1.6vw, 26px)",
          }}
        >
          {SERVICES.map((s, i) => (
            <Reveal key={s.index} delay={i * 0.06} y={26}>
              <ServiceCard s={s} onOpen={() => setActive(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeService && (
          <ServiceModal s={activeService} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
