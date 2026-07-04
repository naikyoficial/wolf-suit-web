import type { CaseStudy, ProcessStep, Transformation } from "@/types";

export const HERO_CONTENT = {
  eyebrow: "Agencia de diseño & desarrollo web",
  headlineLead: "Diseño y desarrollo web",
  headlineRest: "de",
  headlineAccent: "alto nivel",
  subheadline:
    "Creamos sitios web a medida para empresas que exigen destacar — rápidos, estratégicos y pensados para convertir.",
  cta: "Solicitar evaluación",
  ctaSecondary: "Ver servicios",
  tags: ["Diseño & desarrollo web", "E-commerce", "Software a medida"],
} as const;

export const MANIFESTO_CONTENT = {
  statement:
    "Las empresas son juzgadas antes de ser comprendidas. Esa fracción de segundo en la que alguien entra a tu sitio y decide si confía o no — es el momento que nos obsesiona.",
  punchline: "No construimos páginas web.",
  punchline2: "Construimos la primera impresión definitiva.",
  aside:
    "Diseñamos sitios web premium, desarrollamos software a medida y construimos sistemas digitales que proyectan la imagen que tu empresa realmente merece.",
} as const;

export const DUALITY_CONTENT = {
  lineA: "Una empresa pequeña puede parecer líder de su sector.",
  lineB: "Una gran empresa puede parecer amateur.",
  closing: "La diferencia está en cómo se presenta al mundo.",
  aside:
    "Tu empresa no necesita ser la número uno para verse como tal. Solo necesita el traje correcto.",
} as const;

export interface ServiceItem {
  index: string;
  category: string;
  title: string;
  subtitle: string;
  desc: string;
  deliverables: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    index: "01",
    category: "Web Corporativa",
    title: "Sitio Web Corporativo",
    subtitle: "Diseño & desarrollo a medida",
    desc: "Presencias digitales que posicionan tu empresa como referente de su industria. Arquitectura estratégica, rendimiento técnico de primer nivel y experiencias que transforman visitantes en clientes reales.",
    deliverables: ["Diseño 100% original", "Performance 90+ en PageSpeed", "SEO técnico desde el día uno"],
  },
  {
    index: "02",
    category: "Conversión",
    title: "Landing Page de Impacto",
    subtitle: "Páginas de alta conversión",
    desc: "Páginas de aterrizaje diseñadas para captar leads y acelerar tus resultados de venta. Estructura persuasiva, carga ultrarrápida y copy estratégico orientado al comportamiento real del usuario.",
    deliverables: ["Estructura orientada a conversión", "Copy estratégico incluido", "Carga en menos de 2 segundos"],
  },
  {
    index: "03",
    category: "E-commerce",
    title: "Tienda Online Premium",
    subtitle: "E-commerce de alto nivel",
    desc: "Plataformas de venta online con experiencia de compra de lujo. Integración de medios de pago, catálogo optimizado y flujos diseñados para maximizar la conversión y el ticket promedio.",
    deliverables: ["Checkout sin fricción", "Integración de pagos y envíos", "Catálogo optimizado para vender"],
  },
  {
    index: "04",
    category: "Personal Brand",
    title: "Presencia Personal",
    subtitle: "Portfolio & personal branding",
    desc: "Sitio web personal para ejecutivos, consultores y figuras públicas. Tu imagen digital como activo estratégico: credibilidad, autoridad y distinción que abren puertas antes de que hables.",
    deliverables: ["Narrativa personal estratégica", "Diseño que impone autoridad", "Optimizado para tu mercado"],
  },
  {
    index: "05",
    category: "Posicionamiento",
    title: "SEO & Visibilidad Web",
    subtitle: "Posicionamiento orgánico en Google",
    desc: "Estrategia SEO integral para que tu empresa aparezca primero cuando tus clientes te buscan. Auditoría técnica, arquitectura de contenidos, optimización on-page y link building de autoridad.",
    deliverables: ["Auditoría técnica completa", "Arquitectura de contenidos", "Reportes de evolución mensual"],
  },
  {
    index: "06",
    category: "App & Plataforma",
    title: "Aplicación Web a Medida",
    subtitle: "Plataformas, SaaS & dashboards",
    desc: "Interfaces complejas diseñadas con rigor de producto premium. Dashboards, herramientas internas y plataformas SaaS que combinan máxima funcionalidad técnica con experiencia de usuario de primer nivel.",
    deliverables: ["UX de producto premium", "Arquitectura escalable", "Panel de administración a medida"],
  },
  {
    index: "07",
    category: "Desarrollo",
    title: "Software a Medida",
    subtitle: "Soluciones de software personalizado",
    desc: "Desarrollo de software adaptado exactamente a los procesos de tu empresa. Automatización, integraciones de sistemas, APIs y herramientas internas que eliminan fricciones operativas y escalan con tu negocio.",
    deliverables: ["Automatización de procesos", "Integraciones y APIs", "Soporte y evolución continua"],
  },
];

export const METHOD_INTRO = {
  aside:
    "Cada proyecto atraviesa las mismas cinco fases, del diagnóstico estratégico al perfeccionamiento final. Es el sistema que garantiza que el resultado esté a la altura, sin dejar nada librado al azar.",
} as const;

export const METHOD_STEPS = [
  {
    num: "01",
    name: "Descubrir",
    body: "Analizamos tu empresa, tu industria, tus objetivos y la diferencia entre cómo te perciben hoy y cómo deberías ser percibido.",
  },
  {
    num: "02",
    name: "Definir",
    body: "Construimos la arquitectura estratégica del proyecto: narrativa, identidad, experiencia y estructura. Todo debe tener una razón.",
  },
  {
    num: "03",
    name: "Diseñar",
    body: "Creamos un sistema visual exclusivo donde cada decisión responde a una estrategia y no a una tendencia pasajera.",
  },
  {
    num: "04",
    name: "Construir",
    body: "Desarrollamos una plataforma rápida, escalable y optimizada para SEO, rendimiento y experiencia de usuario. La tecnología no es un agregado. Es parte del estándar.",
  },
  {
    num: "05",
    name: "Perfeccionar",
    body: "No entregamos cuando funciona. Entregamos cuando cada detalle representa el nivel de excelencia que buscamos.",
  },
] as const;

export const STANDARDS = [
  { value: "90", suffix: "+", label: "PageSpeed en móvil", note: "Rendimiento medido por Google, no prometido" },
  { value: "100", suffix: "%", label: "Código a medida", note: "Sin plantillas ni page builders" },
  { value: "72", suffix: "h", label: "Respuesta garantizada", note: "A cada solicitud de evaluación" },
  { value: "5", suffix: "", label: "Fases de método", note: "Del diagnóstico al lanzamiento" },
] as const;

export const FAQS = [
  {
    q: "¿Cuánto cuesta un proyecto con Suitwolf?",
    a: "Cada proyecto se cotiza a medida según su alcance: no vendemos paquetes genéricos porque no hacemos trabajo genérico. La evaluación inicial es sin costo y define exactamente qué necesita tu empresa — recién ahí hablamos de números, con una propuesta clara y sin sorpresas.",
  },
  {
    q: "¿Cuánto tiempo lleva desarrollar el sitio?",
    a: "Depende de la complejidad: una landing de alta conversión puede estar lista en semanas; un sitio corporativo completo o un e-commerce lleva más. El plazo exacto queda definido por escrito en la propuesta, con hitos de entrega que se cumplen.",
  },
  {
    q: "¿Por qué no trabajan con templates?",
    a: "Porque un template es, por definición, lo contrario de diferenciarse: es el mismo diseño compartido con miles de sitios. Un sitio genérico obliga a tu empresa a competir por precio. Todo lo que construimos parte de cero, alineado a la estrategia de tu negocio.",
  },
  {
    q: "¿Qué incluye la evaluación inicial?",
    a: "Analizamos tu presencia digital actual, identificamos la brecha entre cómo te percibe el mercado y cómo deberías ser percibido, y te damos una recomendación concreta. Sin costo y sin compromiso. Si no hay una oportunidad real de impacto, te lo decimos.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "El lanzamiento es el comienzo, no el final. Entregamos un sistema vivo: soporte técnico, mejoras continuas basadas en datos reales de uso, y la evolución que tu empresa necesite a medida que crece.",
  },
  {
    q: "¿Trabajan solo con empresas grandes?",
    a: "No. Trabajamos con empresas ambiciosas — el tamaño importa menos que el compromiso con el nivel. Lo que sí somos es selectivos: tomamos pocos proyectos a la vez para garantizar que cada uno reciba el estándar completo.",
  },
] as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnóstico estratégico",
    description:
      "Analizamos cómo te percibe el mercado hoy y dónde existe la mayor brecha con cómo deberías ser percibido.",
  },
  {
    number: "02",
    title: "Arquitectura de percepción",
    description:
      "Definimos el relato visual, el posicionamiento y la experiencia que convertirá esa brecha en ventaja competitiva.",
  },
  {
    number: "03",
    title: "Construcción de referencia",
    description:
      "Ejecutamos con la precisión de una firma internacional. Cada detalle es intencional. Nada es decoración.",
  },
  {
    number: "04",
    title: "Entrega y evolución",
    description:
      "Entregamos un sistema vivo, no una pieza estática. Tu empresa crece; tu presencia digital debe crecer con ella.",
  },
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: "perception",
    title: "Percepción de liderazgo",
    description:
      "Tu empresa deja de competir por precio porque el mercado la percibe como referente.",
    outcome: "De empresa más entre muchas a firma que define el estándar.",
  },
  {
    id: "trust",
    title: "Confianza instantánea",
    description:
      "El usuario confía antes de leer una sola línea de texto. La experiencia visual hace el trabajo.",
    outcome: "De tener que convencer a ser la opción obvia.",
  },
  {
    id: "authority",
    title: "Autoridad digital",
    description:
      "Tu presencia digital transmite el nivel de excelencia que tus clientes esperan en cada punto de contacto.",
    outcome: "De parecer profesional a ser percibido como el mejor.",
  },
];

export const CASE_STUDIES: CaseStudy[] = [];
