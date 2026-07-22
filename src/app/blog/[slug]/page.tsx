import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SEO } from "@/config/seo";
import { BLOG_POSTS, getPostBySlug } from "@/config/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SEO.url}/blog/${post.slug}`;
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SEO.url}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SEO.name, url: SEO.url },
    publisher: { "@id": `${SEO.url}/#organization` },
    image: SEO.ogImage,
  };

  return (
    <main className="relative" style={{ background: "var(--color-surface)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(48px, 8vh, 96px) var(--section-px) clamp(64px, 9vh, 120px)",
        }}
      >
        <Breadcrumbs
          items={[
            { name: "Inicio", url: SEO.url },
            { name: "Blog", url: `${SEO.url}/blog` },
            { name: post.title, url },
          ]}
        />

        {/* Hero del artículo — ancho completo */}
        <div style={{ marginTop: "clamp(32px, 5vh, 56px)", maxWidth: "42em" }}>
          <Reveal>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--color-text-4)",
                margin: "0 0 clamp(16px, 2vh, 22px)",
              }}
            >
              {fmtDate(post.date)} · {post.readingMinutes} min de lectura
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "var(--color-text)",
                margin: "0 0 clamp(28px, 4vh, 44px)",
              }}
            >
              {post.title}
            </h1>
          </Reveal>
        </div>

        {/* Cuerpo — 2 columnas en desktop: contenido + sidebar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr clamp(220px, 28%, 320px)",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "start",
          }}
          className="blog-post-grid"
        >
          {/* Contenido principal */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px, 2.4vh, 26px)" }}>
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <Reveal key={i} delay={0.02}>
                    <h2
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                        color: "var(--color-text)",
                        letterSpacing: "-0.01em",
                        margin: "clamp(16px, 2vh, 24px) 0 0",
                      }}
                    >
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {block.items.map((it) => (
                      <li key={it} style={{ display: "flex", gap: 12, fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.7, color: "var(--color-text-2)" }}>
                        <span aria-hidden style={{ color: "var(--color-gold)" }}>—</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    fontSize: "clamp(15px, 1.1vw, 17px)",
                    lineHeight: 1.78,
                    color: "var(--color-text-2)",
                    margin: 0,
                  }}
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Sidebar */}
          <aside
            style={{
              position: "sticky",
              top: "clamp(90px, 10vh, 120px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(28px, 4vh, 40px)",
            }}
          >
            {/* Enlace interno */}
            <div
              style={{
                padding: "clamp(24px, 2.6vw, 32px)",
                borderRadius: "clamp(14px, 1.6vw, 20px)",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--color-text-4)",
                  margin: 0,
                }}
              >
                Servicio relacionado
              </p>
              <Link
                href={post.relatedHref}
                data-cursor-hover
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "var(--color-gold)",
                  textDecoration: "none",
                }}
              >
                {post.relatedLabel} →
              </Link>
            </div>

            {/* CTA */}
            <div
              style={{
                padding: "clamp(24px, 2.6vw, 32px)",
                borderRadius: "clamp(14px, 1.6vw, 20px)",
                background:
                  "radial-gradient(120% 100% at 50% 10%, rgba(185,138,62,.08) 0%, transparent 60%), rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)",
                  lineHeight: 1.2,
                  color: "var(--color-text)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                ¿Necesitás un sitio web que convierta?
              </p>
              <Link
                href="/evaluacion"
                className="cta-primary"
                data-cursor-hover
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  padding: "14px 28px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: 10.5,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Solicitar evaluación
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <style>{`
        @media (max-width: 768px) {
          .blog-post-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
