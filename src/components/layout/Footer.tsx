import Link from "next/link";
import { SITE, NAV_LINKS } from "@/config/site";
import { SERVICE_PAGES } from "@/config/services";
import { CraftedBy } from "@/components/ui/CraftedBy";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{
        borderTop: "1px solid rgba(178,192,204,.08)",
        zIndex: 10,
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* Fila principal */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr]"
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(52px, 8vh, 90px) var(--section-px) clamp(36px, 5vh, 56px)",
          gap: "clamp(36px, 4vw, 56px)",
          alignItems: "start",
        }}
      >
        {/* Marca */}
        <div>
          <p
            className="font-display"
            style={{
              fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            {SITE.name}
          </p>
          <p style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--color-text-3)",
            maxWidth: "26em",
            margin: 0,
          }}>
            {SITE.description}
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Navegación de pie de página">
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "var(--color-text-4)",
            margin: 0,
            marginBottom: 20,
          }}>
            Navegación
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={`/${l.href}`}
                  data-cursor-hover
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-2)",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Servicios */}
        <nav aria-label="Servicios">
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "var(--color-text-4)",
            margin: 0,
            marginBottom: 20,
          }}>
            Servicios
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {SERVICE_PAGES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  data-cursor-hover
                  style={{ fontSize: 14, color: "var(--color-text-2)", textDecoration: "none" }}
                >
                  {s.navTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                data-cursor-hover
                style={{ fontSize: 14, color: "var(--color-text-2)", textDecoration: "none" }}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "var(--color-text-4)",
            margin: 0,
            marginBottom: 20,
          }}>
            Contacto
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor-hover
                style={{ fontSize: 14, color: "var(--color-text-2)", textDecoration: "none" }}
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <Link
                href="/evaluacion"
                data-cursor-hover
                style={{ fontSize: 14, color: "var(--color-gold)", textDecoration: "none" }}
              >
                Solicitar evaluación →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Fila legal */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-3"
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(20px, 3vh, 28px) var(--section-px)",
          borderTop: "1px solid rgba(255,255,255,.05)",
        }}
      >
        <p style={{ fontSize: 11, color: "var(--color-text-4)", letterSpacing: ".1em", margin: 0 }}>
          &copy; {year} {SITE.name} &middot; Todos los derechos reservados
        </p>
        <CraftedBy />
      </div>

      {/* Marca de agua gigante en contorno */}
      <div
        aria-hidden
        style={{
          overflow: "hidden",
          lineHeight: 0.72,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <span
          className="font-display text-outline-gold"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "clamp(3.6rem, 12vw, 12rem)",
            letterSpacing: ".2em",
            textIndent: ".2em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            transform: "translateY(20%)",
            opacity: 0.32,
          }}
        >
          {SITE.name}
        </span>
      </div>
    </footer>
  );
}
