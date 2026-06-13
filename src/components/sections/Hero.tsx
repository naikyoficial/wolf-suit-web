"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Marquee }      from "@/components/ui/Marquee";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

/* Gold sparks — positioned relative to logo center (logo radius ~230px) */
const SPARKS = [
  { x:  270, y:  72,  delay: 0,   dur: 3.6, size: 2.5 },
  { x:   59, y:  279, delay: 1.3, dur: 4.1, size: 2   },
  { x: -212, y:  191, delay: 2.6, dur: 3.3, size: 3   },
  { x: -253, y:  -92, delay: 0.7, dur: 4.4, size: 2   },
  { x:  -38, y: -267, delay: 3.2, dur: 3.8, size: 2.5 },
  { x:  244, y: -114, delay: 1.9, dur: 3.5, size: 2   },
];

export function Hero() {
  const isoRef = useRef<HTMLDivElement>(null);

  /* Mouse parallax tilt */
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

  /* Scroll-driven exit parallax */
  const { scrollY } = useScroll();
  const logoScale   = useTransform(scrollY, [0, 600], [1, 0.8]);
  const logoOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentY    = useTransform(scrollY, [0, 500], [0, -70]);
  const contentOp   = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <h1 className="sr-only">Suitwolf — Diseño Web Premium, Branding y Estrategia Digital sin Templates</h1>

      {/* ── Main centered content ── */}
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
          {/* Outer ambient glow — breathes slowly */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -100,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(178,192,204,.3) 0%, rgba(178,192,204,.1) 38%, rgba(178,192,204,.03) 60%, transparent 72%)",
              animation: "breathe 5s ease-in-out infinite",
            }}
          />

          {/* Inner tight glow — offset phase */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -36,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(178,192,204,.18) 0%, rgba(178,192,204,.06) 45%, transparent 68%)",
              animation: "breathe 4s ease-in-out infinite 1.2s",
            }}
          />

          {/* Rotating gold arc — sweeps around the logo */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              background: "conic-gradient(from 0deg, transparent 0deg, rgba(178,192,204,.05) 20deg, rgba(178,192,204,.14) 42deg, rgba(178,192,204,.05) 64deg, transparent 80deg, transparent 360deg)",
              animation: "spin 18s linear infinite",
              mixBlendMode: "screen",
            }}
          />

          {/* Parallax tilt — contains SVG rings, logo, sparks */}
          <div ref={isoRef} style={{ position: "relative", width: "100%", height: "100%", willChange: "transform" }}>

            {/* Orbital rings */}
            <svg
              viewBox="0 0 472 472"
              fill="none"
              aria-hidden
              style={{
                position: "absolute",
                inset: -56,
                width: "calc(100% + 112px)",
                height: "calc(100% + 112px)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#D0D8E4" />
                  <stop offset="50%"  stopColor="#B2C0CC" />
                  <stop offset="100%" stopColor="#8a6828" />
                </linearGradient>
              </defs>
              <g style={{ animation: "spin 28s linear infinite", transformOrigin: "236px 236px" }}>
                <circle cx="236" cy="236" r="228" stroke="url(#rg)" strokeWidth="1" opacity=".35" />
                <polygon points="236,6 240,17 236,28 232,17" fill="#B2C0CC" opacity=".9" />
                <line x1="236" y1="446" x2="236" y2="466" stroke="#B2C0CC" strokeWidth="1" opacity=".5" />
                <line x1="8"   y1="236" x2="24"  y2="236" stroke="#B2C0CC" strokeWidth="1" opacity=".4" />
                <line x1="448" y1="236" x2="464" y2="236" stroke="#B2C0CC" strokeWidth="1" opacity=".4" />
              </g>
              <g style={{ animation: "spin 42s linear infinite reverse", transformOrigin: "236px 236px" }}>
                <circle cx="236" cy="236" r="206" stroke="url(#rg)" strokeWidth=".7" strokeDasharray="4 18" opacity=".22" />
              </g>
            </svg>

            {/* Logo image — 3-layer drop shadow for depth */}
            <Image
              src="/isotipo.png"
              alt="Suitwolf"
              width={460}
              height={460}
              quality={100}
              priority
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 80px rgba(178,192,204,.42))" +
                  " drop-shadow(0 0 28px rgba(178,192,204,.65))" +
                  " drop-shadow(0 0 6px rgba(178,192,204,.9))",
              }}
            />

            {/* Gold spark particles */}
            {SPARKS.map((s, i) => (
              <div
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  top: `calc(50% + ${s.y}px)`,
                  left: `calc(50% + ${s.x}px)`,
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: s.size,
                    height: s.size,
                    marginLeft: -s.size / 2,
                    marginTop: -s.size / 2,
                    borderRadius: "50%",
                    background: "rgba(226,192,112,.95)",
                    boxShadow: `0 0 ${s.size * 3}px rgba(178,192,204,.8)`,
                    animation: `twinkle ${s.dur}s ease-in-out infinite ${s.delay}s`,
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text block exits on scroll */}
        <motion.div style={{ y: contentY, opacity: contentOp, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Wordmark — scramble reveal */}
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
                background: "linear-gradient(135deg, #D0D8E4 0%, #B2C0CC 45%, #5A6A7C 75%, #B2C0CC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            />
          </motion.div>

          {/* Diamond */}
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

      {/* ── Marquee strip ── */}
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
