/**
 * Páginas de servicio indexables — el mayor motor de ranking del sitio.
 * Cada servicio es una URL propia (/servicios/[slug]) con su intención de
 * búsqueda, título SEO, meta description, contenido profundo y FAQ.
 *
 * Keywords mapeadas desde la investigación: se prioriza intención comercial +
 * atacabilidad para un dominio nuevo (a medida, sin plantillas, corporativo,
 * tienda online, aplicaciones a medida, landing de alta conversión).
 */

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  /** Título de navegación / breadcrumb. */
  navTitle: string;
  /** <title> SEO — ≤60 car., keyword al frente + marca. */
  seoTitle: string;
  metaDescription: string;
  /** Etiqueta pequeña sobre el H1. */
  kicker: string;
  /** H1 — una intención clara. */
  h1: string;
  /** Tipo de servicio para el schema Service. */
  serviceType: string;
  primaryKeyword: string;
  /** Optional hero image path (relative to /public). */
  cover?: string;
  /** Introducción (1-2 párrafos). */
  intro: string;
  /** El problema que resuelve (dolor del cliente). */
  problem: string;
  /** Cómo lo hacemos — puntos concretos. */
  approach: { title: string; body: string }[];
  /** Qué se entrega. */
  deliverables: string[];
  /** Resultados / outcomes. */
  outcomes: string[];
  /** FAQ — alimenta FAQPage schema y captura las dudas de búsqueda. */
  faqs: ServiceFaq[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "diseno-web-corporativo",
    navTitle: "Diseño Web Corporativo",
    seoTitle: "Diseño Web Corporativo a Medida | Suitwolf",
    metaDescription:
      "Diseño web corporativo a medida para empresas. Sitios sin plantillas que instalan autoridad, generan confianza y convierten. Arquitectura, diseño y desarrollo desde cero.",
    kicker: "Sitio Web Corporativo",
    h1: "Diseño web corporativo que posiciona a tu empresa como referente",
    serviceType: "Diseño web corporativo",
    primaryKeyword: "diseño web corporativo",
    cover: "/sitio web corporativo.png",
    intro:
      "Tu sitio web es el primer filtro que atraviesan tus clientes. Lo que encuentran ahí decide si avanzan o se van. Construimos sitios corporativos a medida —sin plantillas— donde cada decisión de arquitectura, diseño y desarrollo responde a una estrategia: convertir esa primera impresión en leads calificados y autoridad de marca.",
    problem:
      "Una web genérica obliga a tu empresa a competir por precio. Si el mercado te percibe como uno más, negociás desde abajo. La percepción precede a la confianza, y la confianza precede a la decisión de compra.",
    approach: [
      {
        title: "Arquitectura estratégica",
        body: "Definimos la estructura, la narrativa y los recorridos del usuario antes de diseñar una sola pantalla. Nada es decoración: cada sección tiene un objetivo de conversión.",
      },
      {
        title: "Sistema visual exclusivo",
        body: "Diseño 100% original alineado a tu posicionamiento. Sin plantillas compartidas con miles de sitios: una identidad que te distingue de tu competencia.",
      },
      {
        title: "Desarrollo técnico de nivel",
        body: "Código limpio y escalable, performance 90+ en PageSpeed, y SEO técnico desde el día uno. La tecnología es parte del estándar, no un agregado.",
      },
    ],
    deliverables: [
      "Diseño 100% original, sin plantillas",
      "Arquitectura orientada a conversión",
      "Performance 90+ en PageSpeed",
      "SEO técnico desde el día uno",
      "Diseño responsive perfecto en todo dispositivo",
    ],
    outcomes: [
      "El mercado percibe a tu empresa como referente de su sector",
      "Más leads calificados y consultas de mayor valor",
      "Autoridad de marca que te saca de la competencia por precio",
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta un sitio web corporativo?",
        a: "Cada proyecto se cotiza a medida según su alcance: no vendemos paquetes genéricos. La evaluación inicial es sin costo y define exactamente qué necesita tu empresa; recién ahí hablamos de una propuesta clara y sin sorpresas.",
      },
      {
        q: "¿Por qué no trabajan con plantillas?",
        a: "Una plantilla es, por definición, lo contrario de diferenciarse: el mismo diseño compartido con miles de sitios. Todo lo que construimos parte de cero, alineado a la estrategia de tu negocio.",
      },
      {
        q: "¿Cuánto tarda el desarrollo?",
        a: "Depende de la complejidad. El plazo exacto queda definido por escrito en la propuesta, con hitos de entrega que se cumplen.",
      },
      {
        q: "¿Trabajan con empresas fuera de Argentina?",
        a: "Sí. Trabajamos con empresas de España, México, Estados Unidos y toda LatAm de forma 100% remota, con procesos pensados para colaborar a distancia.",
      },
    ],
  },
  {
    slug: "tienda-online",
    navTitle: "Tienda Online",
    seoTitle: "Tienda Online Profesional a Medida | Suitwolf",
    metaDescription:
      "Diseño de tienda online profesional y e-commerce premium. Checkout sin fricción, integración de pagos y envíos, catálogo optimizado para vender más. Desde cero, a medida.",
    kicker: "E-commerce Premium",
    h1: "Tiendas online profesionales diseñadas para vender más",
    serviceType: "Diseño de tienda online / e-commerce",
    primaryKeyword: "tienda online profesional",
    cover: "/tienda online.png",
    intro:
      "El 70% de los carritos se abandonan antes del pago —casi siempre por fricción en el flujo o falta de confianza visual. Los e-commerce que construimos atacan ese número desde el diseño: catálogos que exhiben, checkouts que no obstruyen y una integración técnica pensada para maximizar el ticket promedio.",
    problem:
      "Una tienda mal diseñada drena tu inversión en tráfico sin devolver ventas. Cada paso confuso, cada segundo de carga y cada señal de desconfianza es un carrito perdido.",
    approach: [
      {
        title: "Experiencia de compra de lujo",
        body: "Diseño que exhibe tus productos y guía al usuario sin fricción, desde la primera visita hasta el pago.",
      },
      {
        title: "Checkout sin fricción",
        body: "Un proceso de pago corto, claro y con las señales de confianza que reducen el abandono de carrito.",
      },
      {
        title: "Integración técnica completa",
        body: "Pasarelas de pago, envíos y gestión de catálogo integrados y optimizados para el máximo ticket promedio.",
      },
    ],
    deliverables: [
      "Checkout sin fricción",
      "Integración de pagos y envíos",
      "Catálogo optimizado para vender",
      "Diseño responsive y carga rápida",
      "SEO de producto y categoría",
    ],
    outcomes: [
      "Menos abandono de carrito",
      "Mayor ticket promedio",
      "Una experiencia de compra que genera clientes recurrentes",
    ],
    faqs: [
      {
        q: "¿Qué plataforma usan para el e-commerce?",
        a: "Elegimos la tecnología según tu caso —desde soluciones a medida hasta plataformas consolidadas— priorizando velocidad, escalabilidad y facilidad de gestión para tu equipo.",
      },
      {
        q: "¿Integran medios de pago locales e internacionales?",
        a: "Sí. Integramos las pasarelas de pago y logística que tu mercado necesita, incluyendo pagos internacionales cuando el proyecto lo requiere.",
      },
      {
        q: "¿La tienda va a estar optimizada para Google?",
        a: "Sí. Construimos la arquitectura, las fichas de producto y las categorías con SEO técnico desde el inicio para que atraigan tráfico con intención de compra.",
      },
    ],
  },
  {
    slug: "landing-pages",
    navTitle: "Landing Pages",
    seoTitle: "Landing Page de Alta Conversión | Suitwolf",
    metaDescription:
      "Diseño de landing pages de alta conversión con copy estratégico incluido. Estructura persuasiva, carga en menos de 2 segundos y un camino directo a la acción.",
    kicker: "Conversión",
    h1: "Landing pages de alta conversión que captan leads y aceleran ventas",
    serviceType: "Diseño de landing page de alta conversión",
    primaryKeyword: "landing page alta conversión",
    intro:
      "Una landing mal diseñada drena tu presupuesto publicitario sin devolver resultados. Las nuestras están construidas sobre la psicología de la decisión: jerarquía visual que guía, carga ultrarrápida que retiene la atención y un argumento narrativo que lleva directo a la acción —con copy estratégico incluido en el proceso.",
    problem:
      "Si mandás tráfico pago a una página que no convierte, estás quemando dinero. La diferencia entre una landing rentable y una que no lo es está en la estructura, no en la suerte.",
    approach: [
      {
        title: "Estructura orientada a conversión",
        body: "Cada bloque tiene una función en el recorrido hacia la acción. Nada distrae, todo empuja hacia el objetivo.",
      },
      {
        title: "Copy estratégico incluido",
        body: "El texto persuasivo es parte del servicio: escribimos el argumento que convierte, no relleno.",
      },
      {
        title: "Carga en menos de 2 segundos",
        body: "La velocidad retiene la atención y mejora el rendimiento de tus campañas. Optimizamos cada milisegundo.",
      },
    ],
    deliverables: [
      "Estructura orientada a conversión",
      "Copy estratégico incluido",
      "Carga en menos de 2 segundos",
      "Diseño responsive",
      "Integración con tus herramientas de medición",
    ],
    outcomes: [
      "Mayor tasa de conversión sobre el mismo tráfico",
      "Menor costo por lead en tus campañas",
      "Un activo de captación que trabaja 24/7",
    ],
    faqs: [
      {
        q: "¿El copy de la landing está incluido?",
        a: "Sí. El copy estratégico es parte del proceso: escribimos el argumento persuasivo que lleva al usuario a la acción, no dejamos ese trabajo librado al azar.",
      },
      {
        q: "¿La puedo conectar con mis campañas de Google y Meta Ads?",
        a: "Sí. Preparamos la landing con la medición y los eventos de conversión necesarios para que tus campañas puedan optimizar sobre datos reales.",
      },
      {
        q: "¿Cuánto tarda una landing page?",
        a: "Una landing de alta conversión suele estar lista en semanas. El plazo exacto queda por escrito en la propuesta.",
      },
    ],
  },
  {
    slug: "aplicaciones-web-a-medida",
    navTitle: "Aplicaciones Web",
    seoTitle: "Aplicaciones Web a Medida para Empresas | Suitwolf",
    metaDescription:
      "Desarrollo de aplicaciones web a medida para empresas: portales de cliente, dashboards, sistemas de gestión. Diseño UX + frontend y backend robusto que escala.",
    kicker: "Desarrollo a Medida",
    h1: "Aplicaciones web a medida para empresas que escalan",
    serviceType: "Desarrollo de aplicaciones web a medida",
    primaryKeyword: "aplicaciones web a medida",
    intro:
      "Aplicaciones web a medida para empresas que necesitan más que un sitio: portales de cliente, dashboards, sistemas de gestión y herramientas internas. Diseño UX sumado a un desarrollo frontend y backend robusto, pensado para crecer con tu negocio.",
    problem:
      "El software genérico te obliga a adaptar tu operación a la herramienta. Una aplicación a medida hace lo contrario: se adapta a cómo trabaja tu empresa y automatiza lo que hoy te consume tiempo.",
    approach: [
      {
        title: "Diseño UX/UI a medida",
        body: "Flujos pensados para tu operación real, no para un caso genérico. La usabilidad se siente, no se ve.",
      },
      {
        title: "Frontend y backend robustos",
        body: "Arquitectura que aguanta el crecimiento, sin deuda técnica ni parches. Tu producto evoluciona sin rehacerse.",
      },
      {
        title: "Integración con tus sistemas",
        body: "Conectamos la aplicación con las herramientas y datos que ya usás, incluyendo automatizaciones y pagos.",
      },
    ],
    deliverables: [
      "Diseño UX/UI a medida",
      "Desarrollo frontend y backend",
      "Integración con sistemas existentes",
      "Arquitectura escalable sin deuda técnica",
      "Soporte y evolución continua",
    ],
    outcomes: [
      "Procesos automatizados que ahorran horas de trabajo",
      "Un producto digital propio, con tu marca",
      "Capacidad de escalar sin rehacer todo desde cero",
    ],
    faqs: [
      {
        q: "¿Qué tipo de aplicaciones web desarrollan?",
        a: "Portales de cliente, dashboards, sistemas de gestión, herramientas internas y productos SaaS. Si tu empresa necesita más que un sitio, lo construimos a medida.",
      },
      {
        q: "¿El producto queda a nombre de mi empresa?",
        a: "Sí. Desarrollamos con tu marca y te entregamos la propiedad del producto: es tuyo, no nuestro.",
      },
      {
        q: "¿Dan soporte después del lanzamiento?",
        a: "Sí. El lanzamiento es el comienzo: ofrecemos soporte técnico y evolución continua a medida que tu empresa crece.",
      },
    ],
  },
  {
    slug: "seo-posicionamiento-web",
    navTitle: "SEO y Posicionamiento",
    seoTitle: "SEO y Posicionamiento Web para Empresas | Suitwolf",
    metaDescription:
      "SEO técnico y posicionamiento web para empresas. Auditoría técnica, arquitectura de contenidos y estrategia de autoridad que convierte búsquedas en ingresos.",
    kicker: "Posicionamiento",
    h1: "SEO que atrae clientes con intención de compra",
    serviceType: "SEO y posicionamiento web",
    primaryKeyword: "SEO técnico",
    intro:
      "El SEO que importa no es el que acumula clics: es el que atrae al usuario con intención real de compra. Auditamos tu arquitectura técnica, identificamos dónde perdés visibilidad frente a tu competencia y construimos una estrategia de contenidos y autoridad que convierte búsquedas en ingresos sostenibles.",
    problem:
      "Aparecer en Google no sirve si atraés al público equivocado. Sin una base técnica sólida y una estrategia de intención, el tráfico no se traduce en clientes.",
    approach: [
      {
        title: "Auditoría técnica completa",
        body: "Revisamos indexación, velocidad, arquitectura y datos estructurados para eliminar lo que te frena en el ranking.",
      },
      {
        title: "Arquitectura de contenidos",
        body: "Definimos las páginas y los temas que capturan la intención de compra de tu mercado, no solo volumen de búsqueda.",
      },
      {
        title: "Autoridad y medición",
        body: "Estrategia de autoridad más reportes de evolución mensual para que veas exactamente qué funciona.",
      },
    ],
    deliverables: [
      "Auditoría técnica completa",
      "Arquitectura de contenidos",
      "Optimización on-page y datos estructurados",
      "Reportes de evolución mensual",
      "Estrategia de autoridad y enlaces",
    ],
    outcomes: [
      "Visibilidad orgánica frente a tu competencia",
      "Tráfico con intención real de compra",
      "Un canal de captación que compone en el tiempo",
    ],
    faqs: [
      {
        q: "¿En cuánto tiempo se ven resultados de SEO?",
        a: "El SEO compone con el tiempo: las palabras de baja competencia y long-tail suelen moverse en 2 a 4 meses, y los términos más competitivos entre 6 y 12 meses. Reportamos los indicadores adelantados (impresiones, posición media, páginas indexadas) para que el progreso sea visible desde el primer mes.",
      },
      {
        q: "¿Qué es el SEO técnico?",
        a: "Es la base sobre la que se construye todo el posicionamiento: indexación, velocidad de carga, arquitectura del sitio, datos estructurados y experiencia de usuario. Sin esa base, el contenido rinde por debajo de su potencial.",
      },
      {
        q: "¿El trabajo de SEO es medible?",
        a: "Completamente. Configuramos Google Search Console y analítica antes de empezar, y reportamos métricas concretas mes a mes: impresiones, clics, posición media y conversiones.",
      },
    ],
  },
  {
    slug: "presencia-personal",
    navTitle: "Presencia Personal",
    seoTitle: "Diseño Web de Marca Personal y Autoridad | Suitwolf",
    metaDescription:
      "Diseño web de marca personal para ejecutivos, consultores y figuras públicas. Narrativa estratégica y diseño que impone autoridad y credibilidad digital.",
    kicker: "Marca Personal",
    h1: "Tu presencia digital como activo estratégico",
    serviceType: "Diseño web de marca personal",
    primaryKeyword: "diseño web marca personal",
    intro:
      "Para un ejecutivo, consultor o figura pública, el sitio personal es la presentación que ocurre antes de cualquier reunión. Diseñamos más que un portfolio: construimos la narrativa que te posiciona exactamente donde querés estar en la mente de quien importa —y te hace la opción obvia antes de que abras la boca.",
    problem:
      "Sin una presencia digital a la altura, tu autoridad depende de que te presenten bien. Con ella, el mercado ya te percibe como referente antes del primer contacto.",
    approach: [
      {
        title: "Narrativa personal estratégica",
        body: "Construimos el relato que proyecta tu autoridad y te diferencia en tu mercado.",
      },
      {
        title: "Diseño que impone autoridad",
        body: "Un sistema visual a la altura de tu posicionamiento, que transmite credibilidad en cada detalle.",
      },
      {
        title: "Optimizado para tu mercado",
        body: "Pensado para que te encuentren y te recuerden las personas que importan para tu carrera o negocio.",
      },
    ],
    deliverables: [
      "Narrativa personal estratégica",
      "Diseño que impone autoridad",
      "Optimizado para tu mercado",
      "Diseño responsive y performance",
      "SEO de marca personal",
    ],
    outcomes: [
      "Autoridad percibida desde el primer contacto",
      "Diferenciación clara frente a tus pares",
      "Una presencia que trabaja por tu reputación",
    ],
    faqs: [
      {
        q: "¿Para quién es una web de marca personal?",
        a: "Para ejecutivos, consultores, profesionales independientes y figuras públicas que quieren proyectar autoridad y ser la opción obvia en su mercado.",
      },
      {
        q: "¿Incluye la redacción de los textos?",
        a: "Sí. La narrativa estratégica es parte central del servicio: construimos el relato que te posiciona, no solo el diseño.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
