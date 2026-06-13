"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const STEPS = [
  { num: "01", name: "Descubrir",    desc: "Diagnóstico profundo: quién sos, a quién le hablás y qué distancia existe entre cómo te perciben hoy y el lugar al que pertenecés." },
  { num: "02", name: "Definir",      desc: "Arquitectura de percepción: el relato, la identidad y la experiencia que van a representar a tu empresa exactamente como merece." },
  { num: "03", name: "Diseñar",      desc: "Sistema visual creado exclusivamente para tu empresa. Cada elemento tiene una razón de existir. Nada genérico, nada reutilizado." },
  { num: "04", name: "Construir",    desc: "Desarrollo técnico de alto estándar. El código es tan cuidadoso como el diseño. La precisión no tiene componentes opcionales." },
  { num: "05", name: "Perfeccionar", desc: "No entregamos cuando está listo. Entregamos cuando está bien. Iteramos hasta que cada detalle responde al estándar que tu empresa merece." },
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
          <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-silver)", marginBottom: 18 }}>
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
              background: "linear-gradient(90deg, rgba(178,192,204,.5), rgba(178,192,204,.1))",
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
                style={{ position: "absolute", top: 24, left: 0, width: 8, height: 8, border: "1px solid var(--color-silver)", borderRadius: "50%", background: "#050505" }}
              />
              <p style={{ fontSize: 10, color: "var(--color-silver)", letterSpacing: ".25em", marginBottom: 12 }}>{step.num}</p>
              <p className="font-display" style={{ fontSize: 21, fontWeight: 500, marginBottom: 8 }}>{step.name}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-3)", lineHeight: 1.75 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
