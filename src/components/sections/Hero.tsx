"use client";

import { useRef, useEffect } from "react";
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

  // Wolf parallax — tracks cursor, max ±7px x / ±4px y, lerp at 4% per frame
  const wolfRef = useRef<HTMLDivElement>(null);
  const px = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const p = px.current;

    const onMove = (e: MouseEvent) => {
      p.tx = ((e.clientX / window.innerWidth)  * 2 - 1) * 7;
      p.ty = ((e.clientY / window.innerHeight) * 2 - 1) * 4;
    };

    const tick = () => {
      p.cx += (p.tx - p.cx) * 0.04;
      p.cy += (p.ty - p.cy) * 0.04;
      wolfRef.current?.style.setProperty(
        "transform",
        `translate(${p.cx.toFixed(2)}px,${p.cy.toFixed(2)}px) scale(1.04)`
      );
      p.raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    p.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(p.raf);
    };
  }, []);

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

      {/* Wolf image — desktop: right 68% only. Mobile: full width via globals.css.
          willChange promotes to its own GPU layer for parallax compositing. */}
      <div
        ref={wolfRef}
        aria-hidden
        className="hero-image-wrap absolute inset-0 sm:left-[32%]"
        style={{ willChange: "transform", transform: "scale(1.04)" }}
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

      {/* Halo breathing — radial glow that mirrors the wolf's golden backlight.
          Scale 1→1.03 over 14 s; opacity 0.75→1. Imperceptible in isolation. */}
      <div aria-hidden style={{
        position: "absolute", top: "10%", right: "5%",
        width: "50%", height: "62%",
        background: "radial-gradient(ellipse at 48% 40%, rgba(178,122,18,.11) 0%, rgba(178,122,18,.04) 48%, transparent 70%)",
        animation: "haloBreath 14s ease-in-out infinite",
        pointerEvents: "none", zIndex: 2,
        willChange: "transform, opacity",
      }} />

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

      {/* Mobile: gentle full-frame veil + heavier bottom fade */}
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

      {/* Gold particles — sparse, slow, atmospheric only */}
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
          transition={{ duration: 0.7, delay: 0.3 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44, ease: EASE }}
            style={{
              position: "absolute", left: "8%", top: "11%",
              fontFamily: "var(--ws-cormorant)",
              fontWeight: 700,
              fontSize: "7cqw",
              letterSpacing: ".07em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.93)",
              textTransform: "uppercase",
            }}
          >
            ¿Tu sitio web refleja
          </motion.span>

          {/* "EL" — left of NIVEL */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.56, ease: EASE }}
            style={{
              position: "absolute", left: "8%", top: "36%",
              fontFamily: "var(--ws-inter)",
              fontWeight: 400,
              fontSize: "7cqw",
              letterSpacing: ".1em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.6)",
              textTransform: "uppercase",
            }}
          >
            El
          </motion.span>

          {/* "NIVEL" — single unidirectional light sweep (goldSweep).
              Feels like a shaft of light crossing polished metal once every 14 s. */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.64, ease: EASE }}
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
              backgroundSize: "240% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "goldSweep 14s ease-in-out infinite",
              filter: "drop-shadow(0 1px 6px rgba(200,140,20,.18))",
            }}
          >
            Nivel
          </motion.span>

          {/* "DE TU" — right of NIVEL, same line */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
            style={{
              position: "absolute", left: "71%", top: "36%",
              fontFamily: "var(--ws-inter)",
              fontWeight: 400,
              fontSize: "7cqw",
              letterSpacing: ".1em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.6)",
              textTransform: "uppercase",
            }}
          >
            De tu
          </motion.span>

          {/* Swoosh — same goldSweep, phase-offset so it doesn't sync with NIVEL */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.80, ease: EASE }}
            aria-hidden
            style={{
              position: "absolute", left: "21.4%", top: "46%",
              width: "45.5cqw",
              aspectRatio: "1371 / 150",
              transformOrigin: "left center",
              background: GOLD_NIVEL,
              backgroundSize: "240% 100%",
              WebkitMaskImage: "url(/swoosh.png)",
              maskImage: "url(/swoosh.png)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              animation: "goldSweep 14s ease-in-out infinite",
              animationDelay: "-4s",
              filter: "drop-shadow(0 1px 5px rgba(200,140,20,.14))",
            }}
          />

          {/* "EMPRESA?" — bottom line */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: EASE }}
            style={{
              position: "absolute", left: "8%", top: "56%",
              fontFamily: "var(--ws-cormorant)",
              fontWeight: 700,
              fontSize: "16cqw",
              letterSpacing: ".05em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "rgba(248,245,240,.96)",
              textTransform: "uppercase",
              textShadow: "0 2px 20px rgba(0,0,0,.45)",
            }}
          >
            Empresa?
          </motion.span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0, ease: EASE }}
          className="hidden sm:flex"
          style={{ width: "100%", justifyContent: "center", alignItems: "center", gap: 14, marginBottom: "clamp(18px, 2.6vw, 32px)" }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{
                fontSize: "clamp(10px, 0.82vw, 13px)",
                letterSpacing: ".38em",
                textTransform: "uppercase",
                color: "rgba(185,180,170,.48)",
                whiteSpace: "nowrap",
              }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{
                  width: 2, height: 2, borderRadius: "50%",
                  background: "rgba(185,180,170,.24)",
                  display: "inline-block", flexShrink: 0,
                }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* Sub */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.2, ease: EASE }}
          style={{ width: "100%", textAlign: "center", marginBottom: "clamp(30px, 4.2vw, 56px)" }}
        >
          <span style={{
            fontSize: "clamp(10px, 0.82vw, 13px)", letterSpacing: ".28em", textTransform: "uppercase",
            color: "rgba(195,188,174,.45)",
          }}>
            Agencia digital de{" "}
          </span>
          <span style={{
            fontSize: "clamp(10px, 0.82vw, 13px)", letterSpacing: ".28em", textTransform: "uppercase",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 15s ease-in-out infinite",
            animationDelay: "-6s",
          }}>
            alto nivel
          </span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.5 }}
          className="hidden sm:flex"
          style={{ flexDirection: "column", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(212,160,32,.35), transparent)" }} />
          <span style={{
            fontSize: "clamp(9px, 0.66vw, 11px)",
            letterSpacing: ".55em",
            textTransform: "uppercase",
            background: GOLD,
            backgroundSize: "260% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "metalShimmer 13s ease-in-out infinite",
          }}>
            Continuar
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 16, background: "linear-gradient(to bottom, rgba(212,160,32,.25), transparent)" }}
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
