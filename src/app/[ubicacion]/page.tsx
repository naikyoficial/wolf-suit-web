import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SEO, serviceSchema } from "@/config/seo";
import { LOCATION_PAGES, getLocationBySlug } from "@/config/locations";
import { SERVICE_PAGES } from "@/config/services";

/** Sólo existen las páginas de ciudad curadas; cualquier otra ruta raíz → 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATION_PAGES.map((l) => ({ ubicacion: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ubicacion: string }>;
}): Promise<Metadata> {
  const { ubicacion } = await params;
  const loc = getLocationBySlug(ubicacion);
  if (!loc) return {};
  const url = `${SEO.url}/${loc.slug}`;
  return {
    title: loc.seoTitle,
    description: loc.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: loc.seoTitle,
      description: loc.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function LocationRoute({
  params,
}: {
  params: Promise<{ ubicacion: string }>;
}) {
  const { ubicacion } = await params;
  const loc = getLocationBySlug(ubicacion);
  if (!loc) notFound();

  const url = `${SEO.url}/${loc.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Servicios destacados para enlazado interno desde la página de ciudad.
  const featured = SERVICE_PAGES.filter((s) =>
    ["diseno-web-corporativo", "tienda-online", "landing-pages", "aplicaciones-web-a-medida"].includes(s.slug),
  );

  return (
    <main className="relative" style={{ background: "var(--color-surface)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: `Diseño web en ${loc.city}`,
              description: loc.metaDescription,
              url,
              serviceType: "Diseño y desarrollo web",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            { name: `Diseño web en ${loc.city}`, url },
          ]}
        />

        <div style={{ marginTop: "clamp(32px, 5vh, 56px)", maxWidth: "18em" }}>
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
              {loc.city} · {loc.country}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2.1rem, 5vw, 3.9rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              {loc.h1}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Intro + ángulo local */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "0 var(--section-px) clamp(32px, 5vh, 56px)",
        }}
      >
        <div style={{ maxWidth: "40em", display: "flex", flexDirection: "column", gap: "clamp(16px, 2.2vh, 22px)" }}>
          {loc.intro.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p style={{ fontSize: "clamp(15px, 1.15vw, 18px)", lineHeight: 1.75, color: "var(--color-text-2)", margin: 0 }}>
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.12}>
            <p style={{ fontSize: "clamp(15px, 1.15vw, 18px)", lineHeight: 1.75, color: "var(--color-text-3)", margin: 0 }}>
              {loc.localAngle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Servicios (enlazado interno) */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(24px, 4vh, 48px) var(--section-px)",
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
              margin: "0 0 24px",
            }}
          >
            Servicios para empresas de {loc.city}
          </h2>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.05}>
              <Link
                href={`/servicios/${s.slug}`}
                data-cursor-hover
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  height: "100%",
                  padding: "clamp(24px, 2.4vw, 34px)",
                  background: "var(--color-surface)",
                  textDecoration: "none",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)",
                    color: "var(--color-text)",
                    margin: 0,
                  }}
                >
                  {s.navTitle}
                </h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-text-2)" }}>
                  Ver servicio →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(32px, 5vh, 64px) var(--section-px)",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
              color: "var(--color-text)",
              margin: "0 0 clamp(24px, 3vh, 40px)",
              letterSpacing: "-0.02em",
            }}
          >
            Preguntas frecuentes
          </h2>
        </Reveal>
        <div style={{ maxWidth: "48em" }}>
          {loc.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div style={{ padding: "24px 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                    color: "var(--color-text)",
                    margin: "0 0 10px",
                  }}
                >
                  {f.q}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-text-3)", margin: 0 }}>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA con verbo regional */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(40px, 6vh, 80px) var(--section-px) clamp(64px, 9vh, 120px)",
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
            Pedí tu {loc.quoteWord} para un proyecto en {loc.city}.
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
