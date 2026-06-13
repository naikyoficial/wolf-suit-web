"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrambleText }   from "@/components/ui/ScrambleText";
import { Marquee }        from "@/components/ui/Marquee";
import { ParticleField }  from "@/components/ui/ParticleField";

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
      <ParticleField />
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

          {/* Parallax tilt container */}
          <div ref={isoRef} style={{ position: "relative", width: "100%", height: "100%", willChange: "transform" }}>

            {/* ── Crystal fragment constellation ── */}
            <svg viewBox="0 0 620 620" fill="none" aria-hidden style={{
              position: "absolute",
              inset: -80,
              width: "calc(100% + 160px)",
              height: "calc(100% + 160px)",
              zIndex: 1,
              pointerEvents: "none",
            }}>
              <defs>
                <linearGradient id="cfA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#EEF4FA" stopOpacity="0.85" />
                  <stop offset="50%"  stopColor="#8AACBC" stopOpacity="0.60" />
                  <stop offset="100%" stopColor="#C0D8EC" stopOpacity="0.80" />
                </linearGradient>
                <linearGradient id="cfB" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#C8DCF0" stopOpacity="0.80" />
                  <stop offset="100%" stopColor="#EEF4FA" stopOpacity="0.90" />
                </linearGradient>
              </defs>
              {/* Octagonal wireframe connecting fragment centers */}
              <polygon points="448,172 510,310 448,448 310,510 172,448 110,310 172,172 310,110"
                fill="none" stroke="rgba(178,200,220,.07)" strokeWidth="0.7" />
              {/* Fragment 1 — top-right, triangle, 22s CW */}
              <g style={{ animation: "spin 22s linear infinite", transformOrigin: "448px 172px" }}>
                <polygon points="448,154 468,184 426,184" fill="rgba(178,200,220,.09)" stroke="url(#cfA)" strokeWidth="0.9" />
                <line x1="448" y1="154" x2="448" y2="184" stroke="rgba(220,235,250,.20)" strokeWidth="0.5" />
              </g>
              {/* Fragment 2 — right, diamond, 35s CCW */}
              <g style={{ animation: "spin 35s linear infinite reverse", transformOrigin: "510px 310px" }}>
                <polygon points="510,292 528,310 510,328 492,310" fill="rgba(178,200,220,.10)" stroke="url(#cfB)" strokeWidth="0.9" />
              </g>
              {/* Fragment 3 — bottom-right, triangle, 19s CW */}
              <g style={{ animation: "spin 19s linear infinite", transformOrigin: "448px 448px" }}>
                <polygon points="428,436 466,436 448,466" fill="rgba(178,200,220,.08)" stroke="url(#cfA)" strokeWidth="0.85" />
                <line x1="448" y1="466" x2="448" y2="436" stroke="rgba(220,235,250,.18)" strokeWidth="0.5" />
              </g>
              {/* Fragment 4 — bottom, diamond, 28s CCW */}
              <g style={{ animation: "spin 28s linear infinite reverse", transformOrigin: "310px 510px" }}>
                <polygon points="310,492 328,510 310,528 292,510" fill="rgba(178,200,220,.10)" stroke="url(#cfB)" strokeWidth="0.9" />
              </g>
              {/* Fragment 5 — bottom-left, triangle, 25s CW */}
              <g style={{ animation: "spin 25s linear infinite", transformOrigin: "172px 448px" }}>
                <polygon points="172,430 192,462 150,462" fill="rgba(178,200,220,.08)" stroke="url(#cfA)" strokeWidth="0.85" />
                <line x1="172" y1="430" x2="172" y2="462" stroke="rgba(220,235,250,.18)" strokeWidth="0.5" />
              </g>
              {/* Fragment 6 — left, thin diamond, 40s CCW */}
              <g style={{ animation: "spin 40s linear infinite reverse", transformOrigin: "110px 310px" }}>
                <polygon points="110,292 128,310 110,328 92,310" fill="rgba(178,200,220,.10)" stroke="url(#cfB)" strokeWidth="0.9" />
              </g>
              {/* Fragment 7 — top-left, triangle, 30s CW */}
              <g style={{ animation: "spin 30s linear infinite", transformOrigin: "172px 172px" }}>
                <polygon points="150,158 192,158 172,190" fill="rgba(178,200,220,.08)" stroke="url(#cfA)" strokeWidth="0.85" />
                <line x1="172" y1="190" x2="172" y2="158" stroke="rgba(220,235,250,.18)" strokeWidth="0.5" />
              </g>
              {/* Fragment 8 — top, small triangle, 16s CCW */}
              <g style={{ animation: "spin 16s linear infinite reverse", transformOrigin: "310px 110px" }}>
                <polygon points="310,92 330,122 290,122" fill="rgba(178,200,220,.09)" stroke="url(#cfB)" strokeWidth="0.9" />
                <line x1="310" y1="92" x2="310" y2="122" stroke="rgba(220,235,250,.20)" strokeWidth="0.5" />
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
