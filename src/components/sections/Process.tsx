"use client";

import { motion } from "framer-motion";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const STEPS = [
  { num: "01", name: "Descubrir",    desc: "Analizamos tu empresa, tu industria, tus objetivos y la diferencia entre cómo te perciben hoy y cómo deberías ser percibido." },
  { num: "02", name: "Definir",      desc: "Construimos la arquitectura estratégica del proyecto: narrativa, identidad, experiencia y estructura. Todo debe tener una razón." },
  { num: "03", name: "Diseñar",      desc: "Creamos un sistema visual exclusivo donde cada decisión responde a una estrategia y no a una tendencia pasajera." },
  { num: "04", name: "Construir",    desc: "Desarrollamos una plataforma rápida, escalable y optimizada para SEO, rendimiento y experiencia de usuario. La tecnología no es un agregado. Es parte del estándar." },
  { num: "05", name: "Perfeccionar", desc: "No entregamos cuando funciona. Entregamos cuando cada detalle representa el nivel de excelencia que buscamos." },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative"
      style={{ padding: "clamp(56px, 8vh, 120px) clamp(1.5rem, 8vw, 7.5rem)", zIndex: 10, background: "rgba(4,5,7,.85)" }}
    >
      {/* Atmosphere */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 40% at 0% 20%, rgba(20,30,55,.18) 0%, transparent 70%), radial-gradient(ellipse 35% 30% at 100% 80%, rgba(100,65,5,.08) 0%, transparent 65%)",
      }} />
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />

      <div className="w-full max-w-[1100px] mx-auto" style={{ position: "relative", zIndex: 1 }}>

        <Reveal y={24} blur={4} style={{ marginBottom: 8 }}>
          <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase" }}>
            Proceso
          </ShimmerLabel>
        </Reveal>

        <Reveal delay={0.1} y={32} style={{ marginBottom: "clamp(36px, 5vh, 80px)" }}>
          <SplitWords
            as="h2"
            stagger={0.07}
            style={{
              fontSize: "clamp(36px,4.5vw,60px)",
              lineHeight: 1.08,
              letterSpacing: "-.02em",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
            }}
          >
            Un proceso obsesionado por el detalle.
          </SplitWords>
        </Reveal>

        {/* Steps */}
        <div>
          {STEPS.map((step, i) => (
            <div key={step.num}>
              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
                style={{
                  height: 1,
                  background: i === 0 ? "rgba(212,160,32,.38)" : "rgba(212,160,32,.16)",
                  transformOrigin: "left",
                  marginBottom: "clamp(28px, 4vw, 52px)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  gap: "clamp(12px, 4vw, 56px)",
                  marginBottom: "clamp(28px, 4vw, 52px)",
                }}
              >
                {/* Left — number + name */}
                <div style={{ minWidth: 200, flex: "1 0 200px", maxWidth: 280 }}>
                  <p style={{
                    fontSize: 10,
                    letterSpacing: ".38em",
                    textTransform: "uppercase",
                    background: GOLD,
                    backgroundSize: "260% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: `metalShimmer ${10 + i * 2}s ease-in-out infinite`,
                    animationDelay: `${-i * 3}s`,
                    marginBottom: 14,
                  }}>
                    {step.num}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(30px, 3.2vw, 46px)",
                    fontWeight: 300,
                    letterSpacing: "-.025em",
                    lineHeight: 1.05,
                    color: "var(--color-text)",
                  }}>
                    {step.name}
                  </h3>
                </div>

                {/* Right — description */}
                <div style={{ flex: "2 0 260px", paddingTop: "clamp(0px, 1vw, 16px)" }}>
                  <p style={{
                    fontSize: 14,
                    color: "var(--color-text-3)",
                    lineHeight: 1.95,
                    maxWidth: 560,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Closing divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
            style={{
              height: 1,
              background: "rgba(212,160,32,.16)",
              transformOrigin: "left",
            }}
          />
        </div>

      </div>
    </section>
  );
}
