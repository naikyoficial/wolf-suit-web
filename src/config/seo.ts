/**
 * Configuración central de SEO — fuente única de verdad para señales de
 * entidad, geo-targeting y datos estructurados (JSON-LD).
 *
 * Estrategia: un solo sitio en español neutro con base declarada en Paraná
 * (Entre Ríos, Argentina) para maximizar SEO local, sirviendo también a
 * España, México, el mercado hispano de EE.UU. y LatAm vía `areaServed`.
 * Sin variantes regionales ni hreflang (una sola URL por página).
 */

export const SEO = {
  name: "Suitwolf",
  legalName: "Suitwolf",
  url: "https://suitwolf.com",
  email: "proyectos@suitwolf.com",
  logo: "https://suitwolf.com/isotipo.webp",
  ogImage: "https://suitwolf.com/opengraph-image",
  /** Español neutro / LatAm. Señal de idioma sin comprometer un país. */
  locale: "es",
  description:
    "Agencia de diseño y desarrollo web premium. Construimos sitios web a medida, sin plantillas, que convierten visitantes en clientes. Diseño corporativo, e-commerce, landing pages y aplicaciones web para empresas exigentes.",
} as const;

/**
 * Base física de la firma — Paraná, Entre Ríos, Argentina.
 * Se expone como `address` + `geo` en el schema LocalBusiness para que
 * Google pueda anclar la entidad a Paraná (ranking local + 3-pack).
 * El teléfono en formato E.164 (mismo que WhatsApp comercial).
 */
export const SUITWOLF_BASE = {
  addressLocality: "Paraná",
  addressRegion: "Entre Ríos",
  addressCountry: "AR",
  /** ISO 3166-2 code — Entre Ríos = AR-E. Usado en meta geo.region. */
  regionCode: "AR-E",
  /** Coordenadas aproximadas del centro de Paraná. */
  geo: { latitude: -31.7319, longitude: -60.5238 },
  telephone: "+5493435343861",
} as const;

/**
 * Cobertura declarada. Entre Ríos primero (State) para reforzar señal
 * local; después países servidos vía remoto. Se expresa como `areaServed`
 * en el schema LocalBusiness.
 */
export const AREA_SERVED_STATES = [
  { name: "Entre Ríos", country: "AR" },
] as const;

export const AREA_SERVED = [
  "Argentina",
  "España",
  "México",
  "Estados Unidos",
  "Colombia",
  "Chile",
  "Perú",
  "Uruguay",
] as const;

/**
 * Perfiles oficiales de la marca para `sameAs` (reconciliación de entidad en
 * Google). Se completan a medida que existan — NO inventar URLs. Cargar aquí
 * LinkedIn, Instagram, Behance, Clutch, etc. cuando estén disponibles.
 */
export const SAME_AS: string[] = [];

/* ─── Nodos JSON-LD reutilizables ──────────────────────────────────────── */

const ORG_ID = `${SEO.url}/#organization`;
const WEBSITE_ID = `${SEO.url}/#website`;

/**
 * Organization + ProfessionalService (subtipo de LocalBusiness válido).
 * Incluye address + geo + telephone para señal local fuerte hacia Paraná.
 */
export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SEO.name,
    legalName: SEO.legalName,
    url: SEO.url,
    email: SEO.email,
    telephone: SUITWOLF_BASE.telephone,
    logo: SEO.logo,
    image: SEO.ogImage,
    description: SEO.description,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: SUITWOLF_BASE.addressLocality,
      addressRegion: SUITWOLF_BASE.addressRegion,
      addressCountry: SUITWOLF_BASE.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SUITWOLF_BASE.geo.latitude,
      longitude: SUITWOLF_BASE.geo.longitude,
    },
    // 24/7 online — servicios y comunicación siempre disponibles vía WhatsApp/email
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      ...AREA_SERVED_STATES.map((s) => ({
        "@type": "State",
        name: s.name,
        containedInPlace: { "@type": "Country", name: "Argentina" },
      })),
      ...AREA_SERVED.map((name) => ({ "@type": "Country", name })),
    ],
    knowsLanguage: ["es", "en"],
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SEO.email,
      telephone: SUITWOLF_BASE.telephone,
      availableLanguage: ["Spanish", "English"],
      areaServed: SUITWOLF_BASE.addressCountry,
    },
    knowsAbout: [
      "Diseño web",
      "Desarrollo web a medida",
      "Diseño web corporativo",
      "E-commerce",
      "Landing pages de alta conversión",
      "Aplicaciones web a medida",
      "SEO técnico",
      "SEO local",
      "Branding digital",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de diseño y desarrollo web",
      itemListElement: [
        "Sitio Web Corporativo a Medida",
        "Landing Page de Alta Conversión",
        "Tienda Online / E-commerce Premium",
        "Aplicación Web a Medida",
        "SEO y Posicionamiento Web",
        "Presencia Personal y Marca",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

/** WebSite — clarifica la entidad del sitio. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SEO.url,
    name: SEO.name,
    inLanguage: "es",
    publisher: { "@id": ORG_ID },
  };
}

/** Migas de pan para páginas internas (rich result activo). */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Service — refuerza entendimiento de entidad/tema por página de servicio. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ORG_ID },
    areaServed: [
      ...AREA_SERVED_STATES.map((s) => ({
        "@type": "State",
        name: s.name,
        containedInPlace: { "@type": "Country", name: "Argentina" },
      })),
      ...AREA_SERVED.map((name) => ({ "@type": "Country", name })),
    ],
    inLanguage: "es",
  };
}

/** Grafo raíz (Organization + WebSite) para el layout global. */
export function rootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema()],
  };
}
