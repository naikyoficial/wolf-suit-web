"use client";

import { motion } from "framer-motion";
import { SplitWords }   from "@/components/ui/SplitWords";
import { Reveal }       from "@/components/ui/Reveal";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Philosophy() {
  return (
    <section
      className="relative text-center"
      id="philosophy"
      style={{ padding: "clamp(80px, 11vh, 120px) 8vw", zIndex: 10, background: "rgba(5,5,8,.75)" }}
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
          style={{ width: 36, height: 1, background: "var(--color-gold)", margin: "0 auto 36px", transformOrigin: "center" }}
        />

        {/* Body — structured paragraphs for SEO + readability */}
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <Reveal delay={0.65} y={20} blur={5}>
            <p style={{ fontSize: 17, color: "var(--color-text-2)", lineHeight: 1.85, marginBottom: 28, letterSpacing: "-.01em" }}>
              Cada vez que alguien llega a tu sitio web, en menos de tres segundos ya tiene una opinión formada sobre tu empresa. Esa opinión decide si te contactan, si te ignoran o si eligen a tu competencia.
            </p>
          </Reveal>

          <Reveal delay={0.8} y={20} blur={5}>
            <p style={{ fontSize: 16, color: "var(--color-text-3)", lineHeight: 1.9, marginBottom: 28 }}>
              SuitWolf es una <strong style={{ color: "var(--color-text-2)", fontWeight: 500 }}>agencia de diseño y desarrollo web premium</strong> especializada en empresas que entienden que su presencia digital es un activo estratégico, no un gasto. Creamos sitios web corporativos, landing pages de alta conversión,{" "}<span style={{ whiteSpace: "nowrap" }}>e-commerce</span>{" "}y aplicaciones web construidos sobre una arquitectura pensada para cada cliente.
            </p>
          </Reveal>

          <Reveal delay={0.95} y={20} blur={5}>
            <p style={{ fontSize: 16, color: "var(--color-text-3)", lineHeight: 1.9, marginBottom: 36 }}>
              No usamos plantillas. No seguimos tendencias pasajeras. Cada decisión de diseño, tecnología y contenido responde a un objetivo concreto: <em style={{ color: "var(--color-text-2)", fontStyle: "normal" }}>representar el verdadero nivel de tu empresa y posicionarte como referente en tu industria.</em>
            </p>
          </Reveal>

          <Reveal delay={1.1} y={16} blur={4}>
            <p style={{ fontSize: 15, color: "var(--color-text-4)", lineHeight: 1.85, letterSpacing: ".005em" }}>
              Nuestro trabajo existe para cerrar una sola brecha: la distancia entre lo que tu empresa realmente es y lo que el mundo percibe hoy.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
