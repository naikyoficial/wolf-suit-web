"use client";

import { motion } from "framer-motion";
import { SplitWords } from "@/components/ui/SplitWords";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Philosophy() {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", background: "rgba(6,6,6,.6)", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">

        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 28 }}
        >
          Filosofía
        </motion.p>

        {/* Big quote — word by word reveal */}
        <div style={{ maxWidth: 860, margin: "0 auto 28px" }}>
          <SplitWords
            as="blockquote"
            delay={0.1}
            stagger={0.06}
            style={{
              fontSize: "clamp(32px,5vw,72px)",
              lineHeight: 1.18,
              letterSpacing: "-.025em",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
            }}
          >
            Las empresas son juzgadas antes de ser comprendidas.
          </SplitWords>
        </div>

        {/* Gold bar — draws in */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          style={{ width: 36, height: 1, background: "var(--color-gold)", margin: "0 auto 28px", transformOrigin: "center" }}
        />

        {/* Body — blurs in */}
        <Reveal delay={0.7} y={24} blur={6}>
          <p style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 1.95, maxWidth: 460, margin: "0 auto" }}>
            Un template no puede contar tu historia.<br />
            Un diseño genérico no puede justificar un precio premium.<br />
            Una presencia mediocre no puede representar una empresa extraordinaria.<br /><br />
            Todo lo que construimos existe para resolver un único problema:
            que tu empresa sea percibida exactamente como lo que es —
            o exactamente como lo que quiere llegar a ser.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
