"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal }       from "@/components/ui/Reveal";
import { SplitWords }   from "@/components/ui/SplitWords";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { TiltCard }     from "@/components/ui/TiltCard";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const PROJECTS = [
  { industry: "Tecnología B2B",          year: "2026", title: "Caso de Estudio A" },
  { industry: "Consultoría Estratégica",  year: "2026", title: "Caso de Estudio B" },
];

export function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useMobile();

  return (
    <section
      className="relative flex items-center"
      style={{ minHeight: "100svh", padding: "100px 8vw", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        <Reveal y={24} blur={4}>
          <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", marginBottom: 18 }}>
            Trabajo
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
            Proyectos seleccionados.
          </SplitWords>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "rgba(178,192,204,.06)" }}>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={isMobile ? { opacity: 0, y: 16, scale: 1 } : { opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
              whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={isMobile ? { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } : { duration: 1.1, delay: 0.1 + i * 0.15, ease: EASE }}
            >
              <TiltCard
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  aspectRatio: "16/9",
                  background: "#080808",
                  padding: 40,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  overflow: "hidden",
                  border: `1px solid ${hovered === i ? "rgba(178,192,204,.18)" : "rgba(255,255,255,.03)"}`,
                  transition: "border-color .5s",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(178,192,204,.06) 0%, transparent 50%)", opacity: hovered === i ? 1 : 0, transition: "opacity .5s", pointerEvents: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(178,192,204,.5)", position: "relative" }}>
                  <span>{p.industry}</span>
                  <span>{p.year}</span>
                </div>
                <div style={{ position: "relative" }}>
                  <p className="font-display font-light" style={{ fontSize: "clamp(24px,3vw,38px)", color: hovered === i ? "var(--color-text)" : "rgba(236,232,223,.45)", transition: "color .4s" }}>
                    {p.title}
                  </p>
                  <div style={{ width: hovered === i ? 50 : 0, height: 1, background: "var(--color-gold)", marginTop: 12, transition: "width .7s cubic-bezier(.16,1,.3,1)" }} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
