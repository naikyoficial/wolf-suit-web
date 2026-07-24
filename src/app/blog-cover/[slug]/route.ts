import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/config/blog";

/**
 * Genera un SVG dinámico como portada de blog cuando no hay imagen real.
 * Se sirve como image/svg+xml para que se pueda usar en <Image src="..." />.
 * URL: /blog-cover/[slug]
 */

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** Corta el título en líneas de ≤ maxCharsPorLinea sin partir palabras. */
function wrapTitle(title: string, maxChars = 22): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars && current) {
      lines.push(current);
      current = w;
    } else {
      current = current ? `${current} ${w}` : w;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return new NextResponse("Not found", { status: 404 });

  const lines = wrapTitle(post.title, 24);
  const fontSize = lines.length >= 4 ? 44 : lines.length === 3 ? 52 : 62;
  const lineHeight = fontSize * 1.06;
  const totalHeight = lineHeight * lines.length;
  const startY = 300 - totalHeight / 2 + fontSize * 0.85;

  const tspans = lines
    .map(
      (l, i) =>
        `<tspan x="60" y="${startY + i * lineHeight}">${escapeXml(l)}</tspan>`,
    )
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#14110c"/>
      <stop offset="1" stop-color="#0a0906"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.25" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#B98A3E" stop-opacity="0.32"/>
      <stop offset="0.5" stop-color="#B98A3E" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#B98A3E" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#B98A3E"/>
      <stop offset="0.5" stop-color="#F1DCA4"/>
      <stop offset="1" stop-color="#B98A3E"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.6" fill="#D9B36A" fill-opacity="0.08"/>
    </pattern>
  </defs>

  <!-- Fondo -->
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#dots)"/>
  <rect width="800" height="600" fill="url(#glow)"/>

  <!-- Marca superior -->
  <text x="60" y="70" font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="11" letter-spacing="4" fill="#D9B36A" fill-opacity="0.85">
    SUITWOLF · BLOG
  </text>

  <!-- Línea decorativa oro -->
  <rect x="60" y="90" width="48" height="1.5" fill="url(#gold)"/>

  <!-- Título -->
  <text font-family="Georgia, 'Instrument Serif', 'Times New Roman', serif"
        font-size="${fontSize}" font-style="italic" fill="#F5EFDF"
        letter-spacing="-1">
    ${tspans}
  </text>

  <!-- Minutos + label inferior -->
  <text x="60" y="550" font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="11" letter-spacing="3" fill="#8A7B5A">
    ${post.readingMinutes} MIN DE LECTURA
  </text>

  <!-- Marca de agua a la derecha -->
  <text x="740" y="550" text-anchor="end"
        font-family="Georgia, 'Instrument Serif', serif"
        font-size="14" font-style="italic" fill="#B98A3E" fill-opacity="0.5">
    suitwolf.com
  </text>

  <!-- Borde sutil -->
  <rect x="0.5" y="0.5" width="799" height="599" fill="none" stroke="#B98A3E" stroke-opacity="0.12"/>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
