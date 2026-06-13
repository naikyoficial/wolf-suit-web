"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal }       from "@/components/ui/Reveal";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { SplitWords }   from "@/components/ui/SplitWords";
import { TiltCard }     from "@/components/ui/TiltCard";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const PILLARS = [
  {
    num: "01",
    title: "Estrategia",
    body: "Antes de diseñar una sola pantalla entendemos quién sos, a quién le hablás, cómo te percibe el mercado y cuál es el lugar que querés ocupar.\n\nNo diseñamos páginas.\nDiseñamos posicionamiento.",
  },
  {
    num: "02",
    title: "Diseño",
    body: "Cada sitio web es creado desde cero. No reutilizamos estructuras. No adaptamos plantillas.\n\nTu empresa tiene una historia única y merece una identidad visual construida exclusivamente para representarla.",
  },
  {
    num: "03",
    title: "Tecnología",
    body: "El desarrollo web debe ser invisible. El usuario no debería notar el código. Debería notar la velocidad, la precisión, la claridad y la confianza que transmite una experiencia impecable.",
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
          <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", marginBottom: 18 }}>
            Enfoque
          </ShimmerLabel>
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
            Desde cero. Para vos. Sin excepciones.
          </SplitWords>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(178,192,204,.1)" }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: EASE }}
            >
              <TiltCard
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: 44,
                  height: "100%",
                  background: hovered === i ? "#0d0d0d" : "#070707",
                  border: `1px solid ${hovered === i ? "rgba(178,192,204,.28)" : "transparent"}`,
                  transition: "background .4s, border-color .4s",
                  cursor: "default",
                }}
              >
                <p style={{ fontSize: 10, letterSpacing: ".3em", marginBottom: 22, color: "var(--color-text-4)" }}>{p.num}</p>
                <h3 className="font-display" style={{ fontSize: 30, fontWeight: 400, marginBottom: 14 }}>{p.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--color-text-3)", whiteSpace: "pre-line" }}>{p.body}</p>
                <div style={{
                  marginTop: 28,
                  width: hovered === i ? 44 : 24,
                  height: 1,
                  background: "var(--color-silver)",
                  opacity: hovered === i ? .8 : .4,
                  transition: "width .4s, opacity .4s",
                }} />
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
