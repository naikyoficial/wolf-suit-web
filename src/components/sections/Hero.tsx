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
          {/* Subtle ambient glow */}
          <div aria-hidden style={{
            position: "absolute", inset: -80, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(178,192,204,.09) 0%, rgba(178,192,204,.03) 55%, transparent 75%)",
            animation: "breathe 7s ease-in-out infinite",
          }} />

          {/* Parallax tilt container */}
          <div ref={isoRef} style={{ position: "relative", width: "100%", height: "100%", willChange: "transform" }}>

            {/* Logo + contour shimmer */}
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src="/isotipo.png"
                alt="Suitwolf"
                width={460}
                height={460}
                quality={100}
                priority
                style={{
                  width: "100%", height: "100%", objectFit: "contain",
                  filter:
                    "drop-shadow(0 0 20px rgba(178,192,204,.16))" +
                    " drop-shadow(0 0 6px rgba(210,225,240,.26))",
                }}
              />
              {/* Sweeping chrome reflection — bright arc travels around logo contour */}
              <div aria-hidden style={{
                position: "absolute", inset: 0,
                background: "conic-gradient(from 0deg, transparent 0deg, transparent 338deg, rgba(180,215,255,.18) 347deg, rgba(255,255,255,.52) 353deg, rgba(180,215,255,.18) 359deg, transparent 360deg)",
                animation: "spin 5s linear infinite",
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }} />
            </div>

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
