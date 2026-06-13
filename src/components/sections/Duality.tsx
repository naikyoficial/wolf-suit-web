"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const LEFT = [
  { label: "Ambición genuina",     sub: "Tenés algo real que ofrecer al mercado." },
  { label: "Historia propia",       sub: "Un recorrido que merece ser contado bien." },
  { label: "Producto de valor",     sub: "Lo que vendés resuelve un problema real." },
  { label: "Visión de largo plazo", sub: "Sabés exactamente adónde querés llegar." },
];

const RIGHT = [
  { label: "Identidad irrepetible",    sub: "Diseñada desde cero, solo para tu empresa." },
  { label: "Presencia con autoridad",  sub: "La primera impresión que vas a generar." },
  { label: "Diseño que diferencia",    sub: "Que justifica tu precio antes de una sola palabra." },
  { label: "Percepción que abre puertas", sub: "El activo más valioso que podés construir." },
];

export function Duality() {
  return (
    <section
      id="duality"
      className="relative"
      style={{ padding: "clamp(80px,10vh,120px) 8vw", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        {/* Two-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr" }}>

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ padding: "48px 64px 48px 0" }}
          >
            <p style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase", color: "var(--color-silver)", marginBottom: 20, opacity: 0.7 }}>
              El lobo
            </p>

            <SplitWords
              as="h2"
              delay={0.1}
              stagger={0.08}
              style={{
                fontSize: "clamp(52px, 5.8vw, 80px)",
                lineHeight: 0.92,
                letterSpacing: "-.03em",
                marginBottom: 20,
                fontFamily: "var(--font-display)",
                fontWeight: 300,
              }}
            >
              El potencial.
            </SplitWords>

            <Reveal delay={0.25} y={12} blur={4}>
              <p style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.75, maxWidth: 300, marginBottom: 52 }}>
                Todo lo que tu empresa ya construyó y que el mercado todavía no percibe como merece.
              </p>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {LEFT.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.09, ease: EASE }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 18 }}
                >
                  <span style={{ width: 22, height: 1, background: "var(--color-silver)", opacity: .4, flexShrink: 0, marginTop: 8 }} />
                  <div>
                    <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-2)", marginBottom: 5 }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.65 }}>
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Separator ── */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
            style={{
              width: 1,
              alignSelf: "stretch",
              background: "linear-gradient(to bottom, transparent 5%, rgba(178,192,204,.2) 25%, rgba(178,192,204,.2) 75%, transparent 95%)",
              transformOrigin: "top",
            }}
          />

          {/* ── Right ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ padding: "48px 0 48px 64px", textAlign: "right" }}
          >
            <p style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase", color: "var(--color-silver)", marginBottom: 20, opacity: 0.7 }}>
              El traje
            </p>

            <SplitWords
              as="h2"
              delay={0.1}
              stagger={0.08}
              style={{
                fontSize: "clamp(52px, 5.8vw, 80px)",
                lineHeight: 0.92,
                letterSpacing: "-.03em",
                marginBottom: 20,
                fontFamily: "var(--font-display)",
                fontWeight: 300,
              }}
            >
              La percepción.
            </SplitWords>

            <Reveal delay={0.25} y={12} blur={4} style={{ display: "flex", justifyContent: "flex-end" }}>
              <p style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.75, maxWidth: 300, marginBottom: 52 }}>
                La identidad que construimos sobre eso. Desde cero, sin templates, solo para vos.
              </p>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-end" }}>
              {RIGHT.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.09, ease: EASE }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 18, flexDirection: "row-reverse" }}
                >
                  <span style={{ width: 22, height: 1, background: "var(--color-silver)", opacity: .4, flexShrink: 0, marginTop: 8 }} />
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-2)", marginBottom: 5 }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.65 }}>
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Merge statement — the payoff ── */}
        <Reveal
          delay={0.2}
          y={32}
          blur={6}
          style={{
            textAlign: "center",
            marginTop: 80,
            paddingTop: 72,
            borderTop: "1px solid rgba(178,192,204,.07)",
          }}
        >
          <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom, transparent, rgba(178,192,204,.38))", margin: "0 auto 32px" }} />
          <SplitWords
            as="p"
            delay={0.3}
            stagger={0.035}
            style={{
              fontSize: "clamp(24px, 3vw, 40px)",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "rgba(236,232,223,.72)",
              letterSpacing: ".005em",
              lineHeight: 1.22,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            Tu empresa no necesita ser la número uno para verse como tal. Solo necesita el traje correcto.
          </SplitWords>
        </Reveal>

      </div>
    </section>
  );
}
