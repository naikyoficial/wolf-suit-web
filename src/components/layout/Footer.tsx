import Link from "next/link";
import { NAV_LINKS, SITE } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-[--section-px] py-12"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-[--grid-max] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-sm tracking-[0.12em] uppercase text-text-3">
          {SITE.name}
        </span>

        <nav aria-label="Navegación secundaria">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-text-4 tracking-wide transition-colors duration-200 hover:text-text-3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/legal"
                className="text-xs text-text-4 tracking-wide transition-colors duration-200 hover:text-text-3"
              >
                Legal
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-text-4">
          &copy; {year} {SITE.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
