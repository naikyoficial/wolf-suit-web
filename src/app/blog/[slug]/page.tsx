import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { ArticleImage } from "@/components/blog/ArticleImage";
import { ArticleCallout } from "@/components/blog/ArticleCallout";
import { ArticleSidebar } from "@/components/blog/ArticleSidebar";
import { ShareRow } from "@/components/blog/ShareRow";
import { WolfMark } from "@/components/blog/WolfMark";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `https://suitwolf.com/blog/${slug}` },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://suitwolf.com/blog/${slug}`,
        type: "article",
        publishedTime: post.date,
      },
    };
  } catch {
    return {};
  }
}

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(24px,2.4vw,34px)",
      fontWeight: 300,
      lineHeight: 1.15,
      letterSpacing: "-.022em",
      color: "var(--color-text)",
      marginTop: "clamp(44px,5.5vh,68px)",
      marginBottom: 20,
    }} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(19px,1.8vw,25px)",
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: "-.018em",
      color: "rgba(240,235,225,.9)",
      marginTop: "clamp(30px,4vh,44px)",
      marginBottom: 14,
    }} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} style={{
      fontSize: "clamp(15px,1.05vw,17px)",
      color: "rgba(210,205,195,.78)",
      lineHeight: 1.95,
      marginBottom: 24,
    }} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ color: "rgba(240,210,140,.95)", fontWeight: 500 }} />
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24 }}>{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24, counterReset: "li" }}>{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li style={{
      fontSize: "clamp(15px,1.05vw,17px)",
      color: "rgba(210,205,195,.78)",
      lineHeight: 1.9,
      paddingLeft: 24,
      marginBottom: 10,
      position: "relative",
    }}>
      <span aria-hidden style={{
        position: "absolute", left: 0, top: "0.7em",
        width: 6, height: 1,
        background: "rgba(212,160,32,.5)",
        display: "inline-block",
      }} />
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{
      position: "relative",
      margin: "clamp(36px,5vh,56px) 0",
      padding: "clamp(24px,3vw,36px) clamp(24px,3vw,40px)",
      borderLeft: "2px solid rgba(212,160,32,.45)",
      background: "rgba(212,160,32,.035)",
      fontSize: "clamp(17px,1.3vw,21px)",
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontStyle: "italic",
      color: "rgba(235,228,212,.82)",
      lineHeight: 1.6,
    }}>
      <span aria-hidden style={{
        position: "absolute", top: 6, left: "clamp(20px,2.6vw,32px)",
        fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1,
        color: "rgba(212,160,32,.28)",
      }}>
        &ldquo;
      </span>
      <div style={{ position: "relative", paddingTop: 18 }}>{children}</div>
    </blockquote>
  ),
  ArticleImage,
  ArticleCallout,
  ArticleCTA,
  hr: () => (
    <hr style={{
      border: "none",
      height: 1,
      background: "linear-gradient(to right, transparent, rgba(212,160,32,.2), transparent)",
      margin: "clamp(40px,6vh,64px) 0",
    }} />
  ),
};

function NavArrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", position: "relative",
      width: 18, height: 1, background: "rgba(212,160,32,.5)", flexShrink: 0,
      transform: dir === "prev" ? "scaleX(-1)" : "none",
    }}>
      <span style={{
        position: "absolute", right: -1, top: -3, width: 5, height: 5,
        borderRight: "1px solid rgba(212,160,32,.5)", borderTop: "1px solid rgba(212,160,32,.5)",
        transform: "rotate(45deg)",
      }} />
    </span>
  );
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const nextPost = idx > 0 ? allPosts[idx - 1] : null;

  const recentPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 5);

  const categories = Object.entries(
    allPosts.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "SuitWolf" },
    publisher: { "@type": "Organization", name: "SuitWolf", url: "https://suitwolf.com" },
  };

  return (
    <main style={{ background: "#050403", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══ Header ══ */}
      <header style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 60% at 78% 30%, rgba(168,108,5,.12) 0%, transparent 68%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(212,160,32,.14), transparent)",
        }} />

        <div className="article-shell" style={{ position: "relative", zIndex: 1 }}>
          <div className="article-header-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: "clamp(36px,5vw,72px)",
            alignItems: "center",
            padding: "clamp(40px,7vh,84px) 0 clamp(44px,6vh,72px)",
          }}>
            {/* Left: title block */}
            <div>
              <Link href="/blog" className="back-link" style={{
                display: "inline-flex", alignItems: "center", gap: 12, marginBottom: "clamp(28px,4vh,44px)",
                fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase",
                color: "rgba(180,174,164,.45)", textDecoration: "none",
              }}>
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center", width: 18, height: 1, background: "currentColor", transform: "scaleX(-1)" }}>
                  <span style={{ position: "absolute", right: -1, top: -3, width: 5, height: 5, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
                </span>
                Volver al blog
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <CategoryBadge label={post.category} />
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(212,160,32,.4)" }} />
                <span style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(212,160,32,.45)" }}>
                  {post.readingTime} min lectura
                </span>
              </div>

              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px,3.6vw,56px)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-.028em",
                color: "var(--color-text)",
                marginBottom: 24,
              }}>
                {post.title}
              </h1>

              <p style={{
                fontSize: "clamp(14px,1.1vw,17px)",
                color: "var(--color-text-3)",
                lineHeight: 1.8,
                marginBottom: "clamp(28px,4vh,40px)",
                maxWidth: 520,
              }}>
                {post.excerpt}
              </p>

              {/* Author row */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                  border: "1px solid rgba(212,160,32,.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "radial-gradient(circle at 50% 40%, rgba(168,108,5,.18), transparent 70%)",
                }}>
                  <WolfMark size={22} />
                </div>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(200,195,185,.55)", marginBottom: 5 }}>
                    Por SuitWolf
                  </p>
                  <p style={{ fontSize: 11, letterSpacing: ".05em", color: "var(--color-text-4)" }}>
                    {formatDate(post.date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: hero visual */}
            <div className="article-hero-visual" style={{
              position: "relative",
              height: "clamp(320px,40vh,480px)",
              border: "1px solid rgba(212,160,32,.1)",
              overflow: "hidden",
              background: post.coverImage ? undefined : "radial-gradient(ellipse 90% 80% at 55% 38%, rgba(168,108,5,.14) 0%, #0A0703 72%)",
            }}>
              {post.coverImage ? (
                <>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${post.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,4,3,.6), transparent 60%)" }} />
                </>
              ) : (
                <>
                  <div aria-hidden style={{
                    position: "absolute", inset: 0, opacity: 0.5,
                    backgroundImage: "radial-gradient(circle, rgba(212,160,32,.08) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
                    <WolfMark size={84} opacity={0.5} />
                    <span style={{ fontSize: 10, letterSpacing: ".44em", textTransform: "uppercase", color: "rgba(212,160,32,.4)" }}>
                      {post.category}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ══ Body: content + sidebar ══ */}
      <div className="article-shell">
        <div className="article-body-grid" style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) clamp(300px,30%,360px)",
          gap: "clamp(40px,5vw,80px)",
          padding: "clamp(40px,6vh,72px) 0 clamp(72px,9vh,110px)",
          alignItems: "start",
        }}>
          {/* Content */}
          <article style={{ minWidth: 0 }}>
            <MDXRemote source={post.content} components={mdxComponents} />

            <ArticleCTA variant="end" />

            <ShareRow url={`https://suitwolf.com/blog/${slug}`} title={post.title} />

            {/* Prev / Next */}
            {(prevPost || nextPost) && (
              <nav className="article-prevnext" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(12px,1.5vw,20px)",
                marginTop: "clamp(28px,4vh,40px)",
              }}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="prevnext-card" style={{
                    display: "block", padding: "clamp(20px,2vw,26px)",
                    border: "1px solid rgba(212,160,32,.12)", textDecoration: "none",
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 8, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(180,174,164,.4)", marginBottom: 12 }}>
                      <NavArrow dir="prev" /> Artículo anterior
                    </span>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 300, lineHeight: 1.3, color: "rgba(240,235,225,.85)", margin: 0 }}>
                      {prevPost.title}
                    </p>
                  </Link>
                ) : <span />}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="prevnext-card" style={{
                    display: "block", padding: "clamp(20px,2vw,26px)", textAlign: "right",
                    border: "1px solid rgba(212,160,32,.12)", textDecoration: "none",
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: 10, fontSize: 8, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(180,174,164,.4)", marginBottom: 12 }}>
                      Siguiente artículo <NavArrow dir="next" />
                    </span>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 300, lineHeight: 1.3, color: "rgba(240,235,225,.85)", margin: 0 }}>
                      {nextPost.title}
                    </p>
                  </Link>
                ) : <span />}
              </nav>
            )}
          </article>

          {/* Sidebar */}
          <div className="article-sidebar-col" style={{ position: "sticky", top: 88 }}>
            <ArticleSidebar recentPosts={recentPosts} categories={categories} />
          </div>
        </div>
      </div>

      <style>{`
        .article-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding-left: clamp(1.25rem, 5vw, 4rem);
          padding-right: clamp(1.25rem, 5vw, 4rem);
        }
        .back-link:hover { color: rgba(212,160,32,.8) !important; }
        .prevnext-card { transition: border-color .3s, background .3s; }
        .prevnext-card:hover { border-color: rgba(212,160,32,.3) !important; background: rgba(212,160,32,.03); }
        @media (max-width: 980px) {
          .article-header-grid { grid-template-columns: 1fr !important; }
          .article-hero-visual { height: clamp(220px,32vh,320px) !important; order: -1; }
          .article-body-grid { grid-template-columns: 1fr !important; }
          .article-sidebar-col { position: static !important; }
        }
        @media (max-width: 640px) {
          .article-end-cta { flex-direction: column !important; align-items: flex-start !important; }
          .article-end-cta-art { display: none !important; }
        }
        @media (max-width: 560px) {
          .article-prevnext { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
