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

      {/* Mobile: gentle full-frame veil + heavier bottom fade so the wolf
          recedes behind the title instead of clashing with it */}
      {isMobile && (
        <>
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            pointerEvents: "none", zIndex: 5,
            background: "rgba(8,8,8,.34)",
          }} />
          <div aria-hidden style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "70%",
            pointerEvents: "none", zIndex: 5,
            background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,.9) 32%, rgba(8,8,8,.4) 66%, transparent 100%)",
          }} />
        </>
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
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: isMobile ? "100%" : "clamp(360px, 56vw, 880px)",
          paddingBottom: "clamp(20px, 3vh, 48px)",
          paddingLeft:  isMobile ? "clamp(1.5rem, 8vw, 9rem)" : "clamp(2rem, 10vw, 12rem)",
          paddingRight: isMobile ? "clamp(1.5rem, 8vw, 9rem)" : "1.5rem",
        }}
      >

        {/* ── Editorial headline — fixed-proportion artboard ──
            Every word is absolutely positioned inside a container whose width
            drives both the font sizes (cqw units) and the % offsets, so the
            EXACT layout from the Figma comp is preserved identically on desktop
            and mobile — it just scales as a single unit. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          aria-label="¿Tu sitio web refleja el nivel de tu empresa?"
          style={{
            position: "relative",
            containerType: "inline-size",
            width: "100%",
            aspectRatio: "100 / 68",
            marginBottom: "clamp(16px, 2.2vw, 34px)",
          }}
        >
          {/* "¿TU SITIO WEB REFLEJA" */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44, ease: EASE }}
            style={{
              position: "absolute", left: "0%", top: "13%",
              fontFamily: "var(--ws-jockey)",
              fontSize: "6.8cqw",
              letterSpacing: ".04em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(240,235,225,.9)",
              textTransform: "uppercase",
            }}
          >
            ¿Tu sitio web refleja
          </motion.span>

          {/* "EL" — sits under "SITIO" */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease: EASE }}
            style={{
              position: "absolute", left: "18%", top: "28%",
              fontFamily: "var(--ws-hubballi)",
              fontSize: "7.6cqw",
              letterSpacing: ".03em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(240,235,225,.9)",
              textTransform: "uppercase",
            }}
          >
            El
          </motion.span>

          {/* "NIVEL" — aligned with the "i" of SITIO */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.60, ease: EASE }}
            style={{
              position: "absolute", left: "30%", top: "31%",
              fontFamily: "var(--ws-iceland)",
              fontSize: "18cqw",
              letterSpacing: ".01em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              background: GOLD,
              backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 13s ease-in-out infinite",
              filter: "drop-shadow(0 2px 20px rgba(212,160,32,.4))",
            }}
          >
            Nivel
          </motion.span>

          {/* Hand-drawn swoosh under NIVEL */}
          <motion.svg
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
            viewBox="0 0 380 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            style={{
              position: "absolute", left: "31%", top: "54%",
              width: "50cqw", height: "auto",
              transformOrigin: "left center",
            }}
          >
            <path
              d="M 4 22 Q 40 6, 82 19 Q 124 32, 168 15 Q 212 -1, 258 16 Q 294 28, 334 13 Q 356 6, 376 18"
              stroke="#D4A020"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </motion.svg>

          {/* "DE TU" */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.80, ease: EASE }}
            style={{
              position: "absolute", left: "36%", top: "60%",
              fontFamily: "var(--ws-hubballi)",
              fontSize: "8cqw",
              letterSpacing: ".03em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(240,235,225,.9)",
              textTransform: "uppercase",
            }}
          >
            De tu
          </motion.span>

          {/* "EMPRESA?" — tilted */}
          <motion.span
            initial={{ opacity: 0, y: 10, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.88, ease: EASE }}
            style={{
              position: "absolute", left: "18%", top: "75%",
              fontFamily: "var(--ws-kanit)",
              fontSize: "13.5cqw",
              fontWeight: 800,
              letterSpacing: "-.01em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "#f5f3ef",
              textTransform: "uppercase",
              transformOrigin: "left bottom",
              textShadow: "0 2px 24px rgba(0,0,0,.55)",
            }}
          >
            Empresa?
          </motion.span>
        </motion.div>

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
          style={{ flexDirection: "column", alignItems: "center", gap: 10 }}
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
