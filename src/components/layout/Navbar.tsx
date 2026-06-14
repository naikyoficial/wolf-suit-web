"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/config/site";
import { useLenis } from "@/contexts/LenisContext";

export function Navbar() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const lenis = useLenis();

  function scrollTo(href: string) {
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 z-[--z-sticky]"
      style={{
        padding: "0 clamp(1.5rem, 6vw, 7.5rem)",
        background: "rgba(4,4,4,.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(178,192,204,.07)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-3"
        aria-label={`${SITE.name} — inicio`}
      >
        <Image
          src="/isotipo.png"
          alt="Suitwolf mark"
          width={28}
          height={28}
          className="opacity-90"
          style={{ objectFit: "contain" }}
          priority
        />
        <span
          className="font-display font-medium tracking-[0.28em] text-text uppercase"
          style={{ fontSize: 15 }}
        >
          {SITE.name}
        </span>
      </Link>

      <nav aria-label="Navegación principal">
        <ul className="hidden md:flex items-center gap-7">
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

      <div className="hidden md:inline-block" style={{
        padding: "1px",
        background: "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)",
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
    </header>
  );
}
