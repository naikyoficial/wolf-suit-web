"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { DUALITY_CONTENT } from "@/content";
import { useMobile } from "@/hooks/useMobile";

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

export function Duality() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xA = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const xB = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={ref}
      id="dualidad"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src="/background-dualidad.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 68%" }}
      />

      {/* Overlay oscuro para legibilidad */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.52)",
        zIndex: 1,
      }} />

      {/* Viñeta perimetral */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(110% 90% at 50% 50%, transparent 38%, rgba(0,0,0,.7) 100%)",
      }} />

      {/* Fades superior e inferior */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, zIndex: 1, pointerEvents: "none",
        height: "58%",
        background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, rgba(6,5,4,.72) 40%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: "none",
        height: "38%",
        background: "linear-gradient(to bottom, transparent 0%, rgba(6,5,4,.82) 55%, rgba(6,5,4,1) 100%)",
      }} />

      {/* Contenido */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
      }}>
      <Reveal>
        <p className="section-index" style={{ marginBottom: "clamp(48px, 8vh, 96px)" }}>
          02 — Dualidad
        </p>
      </Reveal>

      <h2 className="sr-only">La dualidad: parecer y ser</h2>

      {/* Línea A — apagada */}
      <motion.p
        style={{
          x: isMobile ? 0 : xA,
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "clamp(1.7rem, 3.2vw, 3rem)",
          lineHeight: 1.22,
          letterSpacing: "-0.02em",
          color: "rgba(248,245,240,.50)",
          maxWidth: "18em",
          margin: 0,
        }}
      >
        {DUALITY_CONTENT.lineA}
      </motion.p>


      {/* Línea B — encendida, desplazada */}
      <div className="md:ml-[16%]">
        <motion.p
          style={{
            x: isMobile ? 0 : xB,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(2rem, 4vw, 3.8rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            maxWidth: "14em",
            margin: 0,
          }}
        >
          {DUALITY_CONTENT.lineB}
        </motion.p>
      </div>

      {/* Cierre */}
      <div style={{ marginTop: "clamp(52px, 9vh, 100px)", display: "flex", flexDirection: "column", gap: "clamp(18px, 2.6vh, 28px)" }}>
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(1.1rem, 1.8vw, 1.55rem)",
              lineHeight: 1.35,
              letterSpacing: "-0.018em",
              margin: 0,
              background: GOLD,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              width: "fit-content",
            }}
          >
            {DUALITY_CONTENT.closing}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              fontSize: "clamp(13px, 0.95vw, 15px)",
              lineHeight: 1.72,
              color: "var(--color-text-3)",
              maxWidth: "34em",
              margin: 0,
            }}
          >
            {DUALITY_CONTENT.aside}
          </p>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
