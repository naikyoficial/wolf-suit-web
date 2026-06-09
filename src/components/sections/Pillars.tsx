"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const PILLARS = [
  {
    num: "01",
    title: "Estrategia",
    body: "La percepción precede a la confianza. Antes de diseñar una pantalla, entendemos qué brecha existe entre cómo te perciben hoy y cómo deberías ser percibido.",
  },
  {
    num: "02",
    title: "Diseño",
    body: "La elegancia siempre vence al exceso. Cada elemento justifica su existencia. El espacio negativo es una herramienta. La precisión es la única métrica válida.",
  },
  {
    num: "03",
    title: "Tecnología",
    body: "Invisible cuando está bien ejecutada. El código más elegante es el que el usuario nunca nota porque simplemente funciona con absoluta perfección.",
  },
];

export function Pillars() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="pillars"
      className="relative flex items-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", background: "rgba(7,7,7,.7)", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 18 }}
        >
          Enfoque
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="font-display font-light"
          style={{ fontSize: "clamp(36px,4.5vw,60px)", lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: 56 }}
        >
          Tres disciplinas.<br />Un único resultado.
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(201,164,90,.1)" }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.13, ease: EASE }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: 44,
                background: hovered === i ? "#0d0d0d" : "#070707",
                border: `1px solid ${hovered === i ? "rgba(201,164,90,.28)" : "transparent"}`,
                transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                transition: "background .4s, border-color .4s, transform .4s",
                cursor: "default",
              }}
            >
              <p style={{ fontSize: 10, color: "var(--color-gold)", letterSpacing: ".3em", marginBottom: 22 }}>{p.num}</p>
              <h3 className="font-display" style={{ fontSize: 30, fontWeight: 400, marginBottom: 14 }}>{p.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--color-text-3)" }}>{p.body}</p>
              <div style={{
                marginTop: 28,
                width: hovered === i ? 44 : 24,
                height: 1,
                background: "var(--color-gold)",
                opacity: hovered === i ? .8 : .4,
                transition: "width .4s, opacity .4s",
              }} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
