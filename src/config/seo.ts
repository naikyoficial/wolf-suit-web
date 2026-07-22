/**
 * Configuración central de SEO — fuente única de verdad para señales de
 * entidad, geo-targeting y datos estructurados (JSON-LD).
 *
 * Estrategia: un solo sitio en español neutro que compite en España, México,
 * Argentina, el mercado hispano de EE.UU. y LatAm. Sin variantes regionales ni
 * hreflang (una sola URL por página), señalando cobertura con `areaServed`.
 */

export const SEO = {
  name: "Suitwolf",
  legalName: "Suitwolf",
  url: "https://suitwolf.com",
  email: "proyectos@suitwolf.com",
  logo: "https://suitwolf.com/isotipo.png",
  ogImage: "https://suitwolf.com/opengraph-image",
  /** Español neutro / LatAm. Señal de idioma sin comprometer un país. */
  locale: "es",
  description:
    "Agencia de diseño y desarrollo web premium. Construimos sitios web a medida, sin plantillas, que convierten visitantes en clientes. Diseño corporativo, e-commerce, landing pages y aplicaciones web para empresas exigentes.",
} as const;

/**
 * Mercados donde ofrecemos servicio. Se expresa en el schema como `areaServed`
 * — la forma correcta de comunicar cobertura para un negocio de área de
 * servicio (sin local físico de cara al público).
 */
export const AREA_SERVED = [
  "España",
  "México",
  "Argentina",
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

/** Organization + ProfessionalService (subtipo de LocalBusiness válido). */
export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SEO.name,
    legalName: SEO.legalName,
    url: SEO.url,
    email: SEO.email,
    logo: SEO.logo,
    image: SEO.ogImage,
    description: SEO.description,
    priceRange: "$$$$",
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Country", name })),
    knowsLanguage: ["es", "en"],
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SEO.email,
      availableLanguage: ["Spanish", "English"],
    },
    knowsAbout: [
      "Diseño web",
      "Desarrollo web a medida",
      "Diseño web corporativo",
      "E-commerce",
      "Landing pages de alta conversión",
      "Aplicaciones web a medida",
      "SEO técnico",
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
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Country", name })),
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
