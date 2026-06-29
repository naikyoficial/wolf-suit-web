import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Diseño Web, SEO y Estrategia Digital",
  description:
    "Artículos sobre diseño web profesional, SEO, e-commerce y estrategia digital para empresas que quieren crecer. Contenido práctico, sin relleno.",
  alternates: { canonical: "https://suitwolf.com/blog" },
  openGraph: {
    title: "Blog de SuitWolf — Diseño Web y Estrategia Digital",
    description:
      "Artículos sobre diseño web profesional, SEO, e-commerce y estrategia digital para empresas que quieren crecer.",
    url: "https://suitwolf.com/blog",
  },
};

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  if (!featured) return null;

  return (
    <main style={{ background: "#050403", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        padding: "clamp(80px,12vh,140px) clamp(1.5rem,8vw,7.5rem) clamp(56px,8vh,96px)",
        overflow: "hidden",
      }}>
        {/* Atmosphere */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(168,108,5,.09) 0%, transparent 70%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.2,
          backgroundImage: "radial-gradient(circle, rgba(212,160,32,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.4))" }} />
            <span style={{
              fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase",
              background: GOLD, backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", animation: "metalShimmer 10s ease-in-out infinite",
            }}>
              Blog
            </span>
            <div style={{ width: 32, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.4))" }} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px,5.5vw,80px)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-.028em",
            color: "var(--color-text)",
            marginBottom: 20,
          }}>
            Ideas que posicionan
          </h1>
          <p style={{
            fontSize: "clamp(14px,1.1vw,17px)",
            color: "var(--color-text-3)",
            lineHeight: 1.75,
            maxWidth: 480,
          }}>
            Estrategia digital, diseño web y SEO para empresas que quieren destacar. Sin relleno — solo lo que realmente funciona.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{
        padding: "0 clamp(1.5rem,8vw,7.5rem) clamp(80px,12vh,140px)",
        maxWidth: "calc(1100px + clamp(3rem,16vw,15rem))",
        margin: "0 auto",
      }}>

        {/* Featured */}
        <FeaturedPost post={featured} />

        {/* Grid */}
        {rest.length > 0 && (
          <>
            <div style={{
              display: "flex", alignItems: "center", gap: 16,
              marginBottom: "clamp(32px,4vh,48px)",
            }}>
              <span style={{
                fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase",
                color: "rgba(180,174,164,.35)",
              }}>
                Más artículos
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(212,160,32,.08)" }} />
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,340px), 1fr))",
              gap: "clamp(16px,2vw,24px)",
            }}>
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
