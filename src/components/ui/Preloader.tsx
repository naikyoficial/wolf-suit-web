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
      style={{ zIndex: 99999, background: "#080808" }}
      animate={phase === "exit" ? { y: "-101%" } : { y: 0 }}
      transition={{ duration: 1.0, ease: CURTAIN }}
    >
      {/* ══════════ FONDO — misma atmósfera que el Hero, pero solo CSS ══════════
          Nada de imagen aquí: decodificar el PNG grande antes del primer paint
          trababa la cortina y competía con la carga del Hero. Replicamos la
          iluminación (base oscura + calor dorado + viñeta) para que, al subir el
          telón, la foto real del Hero se sienta como el mismo mundo. */}

      {/* Calor dorado central — conecta con el acento de la marca */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "44%",
        width: "min(900px, 110vw)", height: "min(600px, 75vh)",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(ellipse at center, rgba(180,130,60,.12) 0%, rgba(130,95,35,.05) 42%, transparent 68%)",
        pointerEvents: "none",
      }} />

      {/* Viñeta perimetral — concentra la vista en el centro */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(110% 90% at 50% 44%, transparent 38%, rgba(0,0,0,.74) 100%)",
      }} />

      {/* Marca central — revelada por máscara, sin rebotes */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: "0 clamp(1.5rem, 6vw, 4rem)", zIndex: 1 }}>
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
              color: "#F3F0EA",
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
            background: "linear-gradient(90deg, rgba(185,138,62,.5), #D9B36A)",
            transition: "width .12s linear",
          }} />
        </div>
      </div>
    </motion.div>
  );
}
