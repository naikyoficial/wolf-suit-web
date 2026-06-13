"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Marquee }      from "@/components/ui/Marquee";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Hero() {
  const isoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!isoRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * -12;
      isoRef.current.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const { scrollY } = useScroll();
  const logoScale   = useTransform(scrollY, [0, 600], [1, 0.8]);
  const logoOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentY    = useTransform(scrollY, [0, 500], [0, -70]);
  const contentOp   = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <h1 className="sr-only">Suitwolf — Diseño Web Premium, Branding y Estrategia Digital sin Templates</h1>

      <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: "calc(100dvh - 4rem)", padding: "80px 5vw" }}>

        {/* ── Isotipo ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.4, ease: EASE }}
          style={{
            position: "relative",
            width: 460,
            height: 460,
            marginBottom: 44,
            scale: logoScale,
            opacity: logoOpacity,
            flexShrink: 0,
          }}
        >
          {/* Outer ambient glow */}
          <div aria-hidden style={{
            position: "absolute", inset: -100, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(178,192,204,.48) 0%, rgba(178,192,204,.18) 38%, rgba(178,192,204,.05) 60%, transparent 72%)",
            animation: "breathe 5s ease-in-out infinite",
          }} />

          {/* Inner tight glow */}
          <div aria-hidden style={{
            position: "absolute", inset: -36, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,218,235,.28) 0%, rgba(178,192,204,.10) 45%, transparent 68%)",
            animation: "breathe 4s ease-in-out infinite 1.2s",
          }} />

          {/* Rotating chrome arc */}
          <div aria-hidden style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(200,218,240,.08) 20deg, rgba(220,235,255,.26) 42deg, rgba(200,218,240,.08) 64deg, transparent 80deg, transparent 360deg)",
            animation: "spin 18s linear infinite",
            mixBlendMode: "screen",
          }} />

          {/* Parallax tilt container */}
          <div ref={isoRef} style={{ position: "relative", width: "100%", height: "100%", willChange: "transform" }}>

            {/* ── Chrome orbital rings (no marker) ── */}
            <svg viewBox="0 0 472 472" fill="none" aria-hidden style={{
              position: "absolute", inset: -56,
              width: "calc(100% + 112px)", height: "calc(100% + 112px)",
              zIndex: 1, pointerEvents: "none",
            }}>
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#F2F5F8" />
                  <stop offset="22%"  stopColor="#C0CEDC" />
                  <stop offset="50%"  stopColor="#1E2E3C" />
                  <stop offset="78%"  stopColor="#8A9EAE" />
                  <stop offset="100%" stopColor="#EEF2F5" />
                </linearGradient>
              </defs>
              {/* Outer ring — no marker, clean circle */}
              <g style={{ animation: "spin 28s linear infinite", transformOrigin: "236px 236px" }}>
                <circle cx="236" cy="236" r="228" stroke="url(#rg)" strokeWidth="1.2" opacity=".45" />
              </g>
              {/* Inner dashed ring — counter-rotate */}
              <g style={{ animation: "spin 42s linear infinite reverse", transformOrigin: "236px 236px" }}>
                <circle cx="236" cy="236" r="206" stroke="url(#rg)" strokeWidth=".8" strokeDasharray="4 18" opacity=".28" />
              </g>
            </svg>

            {/* Logo */}
            <Image
              src="/isotipo.png"
              alt="Suitwolf"
              width={460}
              height={460}
              quality={100}
              priority
              style={{
                position: "relative", zIndex: 2,
                width: "100%", height: "100%", objectFit: "contain",
                filter:
                  "drop-shadow(0 0 70px rgba(178,192,204,.55))" +
                  " drop-shadow(0 0 24px rgba(210,225,240,.82))" +
                  " drop-shadow(0 0 8px rgba(235,245,255,.96))",
              }}
            />

          </div>
        </motion.div>

        {/* Text block */}
        <motion.div style={{ y: contentY, opacity: contentOp, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* ── Wordmark — continuous chrome shimmer ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.1, ease: EASE }}
          >
            <ScrambleText
              text="SUITWOLF"
              delay={1.1}
              duration={1200}
              className="font-display font-semibold"
              style={{
                fontSize: "clamp(36px, 5.5vw, 68px)",
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

          {/* Diamond separator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            style={{ width: 5, height: 5, background: "var(--color-silver)", transform: "rotate(45deg)", margin: "14px auto" }}
          />

          {/* Tag */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            style={{ fontSize: 11, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--color-text-3)", marginBottom: 56 }}
          >
            Identidad · Percepción · Excelencia
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.3 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(178,192,204,.45)", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase" }}
          >
            <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(178,192,204,.45), transparent)" }} />
            <span>Continuar</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
