"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const STEPS = [
  { num: "01", name: "Descubrir",    desc: "Diagnóstico estratégico: cómo te perciben hoy vs. cómo deberías ser percibido." },
  { num: "02", name: "Definir",      desc: "Arquitectura de percepción: relato, identidad visual, experiencia de usuario." },
  { num: "03", name: "Diseñar",      desc: "Sistema visual y de experiencia construido desde cero. Sin templates." },
  { num: "04", name: "Construir",    desc: "Desarrollo con estándares de clase mundial. Cada detalle es intencional." },
  { num: "05", name: "Perfeccionar", desc: "Iteración continua hasta alcanzar el estándar Wolf Suit de excelencia." },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative flex items-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        <Reveal y={24} blur={4}>
          <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 18 }}>
            Proceso
          </p>
        </Reveal>

        <Reveal delay={0.1} y={32} style={{ marginBottom: 64 }}>
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

        {/* Timeline */}
        <div style={{ position: "relative", display: "flex" }}>
          {/* Line draws in from left */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
            aria-hidden
            style={{
              position: "absolute",
              top: 28,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, rgba(201,164,90,.5), rgba(201,164,90,.1))",
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
              style={{ flex: 1, paddingTop: 56, paddingRight: 20, position: "relative" }}
            >
              {/* Dot pulses in */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}
                style={{ position: "absolute", top: 24, left: 0, width: 8, height: 8, border: "1px solid var(--color-gold)", borderRadius: "50%", background: "#050505" }}
              />
              <p style={{ fontSize: 10, color: "var(--color-gold)", letterSpacing: ".25em", marginBottom: 12 }}>{step.num}</p>
              <p className="font-display" style={{ fontSize: 21, fontWeight: 500, marginBottom: 8 }}>{step.name}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-3)", lineHeight: 1.75 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
