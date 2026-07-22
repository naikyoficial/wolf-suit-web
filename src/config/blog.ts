/**
 * Blog — contenido top-of-funnel que construye autoridad temática y alimenta
 * las páginas de servicio. Cada artículo apunta a una keyword de baja
 * competencia y alta conversión identificada en la investigación, y enlaza
 * internamente a la página de servicio o a /evaluacion.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Minutos de lectura aprox. */
  readingMinutes: number;
  excerpt: string;
  primaryKeyword: string;
  /** Optional cover image path (relative to /public). */
  cover?: string;
  body: Block[];
  /** Enlace interno destacado al final (servicio o evaluación). */
  relatedHref: string;
  relatedLabel: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-elegir-agencia-de-diseno-web",
    title: "Cómo elegir una agencia de diseño web (sin equivocarte)",
    seoTitle: "Cómo Elegir una Agencia de Diseño Web | Suitwolf",
    metaDescription:
      "Guía para elegir una agencia de diseño web: qué preguntar, señales de alerta, plantillas vs a medida, propiedad del sitio y cómo comparar propuestas sin equivocarte.",
    date: "2026-07-10",
    readingMinutes: 7,
    excerpt:
      "La mayoría de las malas experiencias con una web no vienen del diseño: vienen de haber elegido mal al equipo. Esta es la guía para no equivocarte.",
    primaryKeyword: "cómo elegir una agencia de diseño web",
    body: [
      {
        type: "p",
        text: "Contratar una agencia de diseño web es una de esas decisiones que parecen sencillas hasta que salen mal. Un sitio que no convierte, plazos que se estiran, un diseño que no te representa o —peor— descubrir que no sos dueño de tu propio dominio. La mayoría de esos problemas no vienen del diseño en sí: vienen de haber elegido mal al equipo. Esta guía te da los criterios concretos para decidir con la cabeza fría.",
      },
      { type: "h2", text: "1. ¿Trabajan a medida o con plantillas?" },
      {
        type: "p",
        text: "Es la primera pregunta y la más importante. Una plantilla es, por definición, un diseño compartido con miles de sitios. Rinde para salir del paso, pero te obliga a competir por precio porque tu presencia se ve igual que la de todos. Una web a medida parte de tu estrategia y te diferencia. Preguntá directamente: ¿esto se construye desde cero o sobre una plantilla comprada?",
      },
      { type: "h2", text: "2. ¿Quién es el dueño del sitio, el dominio y el hosting?" },
      {
        type: "p",
        text: "Es la señal de alerta que más gente pasa por alto. Algunos proveedores registran el dominio y el hosting a su nombre, y cuando querés irte, tu web queda rehén. Exigí que todo quede a nombre de tu empresa y que te entreguen los accesos. Si hay evasivas, es una bandera roja.",
      },
      { type: "h2", text: "3. ¿El diseño está pensado para convertir o solo para verse bien?" },
      {
        type: "p",
        text: "Un sitio bonito que no vende no sirve. Pedí ver casos donde el objetivo era un resultado de negocio —más consultas, más ventas, más autoridad— y no solo un portfolio de imágenes lindas. Una buena agencia habla de conversión, jerarquía y recorrido del usuario, no solo de estética.",
      },
      { type: "h2", text: "4. ¿Incluyen SEO técnico y performance desde el inicio?" },
      {
        type: "p",
        text: "El SEO técnico y la velocidad de carga no son un extra que se agrega al final: son parte de cómo se construye el sitio. Preguntá si el proyecto incluye arquitectura optimizada para Google, performance (PageSpeed 90+) y datos estructurados desde el día uno. Si el SEO es un 'después lo vemos', el resultado va a rendir por debajo de su potencial.",
      },
      { type: "h2", text: "5. ¿Qué pasa después del lanzamiento?" },
      {
        type: "p",
        text: "El lanzamiento es el comienzo, no el final. Un sitio es un sistema vivo: necesita soporte, mejoras basadas en datos reales y evolución a medida que tu empresa crece. Confirmá qué incluye el mantenimiento, cuánto cuesta y cómo se maneja el soporte.",
      },
      { type: "h2", text: "Cómo comparar propuestas" },
      {
        type: "p",
        text: "No compares solo el precio final. Compará qué incluye cada propuesta y qué problema resuelve. Una checklist rápida:",
      },
      {
        type: "ul",
        items: [
          "¿Es diseño a medida o plantilla?",
          "¿El dominio, hosting y sitio quedan a tu nombre?",
          "¿Incluye copy y estrategia, o solo maquetación?",
          "¿Trae SEO técnico y performance desde el inicio?",
          "¿Está claro el plazo de entrega y los hitos?",
          "¿Qué incluye el soporte posterior y a qué costo?",
        ],
      },
      {
        type: "p",
        text: "La agencia correcta no es la más barata ni la que promete todo: es la que entiende tu negocio, te muestra un proceso claro y trata tu presencia digital como el activo estratégico que es.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver nuestro servicio de diseño web corporativo",
  },
  {
    slug: "diseno-web-a-medida-vs-plantilla",
    title: "Diseño web a medida vs plantilla: cuál conviene",
    seoTitle: "Diseño Web a Medida vs Plantilla: Cuál Conviene | Suitwolf",
    metaDescription:
      "Diseño web a medida o plantilla: diferencias reales en diferenciación, SEO, velocidad, escalabilidad y costo. Cuándo conviene cada opción para tu empresa.",
    date: "2026-07-16",
    readingMinutes: 6,
    excerpt:
      "Una plantilla es más rápida y barata al principio. Una web a medida te diferencia y escala. La pregunta no es cuál es mejor, sino cuál conviene a tu caso.",
    primaryKeyword: "diseño web a medida vs plantilla",
    body: [
      {
        type: "p",
        text: "Es la decisión de fondo de casi cualquier proyecto web: ¿arranco con una plantilla o invierto en un diseño a medida? Las dos opciones son válidas, pero resuelven problemas distintos. Confundirlas es lo que lleva a rehacer el sitio a los dos años.",
      },
      { type: "h2", text: "Qué es cada una" },
      {
        type: "p",
        text: "Una plantilla es un diseño prefabricado que se personaliza con tu marca y contenido. Un diseño a medida se construye desde cero a partir de tu estrategia, tu público y tus objetivos. La diferencia no es solo estética: es cuánto te distingue y cuánto puede crecer.",
      },
      { type: "h2", text: "Diferenciación" },
      {
        type: "p",
        text: "Una plantilla la usan miles de sitios. Tu presencia se ve como la de tu competencia, y cuando todo se ve igual, la decisión se toma por precio. Un diseño a medida es tuyo: proyecta exactamente el nivel que tu empresa vale antes de que alguien lea una palabra.",
      },
      { type: "h2", text: "SEO y velocidad" },
      {
        type: "p",
        text: "Las plantillas suelen cargar código de sobra para cubrir usos que no necesitás, lo que penaliza la velocidad y el SEO técnico. Un desarrollo a medida se optimiza para lo que tu sitio realmente hace: menos peso, mejor performance, mejor posicionamiento. En un mercado donde el 60% de las decisiones se toman desde el celular, esa diferencia se paga sola.",
      },
      { type: "h2", text: "Escalabilidad" },
      {
        type: "p",
        text: "Con una plantilla, cuando tu negocio crece y necesitás algo que la plantilla no contempla, chocás contra sus límites. A medida, la arquitectura está pensada para evolucionar sin rehacer todo desde cero.",
      },
      { type: "h2", text: "Costo (mirado bien)" },
      {
        type: "p",
        text: "La plantilla gana en el costo inicial. Pero si te obliga a competir por precio, rinde menos en SEO y hay que rehacerla al escalar, el costo real a dos años suele ser mayor. La pregunta correcta no es cuánto cuesta hoy, sino cuánto te devuelve —y cuánto te cuesta rehacerlo después.",
      },
      { type: "h2", text: "Entonces, ¿cuál conviene?" },
      {
        type: "ul",
        items: [
          "Plantilla: si necesitás estar online ya, con presupuesto mínimo y sin expectativas de diferenciación ni crecimiento inmediato.",
          "A medida: si tu web es un canal de captación real, competís en un mercado donde la percepción importa, y querés un activo que escale con tu empresa.",
        ],
      },
      {
        type: "p",
        text: "Para una empresa que se toma en serio su presencia digital, el diseño a medida no es un lujo: es lo que evita competir por precio y tener que rehacer todo en un par de años.",
      },
    ],
    relatedHref: "/servicios",
    relatedLabel: "Ver nuestros servicios de diseño web a medida",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
