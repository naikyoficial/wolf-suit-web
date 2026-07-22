import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SEO, serviceSchema } from "@/config/seo";
import { SERVICE_PAGES, getServiceBySlug } from "@/config/services";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return {};
  const url = `${SEO.url}/servicios/${svc.slug}`;
  return {
    title: svc.seoTitle,
    description: svc.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: svc.seoTitle,
      description: svc.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  const url = `${SEO.url}/servicios/${svc.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="relative" style={{ background: "var(--color-surface)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: svc.navTitle,
              description: svc.metaDescription,
              url,
              serviceType: svc.serviceType,
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
          padding: "clamp(48px, 8vh, 96px) var(--section-px) clamp(40px, 6vh, 72px)",
        }}
      >
        <Breadcrumbs
          items={[
            { name: "Inicio", url: SEO.url },
            { name: "Servicios", url: `${SEO.url}/servicios` },
            { name: svc.navTitle, url },
          ]}
        />

        {/* Hero — 2 columnas: texto izquierda, imagen derecha */}
        <div
          style={{
            marginTop: "clamp(32px, 5vh, 56px)",
            display: "grid",
            gridTemplateColumns: "1fr clamp(260px, 38%, 480px)",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
          className="service-hero-grid"
        >
          {/* Texto */}
          <div>
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
                {svc.kicker}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(2.2rem, 4.4vw, 3.9rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.022em",
                  color: "var(--color-text)",
                  margin: "0 0 clamp(20px, 2.8vh, 32px)",
                }}
              >
                {svc.h1}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                style={{
                  fontSize: "clamp(15px, 1.15vw, 17px)",
                  lineHeight: 1.72,
                  color: "var(--color-text-2)",
                  margin: "0 0 clamp(28px, 4vh, 40px)",
                  maxWidth: "38em",
                }}
              >
                {svc.intro}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <Link
                href="/evaluacion"
                className="cta-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "clamp(14px, 1.4vw, 18px) clamp(28px, 3vw, 44px)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Solicitar evaluación
              </Link>
            </Reveal>
          </div>

          {/* Imagen / placeholder */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: "clamp(16px, 1.8vw, 24px)",
              overflow: "hidden",
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.07)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                background:
                  "radial-gradient(130% 100% at 50% 15%, rgba(185,138,62,.1) 0%, transparent 55%), #0e0c09",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "rgba(185,138,62,.18)",
                  lineHeight: 1,
                  textAlign: "center",
                  padding: "0 20px",
                }}
              >
                Suitwolf
              </span>
              <span style={{ width: 36, height: 1, background: "rgba(185,138,62,.18)" }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: ".26em",
                  textTransform: "uppercase",
                  color: "rgba(185,138,62,.28)",
                }}
              >
                {svc.kicker}
              </span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .service-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .service-hero-grid > div:last-child {
            aspect-ratio: 16 / 9 !important;
          }
        }
      `}</style>

      {/* Problema */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "0 var(--section-px) clamp(40px, 6vh, 72px)",
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)",
              lineHeight: 1.35,
              color: "var(--color-text)",
              maxWidth: "26em",
              margin: 0,
              paddingLeft: "clamp(16px, 2vw, 26px)",
              borderLeft: "2px solid var(--color-gold)",
            }}
          >
            {svc.problem}
          </p>
        </Reveal>
      </section>

      {/* Enfoque */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(32px, 5vh, 64px) var(--section-px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(24px, 3vw, 44px)",
          }}
        >
          {svc.approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--color-gold)",
                    letterSpacing: ".1em",
                  }}
                >
                  0{i + 1}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                    color: "var(--color-text)",
                    margin: "12px 0 10px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {a.title}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-text-3)", margin: 0 }}>
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Entregables + Resultados */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(32px, 5vh, 64px) var(--section-px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(32px, 4vw, 64px)",
        }}
      >
        <Reveal>
          <div>
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
              Qué incluye
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {svc.deliverables.map((d) => (
                <li key={d} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.6, color: "var(--color-text-2)" }}>
                  <span aria-hidden style={{ color: "var(--color-gold)" }}>—</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
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
              Qué conseguís
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {svc.outcomes.map((o) => (
                <li key={o} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.6, color: "var(--color-text-2)" }}>
                  <span aria-hidden style={{ color: "var(--color-gold)" }}>→</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: "48em" }}>
          {svc.faqs.map((f, i) => (
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

      {/* CTA */}
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
            Empecemos con una evaluación estratégica de tu proyecto.
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
