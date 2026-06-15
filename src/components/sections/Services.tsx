"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";
const CARD_W = 320;
const CARD_GAP = 20;
const STEP = CARD_W + CARD_GAP;

const SERVICES = [
  {
    num: "01",
    category: "Web Corporativa",
    title: "Sitio Web\nCorporativo",
    subtitle: "Diseño & Desarrollo a Medida",
    desc: "Creamos presencias digitales que posicionan tu empresa como referente en su industria. Arquitectura estratégica, rendimiento técnico de primer nivel y experiencias que transforman visitantes en clientes.",
    tags: ["Diseño Web", "SEO Técnico", "Performance"],
    accent: "rgba(212,160,32,.06)",
  },
  {
    num: "02",
    category: "Conversión",
    title: "Landing Page\nde Impacto",
    subtitle: "Páginas de Alta Conversión",
    desc: "Páginas de aterrizaje diseñadas para captar leads y acelerar tus resultados de venta. Estructura persuasiva, carga ultrarrápida y optimización basada en el comportamiento real del usuario.",
    tags: ["Lead Generation", "CRO", "Copy Estratégico"],
    accent: "rgba(180,140,20,.05)",
  },
  {
    num: "03",
    category: "Branding",
    title: "Identidad\nVisual & Marca",
    subtitle: "Branding & Identidad Corporativa",
    desc: "Sistema visual completo que diferencia tu marca en cada punto de contacto. Logo, paleta, tipografía y guía de uso — coherencia visual que construye reputación y reconocimiento a largo plazo.",
    tags: ["Logo", "Branding", "Guía de Marca"],
    accent: "rgba(160,100,180,.05)",
  },
  {
    num: "04",
    category: "E-commerce",
    title: "Tienda Online\nPremium",
    subtitle: "E-commerce de Alto Nivel",
    desc: "Plataformas de venta online con experiencia de compra de lujo. Integración de medios de pago, catálogo optimizado y flujos diseñados para maximizar la conversión y el ticket promedio.",
    tags: ["E-commerce", "Pagos Online", "UX de Compra"],
    accent: "rgba(40,160,120,.04)",
  },
  {
    num: "05",
    category: "Personal Brand",
    title: "Presencia\nPersonal",
    subtitle: "Portfolio & Personal Branding",
    desc: "Sitio web personal para ejecutivos, consultores y figuras públicas. Tu imagen digital como activo estratégico: credibilidad, autoridad y distinción que abren puertas antes de que hables.",
    tags: ["Portfolio", "Ejecutivos", "Autoridad Digital"],
    accent: "rgba(180,192,210,.04)",
  },
  {
    num: "06",
    category: "App & Plataforma",
    title: "Aplicación\nWeb a Medida",
    subtitle: "Plataformas, SaaS & Dashboards",
    desc: "Interfaces complejas diseñadas con rigor de producto premium. Dashboards, herramientas internas y plataformas SaaS que combinan máxima funcionalidad con experiencia de usuario de primer nivel.",
    tags: ["SaaS", "Dashboard", "UX/UI"],
    accent: "rgba(40,80,180,.05)",
  },
];

function ServiceCard({ service, index, active }: {
  service: typeof SERVICES[0];
  index: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const lines = service.title.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.0, delay: 0.05 + index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_W,
        flexShrink: 0,
        position: "relative",
        padding: "36px 28px 32px",
        border: `1px solid ${hovered || active ? "rgba(212,160,32,.22)" : "rgba(255,255,255,.055)"}`,
        background: hovered
          ? `linear-gradient(160deg, rgba(22,18,8,.98) 0%, rgba(14,12,6,.98) 100%)`
          : `linear-gradient(160deg, rgba(12,11,9,.97) 0%, rgba(8,7,5,.97) 100%)`,
        transition: "border-color .45s, background .45s",
        display: "flex",
        flexDirection: "column",
        minHeight: 520,
        cursor: "grab",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Top gold line — always present, glows on hover */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: GOLD,
        backgroundSize: "260% 100%",
        animation: "metalShimmer 7s ease-in-out infinite",
        opacity: hovered || active ? 0.9 : 0.25,
        transition: "opacity .45s",
      }} />

      {/* Atmospheric glow per card */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${service.accent} 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0.5,
        transition: "opacity .5s",
      }} />

      {/* Ghost number — visual texture */}
      <div aria-hidden style={{
        position: "absolute",
        bottom: -10,
        right: -8,
        fontFamily: "var(--font-display)",
        fontSize: 160,
        fontWeight: 700,
        lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: `1px rgba(212,160,32,${hovered ? ".10" : ".04"})`,
        transition: "WebkitTextStroke .45s, opacity .45s",
        pointerEvents: "none",
        letterSpacing: "-.05em",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transitionProperty: "transform, opacity, -webkit-text-stroke",
      }}>
        {service.num}
      </div>

      {/* Category + number row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 40,
        position: "relative", zIndex: 1,
      }}>
        <span style={{
          fontSize: 8, letterSpacing: ".45em", textTransform: "uppercase",
          color: "rgba(212,160,32,.5)",
        }}>
          {service.category}
        </span>
        <span style={{
          fontSize: 9, letterSpacing: ".3em",
          color: "rgba(180,176,168,.2)",
        }}>
          {service.num}
        </span>
      </div>

      {/* Title — display font, multiline */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 6 }}>
        {lines.map((line, li) => (
          <p key={li} style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 2.2vw, 32px)",
            fontWeight: 300,
            letterSpacing: "-.02em",
            lineHeight: 1.12,
            color: hovered ? "var(--color-text)" : "var(--color-text-2)",
            margin: 0,
            transition: "color .35s",
          }}>
            {line}
          </p>
        ))}
      </div>

      {/* Subtitle */}
      <p style={{
        fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
        color: "rgba(212,160,32,.45)",
        marginBottom: 24,
        position: "relative", zIndex: 1,
        transition: "color .35s",
      }}>
        {service.subtitle}
      </p>

      {/* Divider */}
      <div aria-hidden style={{
        height: 1, marginBottom: 20,
        background: `linear-gradient(to right, rgba(212,160,32,${hovered ? ".25" : ".1"}), transparent)`,
        transition: "background .4s",
        position: "relative", zIndex: 1,
      }} />

      {/* Description */}
      <p style={{
        fontSize: 12.5,
        color: hovered ? "var(--color-text-3)" : "var(--color-text-4)",
        lineHeight: 1.9,
        flex: 1,
        position: "relative", zIndex: 1,
        transition: "color .35s",
      }}>
        {service.desc}
      </p>

      {/* Tags */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6,
        marginTop: 24, marginBottom: 24,
        position: "relative", zIndex: 1,
      }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 8, letterSpacing: ".3em", textTransform: "uppercase",
            padding: "4px 10px",
            border: `1px solid rgba(212,160,32,${hovered ? ".2" : ".09"})`,
            color: `rgba(212,160,32,${hovered ? ".65" : ".35"})`,
            transition: "border-color .4s, color .4s",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow cue */}
      <motion.div
        animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.35 }}
        transition={{ duration: 0.35 }}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          position: "relative", zIndex: 1,
        }}
      >
        <div style={{ width: 28, height: 1, background: "rgba(212,160,32,.6)" }} />
        <div style={{
          width: 5, height: 5,
          borderRight: "1px solid rgba(212,160,32,.7)",
          borderTop: "1px solid rgba(212,160,32,.7)",
          transform: "rotate(45deg)",
        }} />
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const x            = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const recompute = useCallback(() => {
    if (!trackRef.current || !containerRef.current) return;
    const drag = trackRef.current.scrollWidth - containerRef.current.clientWidth;
    setMaxDrag(Math.max(0, drag));
  }, []);

  useEffect(() => {
    recompute();
    const ro = new ResizeObserver(recompute);
    if (trackRef.current)   ro.observe(trackRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recompute]);

  // Keep activeIdx in sync with x position
  useEffect(() => {
    const unsub = x.on("change", (v) => {
      const idx = Math.round(-v / STEP);
      setActiveIdx(Math.max(0, Math.min(SERVICES.length - 1, idx)));
    });
    return unsub;
  }, [x]);

  const goTo = useCallback((dir: 1 | -1) => {
    const next = Math.max(-maxDrag, Math.min(0, x.get() - dir * STEP));
    animate(x, next, { type: "spring", stiffness: 90, damping: 20, mass: 0.9 });
  }, [maxDrag, x]);

  // Progress bar width
  const progress = useTransform(x, () => maxDrag === 0 ? 0 : Math.abs(x.get()) / maxDrag);
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

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
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(168,108,5,.08) 0%, transparent 70%)",
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
      {/* Right edge fade — shows more content ahead */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "12vw",
        background: "linear-gradient(to left, rgba(4,4,4,.95) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 5,
      }} />

      {/* ── Header ── */}
      <div style={{ padding: "0 8vw", marginBottom: 56, position: "relative", zIndex: 2 }}>
        <Reveal y={20} blur={4} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 28, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.4))" }} />
            <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
              Servicios
            </ShimmerLabel>
          </div>
        </Reveal>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <Reveal delay={0.08} y={36} style={{ maxWidth: 620 }}>
            <SplitWords
              as="h2"
              stagger={0.05}
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.08,
                letterSpacing: "-.025em",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
              }}
            >
              ¿Qué podemos construir para tu empresa?
            </SplitWords>
          </Reveal>

          {/* Navigation arrows */}
          <Reveal delay={0.22} y={16} blur={4} style={{ display: "flex", gap: 12, flexShrink: 0 }}>
            {([[-1, "←"], [1, "→"]] as const).map(([dir, arrow]) => (
              <button
                key={dir}
                onClick={() => goTo(dir)}
                data-cursor-hover
                style={{
                  width: 48, height: 48,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,.1)",
                  background: "transparent",
                  color: "var(--color-text-3)",
                  fontSize: 16,
                  transition: "border-color .3s, color .3s, background .3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,160,32,.4)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(212,160,32,.9)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.1)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-3)";
                }}
                aria-label={dir === -1 ? "Anterior" : "Siguiente"}
              >
                {arrow}
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        ref={containerRef}
        style={{ overflow: "hidden", paddingLeft: "8vw", position: "relative", zIndex: 2 }}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragTransition={{ power: 0.2, timeConstant: 280 }}
          style={{ x, display: "flex", gap: CARD_GAP, width: "max-content", paddingRight: "8vw" }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} active={activeIdx === i} />
          ))}
        </motion.div>
      </div>

      {/* ── Progress + counter ── */}
      <Reveal delay={0.4} y={12} blur={4} style={{ padding: "32px 8vw 0", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Track */}
          <div style={{
            flex: 1, maxWidth: 240, height: 1,
            background: "rgba(255,255,255,.07)",
            position: "relative",
            overflow: "hidden",
          }}>
            <motion.div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: barWidth,
              background: GOLD,
              backgroundSize: "260% 100%",
              animation: "metalShimmer 5s ease-in-out infinite",
            }} />
          </div>

          {/* Counter */}
          <span style={{
            fontSize: 9, letterSpacing: ".3em",
            color: "rgba(180,176,168,.3)",
          }}>
            <span style={{ color: "rgba(212,160,32,.6)" }}>
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(SERVICES.length).padStart(2, "0")}
          </span>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 6 }}>
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const target = Math.max(-maxDrag, -i * STEP);
                  animate(x, target, { type: "spring", stiffness: 90, damping: 20, mass: 0.9 });
                }}
                data-cursor-hover
                aria-label={`Ir al servicio ${i + 1}`}
                style={{
                  width: activeIdx === i ? 16 : 4,
                  height: 4,
                  border: "none",
                  borderRadius: 2,
                  background: activeIdx === i ? "rgba(212,160,32,.7)" : "rgba(255,255,255,.12)",
                  padding: 0,
                  transition: "width .45s cubic-bezier(.16,1,.3,1), background .35s",
                }}
              />
            ))}
          </div>
        </div>

        <p style={{
          marginTop: 28,
          fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase",
          color: "var(--color-text-4)",
        }}>
          Cada proyecto es único — adaptamos el alcance a tu situación específica.
        </p>
      </Reveal>
    </section>
  );
}
