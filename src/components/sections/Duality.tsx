"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { DUALITY_CONTENT } from "@/content";
import { useMobile } from "@/hooks/useMobile";

/* 02 — Dualidad. Dos verdades opuestas que se deslizan en direcciones
   contrarias con el scroll; una línea dorada las separa. */
export function Duality() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xA = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const xB = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={ref}
      id="dualidad"
      style={{
        position: "relative",
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <Reveal>
        <p className="section-index" style={{ marginBottom: "clamp(48px, 8vh, 96px)" }}>
          02 — Dualidad
        </p>
      </Reveal>

      <h2 className="sr-only">La dualidad: parecer y ser</h2>

      {/* Línea A — apagada, plata */}
      <motion.p
        style={{
          x: isMobile ? 0 : xA,
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 3.7vw, 3.5rem)",
          lineHeight: 1.24,
          letterSpacing: "0",
          color: "rgba(178,192,204,.42)",
          maxWidth: "16em",
          margin: 0,
        }}
      >
        {DUALITY_CONTENT.lineA}
      </motion.p>

      {/* Separador dorado que se dibuja */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
        style={{
          height: 1,
          width: "min(420px, 60%)",
          margin: "clamp(30px, 5vh, 56px) 0",
          background: "linear-gradient(to right, rgba(212,160,32,.85), rgba(212,160,32,.05))",
          transformOrigin: "left center",
        }}
      />

      {/* Línea B — encendida, blanca, desplazada a la derecha */}
      <div className="md:ml-[18%]">
        <motion.p
          style={{
            x: isMobile ? 0 : xB,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.1rem, 4.4vw, 4.2rem)",
            lineHeight: 1.14,
            letterSpacing: "-0.005em",
            color: "var(--color-text)",
            maxWidth: "13em",
            margin: 0,
          }}
        >
          {DUALITY_CONTENT.lineB}
        </motion.p>
      </div>

      {/* Cierre — itálica dorada + aside */}
      <div style={{ marginTop: "clamp(48px, 9vh, 100px)", display: "flex", flexDirection: "column", gap: "clamp(20px, 3vh, 32px)" }}>
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)",
              lineHeight: 1.3,
              margin: 0,
              background: "linear-gradient(95deg, #B8820A 0%, #D4A020 30%, #F0CC50 50%, #D4A020 70%, #B8820A 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingRight: "0.06em",
              width: "fit-content",
            }}
          >
            {DUALITY_CONTENT.closing}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            style={{
              fontSize: "clamp(14px, 1.05vw, 16px)",
              lineHeight: 1.75,
              color: "var(--color-text-3)",
              maxWidth: "34em",
              margin: 0,
            }}
          >
            {DUALITY_CONTENT.aside}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
