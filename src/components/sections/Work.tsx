"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { WORKS, type WorkProject } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

const AUTOPLAY_MS = 5200;

/* ─── Medición del ancho del contenedor ─────────────────────────── */
function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

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
        {s.category}
      </span>
      <span style={{ width: 40, height: 1, background: "rgba(212,160,32,.4)" }} />
    </div>
  );
}

/* ─── Flecha glass ──────────────────────────────────────────────── */
function GlassArrow({
  dir,
  onClick,
  style,
}: {
  dir: "left" | "right";
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      aria-label={dir === "left" ? "Proyecto anterior" : "Proyecto siguiente"}
      className="work-arrow"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "clamp(46px, 4vw, 58px)",
        height: "clamp(46px, 4vw, 58px)",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,.16)",
        background: "rgba(20,18,15,.42)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 18px 44px -18px rgba(0,0,0,.75)",
        cursor: "pointer",
        color: "rgba(240,236,228,.9)",
        transition: "background .3s, border-color .3s, color .3s",
        ...style,
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === "left" ? "translateX(-1px)" : "translateX(1px)" }}
      >
        {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

/* ─── Sección ───────────────────────────────────────────────────── */
export function Work() {
  const [ref, containerW] = useContainerWidth<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = WORKS.length;

  const goRight = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);
  const goLeft = useCallback(() => setActive((a) => (a + 1) % n), [n]);

  // Autoplay — pausa al interactuar / hover / reduced-motion
  useEffect(() => {
    if (paused || n <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a - 1 + n) % n), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, n]);

  // Geometría responsive — breakpoint por ancho (robusto para cualquier pantalla)
  const compact = containerW > 0 && containerW < 700;
  const W = containerW || 1000;
  const centerW = compact ? Math.min(W * 0.82, 400) : Math.min(540, W * 0.45);
  const offset = compact ? W : centerW * 0.74;
  const sideScale = compact ? 0.6 : 0.64;
  const sideOpacity = compact ? 0 : 0.5;
  const cardH = centerW * 1.06;

  function slotFor(pos: number) {
    if (pos === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 30 };
    if (pos === 1) return { x: offset, scale: sideScale, opacity: sideOpacity, zIndex: 20 };
    return { x: -offset, scale: sideScale, opacity: sideOpacity, zIndex: 20 };
  }

  function onDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.x < -60) goLeft();
    else if (info.offset.x > 60) goRight();
  }

  const activeProject = WORKS[active];

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
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(110% 90% at 50% 50%, transparent 40%, rgba(0,0,0,.72) 100%)",
        }}
      />
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

        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 7vh, 80px)" }}>
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
              Deslizá por cada proyecto que diseñamos y desarrollamos desde cero.
            </p>
          </Reveal>
        </div>

        {/* Carrusel */}
        <Reveal y={40}>
          <div
            ref={ref}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ position: "relative", width: "100%" }}
          >
            {/* Escenario de cards */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              dragSnapToOrigin
              onDragStart={() => setPaused(true)}
              onDragEnd={onDragEnd}
              style={{
                position: "relative",
                height: cardH,
                width: "100%",
                cursor: "grab",
              }}
            >
              {WORKS.map((s, i) => {
                const pos = (i - active + n) % n;
                const slot = slotFor(pos);
                return (
                  <div
                    key={s.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      width: centerW,
                      marginLeft: -centerW / 2,
                      pointerEvents: pos === 0 ? "auto" : "none",
                    }}
                  >
                    <motion.div
                      animate={{ x: slot.x, scale: slot.scale, opacity: slot.opacity }}
                      transition={{ duration: 0.72, ease: EASE }}
                      style={{ zIndex: slot.zIndex, position: "relative", transformOrigin: "center center" }}
                    >
                      <div
                        onClick={pos !== 0 ? (pos === 1 ? goLeft : goRight) : undefined}
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "1 / 1.06",
                          borderRadius: "clamp(20px, 2.2vw, 30px)",
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,.1)",
                          background: "#0b0a08",
                          boxShadow:
                            pos === 0
                              ? "0 60px 120px -50px rgba(0,0,0,.92)"
                              : "0 40px 90px -50px rgba(0,0,0,.9)",
                          cursor: pos === 0 ? "default" : "pointer",
                        }}
                      >
                        {s.cover ? (
                          <Image
                            src={s.cover}
                            alt={s.category}
                            fill
                            draggable={false}
                            sizes="(max-width: 1024px) 84vw, 540px"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center center",
                              transform: `scale(${s.coverScale ?? 1})`,
                            }}
                          />
                        ) : (
                          <PlaceholderScreen s={s} />
                        )}

                        {/* Reflejo superior + oscurecido de las laterales */}
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "inherit",
                            pointerEvents: "none",
                            background:
                              pos === 0
                                ? "linear-gradient(165deg, rgba(255,255,255,.08) 0%, transparent 26%)"
                                : "linear-gradient(165deg, rgba(255,255,255,.05) 0%, transparent 24%), rgba(6,5,4,.26)",
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Flechas glass */}
            {n > 1 && (
              <>
                <GlassArrow dir="left" onClick={goLeft} style={{ left: "clamp(-4px, 0.5vw, 12px)" }} />
                <GlassArrow dir="right" onClick={goRight} style={{ right: "clamp(-4px, 0.5vw, 12px)" }} />
              </>
            )}
          </div>
        </Reveal>

        {/* Categoría destacada del proyecto activo + descripción */}
        <div
          style={{
            textAlign: "center",
            marginTop: "clamp(30px, 4vh, 48px)",
            minHeight: "clamp(150px, 22vh, 190px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(16px, 2vh, 22px)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  background: GOLD,
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {activeProject?.category}
              </span>
              <p
                style={{
                  fontSize: "clamp(14px, 1.05vw, 16px)",
                  lineHeight: 1.72,
                  color: "var(--color-text-2)",
                  margin: 0,
                  maxWidth: "46em",
                  padding: "0 clamp(8px, 2vw, 0px)",
                }}
              >
                {activeProject?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Puntos indicadores */}
        {n > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: "clamp(24px, 3vh, 36px)" }}>
            {WORKS.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setActive(i)}
                data-cursor-hover
                aria-label={`Ir a ${s.category}`}
                style={{
                  width: i === active ? 26 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background: i === active ? "var(--color-gold)" : "rgba(255,255,255,.2)",
                  transition: "width .4s cubic-bezier(.16,1,.3,1), background .4s",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
