"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EASE    = [0.16, 1.0, 0.3, 1.0] as const;
const CURTAIN = [0.76, 0.0, 0.24, 1.0] as const;

export function Preloader() {
  const [phase, setPhase] = useState<"show" | "exit" | "gone">("show");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const hold = touch ? 1900 : 1500;

    // Contador 0→100 mientras se sostiene el telón
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / hold, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase("exit"), hold + 120);
    const t2 = setTimeout(() => setPhase("gone"), hold + 1120);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "gone") return null;

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 99999, background: "#060606" }}
      animate={phase === "exit" ? { y: "-101%" } : { y: 0 }}
      transition={{ duration: 1.0, ease: CURTAIN }}
    >
      {/* Textura atmosférica muy sutil */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 45% at 50% 44%, rgba(160,105,10,.08) 0%, transparent 70%)",
      }} />

      {/* Marca central — revelada por máscara, sin rebotes */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: "0 clamp(1.5rem, 6vw, 4rem)" }}>
        <div style={{ overflow: "hidden", paddingBottom: "0.14em" }}>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              letterSpacing: "0.28em",
              textIndent: "0.28em",
              color: "#ECE8DF",
              lineHeight: 1,
            }}
          >
            SUITWOLF
          </motion.span>
        </div>

        {/* Línea que se llena con el progreso */}
        <div style={{
          marginTop: "clamp(20px, 3vh, 30px)",
          width: "min(320px, 62vw)",
          height: 1,
          background: "rgba(255,255,255,.1)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${pct}%`,
            background: "linear-gradient(90deg, rgba(212,160,32,.5), #D4A020)",
            transition: "width .12s linear",
          }} />
        </div>
      </div>

      {/* Contador — esquina inferior */}
      <div style={{
        position: "absolute",
        bottom: "clamp(24px, 5vh, 48px)",
        right: "clamp(24px, 6vw, 64px)",
        display: "flex",
        alignItems: "baseline",
        gap: 8,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          color: "rgba(236,232,223,.92)",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}>
          {String(pct).padStart(3, "0")}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(10px, 1vw, 13px)",
          color: "rgba(212,160,32,.6)",
        }}>
          %
        </span>
      </div>

      {/* Etiqueta inferior izquierda — concreta, no tricolon abstracto */}
      <div style={{
        position: "absolute",
        bottom: "clamp(26px, 5vh, 50px)",
        left: "clamp(24px, 6vw, 64px)",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(9px, 0.8vw, 11px)",
          letterSpacing: ".26em",
          textTransform: "uppercase",
          color: "rgba(200,193,180,.4)",
        }}>
          Agencia de diseño & desarrollo web
        </span>
      </div>
    </motion.div>
  );
}
