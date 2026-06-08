"use client";

import Link from "next/link";
import { NAV_LINKS, SITE } from "@/config/site";

export function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-[--section-px] h-16 z-[--z-sticky]"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
    >
      <Link
        href="/"
        className="font-display text-sm font-medium tracking-[0.12em] uppercase text-text"
        aria-label={`${SITE.name} — inicio`}
      >
        {SITE.name}
      </Link>

      <nav aria-label="Navegación principal">
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-text-3 tracking-wide transition-colors duration-200 hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        href="#contact"
        className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-sm transition-all duration-200 bg-gold text-surface-2 hover:-translate-y-px hover:shadow-gold"
      >
        Iniciar proyecto
      </Link>
    </header>
  );
}
