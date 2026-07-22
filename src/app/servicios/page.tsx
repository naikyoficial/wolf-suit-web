import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SEO } from "@/config/seo";
import { SERVICE_PAGES } from "@/config/services";
import { LOCATION_PAGES } from "@/config/locations";

const URL = `${SEO.url}/servicios`;

export const metadata: Metadata = {
  title: "Servicios de Diseño y Desarrollo Web a Medida | Suitwolf",
  description:
    "Agencia de diseño web a medida, sin plantillas. Sitios corporativos, tiendas online, landing pages de alta conversión y aplicaciones web para empresas exigentes.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Servicios de Diseño y Desarrollo Web a Medida | Suitwolf",
    description:
      "Agencia de diseño web a medida, sin plantillas. Sitios corporativos, tiendas online, landing pages y aplicaciones web para empresas exigentes.",
    url: URL,
    type: "website",
  },
};

export default function ServiciosHub() {
  return (
    <main className="relative" style={{ background: "var(--color-surface)" }}>
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(48px, 8vh, 96px) var(--section-px) clamp(32px, 5vh, 56px)",
        }}
      >
        <Breadcrumbs
          items={[
            { name: "Inicio", url: SEO.url },
            { name: "Servicios", url: URL },
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
                margin: "0 0 clamp(18px, 2.4vh, 26px)",
              }}
            >
              Servicios
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2.1rem, 5vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                margin: 0,
                maxWidth: "16em",
              }}
            >
              Diseño y desarrollo web a medida, sin plantillas
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                fontSize: "clamp(15px, 1.15vw, 18px)",
                lineHeight: 1.7,
                color: "var(--color-text-2)",
                margin: "clamp(22px, 3vh, 32px) 0 0",
                maxWidth: "38em",
              }}
            >
              Somos una agencia de diseño web premium. Cada proyecto se construye desde cero,
              alineado a la estrategia de tu negocio: nada de plantillas compartidas con miles de
              sitios. Trabajamos con empresas de España, México, Estados Unidos, Argentina y toda
              LatAm de forma 100% remota.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid de servicios */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(24px, 4vh, 48px) var(--section-px) clamp(48px, 7vh, 96px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          {SERVICE_PAGES.map((svc, i) => (
            <Reveal key={svc.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/servicios/${svc.slug}`}
                data-cursor-hover
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  height: "100%",
                  padding: "clamp(28px, 3vw, 44px)",
                  background: "var(--color-surface)",
                  textDecoration: "none",
                  transition: "background .3s",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                  }}
                >
                  {svc.kicker}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                    color: "var(--color-text)",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {svc.navTitle}
                </h2>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--color-text-3)", margin: 0, flex: 1 }}>
                  {svc.intro.split(". ")[0]}.
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-2)",
                  }}
                >
                  Ver servicio →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Diseño web por ciudad (enlazado interno a páginas locales) */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(8px, 2vh, 24px) var(--section-px) clamp(24px, 4vh, 48px)",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--color-text-4)",
              margin: "0 0 20px",
            }}
          >
            Diseño web por ciudad
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px" }}>
          {LOCATION_PAGES.map((l) => (
            <Link
              key={l.slug}
              href={`/${l.slug}`}
              data-cursor-hover
              style={{
                fontSize: 14.5,
                color: "var(--color-text-2)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(212,160,32,.25)",
                paddingBottom: 2,
              }}
            >
              Diseño web en {l.city}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(24px, 4vh, 48px) var(--section-px) clamp(64px, 9vh, 120px)",
          textAlign: "center",
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              lineHeight: 1.2,
              color: "var(--color-text)",
              margin: "0 auto clamp(28px, 4vh, 40px)",
              maxWidth: "18em",
              letterSpacing: "-0.02em",
            }}
          >
            ¿No sabés qué servicio necesitás? Empecemos por una evaluación.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            href="/evaluacion"
            className="cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "clamp(16px, 1.6vw, 20px) clamp(36px, 4vw, 52px)",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: 11.5,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Solicitar evaluación
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
