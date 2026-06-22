"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFx } from "@/components/sections/HeroFx";
import { useMobile } from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";

const TAGS = ["Diseño y Desarrollo Web", "E-commerce", "Software a Medida"];

export function Hero() {
  const isMobile = useMobile();
  const { scrollY } = useScroll();
  const contentOp = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY  = useTransform(scrollY, [0, 500], [0, -52]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100svh - 4rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      <h1 className="sr-only">Agencia de Diseño y Desarrollo Web Premium — Suitwolf</h1>

      {/* Wolf image — desktop: right 68% only so the wolf sits in the blue zone.
          Mobile: full width, wolf centered via globals.css override. */}
      <div
        aria-hidden
        className="hero-image-wrap absolute inset-0 sm:left-[32%]"
      >
        <Image
          src="/suitwolf-hero-v4.png"
          alt=""
          fill
          priority
          quality={100}
          sizes="(max-width: 640px) 100vw, 68vw"
          className="hero-wolf-img"
          style={{ objectFit: "cover", objectPosition: "50% 38%" }}
        />
      </div>

      {/* Desktop: gradient bridge — blends black left area into the wolf image */}
      <div aria-hidden className="hidden sm:block" style={{
        position: "absolute", top: 0, bottom: 0,
        left: "18%", width: "34%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,.9) 35%, rgba(8,8,8,.45) 68%, transparent 100%)",
      }} />

      {/* Right edge fade */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "26%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to left, rgba(8,8,8,1) 0%, rgba(8,8,8,.5) 55%, transparent 100%)",
      }} />

      {/* Top fade — navbar blend */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "16%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to bottom, rgba(8,8,8,.6) 0%, transparent 100%)",
      }} />

      {/* Bottom fade */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "36%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to top, rgba(8,8,8,.98) 0%, rgba(8,8,8,.45) 40%, transparent 100%)",
      }} />

      {/* Mobile: heavier bottom fade so title doesn't clash with centered wolf */}
      {isMobile && (
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "58%",
          pointerEvents: "none", zIndex: 5,
          background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,.82) 30%, rgba(8,8,8,.25) 62%, transparent 100%)",
        }} />
      )}

      {/* Gold particles — right side only */}
      <HeroFx />

      {/* Content */}
      <motion.div
        style={{
          opacity: isMobile ? 1 : contentOp,
          y: isMobile ? 0 : contentY,
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
          width: "100%",
          maxWidth: isMobile ? "100%" : "clamp(340px, 44vw, 680px)",
          paddingBottom: "clamp(20px, 3vh, 48px)",
          paddingLeft:  "clamp(1.5rem, 8vw, 9rem)",
          paddingRight: isMobile ? "clamp(1.5rem, 8vw, 9rem)" : "1.5rem",
        }}
      >

        {/* Headline — all three lines unified in size/weight; only "nivel" in gold */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.8vw, 72px)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            lineHeight: 1.1,
            color: "rgba(235,230,220,.72)",
            margin: 0,
            textTransform: "uppercase",
            textShadow: "0 2px 24px rgba(0,0,0,.8)",
          }}
        >
          ¿Tu sitio web refleja
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.64, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.8vw, 72px)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            lineHeight: 1.1,
            color: "rgba(235,230,220,.72)",
            margin: "0.06em 0",
            textTransform: "uppercase",
            textShadow: "0 2px 24px rgba(0,0,0,.8)",
          }}
        >
          el{" "}
          <span style={{
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 13s ease-in-out infinite",
            animationDelay: "-5s",
            filter: "drop-shadow(0 1px 14px rgba(212,160,32,.32))",
          }}>
            nivel
          </span>
          {" "}de empresa
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.78, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.8vw, 72px)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            lineHeight: 1.1,
            color: "rgba(235,230,220,.72)",
            margin: 0,
            marginBottom: "clamp(28px, 4vw, 52px)",
            textTransform: "uppercase",
            textShadow: "0 2px 24px rgba(0,0,0,.8)",
          }}
        >
          que tenes en mente?
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          className="hidden sm:flex"
          style={{ alignItems: "center", gap: 10, marginBottom: "clamp(16px, 2.4vw, 28px)" }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontSize: 9,
                letterSpacing: ".42em",
                textTransform: "uppercase",
                color: "rgba(180,175,165,.52)",
              }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{
                  width: 2, height: 2, borderRadius: "50%",
                  background: "rgba(180,175,165,.28)",
                  display: "inline-block", flexShrink: 0,
                }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* Sub */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          style={{ marginBottom: "clamp(28px, 4vw, 52px)" }}
        >
          <span style={{
            fontSize: 9, letterSpacing: ".28em", textTransform: "uppercase",
            color: "rgba(190,182,168,.48)",
          }}>
            Agencia digital de{" "}
          </span>
          <span style={{
            fontSize: 9, letterSpacing: ".28em", textTransform: "uppercase",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 13s ease-in-out infinite",
            animationDelay: "-5s",
          }}>
            alto nivel
          </span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="hidden sm:flex"
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }}
        >
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(212,160,32,.45), transparent)" }} />
          <span style={{
            fontSize: 8,
            letterSpacing: ".55em",
            textTransform: "uppercase",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 11s ease-in-out infinite",
          }}>
            Continuar
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 16, background: "linear-gradient(to bottom, rgba(212,160,32,.3), transparent)" }}
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
