"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const AUTOPLAY_MS = 5200;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

/* ─── Laptop frame ─────────────────────────────────────── */
function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: "100%", filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.55))" }}>
      {/* Lid */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #1c1913 0%, #14110c 100%)",
          border: "1px solid rgba(217,179,106,.16)",
          borderBottom: "none",
          borderRadius: "14px 14px 4px 4px",
          padding: "14px 14px 0",
          aspectRatio: "16 / 10",
          overflow: "hidden",
        }}
      >
        {/* Camera */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#050403",
            border: "1px solid rgba(217,179,106,.18)",
          }}
        />
        {/* Screen */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "#0a0806",
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(217,179,106,.1)",
          }}
        >
          {children}
        </div>
      </div>
      {/* Base */}
      <div
        style={{
          position: "relative",
          height: 12,
          background: "linear-gradient(180deg, #1c1913 0%, #0d0b08 100%)",
          border: "1px solid rgba(217,179,106,.14)",
          borderTop: "none",
          borderRadius: "0 0 14px 14px",
          margin: "0 -2%",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "42%",
            right: "42%",
            height: 4,
            background: "#050403",
            borderRadius: "0 0 6px 6px",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Placeholder cuando el servicio no tiene cover ─────── */
function ServicePlaceholder({ category }: { category: string }) {
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
        gap: 14,
        background:
          "radial-gradient(120% 90% at 50% 20%, rgba(217,179,106,.18) 0%, transparent 60%), #0e0c09",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          background: GOLD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-.02em",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        {category}
      </span>
      <span style={{ width: 40, height: 1, background: "rgba(217,179,106,.35)" }} />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: ".28em",
          color: "rgba(217,179,106,.5)",
          textTransform: "uppercase",
        }}
      >
        Suitwolf
      </span>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────── */
export function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const n = SERVICES.length;

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (paused || n <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, n]);

  const s = SERVICES[active]!;
  const title = s.canvasTitle ?? { normal: s.title, accent: "", end: "" };

  return (
    <section
      id="servicios"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Imagen de fondo — filosofía */}
      <Image
        src="/background-filosofia.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center center", zIndex: 0 }}
      />
      {/* Overlay oscuro suave — deja respirar la imagen */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.48)",
          zIndex: 1,
        }}
      />
      {/* Viñeta perimetral suave */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(120% 100% at 50% 50%, transparent 50%, rgba(0,0,0,.6) 100%)",
        }}
      />
      {/* Fade solo en el borde superior — hacia el bloque anterior */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1,
          pointerEvents: "none",
          height: "30%",
          background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, rgba(6,5,4,.45) 55%, transparent 100%)",
        }}
      />
      {/* Fade solo en el borde inferior — hacia el bloque siguiente */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: "none",
          height: "30%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(6,5,4,.55) 55%, rgba(6,5,4,1) 100%)",
        }}
      />
      {/* Ambient gold glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(55% 45% at 72% 45%, rgba(233,200,122,.14) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
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
          <p className="section-index" style={{ marginBottom: "clamp(32px, 5vh, 56px)" }}>
            02 — Servicios
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              color: "var(--color-text)",
              margin: "0 0 clamp(56px, 10vh, 120px)",
              maxWidth: "20em",
              textWrap: "balance",
            }}
          >
            Qué podemos construir{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#D9B36A" }}>
              para tu empresa.
            </span>
          </h2>
        </Reveal>

        {/* Grid: selector + canvas */}
        <Reveal delay={0.1}>
          <div
            ref={containerRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 3fr)",
              gap: "clamp(40px, 5vw, 88px)",
              alignItems: "start",
            }}
          >
            {/* ─── Selector vertical ─────────────────────── */}
            <div role="tablist" aria-label="Servicios" style={{ display: "flex", flexDirection: "column" }}>
              {SERVICES.map((svc, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={svc.index}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    data-cursor-hover
                    onMouseEnter={() => go(i)}
                    onFocus={() => go(i)}
                    onClick={() => go(i)}
                    style={{
                      position: "relative",
                      display: "grid",
                      gridTemplateColumns: "40px 1fr",
                      gap: 20,
                      alignItems: "baseline",
                      padding: "clamp(22px, 3vh, 32px) 4px",
                      paddingLeft: isActive ? 14 : 4,
                      borderTop: "1px solid rgba(245,239,223,.08)",
                      borderBottom: i === n - 1 ? "1px solid rgba(245,239,223,.08)" : "none",
                      background: "transparent",
                      textAlign: "left",
                      color: "inherit",
                      font: "inherit",
                      cursor: "pointer",
                      transition: "padding-left .5s cubic-bezier(.16,1,.3,1)",
                    }}
                    className="services-item"
                  >
                    {/* Gold underline animation */}
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: -1,
                        height: 1,
                        width: isActive ? "100%" : 0,
                        background: "linear-gradient(to right, #D9B36A, transparent)",
                        transition: "width .7s cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        letterSpacing: ".16em",
                        color: isActive ? "var(--color-gold)" : "rgba(210,205,194,.32)",
                        transition: "color .35s",
                      }}
                    >
                      {svc.index}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.4rem, 1.9vw, 1.85rem)",
                        lineHeight: 1.14,
                        letterSpacing: "-.008em",
                        color: isActive ? "var(--color-text)" : "rgba(210,205,194,.58)",
                        fontStyle: isActive ? "italic" : "normal",
                        transition: "color .35s, font-style .35s",
                      }}
                    >
                      {svc.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ─── Canvas ────────────────────────────────── */}
            <div
              style={{
                position: "relative",
                padding: "clamp(36px, 4vw, 68px)",
                borderRadius: 12,
                border: "1px solid rgba(217,179,106,.22)",
                overflow: "hidden",
                minHeight: "clamp(520px, 62vh, 680px)",
                boxShadow: "0 40px 90px -40px rgba(0,0,0,.85)",
              }}
            >
              {/* Imagen de fondo del card */}
              <Image
                src="/background-servicios.png"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 1200px"
                style={{ objectFit: "cover", objectPosition: "center center", zIndex: 0 }}
              />
              {/* Overlay tinte cálido para legibilidad */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(160deg, rgba(20,17,12,.72) 0%, rgba(10,8,6,.82) 100%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              {/* Glow dorado en la esquina superior derecha */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(90% 70% at 92% 8%, rgba(233,200,122,.22) 0%, transparent 65%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.55fr)",
                    gap: "clamp(32px, 4vw, 72px)",
                    alignItems: "center",
                  }}
                  className="services-canvas-inner"
                >
                  {/* Text side */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        margin: "0 0 30px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <span>{s.category}</span>
                      <span
                        aria-hidden
                        style={{
                          flex: 1,
                          height: 1,
                          background: "linear-gradient(to right, rgba(217,179,106,.4), transparent)",
                          maxWidth: 80,
                        }}
                      />
                    </p>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize: "clamp(2rem, 3.4vw, 2.9rem)",
                        lineHeight: 1.03,
                        letterSpacing: "-.026em",
                        color: "var(--color-text)",
                        margin: "0 0 24px",
                        textWrap: "balance",
                        maxWidth: "14ch",
                      }}
                    >
                      {title.normal}
                      {title.accent && (
                        <span
                          style={{
                            fontStyle: "italic",
                            background: GOLD,
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {title.accent}
                        </span>
                      )}
                      {title.end}
                    </h3>

                    <p
                      style={{
                        fontSize: "clamp(15px, 1.15vw, 17px)",
                        lineHeight: 1.65,
                        color: "var(--color-text-2)",
                        margin: "0 0 32px",
                        maxWidth: "34ch",
                      }}
                    >
                      {s.tagline ?? s.brief}
                    </p>

                    {s.meta && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px 22px",
                          margin: "0 0 34px",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: ".18em",
                          textTransform: "uppercase",
                          color: "var(--color-text-3)",
                        }}
                      >
                        {s.meta.map((m) => (
                          <span
                            key={m}
                            style={{ display: "flex", alignItems: "center", gap: 8 }}
                          >
                            <span
                              aria-hidden
                              style={{
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                background: "var(--color-gold)",
                              }}
                            />
                            {m}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={s.slug ? `/servicios/${s.slug}` : "/servicios"}
                      className="cta-primary"
                      data-cursor-hover
                      style={{
                        alignSelf: "flex-start",
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "16px 34px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        fontSize: 11.5,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                      }}
                    >
                      Ver detalle →
                    </Link>
                  </div>

                  {/* Laptop frame with screen image */}
                  <div style={{ position: "relative" }}>
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: "-10% -5% -20% -5%",
                        background:
                          "radial-gradient(50% 50% at 50% 60%, rgba(217,179,106,.18), transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                    <LaptopFrame>
                      {s.cover ? (
                        <Image
                          src={s.cover}
                          alt={`${s.title} — mockup`}
                          fill
                          unoptimized
                          sizes="(max-width: 900px) 90vw, 560px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <ServicePlaceholder category={s.category} />
                      )}
                    </LaptopFrame>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
            marginTop: "clamp(28px, 4vh, 44px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--color-text-4)",
              marginRight: 16,
            }}
            className="services-progress-note"
          >
            Explorá los 6 servicios
          </span>
          {SERVICES.map((svc, i) => (
            <button
              key={svc.index}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ver ${svc.title}`}
              data-cursor-hover
              style={{
                width: i === active ? 24 : 6,
                height: 6,
                borderRadius: i === active ? 3 : 999,
                border: "none",
                padding: 0,
                background: i === active ? "var(--color-gold)" : "rgba(245,239,223,.14)",
                cursor: "pointer",
                transition: "width .5s cubic-bezier(.16,1,.3,1), background .35s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile: apilar */}
      <style>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .services-canvas-inner {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .services-canvas-inner > div:last-child {
            order: -1;
          }
          .services-progress-note {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
