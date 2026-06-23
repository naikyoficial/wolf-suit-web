"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/config/site";
import { useLenis } from "@/contexts/LenisContext";

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";
const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    lenis
      ? lenis.scrollTo(el as HTMLElement, { offset: -72 })
      : el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header
        className="site-header fixed top-0 left-0 right-0 z-[200]"
        style={{
          height: 64,
          padding: "0 clamp(1.5rem, 6vw, 7.5rem)",
          display: "flex",
          alignItems: "center",
          background: menuOpen
            ? "rgba(4,3,2,.99)"
            : scrolled
            ? "rgba(5,4,3,.88)"
            : "rgba(5,4,3,.2)",
          backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
          borderBottom: `1px solid ${scrolled || menuOpen ? "rgba(212,160,32,.12)" : "rgba(212,160,32,.06)"}`,
          transition: "background .5s, border-color .5s, backdrop-filter .5s",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${SITE.name} — inicio`}
          onClick={() => setMenuOpen(false)}
          data-cursor-hover
          style={{ flexShrink: 0 }}
        >
          <span
            className="font-display"
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: ".36em",
              textTransform: "uppercase",
              background: GOLD,
              backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 10s ease-in-out infinite",
            }}
          >
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav — truly centered */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:block"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <ul style={{ display: "flex", alignItems: "center", gap: "clamp(24px,3vw,44px)", listStyle: "none", padding: 0, margin: 0 }}>
            {NAV_LINKS.map((link) => {
              const isHovered = activeHref === link.href;
              return (
                <li key={link.href} style={{ position: "relative" }}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      onMouseEnter={() => setActiveHref(link.href)}
                      onMouseLeave={() => setActiveHref(null)}
                      data-cursor-hover
                      style={{
                        fontSize: 10,
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: isHovered ? "rgba(240,235,225,.95)" : "rgba(200,195,185,.45)",
                        textDecoration: "none",
                        transition: "color .3s",
                        display: "block",
                        paddingBottom: 4,
                      }}
                    >
                      {link.label}
                      {/* Gold underline indicator */}
                      <motion.span
                        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                          display: "block",
                          height: 1,
                          background: "linear-gradient(to right, rgba(212,160,32,.8), rgba(212,160,32,.3))",
                          transformOrigin: "left",
                          marginTop: 4,
                        }}
                      />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onMouseEnter={() => setActiveHref(link.href)}
                      onMouseLeave={() => setActiveHref(null)}
                      data-cursor-hover
                      style={{
                        fontSize: 10,
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: isHovered ? "rgba(240,235,225,.95)" : "rgba(200,195,185,.45)",
                        textDecoration: "none",
                        transition: "color .3s",
                        display: "block",
                        paddingBottom: 4,
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {/* Hamburger — mobile only */}
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

      {/* Mobile menu overlay */}
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
            {/* Atmosphere */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(160,95,5,.07) 0%, transparent 68%)",
            }} />
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3,
              backgroundImage: "radial-gradient(circle, rgba(212,160,32,.07) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />

            {/* Nav links — vertically centered, large display type */}
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
                  {/* Thin gold separator */}
                  {i === 0 && (
                    <div style={{ width: 32, height: 1, background: "rgba(212,160,32,.2)", margin: "0 auto 28px" }} />
                  )}
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      style={{
                        display: "block",
                        padding: "14px 0",
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(32px,8vw,52px)",
                        fontWeight: 300,
                        letterSpacing: "-.01em",
                        color: "rgba(240,235,225,.78)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "block",
                        padding: "14px 0",
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(32px,8vw,52px)",
                        fontWeight: 300,
                        letterSpacing: "-.01em",
                        color: "rgba(240,235,225,.78)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                  {i === NAV_LINKS.length - 1 && (
                    <div style={{ width: 32, height: 1, background: "rgba(212,160,32,.2)", margin: "28px auto 0" }} />
                  )}
                </motion.div>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

