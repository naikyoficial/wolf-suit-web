"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { useMobile }    from "@/hooks/useMobile";

const SPRING        = { type: "spring", stiffness: 72, damping: 18, mass: 1.1 } as const;
const SPRING_MOBILE = { type: "tween", duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";
const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const CARD_W_MAX = 480;
const GAP = 28;

const STEPS = [
  {
    num: "01",
    name: "Descubrir",
    body: "Analizamos tu empresa, tu industria, tus objetivos y la diferencia entre cómo te perciben hoy y cómo deberías ser percibido.",
  },
  {
    num: "02",
    name: "Definir",
    body: "Construimos la arquitectura estratégica del proyecto: narrativa, identidad, experiencia y estructura. Todo debe tener una razón.",
  },
  {
    num: "03",
    name: "Diseñar",
    body: "Creamos un sistema visual exclusivo donde cada decisión responde a una estrategia y no a una tendencia pasajera.",
  },
  {
    num: "04",
    name: "Construir",
    body: "Desarrollamos una plataforma rápida, escalable y optimizada para SEO, rendimiento y experiencia de usuario. La tecnología no es un agregado. Es parte del estándar.",
  },
  {
    num: "05",
    name: "Perfeccionar",
    body: "No entregamos cuando funciona. Entregamos cuando cada detalle representa el nivel de excelencia que buscamos.",
  },
];

function NavArrow({ dir, onClick, disabled }: { dir: -1 | 1; onClick: () => void; disabled: boolean }) {
  const [hov, setHov] = useState(false);
  const isLeft = dir === -1;
  const color = hov ? "rgba(212,160,32,.85)" : "rgba(200,195,185,.45)";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-hover
      className="carousel-arrow"
      aria-label={isLeft ? "Paso anterior" : "Siguiente paso"}
      style={{
        width: 56, height: 56,
        border: `1px solid ${hov ? "rgba(212,160,32,.7)" : "rgba(212,160,32,.28)"}`,
        background: hov ? "rgba(212,160,32,.12)" : "rgba(212,160,32,.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? 0.15 : 1,
        transition: "border-color .35s, background .35s, opacity .3s",
        flexShrink: 0, position: "relative", zIndex: 15,
      }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {isLeft && (
          <div style={{
            position: "absolute", left: 0, top: -3, width: 7, height: 7,
            borderLeft: `1px solid ${color}`, borderBottom: `1px solid ${color}`,
            transform: "rotate(45deg)", transition: "border-color .35s",
          }} />
        )}
        <div style={{ width: 24, height: 1, background: color, transition: "background .35s" }} />
        {!isLeft && (
          <div style={{
            position: "absolute", right: 0, top: -3, width: 7, height: 7,
            borderRight: `1px solid ${color}`, borderTop: `1px solid ${color}`,
            transform: "rotate(45deg)", transition: "border-color .35s",
          }} />
        )}
      </div>
    </button>
  );
}

function StepCard({ step, isActive, cardW }: { step: typeof STEPS[0]; isActive: boolean; cardW: number }) {
  const pad = cardW < 360 ? "22px 18px" : "clamp(28px,4vw,44px)";
  return (
    <div style={{
      width: cardW,
      minHeight: cardW < 400 ? 380 : 440,
      padding: pad,
      position: "relative",
      background: isActive ? "#0e0e0e" : "#080808",
      border: `1px solid ${isActive ? "rgba(212,160,32,.36)" : "rgba(212,160,32,.10)"}`,
      boxShadow: isActive
        ? "inset 0 1px 0 rgba(212,160,32,.15), 0 8px 40px rgba(0,0,0,.35)"
        : "inset 0 1px 0 rgba(212,160,32,.05)",
      transition: "background .5s, border-color .5s, box-shadow .5s",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Ghost number */}
      <div aria-hidden style={{
        position: "absolute", bottom: -16, right: 14,
        fontFamily: "var(--font-display)",
        fontSize: 148, fontWeight: 700, lineHeight: 1, letterSpacing: "-.06em",
        color: "transparent",
        WebkitTextStroke: `1px rgba(212,160,32,${isActive ? ".09" : ".03"})`,
        pointerEvents: "none", userSelect: "none",
        transition: "-webkit-text-stroke .5s",
      }}>
        {step.num}
      </div>

      {/* Top shimmer bar */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: GOLD, backgroundSize: "260% 100%",
        animation: "metalShimmer 8s ease-in-out infinite",
        opacity: isActive ? 0.7 : 0.18,
        transition: "opacity .5s",
      }} />

      {/* Step number label */}
      <p style={{
        fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase",
        marginBottom: 22,
        background: GOLD, backgroundSize: "260% 100%",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "metalShimmer 10s ease-in-out infinite",
        position: "relative", zIndex: 1,
        opacity: isActive ? 1 : 0.45,
        transition: "opacity .5s",
      }}>
        {step.num}
      </p>

      {/* Name */}
      <h3 className="font-display" style={{
        fontSize: "clamp(28px,2.4vw,38px)",
        fontWeight: 400,
        letterSpacing: "-.022em",
        lineHeight: 1.05,
        marginBottom: 16,
        position: "relative", zIndex: 1,
        color: isActive ? "var(--color-text)" : "rgba(200,195,185,.42)",
        transition: "color .5s",
      }}>
        {step.name}
      </h3>

      {/* Divider */}
      <div aria-hidden style={{
        height: 1, marginBottom: 20,
        background: `linear-gradient(to right, rgba(212,160,32,${isActive ? ".22" : ".09"}), transparent)`,
        position: "relative", zIndex: 1,
        transition: "background .5s",
      }} />

      {/* Body */}
      <p style={{
        fontSize: 13, lineHeight: 1.9,
        color: isActive ? "var(--color-text-3)" : "rgba(140,135,125,.32)",
        flex: 1, position: "relative", zIndex: 1,
        transition: "color .5s",
      }}>
        {step.body}
      </p>

      {/* Gold accent line */}
      <div style={{
        marginTop: 28, height: 1,
        width: isActive ? 48 : 28,
        background: "linear-gradient(90deg, rgba(212,160,32,.9), rgba(212,160,32,.3))",
        opacity: isActive ? 1 : 0.45,
        transition: "width .5s, opacity .5s",
        position: "relative", zIndex: 1,
      }} />
    </div>
  );
}

export function WolfSystem() {
  const isMobile  = useMobile();
  const [active, setActive]   = useState(0);
  const [cardW,  setCardW]    = useState(CARD_W_MAX);
  const touchStart = useRef<number | null>(null);
  const total = STEPS.length;
  const stepPx = cardW + GAP;

  useEffect(() => {
    const update = () => setCardW(Math.min(CARD_W_MAX, window.innerWidth - 32));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: 1 | -1) =>
    setActive(prev => Math.max(0, Math.min(total - 1, prev + dir)));

  return (
    <section
      id="sistema"
      className="relative"
      style={{
        padding: "clamp(56px,8vh,130px) 0",
        background: "rgba(6,5,3,.82)",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 50% at 50% 60%, rgba(160,95,5,.09) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 80% 10%, rgba(212,160,32,.05) 0%, transparent 65%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "radial-gradient(circle, rgba(212,160,32,.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Edge fades */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      {/* Side vignettes */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: "18vw",
        background: "linear-gradient(to right, rgba(6,5,3,.94) 0%, rgba(6,5,3,.3) 60%, transparent 100%)",
        pointerEvents: "none", zIndex: 6,
      }} />
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "18vw",
        background: "linear-gradient(to left, rgba(6,5,3,.94) 0%, rgba(6,5,3,.3) 60%, transparent 100%)",
        pointerEvents: "none", zIndex: 6,
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: "0 clamp(1.5rem,8vw,7.5rem)",
        marginBottom: "clamp(28px,4vw,60px)",
        position: "relative", zIndex: 10,
        textAlign: "center",
      }}>
        <Reveal y={20} blur={4} style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <div style={{ width: 28, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.4))" }} />
          <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase" }}>
            Sistema Wolf
          </ShimmerLabel>
          <div style={{ width: 28, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.4))" }} />
        </Reveal>

        <Reveal delay={0.1} y={32}>
          <h2 style={{
            fontSize: "clamp(36px,4.5vw,60px)",
            lineHeight: 1.12,
            letterSpacing: "-.02em",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
          }}>
            <SplitWords as="span" stagger={0.06} delay={0.1}>
              La excelencia no es un objetivo,
            </SplitWords>
            <br />
            <SplitWords as="span" stagger={0.06} delay={0.52}>
              es el punto de partida.
            </SplitWords>
          </h2>
        </Reveal>
      </div>

      {/* ── Carousel track ── */}
      <div
        style={{
          position: "relative",
          height: cardW < 400 ? 460 : 530,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 5,
        }}
        onTouchStart={(e) => { touchStart.current = e.touches[0]!.clientX; }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const delta = e.changedTouches[0]!.clientX - touchStart.current;
          if (Math.abs(delta) > Math.min(44, window.innerWidth * 0.1)) go(delta < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        {STEPS.map((s, i) => {
          const offset    = i - active;
          const absOffset = Math.abs(offset);
          const maxVisible = isMobile ? 1 : 2;
          if (absOffset > maxVisible) return null;

          const scale    = 1 - absOffset * 0.07;
          const opacity  = absOffset === 0 ? 1 : absOffset === 1 ? 0.45 : 0.1;
          const blur     = isMobile ? 0 : (absOffset === 0 ? 0 : absOffset === 1 ? 1 : 4);
          const zIdx     = 10 - absOffset;
          const isActive = absOffset === 0;

          return (
            <motion.div
              key={s.num}
              onClick={() => !isActive && setActive(i)}
              animate={
                isMobile
                  ? { x: offset * stepPx, scale, opacity, zIndex: zIdx }
                  : { x: offset * stepPx, scale, opacity, filter: `blur(${blur}px)`, zIndex: zIdx }
              }
              transition={isMobile ? SPRING_MOBILE : SPRING}
              style={{
                position: "absolute",
                cursor: isActive ? "default" : "pointer",
                transformOrigin: "center center",
                willChange: "transform",
              }}
            >
              <StepCard step={s} isActive={isActive} cardW={cardW} />
            </motion.div>
          );
        })}
      </div>

      {/* ── Controls ── */}
      <Reveal delay={0.3} y={16} blur={4} style={{
        padding: "36px 8vw 0",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        position: "relative", zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <NavArrow dir={-1} onClick={() => go(-1)} disabled={active === 0} />

          <span style={{ fontSize: 11, letterSpacing: ".28em", color: "rgba(180,176,168,.25)", minWidth: 64, textAlign: "center" }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: 18, fontWeight: 300, letterSpacing: "-.01em",
              background: GOLD, backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", animation: "metalShimmer 8s ease-in-out infinite",
              marginRight: 6,
            }}>
              {String(active + 1).padStart(2, "0")}
            </span>
            / {String(total).padStart(2, "0")}
          </span>

          <NavArrow dir={1} onClick={() => go(1)} disabled={active === total - 1} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor-hover
              aria-label={`Paso ${i + 1}`}
              style={{
                width: active === i ? 22 : 5, height: 5,
                border: "none", borderRadius: 3, padding: 0,
                background: active === i ? "rgba(212,160,32,.75)" : "rgba(255,255,255,.1)",
                transition: "width .5s cubic-bezier(.16,1,.3,1), background .35s",
              }}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
