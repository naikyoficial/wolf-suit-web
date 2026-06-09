"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

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

        <Reveal y={24} blur={4}>
          <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 18 }}>
            Enfoque
          </p>
        </Reveal>

        <Reveal delay={0.1} y={32} style={{ marginBottom: 56 }}>
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
            Tres disciplinas. Un único resultado.
          </SplitWords>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(201,164,90,.1)" }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: EASE }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: 44,
                background: hovered === i ? "#0d0d0d" : "#070707",
                border: `1px solid ${hovered === i ? "rgba(201,164,90,.28)" : "transparent"}`,
                transform: `translateY(${hovered === i ? -6 : 0}px)`,
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
