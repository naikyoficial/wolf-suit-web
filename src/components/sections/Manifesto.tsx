"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { MANIFESTO_CONTENT } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src="/background-filosofia.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center center" }}
      />

      {/* Overlay oscuro para legibilidad */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.48)",
        zIndex: 1,
      }} />

      {/* Viñeta perimetral */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(110% 90% at 50% 50%, transparent 42%, rgba(0,0,0,.65) 100%)",
      }} />

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "var(--section-py) var(--section-px)",
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
        }}
      >
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(48px, 8vh, 88px)" }}>
            01 — Filosofía
          </p>
        </Reveal>

        <h2 className="sr-only">Filosofía: la percepción precede al crecimiento</h2>

        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]"
          style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}
        >
          <Reveal>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.35rem, 2.1vw, 1.85rem)",
                lineHeight: 1.35,
                letterSpacing: "-0.018em",
                color: "rgba(248,245,240,.78)",
                margin: 0,
              }}
            >
              &ldquo;Las empresas son juzgadas<br />
              antes de ser comprendidas.&rdquo;
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 4vh, 44px)" }}>
            <Reveal delay={0.08}>
              <p
                style={{
                  fontSize: "clamp(15px, 1.1vw, 17px)",
                  lineHeight: 1.75,
                  color: "var(--color-text-2)",
                  margin: 0,
                }}
              >
                {MANIFESTO_CONTENT.statement}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div
                style={{
                  paddingTop: "clamp(24px, 3.6vh, 36px)",
                  borderTop: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)",
                    lineHeight: 1.38,
                    letterSpacing: "-0.018em",
                    color: "rgba(248,245,240,.92)",
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  {MANIFESTO_CONTENT.punchline}
                </p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)",
                    lineHeight: 1.38,
                    letterSpacing: "-0.018em",
                    background: GOLD,
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    margin: 0,
                  }}
                >
                  {MANIFESTO_CONTENT.punchline2}
                </motion.p>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <p
                style={{
                  fontSize: "clamp(13px, 0.95vw, 15px)",
                  lineHeight: 1.72,
                  color: "var(--color-text-3)",
                  margin: 0,
                }}
              >
                {MANIFESTO_CONTENT.aside}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
