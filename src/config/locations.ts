/**
 * Páginas de ciudad (/diseno-web-[ciudad]) — la mejor jugada local para un
 * dominio nuevo. IMPORTANTE: son POCAS y GENUINAMENTE DIFERENCIADAS, no clones
 * de plantilla (evita el riesgo de doorway/contenido duplicado que penaliza
 * Google). Cada una usa el vocabulario regional real de su mercado
 * (presupuesto/cotización/"cuánto sale") y su contexto de mercado propio.
 *
 * Pilotos: un mercado por página (España, México, EE.UU. hispano, Argentina)
 * en ciudades de buena relación valor/competencia según la investigación.
 * Para escalar: replicar SOLO con contenido local real y distinto por ciudad.
 */

export interface LocationPage {
  slug: string;
  city: string;
  region: string;
  country: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Introducción con contexto de mercado propio (única por ciudad). */
  intro: string[];
  /** Verbo/frase de conversión regional (presupuesto / cotización / cuánto sale). */
  quoteWord: string;
  /** Sección de por qué remoto/nosotros, adaptada al mercado. */
  localAngle: string;
  faqs: { q: string; a: string }[];
}

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "diseno-web-valencia",
    city: "Valencia",
    region: "Comunidad Valenciana",
    country: "España",
    seoTitle: "Diseño Web en Valencia a Medida | Suitwolf",
    metaDescription:
      "Diseño web profesional en Valencia, a medida y sin plantillas. Sitios corporativos, tiendas online y landing pages para empresas valencianas. Pide tu presupuesto.",
    h1: "Diseño web a medida para empresas de Valencia",
    intro: [
      "Madrid y Barcelona concentran a la mayoría de las agencias, pero el tejido empresarial de Valencia —industria, agroalimentario, servicios y un ecosistema tecnológico en crecimiento— compite en los mismos mercados y merece una presencia digital del mismo nivel.",
      "Diseñamos y desarrollamos sitios web a medida para empresas valencianas: sin plantillas, con la estrategia, el diseño y el rendimiento técnico que instalan autoridad frente a tu competencia.",
    ],
    quoteWord: "presupuesto",
    localAngle:
      "Trabajamos con empresas de Valencia y toda la Comunidad Valenciana de forma 100% remota, con un proceso pensado para colaborar a distancia sin perder cercanía. La distancia no cambia el estándar: el mismo diseño a medida, el mismo rigor técnico.",
    faqs: [
      {
        q: "¿Trabajáis con empresas de Valencia en remoto?",
        a: "Sí. Colaboramos con empresas valencianas de forma 100% remota, con reuniones por videollamada e hitos de entrega claros. El resultado es el mismo que en persona: diseño a medida y desarrollo de primer nivel.",
      },
      {
        q: "¿Cuánto cuesta una página web para una empresa en Valencia?",
        a: "Cada proyecto se presupuesta a medida según su alcance. La evaluación inicial es sin coste y define exactamente qué necesita tu empresa antes de hablar de cifras, con una propuesta clara y sin sorpresas.",
      },
    ],
  },
  {
    slug: "diseno-web-monterrey",
    city: "Monterrey",
    region: "Nuevo León",
    country: "México",
    seoTitle: "Diseño Web en Monterrey a la Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a la medida en Monterrey, sin plantillas. Sitios corporativos, tiendas en línea y aplicaciones web para empresas regias. Cotiza tu proyecto.",
    h1: "Diseño web a la medida para empresas de Monterrey",
    intro: [
      "Monterrey es uno de los mercados empresariales más exigentes de México: capital industrial, sede de corporativos y de un ecosistema de negocios que compite a nivel internacional. Ese nivel de exigencia se nota —o debería notarse— en la presencia digital de cada empresa regia.",
      "Construimos sitios web a la medida para empresas de Monterrey: diseño 100% original, sin plantillas, con desarrollo técnico y SEO desde el primer día para que tu marca proyecte el nivel que realmente tiene.",
    ],
    quoteWord: "cotización",
    localAngle:
      "Trabajamos con empresas de Monterrey y todo Nuevo León de manera remota, con procesos pensados para colaborar a distancia. Atendemos también al resto de México y al mercado hispano de Estados Unidos con el mismo estándar.",
    faqs: [
      {
        q: "¿Cómo puedo cotizar un sitio web en Monterrey?",
        a: "La cotización se hace a la medida de tu proyecto. Empezamos con una evaluación sin costo que define el alcance exacto, y a partir de ahí te entregamos una propuesta clara, sin paquetes genéricos.",
      },
      {
        q: "¿Trabajan con empresas de Monterrey de forma remota?",
        a: "Sí. Colaboramos con empresas regias 100% en remoto, con videollamadas y entregas por hitos. El estándar de diseño y desarrollo es el mismo, estés donde estés.",
      },
    ],
  },
  {
    slug: "diseno-web-houston",
    city: "Houston",
    region: "Texas",
    country: "Estados Unidos",
    seoTitle: "Diseño de Páginas Web en Houston en Español | Suitwolf",
    metaDescription:
      "Diseño de páginas web profesionales en Houston, en español y a la medida. Sitios corporativos y tiendas en línea para el mercado hispano de Texas. Pide tu cotización.",
    h1: "Diseño de páginas web en español para empresas de Houston",
    intro: [
      "Houston tiene una de las comunidades de negocios hispanos más grandes de Estados Unidos, y muchas empresas necesitan una presencia digital profesional en español que hable directo a su mercado —sin depender de plantillas ni de licencias que no controlan.",
      "Diseñamos páginas web a la medida, en español, para empresas hispanas de Houston y todo Texas: el sitio queda a nombre de tu empresa, construido desde cero, optimizado para atraer a tus clientes.",
    ],
    quoteWord: "cotización",
    localAngle:
      "Trabajamos de forma remota con empresas hispanas de Houston, Dallas, San Antonio y todo Texas. Un solo equipo, en tu idioma, con el estándar de diseño y desarrollo que tu marca necesita para competir.",
    faqs: [
      {
        q: "¿El sitio web queda a nombre de mi empresa?",
        a: "Sí. Registramos el dominio y entregamos el sitio a nombre de tu empresa, con todos los accesos. Es tuyo: sin licencias que te aten ni dependencias del proveedor.",
      },
      {
        q: "¿Atienden en español a empresas de Houston?",
        a: "Sí. Trabajamos en español con empresas hispanas de Houston y todo Texas, de forma remota, con un proceso claro y entregas por hitos.",
      },
    ],
  },
  {
    slug: "diseno-web-buenos-aires",
    city: "Buenos Aires",
    region: "Argentina",
    country: "Argentina",
    seoTitle: "Diseño Web en Buenos Aires a Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a medida en Buenos Aires, sin plantillas. Sitios corporativos, tiendas online y landing pages para empresas argentinas. Pedí tu presupuesto.",
    h1: "Diseño web a medida para empresas de Buenos Aires",
    intro: [
      "En Buenos Aires abundan las opciones de diseño web, pero pocas construyen a medida y menos aún piensan cada proyecto desde la estrategia. La mayoría vende plantillas: el mismo diseño que ya tienen miles de sitios, que te obliga a competir por precio.",
      "Nosotros hacemos lo contrario. Diseñamos y desarrollamos sitios a medida para empresas porteñas —sin plantillas—, con la estrategia, el diseño y el rendimiento técnico que instalan autoridad y generan consultas de mayor valor.",
    ],
    quoteWord: "presupuesto",
    localAngle:
      "Trabajamos con empresas de Buenos Aires y todo el país de forma remota, y también con clientes de España, México y Estados Unidos. El mismo estándar, estés donde estés.",
    faqs: [
      {
        q: "¿Cuánto sale una página web para una empresa en Buenos Aires?",
        a: "Cada proyecto se presupuesta a medida según su alcance: no vendemos paquetes genéricos. La evaluación inicial es sin costo y define qué necesita tu empresa antes de hablar de números.",
      },
      {
        q: "¿Trabajan con empresas de Buenos Aires de forma remota?",
        a: "Sí. Colaboramos 100% en remoto, con videollamadas y entregas por hitos. El proceso es claro y el estándar de diseño y desarrollo es el mismo que en persona.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((l) => l.slug === slug);
}
