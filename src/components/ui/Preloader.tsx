"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "SUITWOLF".split("");
const EASE    = [0.16, 1.0, 0.3, 1.0] as const;
const CURTAIN = [0.77, 0.0, 0.18, 1.0] as const;

export function Preloader() {
  const [phase, setPhase] = useState<"show" | "exit" | "gone">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2300);
    const t2 = setTimeout(() => setPhase("gone"), 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 99999 }}>
      {/* Top curtain */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: 0, bottom: "50%", background: "#030303" }}
        animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.2, ease: CURTAIN }}
      />
      {/* Bottom curtain */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: "50%", bottom: 0, background: "#030303" }}
        animate={phase === "exit" ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.2, ease: CURTAIN }}
      />

      {/* Center branding */}
      <AnimatePresence>
        {phase === "show" && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 1 }}
          >
            {/* Letters */}
            <div style={{ display: "flex", alignItems: "baseline" }}>
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.15 + i * 0.065, ease: EASE }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(52px, 6.5vw, 88px)",
                    fontWeight: 300,
                    letterSpacing: ".42em",
                    color: "#ece8df",
                    display: "inline-block",
                    minWidth: letter === " " ? ".4em" : undefined,
                  }}
                >
                  {letter === " " ? " " : letter}
                </motion.span>
              ))}
            </div>

            {/* Silver line sweeps in */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
              style={{
                height: 1,
                width: "100%",
                maxWidth: 480,
                background: "linear-gradient(90deg, transparent, #B2C0CC, transparent)",
                marginTop: 18,
                transformOrigin: "center",
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.6 }}
              style={{
                marginTop: 18,
                fontSize: 10,
                letterSpacing: ".38em",
                textTransform: "uppercase",
                color: "rgba(178,192,204,.5)",
              }}
            >
              Diseño · Estrategia · Tecnología
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
