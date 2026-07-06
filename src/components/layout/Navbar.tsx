"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/config/site";
import { useLenis } from "@/contexts/LenisContext";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [ctaHov, setCtaHov] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();

  // Ocultar el navbar al scrollear hacia abajo, mostrarlo al subir o en el tope
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);            // siempre visible cerca del tope
      } else if (y > lastY + 6) {
        setHidden(true);             // bajando → ocultar
      } else if (y < lastY - 6) {
        setHidden(false);            // subiendo → mostrar
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú mobile abierto el navbar nunca se oculta
  const isHidden = hidden && !menuOpen;

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  // En páginas internas los anchors del home deben volver al home
  const anchorHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  // La evaluación es un funnel enfocado con su propia navegación (Volver /
  // Volver al inicio). El navbar global se oculta para no colisionar ni distraer.
  if (pathname === "/evaluacion") return null;

  return (
    <>
      <header
        className="site-header fixed top-0 left-0 right-0 z-[200]"
        style={{
          height: 72,
          padding: "0 clamp(1.5rem, 6vw, 7.5rem)",
          display: "flex",
          alignItems: "center",
          background: menuOpen ? "rgba(4,3,2,.99)" : "transparent",
          borderBottom: "1px solid transparent",
          transform: isHidden ? "translateY(-100%)" : "translateY(0)",
          transition: "background .5s, transform .5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Logo — wordmark */}
        <Link
          href="/"
          aria-label={`${SITE.name} — inicio`}
          onClick={() => setMenuOpen(false)}
          data-cursor-hover
          style={{ flexShrink: 0, display: "inline-flex", alignItems: "center" }}
        >
          <span
            className="font-display"
            style={{
              fontSize: 20,
              letterSpacing: ".26em",
              textIndent: ".26em",
              textTransform: "uppercase",
              color: "#F3F0EA",
            }}
          >
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav — centrado real */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:block"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <ul style={{ display: "flex", alignItems: "center", gap: "clamp(28px,3.2vw,50px)", listStyle: "none", padding: 0, margin: 0 }}>
            {NAV_LINKS.map((link, i) => {
              const isHovered = activeHref === link.href;
              return (
                <li key={link.href} style={{ position: "relative" }}>
                  <a
                    href={anchorHref(link.href)}
                    onClick={(e) => {
                      if (pathname === "/" && link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollTo(link.href);
                      }
                    }}
                    onMouseEnter={() => setActiveHref(link.href)}
                    onMouseLeave={() => setActiveHref(null)}
                    data-cursor-hover
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 7,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: isHovered ? "rgba(243,240,234,.98)" : "rgba(200,195,185,.5)",
                      textDecoration: "none",
                      transition: "color .3s",
                      paddingBottom: 4,
                    }}
                  >
                    <span aria-hidden style={{
                      fontSize: 8.5,
                      color: isHovered ? "rgba(212,160,32,.9)" : "rgba(212,160,32,.4)",
                      transition: "color .3s",
                    }}>
                      0{i + 1}
                    </span>
                    {link.label}
                    <motion.span
                      animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{
                        position: "absolute", left: 0, right: 0, bottom: 0,
                        height: 1,
                        background: "linear-gradient(to right, rgba(212,160,32,.85), rgba(212,160,32,.2))",
                        transformOrigin: "left",
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Lado derecho — CTA (desktop) + hamburguesa (mobile) */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 22 }}>
          <Link
            href="/evaluacion"
            data-cursor-hover
            className="cta-gold hidden md:inline-flex"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              alignItems: "center",
              gap: 11,
              padding: "10px 22px",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Evaluación
            <span aria-hidden style={{
              position: "relative", display: "inline-flex", alignItems: "center",
              width: ctaHov ? 20 : 14, height: 1, background: "currentColor", flexShrink: 0,
              transition: "width .35s",
            }}>
              <span style={{
                position: "absolute", right: -1, top: -2.5,
                width: 5, height: 5,
                borderRight: "1px solid currentColor",
                borderTop: "1px solid currentColor",
                transform: "rotate(45deg)",
              }} />
            </span>
          </Link>

          {/* Hamburguesa — solo mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            style={{ gap: 5, width: 36, height: 36, flexShrink: 0 }}
          >
            <span style={{
              width: 20, height: 1,
              background: menuOpen ? "rgba(212,160,32,.9)" : "rgba(240,235,225,.75)",
              display: "block",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              transition: "transform .4s cubic-bezier(.16,1,.3,1), background .3s",
            }} />
            <span style={{
              width: 20, height: 1,
              background: "rgba(240,235,225,.75)",
              display: "block",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity .25s",
            }} />
            <span style={{
              width: 20, height: 1,
              background: menuOpen ? "rgba(212,160,32,.9)" : "rgba(240,235,225,.75)",
              display: "block",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              transition: "transform .4s cubic-bezier(.16,1,.3,1), background .3s",
            }} />
          </button>
        </div>
      </header>

      {/* Menú mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[199] flex flex-col"
            style={{ background: "rgba(4,3,2,.99)" }}
          >
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(160,95,5,.07) 0%, transparent 68%)",
            }} />
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3,
              backgroundImage: "radial-gradient(circle, rgba(212,160,32,.07) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />

            <nav
              aria-label="Menú móvil"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
                gap: 0,
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: EASE }}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {i === 0 && (
                    <div style={{ width: 32, height: 1, background: "rgba(212,160,32,.2)", margin: "0 auto 28px" }} />
                  )}
                  <a
                    href={anchorHref(link.href)}
                    onClick={(e) => {
                      if (pathname === "/" && link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollTo(link.href);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                    style={{
                      display: "block",
                      padding: "14px 0",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(32px,8vw,52px)",
                      letterSpacing: "-.01em",
                      color: "rgba(240,235,225,.78)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                  {i === NAV_LINKS.length - 1 && (
                    <div style={{ width: 32, height: 1, background: "rgba(212,160,32,.2)", margin: "28px auto 0" }} />
                  )}
                </motion.div>
              ))}

              {/* CTA del menú mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + NAV_LINKS.length * 0.08 + 0.1, ease: EASE }}
                style={{ marginTop: 40 }}
              >
                <Link
                  href="/evaluacion"
                  onClick={() => setMenuOpen(false)}
                  className="cta-gold"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "18px 40px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: ".28em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Solicitar evaluación
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
