"use client";

import { motion } from "framer-motion";
import { SplitWords }   from "@/components/ui/SplitWords";
import { Reveal }       from "@/components/ui/Reveal";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Philosophy() {
  const isMobile = useMobile();
  return (
    <section
      className="relative text-center"
      id="philosophy"
      style={{ padding: "clamp(48px, 7vh, 120px) clamp(1.5rem, 8vw, 7.5rem)", zIndex: 10, background: "rgba(5,5,8,.75)" }}
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
          initial={isMobile ? { opacity: 0, y: 14 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } : { duration: 0.7, ease: EASE }}
        >
          <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", marginBottom: "clamp(16px, 2.5vh, 28px)" }}>
            Filosofía
          </ShimmerLabel>
        </motion.div>

        {/* Big quote — word by word reveal */}
        <div style={{ maxWidth: 860, margin: "0 auto clamp(16px, 2.5vh, 28px)" }}>
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
          transition={isMobile ? { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } : { duration: 1, delay: 0.6, ease: EASE }}
          style={{ width: 36, height: 1, background: "var(--color-gold)", margin: "0 auto clamp(20px, 3vh, 36px)", transformOrigin: "center" }}
        />

        {/* Body — structured paragraphs for SEO + readability */}
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <Reveal delay={0.65} y={20} blur={5}>
            <p style={{ fontSize: 17, color: "var(--color-text-2)", lineHeight: 1.8, marginBottom: 28, letterSpacing: "-.01em" }}>
              Muchas empresas invierten años perfeccionando sus productos y procesos. Pero cuando alguien las descubre por primera vez, la imagen no transmite ese valor. En un mercado competitivo, la percepción lo cambia todo.
            </p>
          </Reveal>

          <Reveal delay={0.8} y={20} blur={5}>
            <p style={{ fontSize: 16, color: "var(--color-text-3)", lineHeight: 1.85, marginBottom: 32 }}>
              Diseñamos <strong style={{ color: "var(--color-text-2)", fontWeight: 500 }}>sitios web premium</strong>, desarrollamos <strong style={{ color: "var(--color-text-2)", fontWeight: 500 }}>software a medida</strong> y construimos <strong style={{ color: "var(--color-text-2)", fontWeight: 500 }}>sistemas digitales</strong> que proyectan la imagen que tu empresa realmente merece.
            </p>
          </Reveal>

          <Reveal delay={0.95} y={16} blur={4}>
            <p style={{ fontSize: 15, color: "var(--color-text-4)", lineHeight: 1.85, letterSpacing: ".005em" }}>
              Nuestro trabajo existe para cerrar una sola brecha: la distancia entre lo que tu empresa realmente es y lo que el mundo percibe hoy.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
