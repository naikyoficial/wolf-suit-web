"use client";

import { motion } from "framer-motion";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { Reveal } from "@/components/ui/Reveal";
import { MANIFESTO_CONTENT } from "@/content";

/* 01 — Filosofía. Manifiesto editorial: la declaración se enciende palabra
   por palabra con el scroll; el remate entra en itálica dorada. */
export function Manifesto() {
  return (
    <section
      id="manifiesto"
      style={{
        position: "relative",
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <p className="section-index" style={{ marginBottom: "clamp(48px, 8vh, 96px)" }}>
          01 — Filosofía
        </p>
      </Reveal>

      <h2 className="sr-only">Filosofía: la percepción precede al crecimiento</h2>

      <ScrollWords
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 3.7vw, 3.4rem)",
          lineHeight: 1.34,
          letterSpacing: "0",
          color: "var(--color-text)",
          maxWidth: "20em",
          margin: 0,
        }}
      >
        {MANIFESTO_CONTENT.statement}
      </ScrollWords>

      {/* Remate — desplazado a la derecha en desktop para romper el eje */}
      <div style={{ marginTop: "clamp(48px, 9vh, 110px)" }}>
        <div className="md:ml-[30%]">
          <Reveal>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 2.9vw, 2.7rem)",
                lineHeight: 1.28,
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              {MANIFESTO_CONTENT.punchline}
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.35 }}
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(95deg, #B8820A 0%, #D4A020 30%, #F0CC50 50%, #D4A020 70%, #B8820A 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingRight: "0.06em",
                }}
              >
                {MANIFESTO_CONTENT.punchline2}
              </motion.span>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              style={{
                marginTop: "clamp(24px, 3.5vh, 40px)",
                fontSize: "clamp(14px, 1.05vw, 16px)",
                lineHeight: 1.75,
                color: "var(--color-text-3)",
                maxWidth: "36em",
              }}
            >
              {MANIFESTO_CONTENT.aside}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
