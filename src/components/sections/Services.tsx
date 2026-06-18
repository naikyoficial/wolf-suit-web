"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";

const EASE  = [0.16, 1.0, 0.3, 1.0] as const;
const SPRING = { type: "spring", stiffness: 72, damping: 18, mass: 1.1 } as const;
const GOLD  = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const CARD_W_MAX = 460;
const GAP = 30;

const SERVICES = [
  {
    num: "01",
    category: "Web Corporativa",
    title: ["Sitio Web", "Corporativo"],
    subtitle: "Diseño & Desarrollo a Medida",
    desc: "Creamos presencias digitales que posicionan tu empresa como referente en su industria. Arquitectura estratégica, rendimiento técnico de primer nivel y experiencias que transforman visitantes en clientes reales.",
    tags: ["Diseño Web", "SEO Técnico", "Performance"],
    accent: "rgba(212,160,32,.07)",
  },
  {
    num: "02",
    category: "Conversión",
    title: ["Landing Page", "de Impacto"],
    subtitle: "Páginas de Alta Conversión",
    desc: "Páginas de aterrizaje diseñadas para captar leads y acelerar tus resultados de venta. Estructura persuasiva, carga ultrarrápida y copy estratégico orientado al comportamiento real del usuario.",
    tags: ["Lead Generation", "CRO", "Copy Estratégico"],
    accent: "rgba(190,140,20,.06)",
  },
  {
    num: "03",
    category: "E-commerce",
    title: ["Tienda Online", "Premium"],
    subtitle: "E-commerce de Alto Nivel",
    desc: "Plataformas de venta online con experiencia de compra de lujo. Integración de medios de pago, catálogo optimizado y flujos diseñados para maximizar la conversión y el ticket promedio.",
    tags: ["E-commerce", "Pagos Online", "UX de Compra"],
    accent: "rgba(40,160,100,.04)",
  },
  {
    num: "04",
    category: "Personal Brand",
    title: ["Presencia", "Personal"],
    subtitle: "Portfolio & Personal Branding",
    desc: "Sitio web personal para ejecutivos, consultores y figuras públicas. Tu imagen digital como activo estratégico: credibilidad, autoridad y distinción que abren puertas antes de que hables.",
    tags: ["Portfolio", "Ejecutivos", "Autoridad Digital"],
    accent: "rgba(180,192,210,.04)",
  },
  {
    num: "05",
    category: "Posicionamiento",
    title: ["SEO &", "Visibilidad Web"],
    subtitle: "Posicionamiento Orgánico en Google",
    desc: "Estrategia SEO integral para que tu empresa aparezca primero cuando tus clientes te buscan. Auditoría técnica, arquitectura de contenidos, optimización on-page y link building de autoridad.",
    tags: ["SEO", "Google", "Tráfico Orgánico"],
    accent: "rgba(80,160,212,.05)",
  },
  {
    num: "06",
    category: "App & Plataforma",
    title: ["Aplicación Web", "a Medida"],
    subtitle: "Plataformas, SaaS & Dashboards",
    desc: "Interfaces complejas diseñadas con rigor de producto premium. Dashboards, herramientas internas y plataformas SaaS que combinan máxima funcionalidad técnica con diseño de experiencia de usuario de primer nivel.",
    tags: ["SaaS", "Dashboard", "UX/UI"],
    accent: "rgba(40,80,180,.05)",
  },
  {
    num: "07",
    category: "Desarrollo",
    title: ["Software", "a Medida"],
    subtitle: "Soluciones de Software Personalizado",
    desc: "Desarrollo de software adaptado exactamente a los procesos y necesidades de tu empresa. Automatización, integraciones de sistemas, APIs y herramientas internas que eliminan fricciones operativas y escalan con tu negocio.",
    tags: ["Software", "Automatización", "Integraciones"],
    accent: "rgba(100,60,180,.05)",
  },
];

type Service = typeof SERVICES[0];

function ServiceCard({ service, isActive, cardW }: { service: Service; isActive: boolean; cardW: number }) {
  return (
    <div style={{
      width: cardW,
      minHeight: 520,
      padding: "40px 36px 36px",
      position: "relative",
      border: `1px solid ${isActive ? "rgba(212,160,32,.24)" : "rgba(255,255,255,.06)"}`,
      background: isActive
        ? "linear-gradient(160deg, rgba(22,17,7,.99) 0%, rgba(12,10,4,.99) 100%)"
        : "linear-gradient(160deg, rgba(12,11,9,.98) 0%, rgba(8,7,5,.98) 100%)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      transition: "border-color .5s, background .5s",
    }}>
      {/* Top shimmer line */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: GOLD,
        backgroundSize: "260% 100%",
        animation: "metalShimmer 7s ease-in-out infinite",
        opacity: isActive ? 0.85 : 0.2,
        transition: "opacity .6s",
      }} />

      {/* Per-card atmospheric tint */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${service.accent} 0%, transparent 70%)`,
        opacity: isActive ? 1 : 0.4,
        transition: "opacity .6s",
      }} />

      {/* Ghost number */}
      <div aria-hidden style={{
        position: "absolute",
        bottom: -8,
        right: 12,
        fontFamily: "var(--font-display)",
        fontSize: 128,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "-.06em",
        color: "transparent",
        WebkitTextStroke: `1px rgba(212,160,32,${isActive ? ".10" : ".03"})`,
        pointerEvents: "none",
        transition: "-webkit-text-stroke .6s",
        userSelect: "none",
      }}>
        {service.num}
      </div>

      {/* Category + number */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 44,
        position: "relative", zIndex: 1,
      }}>
        <span style={{
          fontSize: 8, letterSpacing: ".48em", textTransform: "uppercase",
          color: isActive ? "rgba(212,160,32,.55)" : "rgba(212,160,32,.32)",
          transition: "color .5s",
        }}>
          {service.category}
        </span>
        <span style={{
          fontSize: 9, letterSpacing: ".28em",
          color: isActive ? "rgba(180,176,168,.18)" : "rgba(180,176,168,.08)",
          transition: "color .5s",
        }}>
          {service.num}
        </span>
      </div>

      {/* Title — 2 lines in display font */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 10 }}>
        {service.title.map((line, li) => (
          <p key={li} style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 2.5vw, 36px)",
            fontWeight: 300,
            letterSpacing: "-.022em",
            lineHeight: 1.1,
            color: isActive ? "var(--color-text)" : "rgba(200,195,185,.35)",
            margin: 0,
            transition: "color .5s",
          }}>
            {line}
          </p>
        ))}
      </div>

      {/* Subtitle */}
      <p style={{
        fontSize: 9, letterSpacing: ".24em", textTransform: "uppercase",
        color: isActive ? "rgba(212,160,32,.48)" : "rgba(212,160,32,.15)",
        marginBottom: 28,
        position: "relative", zIndex: 1,
        transition: "color .5s",
      }}>
        {service.subtitle}
      </p>

      {/* Divider */}
      <div aria-hidden style={{
        height: 1, marginBottom: 22,
        background: `linear-gradient(to right, rgba(212,160,32,${isActive ? ".22" : ".1"}), transparent)`,
        position: "relative", zIndex: 1,
        transition: "background .5s",
      }} />

      {/* Description */}
      <p style={{
        fontSize: 13,
        color: isActive ? "var(--color-text-3)" : "rgba(140,135,125,.3)",
        lineHeight: 1.9,
        flex: 1,
        position: "relative", zIndex: 1,
        transition: "color .5s",
      }}>
        {service.desc}
      </p>

      {/* Tags */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 7,
        marginTop: 28, marginBottom: 28,
        position: "relative", zIndex: 1,
      }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 8, letterSpacing: ".32em", textTransform: "uppercase",
            padding: "5px 11px",
            border: `1px solid rgba(212,160,32,${isActive ? ".18" : ".1"})`,
            color: `rgba(212,160,32,${isActive ? ".6" : ".32"})`,
            transition: "border-color .5s, color .5s",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        position: "relative", zIndex: 1,
        opacity: isActive ? 0.7 : 0,
        transform: isActive ? "translateX(0)" : "translateX(-8px)",
        transition: "opacity .55s, transform .55s",
      }}>
        <div style={{ width: 24, height: 1, background: "rgba(212,160,32,.6)" }} />
        <div style={{
          width: 5, height: 5,
          borderRight: "1px solid rgba(212,160,32,.7)",
          borderTop: "1px solid rgba(212,160,32,.7)",
          transform: "rotate(45deg)",
        }} />
      </div>
    </div>
  );
}

function NavArrow({ dir, onClick, disabled }: { dir: -1 | 1; onClick: () => void; disabled: boolean }) {
  const [hov, setHov] = useState(false);
  const isLeft = dir === -1;
  const arrowColor = hov ? "rgba(212,160,32,.85)" : "rgba(200,195,185,.45)";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-hover
      aria-label={isLeft ? "Servicio anterior" : "Siguiente servicio"}
      style={{
        width: 56, height: 56,
        border: `1px solid ${hov ? "rgba(212,160,32,.7)" : "rgba(212,160,32,.28)"}`,
        background: hov ? "rgba(212,160,32,.12)" : "rgba(212,160,32,.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? 0.15 : 1,
        transition: "border-color .35s, background .35s, opacity .3s",
        flexShrink: 0,
        position: "relative",
        zIndex: 15,
      }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {isLeft && (
          <div style={{
            position: "absolute", left: 0, top: -3, width: 7, height: 7,
            borderLeft: `1px solid ${arrowColor}`,
            borderBottom: `1px solid ${arrowColor}`,
            transform: "rotate(45deg)",
            transition: "border-color .35s",
          }} />
        )}
        <div style={{
          width: 24, height: 1,
          background: arrowColor,
          transition: "background .35s",
        }} />
        {!isLeft && (
          <div style={{
            position: "absolute", right: 0, top: -3, width: 7, height: 7,
            borderRight: `1px solid ${arrowColor}`,
            borderTop: `1px solid ${arrowColor}`,
            transform: "rotate(45deg)",
            transition: "border-color .35s",
          }} />
        )}
      </div>
    </button>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const [cardW, setCardW] = useState(CARD_W_MAX);
  const touchStart = useRef<number | null>(null);
  const total = SERVICES.length;
  const step = cardW + GAP;

  useEffect(() => {
    const update = () => setCardW(Math.min(CARD_W_MAX, window.innerWidth - 32));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: 1 | -1) => {
    setActive(prev => Math.max(0, Math.min(total - 1, prev + dir)));
  };

  return (
    <section
      id="services"
      className="relative"
      style={{
        padding: "clamp(80px, 11vh, 130px) 0",
        background: "rgba(4,4,4,.96)",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(168,108,5,.08) 0%, transparent 70%)",
      }} />
      {/* Top fade */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 20,
      }} />
      {/* Bottom fade */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 20,
      }} />
      {/* Left vignette — shows there's more */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: "18vw",
        background: "linear-gradient(to right, rgba(4,4,4,.92) 0%, rgba(4,4,4,.3) 60%, transparent 100%)",
        pointerEvents: "none", zIndex: 6,
      }} />
      {/* Right vignette */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "18vw",
        background: "linear-gradient(to left, rgba(4,4,4,.92) 0%, rgba(4,4,4,.3) 60%, transparent 100%)",
        pointerEvents: "none", zIndex: 6,
      }} />

      {/* ── Header ── */}
      <div style={{ padding: "0 8vw", marginBottom: 60, position: "relative", zIndex: 10, textAlign: "center" }}>
        <Reveal y={20} blur={4} style={{ marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <div style={{ width: 28, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.4))" }} />
          <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
            Servicios
          </ShimmerLabel>
          <div style={{ width: 28, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.4))" }} />
        </Reveal>

        <Reveal delay={0.08} y={36}>
          <SplitWords
            as="h2"
            stagger={0.05}
            style={{
              fontSize: "clamp(30px, 3.8vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
            }}
          >
            ¿Qué podemos construir para tu empresa?
          </SplitWords>
        </Reveal>
      </div>

      {/* ── Carousel track ── */}
      <div
        style={{
          position: "relative",
          height: 580,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
        }}
        onTouchStart={(e) => { touchStart.current = e.touches[0]!.clientX; }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const delta = e.changedTouches[0]!.clientX - touchStart.current;
          if (Math.abs(delta) > 44) go(delta < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        {SERVICES.map((service, i) => {
          const offset    = i - active;
          const absOffset = Math.abs(offset);
          if (absOffset > 2) return null;

          const scale    = 1 - absOffset * 0.07;
          const opacity  = absOffset === 0 ? 1 : absOffset === 1 ? 0.45 : 0.1;
          const blur     = absOffset === 0 ? 0 : absOffset === 1 ? 1 : 4;
          const zIdx     = 10 - absOffset;
          const isActive = absOffset === 0;

          return (
            <motion.div
              key={service.num}
              onClick={() => !isActive && setActive(i)}
              animate={{
                x: offset * step,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: zIdx,
              }}
              transition={SPRING}
              style={{
                position: "absolute",
                cursor: isActive ? "default" : "pointer",
                transformOrigin: "center center",
              }}
            >
              <ServiceCard service={service} isActive={isActive} cardW={cardW} />
            </motion.div>
          );
        })}
      </div>

      {/* ── Counter + dots ── */}
      <Reveal delay={0.3} y={16} blur={4} style={{
        padding: "36px 8vw 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        position: "relative",
        zIndex: 10,
      }}>
        {/* Arrows + counter row */}
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

        {/* Dot indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor-hover
              aria-label={`Servicio ${i + 1}`}
              style={{
                width: active === i ? 22 : 5,
                height: 5,
                border: "none",
                borderRadius: 3,
                padding: 0,
                background: active === i
                  ? "rgba(212,160,32,.75)"
                  : "rgba(255,255,255,.1)",
                transition: "width .5s cubic-bezier(.16,1,.3,1), background .35s",
              }}
            />
          ))}
        </div>

        <p style={{
          fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase",
          color: "var(--color-text-4)",
          marginTop: 4,
        }}>
          Cada proyecto es único — adaptamos el alcance a tu situación específica.
        </p>
      </Reveal>
    </section>
  );
}
