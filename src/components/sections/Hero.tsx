"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFx } from "@/components/sections/HeroFx";
import { Magnetic } from "@/components/ui/Magnetic";
import { HERO_CONTENT } from "@/content";
import { useMobile } from "@/hooks/useMobile";
import { useLenis } from "@/contexts/LenisContext";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD_TEXT = "linear-gradient(95deg, #B8820A 0%, #D4A020 28%, #F0CC50 50%, #D4A020 72%, #B8820A 100%)";

/* Línea de titular con máscara — entra desde abajo dentro de un overflow oculto */
function MaskLine({
  children,
  delay,
  gold = false,
}: {
  children: string;
  delay: number;
  gold?: boolean;
}) {
  return (
    <span aria-hidden style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.06em" }}>
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        style={{
          display: "block",
          ...(gold
            ? {
                fontStyle: "italic",
                background: GOLD_TEXT,
                backgroundSize: "240% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "goldSweep 14s ease-in-out infinite",
                paddingRight: "0.08em",
              }
            : {}),
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const isMobile = useMobile();
  const lenis = useLenis();
  const [ctaHov, setCtaHov] = useState(false);
  const { scrollY } = useScroll();
  const contentOp = useTransform(scrollY, [0, 420], [1, 0]);
  const contentY  = useTransform(scrollY, [0, 520], [0, -46]);
  const wolfY     = useTransform(scrollY, [0, 600], [0, 60]);

  // Parallax del lobo — sigue el cursor, lerp suave
  const wolfRef = useRef<HTMLDivElement>(null);
  const px = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const p = px.current;

    const onMove = (e: MouseEvent) => {
      p.tx = ((e.clientX / window.innerWidth)  * 2 - 1) * 8;
      p.ty = ((e.clientY / window.innerHeight) * 2 - 1) * 5;
    };

    const tick = () => {
      p.cx += (p.tx - p.cx) * 0.04;
      p.cy += (p.ty - p.cy) * 0.04;
      wolfRef.current?.style.setProperty(
        "transform",
        `translate(${p.cx.toFixed(2)}px,${p.cy.toFixed(2)}px) scale(1.05)`
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

  function scrollToId(id: string) {
    const el = document.querySelector(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100svh - 4rem)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* ── Lobo — mitad derecha, parallax de cursor + drift de scroll ── */}
      <motion.div aria-hidden style={{ y: isMobile ? 0 : wolfY, position: "absolute", inset: 0 }}>
        <div
          ref={wolfRef}
          className="absolute inset-0 sm:left-[38%]"
          style={{ willChange: "transform", transform: "scale(1.05)" }}
        >
          <Image
            src="/suitwolf-hero-v4.png"
            alt=""
            fill
            priority
            quality={100}
            sizes="(max-width: 640px) 100vw, 62vw"
            className="hero-wolf-img"
            style={{ objectFit: "cover", objectPosition: "50% 32%" }}
          />
        </div>
      </motion.div>

      {/* Halo dorado respirando detrás del lobo */}
      <div aria-hidden style={{
        position: "absolute", top: "8%", right: "2%",
        width: "54%", height: "68%",
        background: "radial-gradient(ellipse at 50% 42%, rgba(178,122,18,.13) 0%, rgba(178,122,18,.05) 48%, transparent 70%)",
        animation: "haloBreath 14s ease-in-out infinite",
        pointerEvents: "none", zIndex: 2,
        willChange: "transform, opacity",
      }} />

      {/* Fundido izquierdo — el negro del texto se funde con la imagen */}
      <div aria-hidden className="hidden sm:block" style={{
        position: "absolute", top: 0, bottom: 0,
        left: "24%", width: "34%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,.88) 32%, rgba(8,8,8,.42) 66%, transparent 100%)",
      }} />
      <div aria-hidden className="hidden sm:block" style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: "26%",
        pointerEvents: "none", zIndex: 5,
        background: "rgba(8,8,8,1)",
      }} />

      {/* Fundido derecho */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "22%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to left, rgba(8,8,8,.96) 0%, rgba(8,8,8,.4) 55%, transparent 100%)",
      }} />

      {/* Fundidos superior e inferior */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "14%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to bottom, rgba(8,8,8,.55) 0%, transparent 100%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "34%",
        pointerEvents: "none", zIndex: 5,
        background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,.5) 45%, transparent 100%)",
      }} />

      {/* Mobile: velo general + fundido inferior más pesado */}
      {isMobile && (
        <>
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            pointerEvents: "none", zIndex: 5,
            background: "rgba(8,8,8,.42)",
          }} />
          <div aria-hidden style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "72%",
            pointerEvents: "none", zIndex: 5,
            background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,.92) 30%, rgba(8,8,8,.42) 66%, transparent 100%)",
          }} />
        </>
      )}

      {/* Partículas doradas */}
      <HeroFx />

      {/* ── Contenido editorial — alineado a la izquierda ── */}
      <motion.div
        style={{
          opacity: isMobile ? 1 : contentOp,
          y: isMobile ? 0 : contentY,
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile
            ? "0 clamp(1.4rem, 6vw, 3rem) clamp(2.2rem, 5vh, 3.5rem)"
            : "0 var(--section-px) clamp(2.4rem, 5vh, 4.5rem)",
          maxWidth: "var(--grid-max)",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow — mono con punto pulsante */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(20px, 3vh, 34px)" }}
        >
          <span aria-hidden style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--color-gold)",
            animation: "pulseDot 3.2s ease-in-out infinite",
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(10px, 0.8vw, 12px)",
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "rgba(200,193,180,.62)",
          }}>
            {HERO_CONTENT.eyebrow}
            <span className="hidden sm:inline" style={{ color: "rgba(200,193,180,.3)" }}>
              {"  —  proyectos selectos"}
            </span>
          </span>
        </motion.div>

        {/* Titular — Instrument Serif gigante, máscaras por línea */}
        <h1
          aria-label="¿Tu sitio web refleja el nivel de tu empresa?"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2.9rem, 8.3vw, 8.4rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            color: "rgba(248,245,240,.97)",
            margin: 0,
            marginBottom: "clamp(22px, 3.4vh, 40px)",
            maxWidth: "12em",
          }}
        >
          <MaskLine delay={0.5}>¿Tu sitio web</MaskLine>
          <MaskLine delay={0.62} gold>refleja el nivel</MaskLine>
          <MaskLine delay={0.74}>de tu empresa?</MaskLine>
        </h1>

        {/* Bajada */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          style={{
            fontSize: "clamp(15px, 1.15vw, 18px)",
            lineHeight: 1.6,
            color: "var(--color-text-2)",
            maxWidth: "34em",
            margin: 0,
            marginBottom: "clamp(30px, 4.5vh, 52px)",
          }}
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.12, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 40px)", flexWrap: "wrap" }}
        >
          <Magnetic>
            <Link
              href="/evaluacion"
              data-cursor-hover
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 18,
                padding: "clamp(17px, 1.6vw, 22px) clamp(34px, 3.4vw, 52px)",
                background: ctaHov ? "var(--color-gold-peak)" : "var(--color-gold)",
                color: "#0A0A0A",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .35s",
                boxShadow: ctaHov
                  ? "0 8px 44px rgba(212,160,32,.34)"
                  : "0 6px 32px rgba(212,160,32,.2)",
              }}
            >
              {HERO_CONTENT.cta}
              <span aria-hidden style={{
                position: "relative", display: "inline-flex", alignItems: "center",
                width: ctaHov ? 30 : 20, height: 1,
                background: "currentColor", flexShrink: 0,
                transition: "width .35s",
              }}>
                <span style={{
                  position: "absolute", right: -1, top: -3,
                  width: 6, height: 6,
                  borderRight: "1px solid currentColor",
                  borderTop: "1px solid currentColor",
                  transform: "rotate(45deg)",
                }} />
              </span>
            </Link>
          </Magnetic>

          <a
            href="#servicios"
            data-cursor-hover
            onClick={(e) => { e.preventDefault(); scrollToId("#servicios"); }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "rgba(200,193,180,.55)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(200,193,180,.25)",
              paddingBottom: 6,
              transition: "color .3s, border-color .3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(248,245,240,.9)";
              e.currentTarget.style.borderColor = "rgba(212,160,32,.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(200,193,180,.55)";
              e.currentTarget.style.borderColor = "rgba(200,193,180,.25)";
            }}
          >
            {HERO_CONTENT.ctaSecondary}
          </a>
        </motion.div>

        {/* ── Banda inferior — servicios + indicador de scroll ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          style={{
            marginTop: "clamp(36px, 6vh, 68px)",
            paddingTop: "clamp(18px, 2.4vh, 26px)",
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "clamp(24px, 3.4vw, 56px)" }}>
            {HERO_CONTENT.tags.map((tag, i) => (
              <span key={tag} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "rgba(212,160,32,.6)",
                }}>
                  0{i + 1}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "rgba(200,193,180,.45)",
                  whiteSpace: "nowrap",
                }}>
                  {tag}
                </span>
              </span>
            ))}
          </div>

          {/* Indicador de scroll */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginLeft: "auto" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "rgba(200,193,180,.4)",
            }}>
              Scroll
            </span>
            <span aria-hidden style={{ width: 1, height: 34, background: "rgba(255,255,255,.1)", position: "relative", overflow: "hidden", display: "block" }}>
              <span style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, var(--color-gold), rgba(212,160,32,.2))",
                animation: "scrollHint 2.6s cubic-bezier(0.77,0,0.18,1) infinite",
                display: "block",
              }} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
