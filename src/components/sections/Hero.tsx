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
      <h1 className="sr-only">Agencia de Diseño y Desarrollo Web Premium para Empresas que Buscan Liderar su Mercado</h1>

      <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: "calc(100dvh - 4rem)", padding: "80px 5vw" }}>

        {/* ── Isotipo ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.4, ease: EASE }}
          style={{
            position: "relative",
            width: 360,
            height: 360,
            marginBottom: 20,
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

            {/* Contour ring — traveling bright arc traces the logo boundary */}
            <svg viewBox="0 0 380 380" fill="none" aria-hidden style={{
              position: "absolute", inset: -10,
              width: "calc(100% + 20px)", height: "calc(100% + 20px)",
              zIndex: 1, pointerEvents: "none",
            }}>
              <defs>
                <filter id="cGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Faint base ring */}
              <circle cx="190" cy="190" r="183" stroke="rgba(178,192,204,.07)" strokeWidth="0.8"
                transform="rotate(-90 190 190)" />
              {/* Traveling arc — circumference ≈ 1150, arc=45px */}
              <circle cx="190" cy="190" r="183" stroke="rgba(215,232,255,.70)" strokeWidth="1.2"
                strokeDasharray="45 1105" filter="url(#cGlow)"
                transform="rotate(-90 190 190)"
                style={{ animation: "traceContour 6s linear infinite" }} />
            </svg>

            {/* Logo */}
            <Image
              src="/isotipo.png"
              alt="Suitwolf"
              width={360}
              height={360}
              quality={100}
              priority
              style={{
                position: "relative", zIndex: 2,
                width: "100%", height: "100%", objectFit: "contain",
                filter:
                  "drop-shadow(0 0 18px rgba(178,192,204,.14))" +
                  " drop-shadow(0 0 5px rgba(210,225,240,.22))",
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

          {/* Main visible headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: EASE }}
            style={{
              fontSize: "clamp(22px, 2.8vw, 38px)",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              letterSpacing: "-.02em",
              lineHeight: 1.18,
              maxWidth: 580,
              marginBottom: 20,
              color: "var(--color-text)",
            }}
          >
            Las empresas extraordinarias no deberían parecer comunes.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.1 }}
            style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.85, maxWidth: 480, marginBottom: 52, letterSpacing: "-.01em" }}
          >
            Diseñamos y desarrollamos experiencias digitales exclusivas para empresas que entienden que la percepción es una ventaja competitiva.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(178,192,204,.35)", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase" }}
          >
            <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(178,192,204,.35), transparent)" }} />
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
