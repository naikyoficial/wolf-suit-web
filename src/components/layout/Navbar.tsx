"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/config/site";
import { useLenis } from "@/contexts/LenisContext";

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";
const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Navbar() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 z-[200]"
        style={{
          padding: "0 clamp(1.5rem, 6vw, 7.5rem)",
          background: menuOpen ? "rgba(4,4,4,.98)" : "rgba(4,4,4,.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(178,192,204,.07)",
          transition: "background .3s",
        }}
      >
        <Link
          href="/"
          aria-label={`${SITE.name} — inicio`}
          onClick={() => setMenuOpen(false)}
        >
          <span
            className="font-display font-medium uppercase"
            style={{
              fontSize: 15,
              letterSpacing: ".32em",
              background: GOLD,
              backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 9s ease-in-out infinite",
            }}
          >
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-text-3 transition-colors duration-300 hover:text-text cursor-pointer"
                    style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase" }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-text-3 transition-colors duration-300 hover:text-text"
                    style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase" }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:inline-block" style={{
          padding: "1px",
          background: GOLD,
          backgroundSize: "280% 100%",
          animation: "metalShimmer 4s ease-in-out infinite",
        }}>
          <Link
            href="/evaluacion"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "9px 20px",
              background: ctaHovered ? "var(--color-gold)" : "#060606",
              color: ctaHovered ? "#080808" : "var(--color-text)",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background .3s, color .3s",
            }}
          >
            Iniciar proceso
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span style={{
            width: 22, height: 1, background: "rgba(240,235,225,.75)", display: "block",
            transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            transition: "transform .35s cubic-bezier(.16,1,.3,1)",
          }} />
          <span style={{
            width: 22, height: 1, background: "rgba(240,235,225,.75)", display: "block",
            opacity: menuOpen ? 0 : 1,
            transition: "opacity .25s",
          }} />
          <span style={{
            width: 22, height: 1, background: "rgba(240,235,225,.75)", display: "block",
            transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            transition: "transform .35s cubic-bezier(.16,1,.3,1)",
          }} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="md:hidden fixed inset-0 z-[199] flex flex-col items-center justify-center"
            style={{
              background: "rgba(4,4,4,.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Atmosphere */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,108,5,.07) 0%, transparent 70%)",
            }} />

            <nav aria-label="Menú móvil" style={{ position: "relative", zIndex: 1 }}>
              <ul style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, listStyle: "none", padding: 0, margin: 0 }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.06 + i * 0.07, ease: EASE }}
                  >
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                        style={{ fontSize: 12, letterSpacing: ".4em", textTransform: "uppercase", color: "rgba(200,195,185,.7)", textDecoration: "none" }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        style={{ fontSize: 12, letterSpacing: ".4em", textTransform: "uppercase", color: "rgba(200,195,185,.7)", textDecoration: "none" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
              style={{ marginTop: 56, position: "relative", zIndex: 1 }}
            >
              <div style={{
                padding: "1px",
                background: GOLD,
                backgroundSize: "280% 100%",
                animation: "metalShimmer 4s ease-in-out infinite",
              }}>
                <Link
                  href="/evaluacion"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 18,
                    padding: "16px 36px",
                    background: "#060606",
                    color: "var(--color-text)",
                    fontSize: 10,
                    letterSpacing: ".3em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Iniciar proceso
                  <span style={{ display: "inline-flex", alignItems: "center", position: "relative", width: 18, height: 1, background: "currentColor", flexShrink: 0 }}>
                    <span style={{ position: "absolute", right: -1, top: -3, width: 5, height: 5, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
