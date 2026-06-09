"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/config/site";

export function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 z-[--z-sticky]"
      style={{
        padding: "0 clamp(1.5rem, 6vw, 7.5rem)",
        background: "rgba(4,4,4,.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,164,90,.07)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-3"
        aria-label={`${SITE.name} — inicio`}
      >
        <Image
          src="/isotipo.png"
          alt="Wolf Suit mark"
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
              <Link
                href={link.href}
                className="text-text-3 transition-colors duration-300 hover:text-text"
                style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        href="#contact"
        className="hidden md:inline-flex items-center transition-all duration-300 hover:bg-gold hover:text-[#111]"
        style={{
          padding: "10px 22px",
          border: "1px solid rgba(201,164,90,.45)",
          fontSize: 11,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "var(--color-text)",
        }}
      >
        Iniciar proyecto
      </Link>
    </header>
  );
}
