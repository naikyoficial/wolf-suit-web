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

  // Cerrar con Escape + bloquear scroll de fondo
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(20px, 5vw, 60px)",
      }}
    >
      {/* Backdrop desenfocado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5,4,3,.62)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={s.title}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: "relative",
          width: "min(660px, 100%)",
          maxHeight: "86vh",
          overflowY: "auto",
          padding: "clamp(30px, 4vw, 56px)",
          borderRadius: 6,
          border: "1px solid rgba(212,160,32,.2)",
          background:
            "linear-gradient(165deg, #16150F 0%, #100F0C 55%, #0C0B08 100%)",
          boxShadow: "0 50px 120px -40px rgba(0,0,0,.85)",
        }}
      >
        {/* Numeral gigante de fondo */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "clamp(-8px, -1vw, -4px)",
            right: "clamp(18px, 3vw, 40px)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(6rem, 12vw, 11rem)",
            lineHeight: 1,
            color: "rgba(212,160,32,.06)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {s.index}
        </span>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          onMouseEnter={() => setCloseHov(true)}
          onMouseLeave={() => setCloseHov(false)}
          data-cursor-hover
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: "clamp(18px, 2vw, 26px)",
            right: "clamp(18px, 2vw, 26px)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1px solid ${closeHov ? "rgba(212,160,32,.55)" : "rgba(255,255,255,.12)"}`,
            background: closeHov ? "rgba(212,160,32,.08)" : "transparent",
            cursor: "pointer",
            transition: "border-color .3s, background .3s",
            zIndex: 2,
          }}
        >
          <span style={{ position: "absolute", left: "50%", top: "50%", width: 12, height: 1, background: closeHov ? "var(--color-gold)" : "rgba(248,245,240,.55)", transform: "translate(-50%,-50%) rotate(45deg)", transition: "background .3s" }} />
          <span style={{ position: "absolute", left: "50%", top: "50%", width: 12, height: 1, background: closeHov ? "var(--color-gold)" : "rgba(248,245,240,.55)", transform: "translate(-50%,-50%) rotate(-45deg)", transition: "background .3s" }} />
        </button>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".26em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            margin: "0 0 clamp(14px, 2vh, 20px)",
          }}
        >
          {s.index} — {s.category}
        </p>

        {/* Título */}
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            margin: "0 0 clamp(6px, 1vh, 10px)",
            paddingRight: "clamp(40px, 6vw, 60px)",
          }}
        >
          {s.title}
        </h3>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            lineHeight: 1.4,
            color: "rgba(248,245,240,.6)",
            margin: "0 0 clamp(22px, 3.4vh, 34px)",
          }}
        >
          {s.subtitle}
        </p>

        {/* Descripción */}
        <p
          style={{
            fontSize: "clamp(14px, 1.05vw, 16px)",
            lineHeight: 1.78,
            color: "var(--color-text-2)",
            margin: "0 0 clamp(26px, 4vh, 38px)",
          }}
        >
          {s.desc}
        </p>

        {/* Deliverables */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.6vh, 15px)",
            paddingTop: "clamp(22px, 3.2vh, 32px)",
            borderTop: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9.5,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "var(--color-text-4)",
              margin: "0 0 4px",
            }}
          >
            Incluye
          </p>
          {s.deliverables.map((d) => (
            <span key={d} style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span aria-hidden style={{ width: 16, height: 1, background: "rgba(212,160,32,.6)", flexShrink: 0, transform: "translateY(-4px)" }} />
              <span style={{ fontSize: "clamp(13.5px, 0.98vw, 15px)", color: "var(--color-text-2)", lineHeight: 1.55 }}>
                {d}
              </span>
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "clamp(28px, 4vh, 40px)" }}>
          <Link
            href="/evaluacion"
            data-cursor-hover
            onClick={onClose}
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "clamp(14px, 1.5vw, 18px) clamp(30px, 3vw, 44px)",
              background: ctaHov ? "var(--color-gold-peak)" : "var(--color-gold)",
              color: "#0A0A0A",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background .35s, box-shadow .35s",
              boxShadow: ctaHov
                ? "0 10px 44px rgba(212,160,32,.34)"
                : "0 6px 30px rgba(212,160,32,.18)",
            }}
          >
            Solicitar evaluación
            <span aria-hidden style={{ position: "relative", display: "inline-flex", alignItems: "center", width: ctaHov ? 28 : 20, height: 1, background: "currentColor", flexShrink: 0, transition: "width .35s" }}>
              <span style={{ position: "absolute", right: -1, top: -2.5, width: 5, height: 5, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
            </span>
          </Link>
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
        unoptimized
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
                display: "inline-block",
                fontStyle: "italic",
                fontWeight: 400,
                background: GOLD,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
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
