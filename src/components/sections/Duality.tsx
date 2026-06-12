"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const WOLF_TRAITS = ["Ambición genuina", "Historia que merece atención", "Producto o servicio real", "Visión de largo plazo"];
const SUIT_TRAITS = ["Identidad que diferencia", "Presencia que genera respeto", "Diseño que justifica el precio", "Percepción que abre puertas"];

export function Duality() {
  return (
    <section
      id="duality"
      className="relative flex items-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        {/* Two-column duality grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr" }}>

          {/* ── Left: El Lobo — slides from left ── */}
          <motion.div
            initial={{ opacity: 0, x: -80, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ padding: "48px 64px" }}
          >
            <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 20 }}>
              El lobo
            </p>
            <SplitWords
              as="h2"
              delay={0.1}
              stagger={0.09}
              style={{
                fontSize: "clamp(44px,5vw,70px)",
                lineHeight: 1,
                letterSpacing: "-.02em",
                marginBottom: 32,
                fontFamily: "var(--font-display)",
                fontWeight: 300,
              }}
            >
              Lo que tu empresa ya tiene.
            </SplitWords>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {WOLF_TRAITS.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: EASE }}
                  style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-3)", display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span style={{ width: 18, height: 1, background: "var(--color-gold)", opacity: .5, flexShrink: 0 }} />
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Separator — draws from top ── */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            style={{ width: 1, height: 280, background: "linear-gradient(to bottom, transparent, rgba(201,164,90,.25), transparent)", alignSelf: "center" }}
          />

          {/* ── Right: El Traje — slides from right ── */}
          <motion.div
            initial={{ opacity: 0, x: 80, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ padding: "48px 64px", textAlign: "right" }}
          >
            <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 20 }}>
              El traje
            </p>
            <SplitWords
              as="h2"
              delay={0.1}
              stagger={0.09}
              style={{
                fontSize: "clamp(44px,5vw,70px)",
                lineHeight: 1,
                letterSpacing: "-.02em",
                marginBottom: 32,
                fontFamily: "var(--font-display)",
                fontWeight: 300,
              }}
            >
              Lo que Wolf Suit construye sobre eso.
            </SplitWords>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              {SUIT_TRAITS.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: EASE }}
                  style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-3)", display: "flex", alignItems: "center", gap: 12 }}
                >
                  {t}
                  <span style={{ width: 18, height: 1, background: "var(--color-gold)", opacity: .5, flexShrink: 0 }} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Merge statement ── */}
        <Reveal delay={0.2} y={32} blur={6} style={{ textAlign: "center", marginTop: 72, paddingTop: 56, borderTop: "1px solid rgba(201,164,90,.08)" }}>
          <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom, transparent, rgba(201,164,90,.3))", margin: "0 auto 24px" }} />
          <p
            className="font-display font-light"
            style={{ fontSize: "clamp(18px,2.2vw,26px)", color: "rgba(236,232,223,.55)", letterSpacing: ".04em" }}
          >
            Tu empresa no necesita ser la número uno para verse como tal. Solo necesita el traje correcto.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
