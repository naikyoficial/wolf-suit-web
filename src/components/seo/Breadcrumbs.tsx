import Link from "next/link";
import { breadcrumbSchema } from "@/config/seo";

export interface Crumb {
  name: string;
  url: string;
}

/**
 * Migas de pan: navegación visible + BreadcrumbList JSON-LD (rich result activo).
 * El último item es la página actual (sin enlace).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }}
      />
      <nav
        aria-label="Migas de pan"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          color: "var(--color-text-4)",
        }}
      >
        <ol style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.url} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {isLast ? (
                  <span aria-current="page" style={{ color: "var(--color-gold)" }}>
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.url.replace("https://suitwolf.com", "") || "/"} style={{ color: "inherit", textDecoration: "none" }}>
                      {item.name}
                    </Link>
                    <span aria-hidden style={{ color: "rgba(212,160,32,.4)" }}>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
