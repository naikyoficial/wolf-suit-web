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
      style={{ padding: "clamp(56px, 8vh, 120px) clamp(1.5rem, 8vw, 7.5rem)", background: "rgba(6,5,3,.82)", zIndex: 10 }}
    >
      {/* Atmosphere — warm amber radial + micro dot grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 50% at 50% 60%, rgba(160,95,5,.09) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 80% 10%, rgba(212,160,32,.05) 0%, transparent 65%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
        backgroundImage: "radial-gradient(circle, rgba(212,160,32,.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Top fade */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      {/* Bottom fade */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      <div className="w-full max-w-[1440px] mx-auto">

        <Reveal y={24} blur={4} style={{ textAlign: "center" }}>
          <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", marginBottom: 18 }}>
            Enfoque
          </ShimmerLabel>
        </Reveal>

        <Reveal delay={0.1} y={32} style={{ marginBottom: "clamp(28px, 4vh, 56px)", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(36px,4.5vw,60px)",
            lineHeight: 1.12,
            letterSpacing: "-.02em",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
          }}>
            <SplitWords as="span" stagger={0.06} delay={0.1}>
              La excelencia no es un objetivo,
            </SplitWords>
            <br />
            <SplitWords as="span" stagger={0.06} delay={0.52}>
              es el punto de partida.
            </SplitWords>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 28px)" }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: EASE }}
            >
              <TiltCard
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: "clamp(24px, 4vw, 44px)",
                  height: "100%",
                  background: hovered === i ? "#0d0d0d" : "#070707",
                  border: `1px solid ${hovered === i ? "rgba(212,160,32,.28)" : "transparent"}`,
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
                  background: "var(--color-gold)",
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
