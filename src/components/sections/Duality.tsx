"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
};

const WOLF_TRAITS  = ["Agudeza instintiva", "Visión de largo plazo", "Ferocidad controlada", "Liderazgo natural"];
const SUIT_TRAITS  = ["Elegancia calculada", "Criterio impecable", "Presencia inevitable", "Confianza absoluta"];

export function Duality() {
  return (
    <section
      id="duality"
      className="relative flex items-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        {/* Two-column grid with separator */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger}
          style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr" }}
        >
          {/* ── Left: El Lobo ── */}
          <motion.div variants={reveal} style={{ padding: "48px 64px" }}>
            <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 20 }}>
              El lobo
            </p>
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(44px,5vw,70px)", lineHeight: 1, letterSpacing: "-.02em", marginBottom: 32 }}
            >
              Instinto.<br />Estrategia.<br />Poder.
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {WOLF_TRAITS.map(t => (
                <li key={t} style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-3)", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 18, height: 1, background: "var(--color-gold)", opacity: .5, flexShrink: 0 }} />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Vertical separator ── */}
          <motion.div
            variants={reveal}
            style={{ width: 1, height: 280, background: "linear-gradient(to bottom, transparent, rgba(201,164,90,.25), transparent)", alignSelf: "center" }}
          />

          {/* ── Right: El Traje ── */}
          <motion.div variants={reveal} style={{ padding: "48px 64px", textAlign: "right" }}>
            <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 20 }}>
              El traje
            </p>
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(44px,5vw,70px)", lineHeight: 1, letterSpacing: "-.02em", marginBottom: 32 }}
            >
              Precisión.<br />Autoridad.<br />Criterio.
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              {SUIT_TRAITS.map(t => (
                <li key={t} style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-3)", display: "flex", alignItems: "center", gap: 12 }}>
                  {t}
                  <span style={{ width: 18, height: 1, background: "var(--color-gold)", opacity: .5, flexShrink: 0 }} />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Merge statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginTop: 72, paddingTop: 56, borderTop: "1px solid rgba(201,164,90,.08)" }}
        >
          <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom, transparent, rgba(201,164,90,.3))", margin: "0 auto 24px" }} />
          <p
            className="font-display font-light"
            style={{ fontSize: "clamp(18px,2.2vw,26px)", color: "rgba(236,232,223,.55)", letterSpacing: ".04em" }}
          >
            La combinación que transforma cómo el mercado percibe tu empresa.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
