"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Philosophy() {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", background: "rgba(6,6,6,.6)", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 18 }}
        >
          Filosofía
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.14, ease: EASE }}
          className="font-display font-light"
          style={{ fontSize: "clamp(32px,5vw,72px)", lineHeight: 1.18, letterSpacing: "-.025em", maxWidth: 860, margin: "0 auto 28px" }}
        >
          "Las empresas son juzgadas<br />
          antes de ser comprendidas."
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0, originX: "center" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
          style={{ width: 36, height: 1, background: "var(--color-gold)", margin: "0 auto 28px" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
          style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 1.95, maxWidth: 460, margin: "0 auto" }}
        >
          La percepción precede a la confianza.<br />
          La confianza precede a la decisión.<br />
          La decisión precede al crecimiento.<br /><br />
          Todo lo que construimos existe para potenciar<br />
          una única cosa: la percepción de valor<br />
          que tu empresa merece.
        </motion.p>

      </div>
    </section>
  );
}
