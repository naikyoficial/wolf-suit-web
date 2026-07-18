import type { CaseStudy, ProcessStep, Transformation } from "@/types";

export const HERO_CONTENT = {
  eyebrow: "Agencia de diseño & desarrollo web",
  headlineLead: "Diseño web que convierte",
  headlineRest: "para marcas que",
  headlineAccent: "lideran",
  subheadline:
    "Construimos sitios web que transforman visitantes en clientes. Sin templates. Cada proyecto construido desde cero para generar más clientes e ingresos reales.",
  cta: "Solicitar evaluación",
  ctaSecondary: "Ver servicios",
  tags: ["Diseño & desarrollo web", "E-commerce", "SEO técnico"],
} as const;

export const MANIFESTO_CONTENT = {
  statement:
    "Esa fracción de segundo en la que alguien entra a tu sitio y decide si confía o no. Ese es el momento que nos obsesiona.",
  punchline: "No construimos únicamente páginas web.",
  punchline2: "Construimos la primera impresión definitiva.",
  aside:
    "Diseñamos cada detalle para que el mercado perciba exactamente lo que tu empresa vale, antes de que alguien lea una sola palabra de tu propuesta.",
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
  brief: string;
  desc: string;
  deliverables: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    index: "01",
    category: "Web Corporativa",
    title: "Sitio Web Corporativo",
    subtitle: "Arquitectura, diseño y desarrollo desde cero",
    brief: "La presencia digital que posiciona a tu empresa como referente de su industria.",
    desc: "Tu sitio web es el primer filtro que atraviesan tus clientes. Lo que encuentran ahí determina si avanzan o se van. Construimos la arquitectura estratégica, el sistema visual y el desarrollo técnico que convierten esa fracción de segundo en una decisión a tu favor — leads calificados, conversiones reales, posicionamiento de marca.",
    deliverables: ["Diseño 100% original", "Performance 90+ en PageSpeed", "SEO técnico desde el día uno"],
  },
  {
    index: "02",
    category: "Conversión",
    title: "Landing Page de Impacto",
    subtitle: "Estructura persuasiva + copy estratégico incluido",
    brief: "Páginas de alta conversión que captan leads y aceleran tus ventas.",
    desc: "Una landing page mal diseñada drena tu presupuesto publicitario sin devolver resultados. Las nuestras están construidas sobre la psicología de la decisión: jerarquía visual que guía al usuario, carga ultrarrápida que retiene la atención y un argumento narrativo que lleva directo a la acción — con copy estratégico incluido en el proceso.",
    deliverables: ["Estructura orientada a conversión", "Copy estratégico incluido", "Carga en menos de 2 segundos"],
  },
  {
    index: "03",
    category: "E-commerce",
    title: "Tienda Online Premium",
    subtitle: "Diseño, conversión y experiencia de compra",
    brief: "E-commerce con experiencia de compra de lujo, diseñado para vender más.",
    desc: "El 70% de los carritos se abandonan antes del pago — casi siempre por fricción en el flujo o falta de confianza visual. Los e-commerce que construimos atacan ese número desde el diseño: catálogos que exhiben, checkouts que no obstruyen, y una integración técnica de pagos y logística pensada para maximizar el ticket promedio.",
    deliverables: ["Checkout sin fricción", "Integración de pagos y envíos", "Catálogo optimizado para vender"],
  },
  {
    index: "04",
    category: "Personal Brand",
    title: "Presencia Personal",
    subtitle: "Narrativa personal + posicionamiento digital",
    brief: "Tu imagen digital como activo estratégico: autoridad, credibilidad y distinción.",
    desc: "Para un ejecutivo, consultor o figura pública, el sitio personal es la presentación que ocurre antes de cualquier reunión. Diseñamos más que un portfolio: construimos la narrativa que te posiciona exactamente donde querés estar en la mente de quien importa — y te hace la opción obvia antes de que abras la boca.",
    deliverables: ["Narrativa personal estratégica", "Diseño que impone autoridad", "Optimizado para tu mercado"],
  },
  {
    index: "05",
    category: "Posicionamiento",
    title: "SEO & Visibilidad Web",
    subtitle: "Visibilidad orgánica con intención de compra",
    brief: "Aparecé primero cuando tus clientes te buscan en Google.",
    desc: "El SEO que importa no es el que acumula clics — es el que atrae al usuario con intención real de compra. Auditamos tu arquitectura técnica, identificamos dónde perdés visibilidad frente a tu competencia y construimos una estrategia de contenidos y autoridad que convierte búsquedas en ingresos sostenibles a largo plazo.",
    deliverables: ["Auditoría técnica completa", "Arquitectura de contenidos", "Reportes de evolución mensual"],
  },
  {
    index: "06",
    category: "Desarrollo",
    title: "Aplicaciones Web",
    subtitle: "Frontend, backend y UX para empresas que escalan",
    brief: "Herramientas digitales personalizadas que automatizan y escalan tu negocio.",
    desc: "Aplicaciones web a medida para empresas que necesitan más que un sitio: portales de cliente, dashboards, sistemas de gestión y herramientas internas. Diseño UX + desarrollo frontend y backend robusto, pensado para crecer.",
    deliverables: ["Diseño UX/UI a medida", "Desarrollo frontend y backend", "Integración con sistemas existentes"],
  },
];

export interface WorkProject {
  name: string;
  category: string;
  /** Dominio mostrado en la barra del navegador de la maqueta. */
  domain: string;
  description: string;
  tags: string[];
  /** Ruta de la captura en /public (ej: "/work/quantro.png"). Vacío → placeholder de marca. */
  cover: string;
  /** Zoom para ocultar bordes del screenshot (ej: 1.08). Default 1. */
  coverScale?: number;
  /** Enlace al sitio en vivo. Opcional. */
  url?: string;
}

export const WORKS: WorkProject[] = [
  {
    name: "Quantro",
    category: "Aplicación Web",
    domain: "quantrohq.com",
    description:
      "Un cliente con una idea concreta y una expectativa alta: un producto serio, no una demo. Desde la primera reunión, cada decisión fue tomada junto a él —sistema visual, arquitectura, flujo de producto— hasta construir una plataforma completa: generación de presupuestos en PDF, automatizaciones, gestión de clientes y equipo, e integración de pagos internacionales. Hoy venden un producto digital propio, con su marca, no la nuestra.",
    tags: ["UX/UI", "Dashboard", "Desarrollo a medida"],
    cover: "/quantro diseño.png",
  },
  {
    name: "Inoxidables GB",
    category: "Sitio Web Corporativo",
    domain: "inoxidablesgb.com.ar",
    description:
      "Años de trayectoria en el rubro industrial, sin presencia digital que lo respaldara. Construimos una identidad visual sólida, un catálogo estructurado y una arquitectura que instaló su autoridad frente a la competencia. El resultado: un aumento significativo en consultas e ingresos, con el nivel que su trayectoria siempre mereció.",
    tags: ["Diseño corporativo", "Catálogo", "SEO"],
    cover: "/inoxidables gb proyecto.png",
  },
  {
    name: "Entre Verde",
    category: "Landing Page",
    domain: "entreverde.com.ar",
    description:
      "Un producto claro, un objetivo concreto: que el visitante convierta. Diseñamos la narrativa, la jerarquía visual y el flujo completo para que cada sección lleve al siguiente paso sin distracciones. Carga inmediata, copy estratégico y un camino sin escape hacia la acción.",
    tags: ["Conversión", "Copy estratégico", "Performance"],
    cover: "/entre verde proyecto.png",
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
  {
    title: "Velocidad de carga",
    desc: "Sitios optimizados para cargar en menos de 2 segundos. Más velocidad es más tiempo en pantalla, mejor ranking en Google y más ventas.",
  },
  {
    title: "Seguridad de nivel profesional",
    desc: "Certificados SSL, arquitectura segura y código sin vulnerabilidades. Tu sitio protege a tus clientes desde el primer día.",
  },
  {
    title: "Diseño responsive",
    desc: "Perfecto en cualquier dispositivo. El 60% de las decisiones de compra se toman desde el celular — tu sitio está listo para eso.",
  },
  {
    title: "SEO desde el primer día",
    desc: "La arquitectura, el código y el contenido están construidos para que Google te encuentre. No es un agregado al final — es parte del diseño.",
  },
  {
    title: "Enfocado en convertir",
    desc: "Un sitio que se ve bien pero no vende, no sirve. Cada decisión de diseño tiene un objetivo: convertir visitantes en clientes reales.",
  },
  {
    title: "Código limpio y escalable",
    desc: "Construimos con arquitectura que aguanta el crecimiento. Sin deuda técnica, sin parches. Tu sitio puede evolucionar sin necesidad de rehacerlo desde cero.",
  },
  {
    title: "Analítica desde el primer día",
    desc: "Configuramos las herramientas de medición antes del lanzamiento. Sabés exactamente qué funciona, dónde pierde el usuario y dónde ganás más.",
  },
  {
    title: "Experiencia de usuario probada",
    desc: "La navegación, la jerarquía y los flujos están pensados para que el usuario llegue a donde vos querés sin fricción. Una buena UX no se ve — se siente.",
  },
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
    q: "¿Con qué tipo de clientes trabajan?",
    a: "Con emprendedores que están arrancando y necesitan una presencia que inspire confianza desde el primer día. Con profesionales independientes que quieren proyectar autoridad en su mercado. Con empresas en crecimiento que saben que su sitio actual ya no los representa. Y con marcas consolidadas que buscan el nivel de ejecución que merecen. Lo que tienen en común no es el tamaño — es la ambición y el compromiso con el resultado.",
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
