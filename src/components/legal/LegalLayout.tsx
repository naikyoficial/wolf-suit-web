import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SEO } from "@/config/seo";

/**
 * Layout compartido para las 4 páginas legales. Mantiene consistencia
 * visual (tipografía, ancho de lectura, breadcrumbs) sin duplicar código.
 */

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

export function LegalLayout({
  breadcrumb,
  kicker,
  title,
  lastUpdated,
  intro,
  sections,
}: {
  breadcrumb: string;
  kicker: string;
  title: string;
  lastUpdated: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main
      className="relative"
      style={{ background: "var(--color-surface)" }}
    >
      <article
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "clamp(48px, 8vh, 96px) var(--section-px) clamp(64px, 9vh, 120px)",
        }}
      >
        <Breadcrumbs
          items={[
            { name: "Inicio", url: SEO.url },
            { name: breadcrumb, url: `${SEO.url}/${breadcrumb.toLowerCase().replace(/\s+/g, "-")}` },
          ]}
        />

        <div style={{ marginTop: "clamp(32px, 5vh, 56px)" }}>
          <Reveal>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                margin: "0 0 clamp(16px, 2vh, 22px)",
              }}
            >
              {kicker}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "var(--color-text)",
                margin: "0 0 clamp(16px, 2vh, 24px)",
              }}
            >
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--color-text-4)",
                margin: 0,
              }}
            >
              Última actualización: {lastUpdated}
            </p>
          </Reveal>
        </div>

        {intro && (
          <Reveal delay={0.15}>
            <div
              style={{
                marginTop: "clamp(32px, 5vh, 48px)",
                fontSize: "clamp(15px, 1.1vw, 17px)",
                lineHeight: 1.72,
                color: "var(--color-text-2)",
              }}
            >
              {intro}
            </div>
          </Reveal>
        )}

        <div style={{ marginTop: "clamp(40px, 6vh, 64px)", display: "flex", flexDirection: "column", gap: "clamp(28px, 4vh, 40px)" }}>
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={0.05 + i * 0.02}>
              <section>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
                    color: "var(--color-text)",
                    letterSpacing: "-0.01em",
                    margin: "0 0 14px",
                  }}
                >
                  {s.heading}
                </h2>
                <div
                  style={{
                    fontSize: "clamp(14px, 1.05vw, 16px)",
                    lineHeight: 1.72,
                    color: "var(--color-text-2)",
                  }}
                >
                  {s.body}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <div
          style={{
            marginTop: "clamp(48px, 7vh, 80px)",
            paddingTop: "clamp(24px, 4vh, 36px)",
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--color-text-3)",
              textDecoration: "none",
            }}
          >
            ← Volver al inicio
          </Link>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: ".14em",
              color: "var(--color-text-4)",
              margin: 0,
            }}
          >
            {SEO.name}
          </p>
        </div>
      </article>
    </main>
  );
}
