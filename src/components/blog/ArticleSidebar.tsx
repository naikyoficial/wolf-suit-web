import Link from "next/link";
import type { PostMeta } from "@/lib/blog-types";
import { SidebarNewsletter } from "./SidebarNewsletter";
import { WolfMark } from "./WolfMark";

const GRADIENTS = [
  "linear-gradient(135deg, #0D0B06 0%, #241A0A 60%, #0A0803 100%)",
  "linear-gradient(135deg, #0A0D0A 0%, #11200F 60%, #080A08 100%)",
  "linear-gradient(135deg, #0D0A0D 0%, #1C111C 60%, #0A080A 100%)",
  "linear-gradient(135deg, #0D0D0A 0%, #1F1B0C 60%, #0A0A06 100%)",
];
function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) & 0xffff;
  return h % GRADIENTS.length;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
      <span style={{
        fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase",
        color: "rgba(212,160,32,.55)",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(212,160,32,.1)" }} />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      border: "1px solid rgba(212,160,32,.12)",
      background: "rgba(255,255,255,.015)",
      padding: "clamp(22px,1.8vw,30px)",
    }}>
      {children}
    </div>
  );
}

export function ArticleSidebar({
  recentPosts,
  categories,
}: {
  recentPosts: PostMeta[];
  categories: { name: string; count: number }[];
}) {
  return (
    <aside className="article-sidebar" style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,2vw,28px)" }}>

      {/* ── Author ── */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
            border: "1px solid rgba(212,160,32,.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "radial-gradient(circle at 50% 40%, rgba(168,108,5,.18), transparent 70%)",
          }}>
            <WolfMark size={26} />
          </div>
          <div>
            <p style={{ fontSize: 9, letterSpacing: ".34em", textTransform: "uppercase", color: "rgba(180,174,164,.4)", marginBottom: 6 }}>
              Sobre el autor
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--color-text)", lineHeight: 1 }}>
              SuitWolf
            </p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(200,195,185,.58)", lineHeight: 1.75, marginBottom: 22 }}>
          Firma boutique especializada en estrategia digital, diseño web y experiencias de marca premium.
        </p>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          fontSize: 9, letterSpacing: ".28em", textTransform: "uppercase",
          color: "rgba(212,160,32,.8)", textDecoration: "none",
        }}>
          Conocé más sobre nosotros
          <span style={{
            display: "inline-flex", alignItems: "center", position: "relative",
            width: 16, height: 1, background: "currentColor",
          }}>
            <span style={{
              position: "absolute", right: -1, top: -3, width: 5, height: 5,
              borderRight: "1px solid currentColor", borderTop: "1px solid currentColor",
              transform: "rotate(45deg)",
            }} />
          </span>
        </Link>
      </Card>

      {/* ── Recent articles ── */}
      {recentPosts.length > 0 && (
        <div>
          <SectionLabel>Artículos recientes</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {recentPosts.map((p) => {
              const bg = GRADIENTS[hashSlug(p.slug)];
              return (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  style={{ display: "flex", gap: 14, textDecoration: "none", alignItems: "flex-start" }}>
                  <div style={{
                    width: 64, height: 64, flexShrink: 0, overflow: "hidden",
                    border: "1px solid rgba(212,160,32,.12)",
                    background: p.coverImage ? undefined : bg,
                    backgroundImage: p.coverImage ? `url(${p.coverImage})` : undefined,
                    backgroundSize: "cover", backgroundPosition: "center",
                    position: "relative",
                  }}>
                    {!p.coverImage && (
                      <div aria-hidden style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse 70% 60% at 60% 35%, rgba(168,108,5,.18) 0%, transparent 70%)",
                      }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 8, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(212,160,32,.55)", marginBottom: 7 }}>
                      {p.category}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 300,
                      lineHeight: 1.3, color: "rgba(240,235,225,.86)", margin: "0 0 7px",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {p.title}
                    </p>
                    <p style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(180,174,164,.4)" }}>
                      {p.readingTime} min lectura
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Categories ── */}
      {categories.length > 0 && (
        <Card>
          <SectionLabel>Categorías</SectionLabel>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {categories.map((c) => (
              <li key={c.name}>
                <Link href="/blog" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "9px 0", textDecoration: "none",
                  borderBottom: "1px solid rgba(212,160,32,.06)",
                }}>
                  <span style={{ fontSize: 13, color: "rgba(210,205,195,.7)" }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: "rgba(212,160,32,.5)", letterSpacing: ".05em" }}>({c.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* ── Newsletter ── */}
      <Card>
        <SidebarNewsletter />
      </Card>
    </aside>
  );
}
