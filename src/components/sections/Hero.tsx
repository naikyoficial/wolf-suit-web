"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Hero() {
  const isoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!isoRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 7;
      const y = (e.clientY / window.innerHeight - 0.5) * -7;
      isoRef.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const contentY    = useTransform(scrollY, [0, 500], [0, -60]);
  const contentOp   = useTransform(scrollY, [0, 340], [1, 0]);

  return (
    <section className="relative" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <h1 className="sr-only">Agencia de Diseño y Desarrollo Web Premium para Empresas que Buscan Liderar su Mercado</h1>

      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ minHeight: "calc(100dvh - 4rem)", padding: "80px 5vw" }}
      >

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
          style={{ position: "relative", width: 168, height: 168, marginBottom: 32, opacity: logoOpacity, flexShrink: 0 }}
        >
          <div ref={isoRef} style={{ width: "100%", height: "100%", willChange: "transform" }}>
            <Image
              src="/isotipo.png"
              alt="Suitwolf"
              width={168}
              height={168}
              quality={100}
              priority
              style={{
                width: "100%", height: "100%", objectFit: "contain",
                filter: "drop-shadow(0 0 20px rgba(178,192,204,.20)) drop-shadow(0 0 6px rgba(210,225,240,.28))",
              }}
            />
          </div>
        </motion.div>

        {/* ── Text block ── */}
        <motion.div style={{ y: contentY, opacity: contentOp, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
          >
            <ScrambleText
              text="SUITWOLF"
              delay={0.9}
              duration={1200}
              className="font-display font-semibold"
              style={{
                fontSize: "clamp(30px, 4.2vw, 58px)",
                letterSpacing: ".38em",
                background: "linear-gradient(90deg, #566070 0%, #8A9EAE 22%, #C4D4E4 44%, #F0F5FA 52%, #C4D4E4 60%, #8A9EAE 78%, #566070 100%)",
                backgroundSize: "260% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "metalShimmer 6s ease-in-out infinite",
                display: "block",
              }}
            />
          </motion.div>

          {/* Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            style={{ width: 28, height: 1, background: "rgba(178,192,204,.22)", margin: "22px auto 26px", transformOrigin: "center" }}
          />

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: EASE }}
            style={{
              fontSize: "clamp(18px, 2.2vw, 30px)",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              letterSpacing: "-.02em",
              lineHeight: 1.22,
              maxWidth: 500,
              marginBottom: 16,
              color: "var(--color-text)",
            }}
          >
            Las empresas extraordinarias no deberían parecer comunes.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.95 }}
            style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.9, maxWidth: 380, marginBottom: 56, letterSpacing: "-.005em" }}
          >
            Diseñamos y desarrollamos experiencias digitales exclusivas para empresas que entienden que la percepción es una ventaja competitiva.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(178,192,204,.28)", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase" }}
          >
            <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(178,192,204,.28), transparent)" }} />
            <span>Continuar</span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
