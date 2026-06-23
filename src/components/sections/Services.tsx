"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const SERVICES = [
  {
    num: "01",
    category: "Web Corporativa",
    title: "Sitio Web Corporativo",
    subtitle: "Diseño & Desarrollo a Medida",
    desc: "Creamos presencias digitales que posicionan tu empresa como referente en su industria. Arquitectura estratégica, rendimiento técnico de primer nivel y experiencias que transforman visitantes en clientes reales.",
    tags: ["Diseño Web", "SEO Técnico", "Performance"],
  },
  {
    num: "02",
    category: "Conversión",
    title: "Landing Page de Impacto",
    subtitle: "Páginas de Alta Conversión",
    desc: "Páginas de aterrizaje diseñadas para captar leads y acelerar tus resultados de venta. Estructura persuasiva, carga ultrarrápida y copy estratégico orientado al comportamiento real del usuario.",
    tags: ["Lead Generation", "CRO", "Copy Estratégico"],
  },
  {
    num: "03",
    category: "E-commerce",
    title: "Tienda Online Premium",
    subtitle: "E-commerce de Alto Nivel",
    desc: "Plataformas de venta online con experiencia de compra de lujo. Integración de medios de pago, catálogo optimizado y flujos diseñados para maximizar la conversión y el ticket promedio.",
    tags: ["E-commerce", "Pagos Online", "UX de Compra"],
  },
  {
    num: "04",
    category: "Personal Brand",
    title: "Presencia Personal",
    subtitle: "Portfolio & Personal Branding",
    desc: "Sitio web personal para ejecutivos, consultores y figuras públicas. Tu imagen digital como activo estratégico: credibilidad, autoridad y distinción que abren puertas antes de que hables.",
    tags: ["Portfolio", "Ejecutivos", "Autoridad Digital"],
  },
  {
    num: "05",
    category: "Posicionamiento",
    title: "SEO & Visibilidad Web",
    subtitle: "Posicionamiento Orgánico en Google",
    desc: "Estrategia SEO integral para que tu empresa aparezca primero cuando tus clientes te buscan. Auditoría técnica, arquitectura de contenidos, optimización on-page y link building de autoridad.",
    tags: ["SEO", "Google", "Tráfico Orgánico"],
  },
  {
    num: "06",
    category: "App & Plataforma",
    title: "Aplicación Web a Medida",
    subtitle: "Plataformas, SaaS & Dashboards",
    desc: "Interfaces complejas diseñadas con rigor de producto premium. Dashboards, herramientas internas y plataformas SaaS que combinan máxima funcionalidad técnica con diseño de experiencia de usuario de primer nivel.",
    tags: ["SaaS", "Dashboard", "UX/UI"],
  },
  {
    num: "07",
    category: "Desarrollo",
    title: "Software a Medida",
    subtitle: "Soluciones de Software Personalizado",
    desc: "Desarrollo de software adaptado exactamente a los procesos y necesidades de tu empresa. Automatización, integraciones de sistemas, APIs y herramientas internas que eliminan fricciones operativas y escalan con tu negocio.",
    tags: ["Software", "Automatización", "Integraciones"],
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <div style={{
      width: 22, height: 22, position: "relative", flexShrink: 0,
      border: `1px solid rgba(212,160,32,${open ? ".5" : ".22"})`,
      transition: "border-color .4s",
    }}>
      {/* Horizontal */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 8, height: 1,
        background: `rgba(212,160,32,${open ? ".9" : ".6"})`,
        transition: "background .4s",
      }} />
      {/* Vertical — collapses when open */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scaleY(${open ? 0 : 1})`,
        width: 1, height: 8,
        background: `rgba(212,160,32,${open ? ".9" : ".6"})`,
        transition: "transform .4s cubic-bezier(.16,1,.3,1), background .4s",
      }} />
    </div>
  );
}

export function Services() {
  const isMobile = useMobile();
  const [active, setActive] = useState<number | null>(0);

  const toggle = (i: number) => setActive(prev => prev === i ? null : i);

  return (
    <section
      id="services"
      className="relative"
      style={{
        padding: "clamp(56px,8vh,130px) 0",
        background: "rgba(4,4,4,.96)",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 55% at 50% 30%, rgba(168,108,5,.07) 0%, transparent 70%)",
      }} />
      {/* Edge fades */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 20,
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 20,
      }} />

      <div className="w-full max-w-[1200px] mx-auto" style={{ padding: "0 clamp(1.5rem,8vw,7.5rem)", position: "relative", zIndex: 5 }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "clamp(40px,6vh,80px)", textAlign: "center" }}>
          <Reveal y={20} blur={4} style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ width: 28, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.4))" }} />
            <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
              Servicios
            </ShimmerLabel>
            <div style={{ width: 28, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.4))" }} />
          </Reveal>

          <Reveal delay={0.1} y={32}>
            <SplitWords
              as="h2"
              stagger={0.05}
              style={{
                fontSize: "clamp(30px,3.8vw,52px)",
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

        {/* ── Accordion list ── */}
        <div style={{ position: "relative" }}>
          {SERVICES.map((s, i) => {
            const isOpen   = active === i;
            const isDimmed = active !== null && !isOpen;

            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={isMobile
                  ? { duration: 0.35, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }
                  : { duration: 0.7, delay: i * 0.06, ease: EASE }
                }
                style={{ position: "relative" }}
              >
                {/* Row separator */}
                <div style={{
                  height: 1,
                  background: isOpen
                    ? "rgba(212,160,32,.28)"
                    : "rgba(212,160,32,.10)",
                  transition: "background .5s",
                }} />

                {/* Active left accent bar */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{
                        position: "absolute",
                        left: 0, top: 1, bottom: 0, width: 2,
                        background: "linear-gradient(to bottom, rgba(212,160,32,.85), rgba(212,160,32,.2))",
                        transformOrigin: "top",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* ── Clickable row ── */}
                <div
                  role="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  data-cursor-hover
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(16px,2.5vw,36px)",
                    padding: `clamp(20px,2.8vh,32px) 0 clamp(20px,2.8vh,32px) ${isOpen ? "clamp(16px,1.5vw,24px)" : "0"}`,
                    cursor: "pointer",
                    background: isOpen ? "rgba(212,160,32,.025)" : "transparent",
                    transition: "background .5s, padding-left .5s",
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontSize: 9,
                    letterSpacing: ".4em",
                    minWidth: 44,
                    flexShrink: 0,
                    background: isOpen ? GOLD : undefined,
                    backgroundSize: "260% 100%",
                    WebkitBackgroundClip: isOpen ? "text" : undefined,
                    WebkitTextFillColor: isOpen ? "transparent" : undefined,
                    backgroundClip: isOpen ? "text" : undefined,
                    animation: isOpen ? "metalShimmer 8s ease-in-out infinite" : undefined,
                    color: isOpen ? undefined : "rgba(180,174,164,.28)",
                    transition: "color .4s",
                  }}>
                    {s.num}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    flex: 1,
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px,3.2vw,48px)",
                    fontWeight: isOpen ? 400 : 300,
                    letterSpacing: "-.022em",
                    lineHeight: 1.05,
                    margin: 0,
                    color: isOpen
                      ? "var(--color-text)"
                      : isDimmed
                      ? "rgba(200,195,185,.30)"
                      : "rgba(200,195,185,.62)",
                    transition: "color .5s, font-weight .3s",
                  }}>
                    {s.title}
                  </h3>

                  {/* Category — hidden on small mobile */}
                  {!isMobile && (
                    <span style={{
                      fontSize: 8,
                      letterSpacing: ".38em",
                      textTransform: "uppercase",
                      color: isOpen ? "rgba(212,160,32,.55)" : "rgba(180,174,164,.22)",
                      transition: "color .5s",
                      flexShrink: 0,
                    }}>
                      {s.category}
                    </span>
                  )}

                  {/* Plus/minus toggle */}
                  <PlusIcon open={isOpen} />
                </div>

                {/* ── Expanded content ── */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                        opacity: { duration: 0.35, ease: "easeOut" },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        paddingLeft: "clamp(44px,5vw,80px)",
                        paddingRight: "clamp(44px,5vw,120px)",
                        paddingBottom: "clamp(28px,4vh,48px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                      }}>
                        {/* Subtitle */}
                        <p style={{
                          fontSize: 9,
                          letterSpacing: ".3em",
                          textTransform: "uppercase",
                          color: "rgba(212,160,32,.52)",
                          marginBottom: 16,
                        }}>
                          {s.subtitle}
                        </p>

                        {/* Desc */}
                        <p style={{
                          fontSize: "clamp(13px,1vw,15px)",
                          color: "var(--color-text-2)",
                          lineHeight: 1.9,
                          maxWidth: 640,
                          marginBottom: 24,
                        }}>
                          {s.desc}
                        </p>

                        {/* Tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {s.tags.map(tag => (
                            <span key={tag} style={{
                              fontSize: 8,
                              letterSpacing: ".32em",
                              textTransform: "uppercase",
                              padding: "5px 12px",
                              border: "1px solid rgba(212,160,32,.18)",
                              color: "rgba(212,160,32,.55)",
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Bottom border */}
          <div style={{ height: 1, background: "rgba(212,160,32,.10)" }} />
        </div>

        {/* Footer note */}
        <Reveal delay={0.3} y={12} blur={4} style={{ textAlign: "center", marginTop: "clamp(32px,4vh,52px)" }}>
          <p style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--color-text-4)" }}>
            Cada proyecto es único — adaptamos el alcance a tu situación específica.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
