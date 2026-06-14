"use client";

import { motion } from "framer-motion";
import { SplitWords }   from "@/components/ui/SplitWords";
import { Reveal }       from "@/components/ui/Reveal";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Philosophy() {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", zIndex: 10, background: "rgba(5,5,8,.75)" }}
    >
      {/* Atmosphere — cool blue-gray glow top-right, warm gold at bottom */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 45% at 85% 5%, rgba(30,40,70,.18) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 15% 100%, rgba(120,75,5,.10) 0%, transparent 70%)",
      }} />
      {/* Top fade — dissolves into previous section */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to bottom, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      {/* Bottom fade */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: "linear-gradient(to top, rgba(4,4,4,1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 20 }} />
      <div className="w-full max-w-[1440px] mx-auto">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", marginBottom: 28 }}>
            Filosofía
          </ShimmerLabel>
        </motion.div>

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
          <p style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 2, maxWidth: 520, margin: "0 auto" }}>
            Un sitio web no es una decoración.<br />
            Es la primera conversación entre tu empresa y quien está evaluando confiar en ella.<br /><br />
            Un diseño genérico no puede representar una empresa extraordinaria.<br />
            Un template no puede transmitir una historia única.<br />
            Una presencia mediocre no puede justificar una propuesta premium.<br /><br />
            Por eso en SuitWolf diseñamos y desarrollamos sitios web corporativos exclusivos,
            creados para empresas que buscan autoridad, diferenciación y crecimiento sostenido.<br /><br />
            Nuestro trabajo existe para resolver una sola distancia:<br />
            la que separa lo que tu empresa realmente es de lo que hoy el mercado percibe.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
