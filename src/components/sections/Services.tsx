"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { TiltCard }     from "@/components/ui/TiltCard";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD_LINE = "linear-gradient(90deg, #5A3C0A 0%, #A87214 25%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 75%, #5A3C0A 100%)";

const SERVICES = [
  {
    num: "01",
    title: "Sitio Web Corporativo",
    desc: "Presencia digital que representa el verdadero nivel de tu empresa. Arquitectura estratégica, diseño exclusivo y tecnología de alto rendimiento.",
    tag: "Web",
  },
  {
    num: "02",
    title: "Landing Page de Alto Impacto",
    desc: "Páginas diseñadas para convertir. Cada elemento responde a una estrategia de comunicación clara y orientada a resultados.",
    tag: "Conversión",
  },
  {
    num: "03",
    title: "Identidad de Marca Digital",
    desc: "Sistema visual completo: tipografía, paleta, iconografía y lenguaje gráfico que diferencia tu marca del resto.",
    tag: "Branding",
  },
  {
    num: "04",
    title: "E-commerce Premium",
    desc: "Tiendas online con experiencia de compra de lujo, optimizadas para conversión, rendimiento y escalabilidad.",
    tag: "Comercio",
  },
  {
    num: "05",
    title: "Portfolio & Presencia Personal",
    desc: "Para líderes y profesionales que entienden que su imagen digital es un activo estratégico, no una formalidad.",
    tag: "Personal",
  },
  {
    num: "06",
    title: "Dashboard & Aplicación Web",
    desc: "Interfaces complejas diseñadas con la misma atención al detalle que cualquier producto de consumo premium.",
    tag: "App",
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.9, delay: 0.1 + index * 0.08, ease: EASE }}
    >
      <TiltCard
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "32px 28px 28px",
          border: `1px solid ${hovered ? "rgba(212,160,32,.28)" : "rgba(255,255,255,.06)"}`,
          background: hovered ? "rgba(18,14,6,.85)" : "rgba(12,11,9,.6)",
          transition: "border-color .4s, background .4s",
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          height: "100%",
        }}
      >
        {/* Top gold line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: GOLD_LINE,
            backgroundSize: "280% 100%",
            animation: "metalShimmer 6s ease-in-out infinite",
            opacity: hovered ? 1 : 0.3,
            transition: "opacity .4s",
          }}
        />

        {/* Number + tag row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{
            fontSize: 9,
            letterSpacing: ".4em",
            color: "rgba(212,160,32,.45)",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}>
            {service.num}
          </span>
          <span style={{
            fontSize: 8,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "rgba(180,176,168,.25)",
          }}>
            {service.tag}
          </span>
        </div>

        {/* Title */}
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(18px, 1.6vw, 22px)",
          fontWeight: 400,
          letterSpacing: "-.01em",
          lineHeight: 1.2,
          color: hovered ? "var(--color-text)" : "var(--color-text-2)",
          marginBottom: 14,
          transition: "color .3s",
        }}>
          {service.title}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 12,
          color: "var(--color-text-4)",
          lineHeight: 1.85,
          flex: 1,
        }}>
          {service.desc}
        </p>

        {/* Arrow */}
        <div style={{
          marginTop: 24,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-6px)",
          transition: "opacity .35s, transform .35s",
        }}>
          <div style={{
            width: 20,
            height: 1,
            background: "linear-gradient(to right, rgba(212,160,32,.6), rgba(212,160,32,.9))",
          }} />
          <div style={{
            width: 5, height: 5,
            borderRight: "1px solid rgba(212,160,32,.8)",
            borderTop: "1px solid rgba(212,160,32,.8)",
            transform: "rotate(45deg)",
          }} />
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative"
      style={{
        padding: "clamp(80px, 11vh, 130px) 8vw",
        background: "rgba(4,4,4,.96)",
        zIndex: 10,
      }}
    >
      {/* Atmosphere — gold center glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(168,108,5,.09) 0%, transparent 70%)",
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

      <div className="w-full max-w-[1440px] mx-auto" style={{ position: "relative", zIndex: 1 }}>

        {/* Eyebrow */}
        <Reveal y={20} blur={4} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 32, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.35))" }} />
            <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase" }}>
              Servicios
            </ShimmerLabel>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08} y={36} style={{ marginBottom: 72, maxWidth: 700 }}>
          <SplitWords
            as="h2"
            stagger={0.055}
            style={{
              fontSize: "clamp(34px, 4.2vw, 58px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
            }}
          >
            ¿Qué podemos construir para tu empresa?
          </SplitWords>
        </Reveal>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "rgba(255,255,255,.04)",
        }}>
          {SERVICES.map((service, i) => (
            <div key={service.num} style={{ background: "rgba(4,4,4,.96)", padding: 1 }}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={0.5} y={16} blur={4} style={{ marginTop: 52, textAlign: "center" }}>
          <p style={{
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--color-text-4)",
          }}>
            Cada proyecto es único — adaptamos el alcance a tu situación específica.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
