import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/config/blog";

/**
 * Portadas de blog estilo miniatura YouTube: hook corto grande + icono
 * representativo. Servido como image/svg+xml (800×600).
 */

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** Iconos estilo trazo (stroke) — inspirados en Lucide, dimensionados 220×220. */
const ICONS: Record<string, string> = {
  dollar: `<circle cx="110" cy="110" r="92"/><path d="M110 42 v136 M138 66 h-42 a20 20 0 0 0 0 40 h30 a20 20 0 0 1 0 40 h-42"/>`,
  cart: `<circle cx="80" cy="180" r="12"/><circle cx="160" cy="180" r="12"/><path d="M10 30 h30 l24 106 h108 l20 -70 h-138"/>`,
  globe: `<circle cx="110" cy="110" r="92"/><path d="M18 110 h184 M110 18 c26 24 26 160 0 184 M110 18 c-26 24 -26 160 0 184"/>`,
  vs: `<path d="M50 60 l30 90 l30 -90 M130 60 v90 M130 60 h30 a20 20 0 0 1 0 40 h-30 M130 100 h30 l20 50"/>`,
  clock: `<circle cx="110" cy="110" r="92"/><path d="M110 48 v62 l40 26"/>`,
  refresh: `<path d="M32 60 A80 80 0 0 1 176 90 M176 30 v60 h-60"/><path d="M188 160 A80 80 0 0 1 44 130 M44 190 v-60 h60"/>`,
  briefcase: `<rect x="20" y="60" width="180" height="120" rx="8"/><path d="M75 60 v-20 a10 10 0 0 1 10 -10 h50 a10 10 0 0 1 10 10 v20 M20 110 h180"/>`,
  home: `<path d="M20 110 L110 30 L200 110 M40 100 v90 h140 v-90 M85 190 v-50 h50 v50"/>`,
  target: `<circle cx="110" cy="110" r="92"/><circle cx="110" cy="110" r="56"/><circle cx="110" cy="110" r="18"/>`,
  bag: `<path d="M30 70 h160 l-14 130 h-132 z M70 70 v-24 a40 40 0 0 1 80 0 v24"/>`,
  utensils: `<path d="M50 20 v80 a20 20 0 0 0 40 0 v-80 M70 100 v100"/><path d="M170 20 v100 M170 100 c-20 0 -30 -30 -30 -60 s10 -20 30 -20 M170 120 v80"/>`,
  cross: `<rect x="20" y="20" width="180" height="180" rx="20"/><path d="M110 60 v100 M60 110 h100" stroke-width="14"/>`,
  gauge: `<path d="M18 150 A92 92 0 1 1 202 150"/><path d="M110 150 L160 78"/><circle cx="110" cy="150" r="10" fill="currentColor"/>`,
  trending: `<path d="M20 170 L80 110 L120 150 L200 60 M140 60 h60 v60"/>`,
  warning: `<path d="M110 20 L200 190 H20 Z"/><path d="M110 88 v50 M110 168 v2" stroke-width="14"/>`,
  search: `<circle cx="90" cy="90" r="66"/><path d="M138 138 L198 198"/>`,
  cursor: `<path d="M50 30 L170 100 L110 118 L92 178 Z"/>`,
  pen: `<path d="M30 190 L60 170 L170 60 L200 90 L90 200 L60 190 L30 190 Z M150 80 L180 110"/>`,
  shield: `<path d="M110 20 L30 50 v70 c0 40 32 76 80 90 c48 -14 80 -50 80 -90 v-70 Z"/><path d="M75 110 L100 135 L150 85"/>`,
  sparkles: `<path d="M110 20 L125 90 L195 110 L125 130 L110 200 L95 130 L25 110 L95 90 Z M170 30 L178 55 L200 60 L178 65 L170 90 L162 65 L140 60 L162 55 Z"/>`,
  checklist: `<rect x="30" y="30" width="160" height="160" rx="14"/><path d="M60 90 L78 108 L110 76 M60 150 L78 168 L110 136 M130 92 h50 M130 152 h50"/>`,
  code: `<path d="M70 60 L20 110 L70 160 M150 60 L200 110 L150 160 M130 40 L90 180"/>`,
};

/** Mapa slug → { hook corto (≤ 18 char/línea), icono }. */
const COVER_MAP: Record<string, { hook: string[]; icon: string }> = {
  "como-elegir-agencia-de-diseno-web": { hook: ["ELEGIR", "AGENCIA WEB"], icon: "checklist" },
  "diseno-web-a-medida-vs-plantilla": { hook: ["A MEDIDA", "vs PLANTILLA"], icon: "vs" },

  "cuanto-cuesta-una-pagina-web-para-empresa": { hook: ["¿CUÁNTO SALE", "UNA WEB?"], icon: "dollar" },
  "cuanto-cuesta-una-tienda-online-profesional": { hook: ["PRECIO DE UN", "E-COMMERCE"], icon: "cart" },
  "agencia-diseno-web-empresas-hispanas-estados-unidos": { hook: ["AGENCIA WEB", "EN ESPAÑOL"], icon: "globe" },
  "wordpress-vs-desarrollo-web-a-medida": { hook: ["WORDPRESS", "vs A MEDIDA"], icon: "code" },
  "cuanto-tarda-hacer-una-pagina-web": { hook: ["¿CUÁNTO", "TARDA?"], icon: "clock" },
  "cuando-conviene-rediseno-web": { hook: ["¿REDISEÑAR", "O NO?"], icon: "refresh" },
  "pagina-web-para-consultora": { hook: ["WEB PARA", "CONSULTORAS"], icon: "briefcase" },
  "pagina-web-inmobiliaria": { hook: ["WEB PARA", "INMOBILIARIAS"], icon: "home" },
  "cuanto-cuesta-landing-page-alta-conversion": { hook: ["PRECIO DE", "UNA LANDING"], icon: "target" },
  "shopify-vs-tienda-online-a-medida": { hook: ["SHOPIFY vs", "A MEDIDA"], icon: "bag" },
  "pagina-web-para-restaurantes-premium": { hook: ["WEB PARA", "RESTAURANTES"], icon: "utensils" },
  "pagina-web-clinicas-consultorios": { hook: ["WEB PARA", "CLÍNICAS"], icon: "cross" },

  "core-web-vitals-empresas": { hook: ["CORE WEB", "VITALS"], icon: "gauge" },
  "como-aumentar-tasa-conversion-sitio-web": { hook: ["SUBIR TU", "CONVERSIÓN"], icon: "trending" },
  "errores-comunes-diseno-web-empresas": { hook: ["ERRORES DE", "DISEÑO WEB"], icon: "warning" },
  "seo-tecnico-para-empresas": { hook: ["SEO", "TÉCNICO"], icon: "search" },
  "diseno-ux-por-que-impacta-ventas": { hook: ["¿QUÉ ES", "EL UX?"], icon: "cursor" },
  "como-escribir-copy-pagina-web-vende": { hook: ["COPY", "QUE VENDE"], icon: "pen" },
  "seguridad-web-empresas": { hook: ["SEGURIDAD", "WEB"], icon: "shield" },
  "tendencias-diseno-web-empresas-2026": { hook: ["TENDENCIAS", "WEB 2026"], icon: "sparkles" },
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return new NextResponse("Not found", { status: 404 });

  const meta = COVER_MAP[slug] ?? { hook: [post.title.slice(0, 24)], icon: "sparkles" };
  const iconPath = ICONS[meta.icon] ?? ICONS.sparkles;
  const hook = meta.hook;

  // Tipografía tipo miniatura YouTube: sans-serif black, MAYÚSCULAS
  const fontStack =
    "Inter, 'Helvetica Neue', 'Arial Black', system-ui, -apple-system, sans-serif";
  const fontSize = hook.length === 1 ? 96 : 82;
  const lineHeight = fontSize * 0.98;
  const totalH = lineHeight * hook.length;
  const startY = 300 - totalH / 2 + fontSize * 0.78;

  const tspans = hook
    .map(
      (l, i) =>
        `<tspan x="60" y="${startY + i * lineHeight}">${escapeXml(l)}</tspan>`,
    )
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#151109"/>
      <stop offset="1" stop-color="#0a0705"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#E9C87A" stop-opacity="0.35"/>
      <stop offset="0.55" stop-color="#B98A3E" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#B98A3E" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#B98A3E"/>
      <stop offset="0.5" stop-color="#F5E0A8"/>
      <stop offset="1" stop-color="#B98A3E"/>
    </linearGradient>
    <linearGradient id="goldFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#D9B36A"/>
      <stop offset="1" stop-color="#F5E0A8"/>
    </linearGradient>
    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 H0 V40" fill="none" stroke="#D9B36A" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Fondo -->
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#grid)"/>
  <rect width="800" height="600" fill="url(#glow)"/>

  <!-- Marca superior -->
  <g>
    <text x="60" y="72" font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
          font-size="12" letter-spacing="4" fill="#D9B36A" fill-opacity="0.9" font-weight="600">
      SUITWOLF · BLOG
    </text>
    <rect x="60" y="86" width="56" height="2" fill="url(#gold)"/>
  </g>

  <!-- Icono grande a la derecha -->
  <g transform="translate(490, 190)"
     fill="none" stroke="url(#goldFill)" stroke-width="8"
     stroke-linecap="round" stroke-linejoin="round">
    ${iconPath}
  </g>

  <!-- Hook grande estilo thumbnail -->
  <text font-family="${fontStack}" font-size="${fontSize}" font-weight="900"
        fill="#F8F1E0" letter-spacing="-3">
    ${tspans}
  </text>

  <!-- Pie -->
  <text x="60" y="552" font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="12" letter-spacing="3" fill="#8A7B5A" font-weight="600">
    ${post.readingMinutes} MIN
  </text>
  <text x="740" y="552" text-anchor="end"
        font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="12" letter-spacing="3" fill="#8A7B5A" font-weight="600">
    SUITWOLF.COM
  </text>

  <!-- Borde sutil -->
  <rect x="1" y="1" width="798" height="598" fill="none" stroke="#B98A3E" stroke-opacity="0.15" stroke-width="1"/>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
