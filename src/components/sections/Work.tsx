"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { WORKS, type WorkProject } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

/* ─── Placeholder de marca (mientras no haya imagen cargada) ─────── */
function PlaceholderScreen({ s }: { s: WorkProject }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(12px, 1.8vh, 18px)",
        padding: 24,
        textAlign: "center",
        background:
          "radial-gradient(120% 90% at 50% 24%, rgba(212,160,32,.13) 0%, transparent 56%), linear-gradient(162deg, #16120b 0%, #0b0a08 100%)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: "rgba(200,193,180,.5)",
        }}
      >
        {s.category}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(2rem, 4.2vw, 3.4rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          background: GOLD,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {s.name}
      </span>
      <span style={{ width: 40, height: 1, background: "rgba(212,160,32,.4)" }} />
    </div>
  );
}

/* ─── Botón de toggle (＋ / −) ──────────────────────────────────── */
function ToggleButton({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "1px solid rgba(212,160,32,.4)",
        background: open ? "rgba(212,160,32,.12)" : "transparent",
        flexShrink: 0,
        transition: "background .35s, border-color .35s",
      }}
    >
      <span
        style={{
          position: "absolute",
          width: 12,
          height: 1.5,
          borderRadius: 2,
          background: "var(--color-gold)",
        }}
      />
      <span
        style={{
          position: "absolute",
          width: 12,
          height: 1.5,
          borderRadius: 2,
          background: "var(--color-gold)",
          transform: open ? "rotate(0deg) scaleX(0)" : "rotate(90deg)",
          transition: "transform .35s cubic-bezier(.16,1,.3,1)",
        }}
      />
    </span>
  );
}

/* ─── Tarjeta de galería — la card ES la imagen ─────────────────── */
function GalleryCard({
  s,
  featured,
  delay,
}: {
  s: WorkProject;
  featured: boolean;
  delay: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `work-panel-${s.name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Reveal y={featured ? 44 : 32} delay={delay}>
      <div
        style={{
          maxWidth: featured ? 640 : 320,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* La card = imagen full-bleed */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? `Ocultar detalles de ${s.name}` : `Ver detalles de ${s.name}`}
          data-cursor-hover
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: "block",
            width: "100%",
            padding: 0,
            border: "1px solid rgba(255,255,255,.1)",
            cursor: "pointer",
            position: "relative",
            borderRadius: "clamp(20px, 2.2vw, 30px)",
            overflow: "hidden",
            background: "#0b0a08",
            boxShadow: featured
              ? "0 60px 120px -50px rgba(0,0,0,.92)"
              : "0 40px 90px -50px rgba(0,0,0,.9)",
            aspectRatio: featured ? "1 / 1.06" : "1 / 1",
          }}
        >
          {s.cover ? (
            <Image
              src={s.cover}
              alt={`${s.name} — ${s.category}`}
              fill
              sizes={featured ? "(max-width: 1024px) 92vw, 640px" : "(max-width: 1024px) 92vw, 320px"}
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                transform: `scale(${s.coverScale ?? 1})`,
              }}
            />
          ) : (
            <PlaceholderScreen s={s} />
          )}

          {/* Reflejo/borde superior sutil */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background: "linear-gradient(165deg, rgba(255,255,255,.08) 0%, transparent 26%)",
            }}
          />
        </motion.button>

        {/* Caption debajo — chip categoría + nombre + toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginTop: "clamp(16px, 1.8vw, 22px)",
            padding: "0 clamp(2px, 0.4vw, 6px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(9px, 1.2vh, 13px)", minWidth: 0 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                alignSelf: "flex-start",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(9px, 1vw, 10px)",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--color-text-3)",
                padding: "clamp(5px, 0.7vw, 7px) clamp(10px, 1.2vw, 13px)",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.14)",
              }}
            >
              {s.category}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: featured ? "clamp(1.5rem, 2.6vw, 2.1rem)" : "clamp(1.25rem, 2vw, 1.55rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              {s.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? `Ocultar detalles de ${s.name}` : `Ver detalles de ${s.name}`}
            data-cursor-hover
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 0 0",
              flexShrink: 0,
            }}
          >
            <span
              className="hidden sm:inline"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "var(--color-text-3)",
                whiteSpace: "nowrap",
              }}
            >
              {open ? "Cerrar" : "Ver detalles"}
            </span>
            <ToggleButton open={open} />
          </button>
        </div>

        {/* Panel expandible — descripción + tags + link */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(14px, 1.8vh, 20px)",
                  padding: "clamp(16px, 1.8vw, 22px) clamp(2px, 0.4vw, 6px) clamp(4px, 0.6vw, 8px)",
                  marginTop: "clamp(12px, 1.4vh, 16px)",
                  borderTop: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(14px, 1.02vw, 15.5px)",
                    lineHeight: 1.72,
                    color: "var(--color-text-2)",
                    margin: 0,
                  }}
                >
                  {s.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(7px, 1vw, 10px)" }}>
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "clamp(9.5px, 1vw, 10.5px)",
                        letterSpacing: ".08em",
                        color: "var(--color-text-3)",
                        padding: "clamp(5px, 0.9vw, 7px) clamp(9px, 1.4vw, 13px)",
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,.09)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      textDecoration: "none",
                      width: "fit-content",
                    }}
                  >
                    Ver proyecto
                    <span
                      aria-hidden
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        width: 20,
                        height: 1,
                        background: "currentColor",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: -1,
                          top: -2.5,
                          width: 5,
                          height: 5,
                          borderRight: "1px solid currentColor",
                          borderTop: "1px solid currentColor",
                          transform: "rotate(45deg)",
                        }}
                      />
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ─── Sección ───────────────────────────────────────────────────── */
export function Work() {
  // Composición: central (protagonista, grande) + 2 laterales flotantes.
  const [center, left, right] = WORKS;

  return (
    <section id="trabajos" style={{ position: "relative", overflow: "hidden" }}>
      {/* Imagen de fondo */}
      <Image
        src="/background-trabajos.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center center" }}
      />

      {/* Overlay oscuro */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)", zIndex: 1 }} />

      {/* Viñeta perimetral */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(110% 90% at 50% 50%, transparent 40%, rgba(0,0,0,.72) 100%)",
        }}
      />

      {/* Fade superior */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1,
          pointerEvents: "none",
          height: "55%",
          background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, rgba(6,5,4,.7) 42%, transparent 100%)",
        }}
      />

      {/* Fade inferior */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: "none",
          height: "55%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(6,5,4,.78) 50%, rgba(6,5,4,1) 100%)",
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "var(--section-py) var(--section-px)",
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
        }}
      >
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(32px, 6vh, 68px)" }}>
            04 — Trabajos
          </p>
        </Reveal>

        <div style={{ textAlign: "center", marginBottom: "clamp(44px, 8vh, 96px)" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                margin: "0 0 clamp(14px, 2vh, 20px)",
              }}
            >
              Una muestra de{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#D9B36A" }}>
                lo que construimos.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                fontSize: "clamp(15px, 1.05vw, 16px)",
                lineHeight: 1.7,
                color: "var(--color-text-2)",
                margin: "0 auto",
                maxWidth: "40em",
              }}
            >
              Cada proyecto, pensado a medida y construido desde cero. Tocá cualquier tarjeta para ver el detalle.
            </p>
          </Reveal>
        </div>

        {/* Galería — central grande + 2 laterales flotantes (desplazadas hacia abajo) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.9fr_1fr]"
          style={{ gap: "clamp(28px, 3vw, 48px)", alignItems: "start" }}
        >
          {left && (
            <div className="lg:mt-[150px]">
              <GalleryCard s={left} featured={false} delay={0.12} />
            </div>
          )}

          {center && (
            <div className="order-first lg:order-none">
              <GalleryCard s={center} featured delay={0} />
            </div>
          )}

          {right && (
            <div className="lg:mt-[150px]">
              <GalleryCard s={right} featured={false} delay={0.18} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
