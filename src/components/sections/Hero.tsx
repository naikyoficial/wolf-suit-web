"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFx } from "@/components/sections/HeroFx";
import { useMobile } from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #9A6E12 22%, #D4A020 44%, #F0C840 52%, #D4A020 60%, #9A6E12 78%, #5A3C0A 100%)";

const GOLD_NIVEL = "linear-gradient(95deg, #B8820A 0%, #D4A020 28%, #F0CC50 50%, #D4A020 72%, #B8820A 100%)";

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
          maxWidth: isMobile ? "100%" : "clamp(380px, 64vw, 1020px)",
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
            aspectRatio: "100 / 61",
            marginBottom: "clamp(16px, 2.2vw, 34px)",
          }}
        >
          {/* "¿TU SITIO WEB REFLEJA" — top line */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44, ease: EASE }}
            style={{
              position: "absolute", left: "8%", top: "11%",
              fontFamily: "var(--ws-cormorant)",
              fontWeight: 700,
              fontSize: "7cqw",
              letterSpacing: ".06em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.96)",
              textTransform: "uppercase",
            }}
          >
            ¿Tu sitio web refleja
          </motion.span>

          {/* "EL" — left of NIVEL */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease: EASE }}
            style={{
              position: "absolute", left: "8%", top: "36%",
              fontFamily: "var(--ws-inter)",
              fontWeight: 500,
              fontSize: "7cqw",
              letterSpacing: ".08em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.75)",
              textTransform: "uppercase",
            }}
          >
            El
          </motion.span>

          {/* "NIVEL" — large centre word */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.60, ease: EASE }}
            style={{
              position: "absolute", left: "21.4%", top: "23%",
              fontFamily: "var(--ws-cormorant)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "17cqw",
              letterSpacing: ".01em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              background: GOLD_NIVEL,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 13s ease-in-out infinite",
              filter: "drop-shadow(0 2px 22px rgba(230,150,55,.5))",
            }}
          >
            Nivel
          </motion.span>

          {/* "DE TU" — right of NIVEL, same line */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
            style={{
              position: "absolute", left: "71%", top: "36%",
              fontFamily: "var(--ws-inter)",
              fontWeight: 500,
              fontSize: "7cqw",
              letterSpacing: ".08em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.75)",
              textTransform: "uppercase",
            }}
          >
            De tu
          </motion.span>

          {/* Hand-drawn brush swoosh under NIVEL — the real PNG stroke
              recoloured to the NIVEL gold: the PNG alpha is used as a mask and
              filled with the GOLD_NIVEL gradient (+ shimmer), so the exact
              brush shape & texture are kept while the colour matches NIVEL. */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.76, ease: EASE }}
            aria-hidden
            style={{
              position: "absolute", left: "21.4%", top: "46%",
              width: "45.5cqw",
              aspectRatio: "1371 / 150",
              transformOrigin: "left center",
              background: GOLD_NIVEL,
              backgroundSize: "200% 100%",
              WebkitMaskImage: "url(/swoosh.png)",
              maskImage: "url(/swoosh.png)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              animation: "metalShimmer 13s ease-in-out infinite",
              filter: "drop-shadow(0 1px 10px rgba(230,150,55,.32))",
            }}
          />

          {/* "EMPRESA?" — bottom line, straight */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.84, ease: EASE }}
            style={{
              position: "absolute", left: "8%", top: "56%",
              fontFamily: "var(--ws-cormorant)",
              fontWeight: 700,
              fontSize: "16cqw",
              letterSpacing: ".04em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.96)",
              textTransform: "uppercase",
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
          style={{ width: "100%", justifyContent: "center", alignItems: "center", gap: 14, marginBottom: "clamp(18px, 2.6vw, 32px)" }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{
                fontSize: "clamp(10px, 0.82vw, 13px)",
                letterSpacing: ".34em",
                textTransform: "uppercase",
                color: "rgba(185,180,170,.58)",
                whiteSpace: "nowrap",
              }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{
                  width: 3, height: 3, borderRadius: "50%",
                  background: "rgba(185,180,170,.32)",
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
          style={{ width: "100%", textAlign: "center", marginBottom: "clamp(30px, 4.2vw, 56px)" }}
        >
          <span style={{
            fontSize: "clamp(10px, 0.82vw, 13px)", letterSpacing: ".26em", textTransform: "uppercase",
            color: "rgba(195,188,174,.55)",
          }}>
            Agencia digital de{" "}
          </span>
          <span style={{
            fontSize: "clamp(10px, 0.82vw, 13px)", letterSpacing: ".26em", textTransform: "uppercase",
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
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(212,160,32,.45), transparent)" }} />
          <span style={{
            fontSize: "clamp(9px, 0.66vw, 11px)",
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
