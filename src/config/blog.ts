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

  /* ═══════════════════════════════════════════════════════════════════
     COMERCIALES — alta intención, cerca de la compra
     ═══════════════════════════════════════════════════════════════════ */

  {
    slug: "cuanto-cuesta-una-pagina-web-para-empresa",
    title: "Cuánto cuesta una página web para una empresa",
    seoTitle: "Cuánto Cuesta una Página Web para Empresa | Suitwolf",
    metaDescription:
      "Cuánto cuesta una página web profesional para empresa: rangos reales por tipo de sitio, qué se paga, qué se ahorra y cómo evaluar una propuesta sin sorpresas.",
    date: "2026-07-22",
    readingMinutes: 8,
    excerpt:
      "La pregunta correcta no es cuánto cuesta una web, sino qué estás comprando. Estos son los rangos reales del mercado y cómo leer una propuesta sin caer en la trampa del precio.",
    primaryKeyword: "cuánto cuesta una página web para una empresa",
    body: [
      {
        type: "p",
        text: "Buscar 'cuánto cuesta una página web' devuelve un abanico ridículo: desde 300 dólares hasta 30.000. Esa dispersión no es un error de mercado, es una señal: hay productos completamente distintos vendiéndose bajo el mismo nombre. Antes de comparar cifras, hay que separar qué está comprando cada quien.",
      },
      { type: "h2", text: "Los tres tipos de proyecto y sus rangos reales" },
      {
        type: "p",
        text: "En el mercado hispano premium (España, EE.UU. hispano, México corporativo, LatAm), los rangos honestos se agrupan en tres tramos.",
      },
      {
        type: "ul",
        items: [
          "Plantilla configurada: 500–2.500 USD. Un tema comprado adaptado con tus colores y textos. Sirve para tener presencia mínima, no para diferenciar ni escalar.",
          "Web a medida corporativa: 4.000–12.000 USD. Diseño 100% original, arquitectura pensada para convertir, SEO técnico incluido, entrega llave en mano.",
          "Aplicación o e-commerce a medida: 8.000–40.000+ USD. Frontend + backend, integraciones, panel de administración. El rango depende del alcance funcional.",
        ],
      },
      { type: "h2", text: "Qué se paga en una web a medida" },
      {
        type: "p",
        text: "El 70% del costo de un sitio profesional no es maquetación: es estrategia, arquitectura de información, copy, diseño original, SEO técnico y desarrollo optimizado. Una plantilla salta todos esos pasos —por eso es barata y por eso rinde poco.",
      },
      { type: "h2", text: "Señales de alerta en una propuesta" },
      {
        type: "ul",
        items: [
          "Precio cerrado sin ver el alcance en detalle: siempre esconde recortes o costos ocultos.",
          "Dominio o hosting a nombre del proveedor: quedás rehén.",
          "'Copy no incluido' sin explicar quién lo escribe: terminás pagando aparte o poniendo texto genérico.",
          "'SEO se cobra aparte': el SEO técnico es parte del desarrollo, no un extra.",
          "Sin plazo comprometido por escrito.",
        ],
      },
      { type: "h2", text: "El costo real es el ROI, no el precio" },
      {
        type: "p",
        text: "Una web de 8.000 USD que trae 5 clientes bien calificados al año paga sola su costo. Una web de 1.500 USD que no convierte cuesta más, porque desperdiciás el tráfico que generás y tenés que rehacerla en dos años.",
      },
      {
        type: "p",
        text: "Al pedir presupuestos, la pregunta útil no es cuánto sale, sino qué incluye y qué resultado esperar. Comparar precios sin comparar alcances es cómo se toman las malas decisiones.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver detalle del servicio",
  },

  {
    slug: "cuanto-cuesta-una-tienda-online-profesional",
    title: "Cuánto cuesta una tienda online profesional",
    seoTitle: "Cuánto Cuesta una Tienda Online Profesional | Suitwolf",
    metaDescription:
      "Cuánto cuesta una tienda online a medida: rangos reales, qué se paga, Shopify vs desarrollo propio y cómo evaluar una propuesta sin costos ocultos.",
    date: "2026-07-24",
    readingMinutes: 7,
    excerpt:
      "Una tienda online no es solo un catálogo. Estos son los rangos reales, qué cambia entre Shopify y desarrollo a medida, y qué mirar antes de firmar.",
    primaryKeyword: "cuánto cuesta una tienda online profesional",
    body: [
      {
        type: "p",
        text: "El precio de una tienda online varía brutalmente porque bajo ese mismo nombre se vende de todo: una plantilla Shopify configurada, un WooCommerce a medida, o una plataforma custom con integraciones complejas. Cada uno resuelve un problema distinto y tiene una economía distinta.",
      },
      { type: "h2", text: "Los tres tramos honestos" },
      {
        type: "ul",
        items: [
          "Shopify o WooCommerce con plantilla configurada: 1.500–4.000 USD. Rápido, útil si vendés pocos productos y no necesitás diferenciación visual.",
          "E-commerce a medida sobre plataforma consolidada: 5.000–15.000 USD. Diseño 100% original sobre Shopify/Woo, integraciones, catálogo optimizado.",
          "Tienda custom con backend propio: 12.000–50.000+ USD. Frontend a medida + backend + panel + integraciones ERP/logística.",
        ],
      },
      { type: "h2", text: "Qué determina el costo real" },
      {
        type: "p",
        text: "El número de productos importa menos de lo que parece. Lo que dispara el costo es: complejidad del catálogo (variantes, atributos), integraciones (pagos internacionales, logística, ERP), reglas de negocio (descuentos, cupones, membresías) y el nivel del diseño.",
      },
      { type: "h2", text: "Shopify vs desarrollo propio" },
      {
        type: "p",
        text: "Shopify gana en time-to-market y mantenimiento. Un desarrollo propio gana en diferenciación visual, control total y economía a largo plazo (sin fee mensual del 2% de tus ventas). Para tickets bajos y catálogos simples, Shopify es más racional. Para marcas premium o volúmenes grandes, el desarrollo propio se paga solo.",
      },
      { type: "h2", text: "Costos que casi nadie te menciona" },
      {
        type: "ul",
        items: [
          "Fotografía de producto: pesa más en la conversión que el diseño de la tienda.",
          "Fee de pasarelas de pago (2–4% por transacción).",
          "Fee mensual de Shopify (29–299 USD/mes) o hosting si es a medida.",
          "Mantenimiento: entre 5–15% del costo inicial anual.",
        ],
      },
      {
        type: "p",
        text: "Antes de pedir cotizaciones, definí catálogo, integraciones necesarias y volumen esperado. Con eso, cualquier agencia seria puede darte una propuesta clara —y las que no lo hacen, te cuentan la razón.",
      },
    ],
    relatedHref: "/servicios/tienda-online",
    relatedLabel: "Ver nuestro servicio de tienda online",
  },

  {
    slug: "agencia-diseno-web-empresas-hispanas-estados-unidos",
    title: "Cómo elegir una agencia de diseño web para empresas hispanas en Estados Unidos",
    seoTitle: "Agencia de Diseño Web para Empresas Hispanas en EE.UU. | Suitwolf",
    metaDescription:
      "Cómo elegir una agencia de diseño web en español para empresas hispanas de EE.UU.: qué evaluar, agencia local vs remota y cómo asegurarte de que el sitio quede a tu nombre.",
    date: "2026-07-26",
    readingMinutes: 7,
    excerpt:
      "El mercado hispano de EE.UU. mueve más de 3 trillones de dólares. Elegir agencia sin entender ese mercado, o sin poder trabajar en español, es dejar plata sobre la mesa.",
    primaryKeyword: "agencia de diseño web para empresas hispanas en Estados Unidos",
    body: [
      {
        type: "p",
        text: "El mercado hispano de Estados Unidos supera los 3 trillones de dólares al año y crece más rápido que el mercado general. Para una empresa hispana que opera en EE.UU. —o una empresa de EE.UU. que quiere venderle a hispanoparlantes— tener una web en español no es un lujo: es cómo se llega a un cliente que decide en su idioma.",
      },
      { type: "h2", text: "Agencia local vs agencia remota en español" },
      {
        type: "p",
        text: "Las agencias locales en Miami, Houston, LA o NY suelen tener overhead alto y precios inflados. Las agencias remotas serias que trabajan en español y entienden el mercado hispano de EE.UU. entregan el mismo estándar a un costo más racional, con procesos de trabajo a distancia bien afinados. La distancia dejó de ser una desventaja hace años.",
      },
      { type: "h2", text: "Lo no negociable" },
      {
        type: "ul",
        items: [
          "El dominio y el hosting a nombre de tu empresa (no del proveedor).",
          "Sitio 100% en español —no traducido con Google Translate desde una web en inglés.",
          "Optimización para búsquedas hispanoparlantes en Google (SEO en español).",
          "Comprensión cultural del mercado hispano —no una agencia americana que tercerizó traducción.",
          "Formas de pago y facturación compatibles con tu operación en EE.UU.",
        ],
      },
      { type: "h2", text: "Preguntas que te sacan de dudas rápido" },
      {
        type: "ul",
        items: [
          "¿Tienen casos previos con empresas hispanas en EE.UU.?",
          "¿Quién escribe el copy en español —un copywriter nativo o una traducción?",
          "¿El SEO se plantea para búsquedas en español o solo en inglés?",
          "¿El dominio queda a mi nombre desde el día uno?",
          "¿Qué pasa con el sitio si dejo de trabajar con ustedes?",
        ],
      },
      {
        type: "p",
        text: "Si las respuestas suenan a evasivas o a 'nunca lo pensamos', seguí buscando. Tu web es un activo estratégico, no un producto commodity.",
      },
    ],
    relatedHref: "/servicios",
    relatedLabel: "Ver nuestros servicios",
  },

  {
    slug: "wordpress-vs-desarrollo-web-a-medida",
    title: "WordPress vs desarrollo web a medida: cuál conviene",
    seoTitle: "WordPress vs Desarrollo Web a Medida: Cuál Conviene | Suitwolf",
    metaDescription:
      "WordPress vs desarrollo web a medida: diferencias reales en costo, mantenimiento, SEO, seguridad y escalabilidad. Cuándo conviene cada opción para tu empresa.",
    date: "2026-07-28",
    readingMinutes: 7,
    excerpt:
      "WordPress mueve el 43% de la web —por algo. Pero también arrastra costos ocultos que se sienten a los dos años. Cuándo conviene cada opción para una empresa seria.",
    primaryKeyword: "WordPress vs desarrollo web a medida",
    body: [
      {
        type: "p",
        text: "WordPress alimenta más del 43% de la web mundial. Es sinónimo de facilidad, ecosistema enorme de plugins y comunidad activa. Pero también acumula deuda técnica, riesgos de seguridad y limitaciones de rendimiento que se sienten justo cuando tu negocio empieza a crecer.",
      },
      { type: "h2", text: "Qué gana WordPress" },
      {
        type: "ul",
        items: [
          "Time-to-market: podés estar online en semanas.",
          "Ecosistema de plugins: casi cualquier funcionalidad existe.",
          "Gestión de contenido intuitiva para no-técnicos.",
          "Costo inicial más bajo.",
        ],
      },
      { type: "h2", text: "Qué pierde WordPress" },
      {
        type: "ul",
        items: [
          "Rendimiento: WordPress con plantilla + 15 plugins carga en 3–5 segundos donde una web a medida carga en 0.8s.",
          "Seguridad: es el CMS más atacado del mundo —cada plugin desactualizado es una puerta abierta.",
          "SEO técnico: los plugins acumulan código innecesario que penaliza Core Web Vitals.",
          "Mantenimiento constante: actualizaciones, incompatibilidades, plugins descontinuados.",
          "Diferenciación limitada: la mayoría de las plantillas se ven iguales.",
        ],
      },
      { type: "h2", text: "Qué gana el desarrollo a medida" },
      {
        type: "ul",
        items: [
          "Performance top: PageSpeed 95+, cero código innecesario.",
          "Seguridad radicalmente mejor: sin CMS público, sin plugins con vulnerabilidades conocidas.",
          "Diseño único, no compartido con miles de sitios.",
          "Arquitectura escalable sin deuda técnica.",
          "SEO técnico impecable desde el día uno.",
        ],
      },
      { type: "h2", text: "Cuándo conviene cada uno" },
      {
        type: "ul",
        items: [
          "WordPress: blog personal, ONG con presupuesto mínimo, empresa que necesita estar online ya y va a rehacer la web al año.",
          "Desarrollo a medida: empresa que compite por percepción, que factura en base a la autoridad de marca, o que planea escalar la web como canal de captación real.",
        ],
      },
      {
        type: "p",
        text: "Para una empresa profesional en un mercado exigente, WordPress con plantilla es competir con una mano atada. Un desarrollo a medida bien hecho no cuesta el doble: cuesta lo que vale un activo real, no un placeholder.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver diseño web corporativo a medida",
  },

  {
    slug: "cuanto-tarda-hacer-una-pagina-web",
    title: "Cuánto tarda hacer una página web profesional",
    seoTitle: "Cuánto Tarda Hacer una Página Web Profesional | Suitwolf",
    metaDescription:
      "Cuánto tarda hacer una página web a medida: tiempos reales por tipo de proyecto, qué demora los proyectos y cómo asegurar plazos que se cumplen.",
    date: "2026-07-30",
    readingMinutes: 6,
    excerpt:
      "'En dos semanas' o 'en seis meses': las promesas de plazo son un termómetro de qué está construyendo esa agencia. Estos son los tiempos reales por tipo de sitio.",
    primaryKeyword: "cuánto tarda hacer una página web",
    body: [
      {
        type: "p",
        text: "Cuando una agencia promete una web profesional en 'dos semanas', casi siempre te está diciendo algo sin decirlo: es una plantilla configurada con tus colores y textos. Un sitio a medida tiene tiempos honestos, y esos tiempos dependen del tipo de proyecto y de cuánto tarda el cliente en aprobar decisiones.",
      },
      { type: "h2", text: "Tiempos reales por tipo de proyecto" },
      {
        type: "ul",
        items: [
          "Landing page a medida: 2–4 semanas.",
          "Sitio corporativo (6–10 páginas): 6–10 semanas.",
          "E-commerce a medida: 8–14 semanas.",
          "Aplicación web con backend: 3–6 meses.",
        ],
      },
      { type: "h2", text: "Qué determina el tiempo real" },
      {
        type: "p",
        text: "El desarrollo puro suele ser menos de la mitad del proyecto. El resto es: definición estratégica, arquitectura de información, copy, diseño, ciclos de aprobación del cliente, revisión de contenidos, ajustes finales y despliegue. Un cliente que responde rápido acorta un proyecto en semanas. Uno que tarda una semana en aprobar cada iteración lo puede duplicar.",
      },
      { type: "h2", text: "Cómo asegurar plazos que se cumplen" },
      {
        type: "ul",
        items: [
          "Propuesta con hitos por escrito y fechas concretas.",
          "Bloques de contenido pactados desde el arranque (quién entrega qué y cuándo).",
          "Ventanas de revisión definidas —no 'cuando puedas'.",
          "Cláusula de plazos en el contrato, con reajuste si el cliente demora aprobaciones.",
        ],
      },
      {
        type: "p",
        text: "Los proyectos que se estiran meses más allá de lo previsto casi siempre fallan en uno de esos puntos —del lado de la agencia o del cliente. Con reglas claras desde el día uno, los plazos se cumplen.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Conocer el proceso completo",
  },

  {
    slug: "cuando-conviene-rediseno-web",
    title: "Cuándo conviene un rediseño web y cuándo no",
    seoTitle: "Cuándo Conviene Rediseñar una Página Web | Suitwolf",
    metaDescription:
      "Rediseño web: señales concretas de que tu sitio no rinde, cuándo conviene rediseñar y cuándo solo optimizar, y cómo no perder el SEO ganado.",
    date: "2026-08-02",
    readingMinutes: 6,
    excerpt:
      "No toda web vieja necesita rediseño. Y no toda web nueva rinde. Estas son las señales reales de que rediseñar te va a devolver más de lo que invertís.",
    primaryKeyword: "cuándo conviene rediseñar una página web",
    body: [
      {
        type: "p",
        text: "El impulso de rediseñar la web viene casi siempre por estética —'ya me cansé de cómo se ve'—, pero la decisión racional debería venir por rendimiento. Antes de gastar en un rediseño, tenés que saber si el problema es diseño, contenido, tráfico o estrategia comercial.",
      },
      { type: "h2", text: "Señales concretas de que rediseñar tiene sentido" },
      {
        type: "ul",
        items: [
          "La tasa de conversión del sitio es menor al 1% del tráfico de calidad.",
          "El sitio no carga bien en móvil o carga en más de 3 segundos.",
          "No se puede editar contenido sin depender del desarrollador.",
          "El posicionamiento SEO está estancado por problemas técnicos que no se pueden arreglar sin reescribir la base.",
          "La marca cambió y el sitio ya no la refleja.",
          "El sitio no soporta los flujos comerciales actuales (ej: crecieron los productos, agregaron servicios nuevos).",
        ],
      },
      { type: "h2", text: "Cuándo no conviene rediseñar" },
      {
        type: "p",
        text: "Si el sitio convierte bien y solo 'no te encanta estéticamente', un rediseño puede empeorar la conversión. Muchas veces alcanza con optimizar copy, jerarquía visual, tiempos de carga o el flujo del formulario. Rediseñar por gusto y sin diagnóstico es una forma cara de romper lo que funciona.",
      },
      { type: "h2", text: "Cómo no perder el SEO en el proceso" },
      {
        type: "ul",
        items: [
          "Auditoría del SEO actual antes de tocar nada.",
          "Mantener las URLs importantes o redirigir con 301.",
          "Migrar el contenido que ranquea, no eliminarlo.",
          "Preservar la arquitectura de enlaces internos que funciona.",
          "Testear el sitio nuevo en staging antes de publicar.",
        ],
      },
      {
        type: "p",
        text: "Un rediseño bien hecho suele mejorar el SEO en 3–6 meses. Uno mal hecho tira años de posicionamiento a la basura. La diferencia está en si la agencia tiene idea de SEO técnico o solo maqueta bonito.",
      },
    ],
    relatedHref: "/servicios",
    relatedLabel: "Ver nuestros servicios",
  },

  {
    slug: "pagina-web-para-consultora",
    title: "Página web para consultora: qué necesita para atraer clientes",
    seoTitle: "Página Web para Consultora Profesional | Suitwolf",
    metaDescription:
      "Cómo debe ser la página web de una consultora: estructura, contenido, prueba social y conversión. Guía práctica para consultoras que quieren atraer clientes de valor.",
    date: "2026-08-05",
    readingMinutes: 7,
    excerpt:
      "Una consultora vende expertise —y su web es la primera prueba de que la tiene. La mayoría comete los mismos tres errores. Estos son los antídotos.",
    primaryKeyword: "página web para consultora",
    body: [
      {
        type: "p",
        text: "Para una consultora, la web no es un catálogo: es la primera demostración de expertise que ve el cliente potencial. Si el sitio no proyecta autoridad, la reunión se agenda con la duda ya instalada, o directamente no se agenda.",
      },
      { type: "h2", text: "Lo que la web de una consultora tiene que resolver" },
      {
        type: "ul",
        items: [
          "Establecer autoridad en un segundo (quiénes son, para quiénes trabajan).",
          "Aclarar el servicio (qué resuelven, con qué método, para qué tipo de empresa).",
          "Mostrar prueba social (casos, testimonios, empresas cliente).",
          "Ofrecer un siguiente paso claro (agendar llamada, pedir evaluación, descargar recurso).",
        ],
      },
      { type: "h2", text: "Los tres errores más comunes" },
      {
        type: "ul",
        items: [
          "Hablar de la consultora en vez de del cliente: 'somos apasionados por…' rara vez convierte.",
          "Servicios listados como bullets sin nombre propio: 'consultoría estratégica' no dice nada.",
          "Sin prueba social ni casos: sin credibilidad demostrada, el visitante duda.",
        ],
      },
      { type: "h2", text: "Estructura que funciona" },
      {
        type: "ul",
        items: [
          "Hero: qué problema resolvés, para quién, con qué resultado esperable.",
          "Prueba social visible arriba (logos, testimonio breve).",
          "Servicios con nombre propio, resultado esperable y proceso.",
          "Casos con métricas concretas.",
          "Sobre nosotros: método y equipo, no historia emocional.",
          "CTA visible y honesto (evaluación gratuita, no 'suscribite al newsletter').",
        ],
      },
      {
        type: "p",
        text: "Una consultora que compite por percepción no puede permitirse una web genérica. El sitio es el primer entregable que ve el cliente —y ya te está evaluando por él.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver diseño web corporativo a medida",
  },

  {
    slug: "pagina-web-inmobiliaria",
    title: "Página web para inmobiliaria: qué debe tener para captar leads",
    seoTitle: "Página Web para Inmobiliaria Premium | Suitwolf",
    metaDescription:
      "Cómo debe ser la página web de una inmobiliaria: buscador, ficha de propiedad, fotografía, prueba social y captación. Guía práctica para inmobiliarias premium.",
    date: "2026-08-08",
    readingMinutes: 7,
    excerpt:
      "En real estate premium, la web reemplaza a la primera visita. Si no proyecta lujo y confianza, el cliente ni siquiera llama.",
    primaryKeyword: "página web para inmobiliaria",
    body: [
      {
        type: "p",
        text: "En real estate, especialmente en mercados premium como Miami, Madrid o Ciudad de México, la web es el primer showroom. El cliente decide si te contacta en función de cómo se ven las propiedades, cuánta información encuentra sin fricción y qué nivel de credibilidad transmite la marca antes de leer una sola palabra.",
      },
      { type: "h2", text: "Lo mínimo indispensable" },
      {
        type: "ul",
        items: [
          "Buscador de propiedades con filtros útiles (ubicación, precio, tipo, dormitorios).",
          "Ficha de propiedad con galería de fotos profesional, planos, video/tour y datos completos.",
          "Fichas SEO-friendly (URLs limpias, descripción única por propiedad).",
          "Formulario o WhatsApp visible en cada ficha.",
          "Integración con CRM para no perder leads.",
        ],
      },
      { type: "h2", text: "Lo que diferencia una inmobiliaria premium" },
      {
        type: "ul",
        items: [
          "Fotografía profesional (no pisadas móviles) —pesa más que el diseño.",
          "Storytelling de propiedad: no solo datos, sino contexto de barrio, estilo de vida.",
          "Prueba social: casos de venta, testimonios, prensa.",
          "Contenido de mercado: reportes de zona, tendencias, guías del comprador.",
          "Multiidioma cuando el mercado lo justifica (inglés + español en Miami, por ejemplo).",
        ],
      },
      { type: "h2", text: "SEO local: donde se gana la partida" },
      {
        type: "p",
        text: "En real estate, el 70% del tráfico orgánico útil viene de búsquedas locales: 'apartamentos en Brickell', 'casa en Polanco', 'piso en Chamberí'. Sin arquitectura SEO local, tu sitio no aparece en esas búsquedas —por más lindo que sea. Cada zona relevante debería tener su propia página optimizada.",
      },
      {
        type: "p",
        text: "Para una inmobiliaria seria, la web no es catálogo: es showroom, captador de leads y marca. Los tres al mismo tiempo, sin que uno domine sobre los otros.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver diseño web corporativo a medida",
  },

  {
    slug: "cuanto-cuesta-landing-page-alta-conversion",
    title: "Cuánto cuesta una landing page de alta conversión",
    seoTitle: "Cuánto Cuesta una Landing Page de Alta Conversión | Suitwolf",
    metaDescription:
      "Cuánto cuesta una landing page profesional a medida: rangos reales, qué incluye una landing que convierte y cuándo se paga sola con tráfico pago.",
    date: "2026-08-11",
    readingMinutes: 6,
    excerpt:
      "Una landing barata que no convierte cuesta más que una cara que sí lo hace. Estos son los rangos reales y qué mirar antes de contratarla.",
    primaryKeyword: "cuánto cuesta una landing page",
    body: [
      {
        type: "p",
        text: "Una landing page bien construida es una máquina de convertir tráfico pago en leads o ventas. Una mal construida es un tobogán de dinero: convertís al 0.5% mientras la competencia convierte al 4%, y le pagás a Google y Meta la diferencia.",
      },
      { type: "h2", text: "Rangos honestos" },
      {
        type: "ul",
        items: [
          "Plantilla Elementor o similar configurada: 200–800 USD.",
          "Landing a medida con copy incluido: 1.500–4.000 USD.",
          "Landing premium con múltiples variantes A/B y desarrollo custom: 4.000–10.000 USD.",
        ],
      },
      { type: "h2", text: "Qué incluye una landing que convierte" },
      {
        type: "ul",
        items: [
          "Copy estratégico —no relleno— escrito por alguien que entiende psicología de decisión.",
          "Estructura orientada a una sola acción (no menú, no distracciones).",
          "Carga en menos de 2 segundos.",
          "Prueba social visible arriba.",
          "Formulario corto y honesto.",
          "Integración con tu píxel de Meta / etiqueta de Google Ads.",
          "Configuración de eventos de conversión para optimización de campañas.",
        ],
      },
      { type: "h2", text: "Cuándo se paga sola" },
      {
        type: "p",
        text: "Cuenta simple: si invertís 3.000 USD/mes en publicidad y la landing convierte al 1.5% en vez de al 0.5%, la landing pagada bien se paga sola en el primer mes. Y sigue rindiendo mes tras mes. Ese es el cálculo que importa —no cuánto sale, sino cuánto te devuelve por dólar invertido en tráfico.",
      },
    ],
    relatedHref: "/servicios/landing-pages",
    relatedLabel: "Ver diseño de landing pages a medida",
  },

  {
    slug: "shopify-vs-tienda-online-a-medida",
    title: "Shopify vs tienda online a medida: cuál conviene",
    seoTitle: "Shopify vs Tienda Online a Medida | Suitwolf",
    metaDescription:
      "Shopify vs tienda online a medida: diferencias reales en costo, personalización, comisiones, SEO y escalabilidad. Cuándo conviene cada una para tu e-commerce.",
    date: "2026-08-14",
    readingMinutes: 7,
    excerpt:
      "Shopify es rápido de lanzar y te cobra en cada venta. Un desarrollo a medida cuesta más al principio y no te cobra nunca. Cuál conviene depende del volumen y del posicionamiento.",
    primaryKeyword: "Shopify vs tienda online a medida",
    body: [
      {
        type: "p",
        text: "Shopify es el rey del e-commerce y por buenas razones: fácil, robusto, ecosistema enorme. Pero también es una jaula dorada: fees mensuales, comisiones por transacción, limitaciones de personalización y una diferenciación visual que se pierde entre millones de tiendas con el mismo look.",
      },
      { type: "h2", text: "Qué gana Shopify" },
      {
        type: "ul",
        items: [
          "Puesta en marcha rápida (días, no meses).",
          "Infraestructura, seguridad y pagos resueltos.",
          "Ecosistema de apps para casi cualquier necesidad.",
          "Costo inicial bajo.",
        ],
      },
      { type: "h2", text: "Qué gana el desarrollo a medida" },
      {
        type: "ul",
        items: [
          "Sin fee mensual ni comisión por transacción (podés recuperar 2–3% del ticket).",
          "Diseño único, no compartido con miles de tiendas.",
          "Performance superior (carga más rápida = más conversión).",
          "Control total sobre integraciones con ERP, logística y automatizaciones.",
          "Escalabilidad sin límites de plan.",
        ],
      },
      { type: "h2", text: "Cuenta que casi nadie hace" },
      {
        type: "p",
        text: "Una tienda que factura 50.000 USD/mes en Shopify Plus paga entre 2.500 y 4.000 USD/mes solo en fees y comisiones. En 12 meses son 40.000 USD. Un desarrollo a medida bien hecho cuesta entre 15.000 y 25.000 USD una vez —y desde el mes 6 empezás a ahorrar. A los 3 años, ahorraste el equivalente a rehacer la tienda tres veces.",
      },
      { type: "h2", text: "Cuándo conviene cada uno" },
      {
        type: "ul",
        items: [
          "Shopify: catálogo simple, ticket bajo/medio, volumen chico, arranque rápido.",
          "A medida: marca premium que compite por diferenciación, catálogo complejo, volumen alto, integraciones profundas, o cansancio de plataformas que te encierran.",
        ],
      },
    ],
    relatedHref: "/servicios/tienda-online",
    relatedLabel: "Ver diseño de tienda online a medida",
  },

  {
    slug: "pagina-web-para-restaurantes-premium",
    title: "Página web para restaurantes premium: qué necesita para llenar reservas",
    seoTitle: "Página Web para Restaurantes Premium | Suitwolf",
    metaDescription:
      "Cómo debe ser la página web de un restaurante premium: fotografía, reservas online, menú, SEO local y experiencia móvil que convierte en mesa ocupada.",
    date: "2026-08-17",
    readingMinutes: 6,
    excerpt:
      "En gastronomía premium, la web decide si te reservan o pasan al siguiente. Estas son las cosas que separan a los restaurantes que llenan de los que ven mesas vacías.",
    primaryKeyword: "página web para restaurante premium",
    body: [
      {
        type: "p",
        text: "El 70% de las personas mira la web de un restaurante antes de reservar. En premium, ese porcentaje llega al 90%. Si la web no transmite el nivel de la experiencia real —o peor, si obliga a una llamada telefónica para reservar— el cliente se va al siguiente.",
      },
      { type: "h2", text: "Lo mínimo que resuelve mesas" },
      {
        type: "ul",
        items: [
          "Reserva online integrada (ThefFork, OpenTable, o sistema propio).",
          "Menú visible sin descargar PDF (Google indexa HTML, no PDFs).",
          "Fotografía profesional de platos y ambiente.",
          "Ubicación con mapa y estacionamiento.",
          "Horarios y teléfono en cada página, no escondidos.",
          "Diseño móvil impecable —el 80% del tráfico es móvil.",
        ],
      },
      { type: "h2", text: "Lo que diferencia a los premium" },
      {
        type: "ul",
        items: [
          "Storytelling: chef, filosofía, origen de ingredientes, propuesta.",
          "Cartas por sección (degustación, temporada, vinos) tratadas como contenido, no como PDFs.",
          "Prensa y reseñas visibles.",
          "Fotografía dirigida por profesional (no snapshots de móvil).",
          "SEO local afinado: cada barrio, cada tipo de cocina, cada intención.",
        ],
      },
      { type: "h2", text: "SEO local para gastronomía" },
      {
        type: "p",
        text: "En restaurantes, la mayoría de las búsquedas son geolocalizadas: 'restaurante de cocina peruana en Miami', 'mejor omakase Madrid', 'brunch en Polanco'. Sin una arquitectura SEO local pensada (Google Business Profile optimizado + estructura de página alineada), no aparecés en las búsquedas que traen reservas de verdad.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver diseño web corporativo a medida",
  },

  {
    slug: "pagina-web-clinicas-consultorios",
    title: "Página web para clínicas y consultorios: qué debe tener",
    seoTitle: "Página Web para Clínica o Consultorio Médico | Suitwolf",
    metaDescription:
      "Cómo debe ser la página web de una clínica o consultorio: reserva de turnos, información de servicios, confianza, SEO local y cumplimiento normativo.",
    date: "2026-08-20",
    readingMinutes: 7,
    excerpt:
      "En salud, el paciente elige antes de llamar. La web es el filtro que decide si te confía su cuerpo. Estos son los elementos que generan esa confianza.",
    primaryKeyword: "página web para clínica",
    body: [
      {
        type: "p",
        text: "El paciente moderno investiga antes de agendar. Busca en Google, mira la web de la clínica, evalúa credenciales, lee reseñas y recién ahí decide si llama. Una web de clínica que no genera confianza en 15 segundos pierde pacientes contra la clínica de al lado —incluso si tu propuesta médica es superior.",
      },
      { type: "h2", text: "Elementos que generan confianza" },
      {
        type: "ul",
        items: [
          "Fotos reales de la clínica y del equipo (no bancos de imágenes).",
          "Credenciales y especializaciones visibles.",
          "Prensa, casos y reseñas verificadas.",
          "Explicación clara de cada tratamiento: qué es, para quién, qué esperar.",
          "Sección de FAQ que anticipe dudas comunes.",
          "Formulario o WhatsApp visible en cada sección relevante.",
        ],
      },
      { type: "h2", text: "Funcionalidad que baja fricción" },
      {
        type: "ul",
        items: [
          "Reserva de turno online (integración con software médico o sistema propio).",
          "Consultas por WhatsApp integradas.",
          "Diseño móvil impecable (el 85% de las búsquedas de salud son móviles).",
          "Carga rápida —los pacientes no esperan 4 segundos.",
        ],
      },
      { type: "h2", text: "Cumplimiento normativo" },
      {
        type: "p",
        text: "En salud, la web tiene requisitos regulatorios: aviso de privacidad claro, consentimiento para tratamiento de datos, cumplimiento HIPAA (en EE.UU.) o LGPD/RGPD según el mercado. Una web médica que ignora esto expone a la clínica a sanciones y a demandas —además de erosionar la confianza del paciente.",
      },
      { type: "h2", text: "SEO local médico" },
      {
        type: "p",
        text: "Las búsquedas médicas son casi todas locales: 'dermatólogo en Palermo', 'clínica dental Miami', 'psicólogo online México'. Una arquitectura SEO local bien construida —con página propia por especialidad y por zona— es la diferencia entre agenda llena y agenda vacía.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver diseño web corporativo a medida",
  },

  /* ═══════════════════════════════════════════════════════════════════
     EDUCATIVOS — autoridad temática y funnel superior
     ═══════════════════════════════════════════════════════════════════ */

  {
    slug: "core-web-vitals-empresas",
    title: "Core Web Vitals: qué son y por qué importan para vender",
    seoTitle: "Core Web Vitals: Qué Son y Por Qué Importan | Suitwolf",
    metaDescription:
      "Core Web Vitals explicados sin jerga técnica: qué son LCP, INP y CLS, por qué Google los usa para rankear, y cómo impactan tu tasa de conversión.",
    date: "2026-08-23",
    readingMinutes: 7,
    excerpt:
      "Google penaliza sitios lentos. Los usuarios los abandonan. Los Core Web Vitals miden exactamente qué hace lento a un sitio —y son la métrica que separa a los que rankean de los que no.",
    primaryKeyword: "Core Web Vitals",
    body: [
      {
        type: "p",
        text: "Los Core Web Vitals son el estándar que Google usa para medir la experiencia real de tu web. Tres métricas concretas que definen si tu sitio es una experiencia fluida o una fuente de frustración —y Google las convierte en factor de ranking desde 2021.",
      },
      { type: "h2", text: "Las tres métricas y qué miden" },
      {
        type: "ul",
        items: [
          "LCP (Largest Contentful Paint): cuánto tarda en aparecer el contenido principal. Objetivo: menos de 2.5 segundos.",
          "INP (Interaction to Next Paint): cuánto tarda tu web en responder a un clic o tap. Objetivo: menos de 200 milisegundos.",
          "CLS (Cumulative Layout Shift): cuánto se mueve la página mientras carga. Objetivo: menos de 0.1.",
        ],
      },
      { type: "h2", text: "Por qué importan comercialmente" },
      {
        type: "p",
        text: "Amazon calculó que cada 100 ms de latencia le cuestan 1% de sus ventas. Google midió que sitios con LCP mayor a 4 segundos tienen 2.5x más rebote. En pequeña escala: si tu sitio tarda 4 segundos en cargar y el de la competencia tarda 1, el cliente ya se fue antes de leer nada.",
      },
      { type: "h2", text: "Qué destruye tus Core Web Vitals" },
      {
        type: "ul",
        items: [
          "Imágenes sin optimizar (fotos de 5 MB cuando deberían pesar 200 KB).",
          "Fuentes web sin display: swap.",
          "Plugins y scripts de terceros (chatbots, analytics duplicados, píxeles).",
          "Plantillas cargadas con código innecesario.",
          "Falta de lazy loading en contenido debajo del fold.",
        ],
      },
      { type: "h2", text: "Cómo se arreglan" },
      {
        type: "p",
        text: "En una web a medida se resuelven en el diseño y desarrollo, no como parche. En una web con plantilla suele requerir cambiar plugins, comprimir imágenes manualmente y sacrificar funcionalidades. Muchas veces conviene rehacer que parchar.",
      },
    ],
    relatedHref: "/servicios/seo-posicionamiento-web",
    relatedLabel: "Ver SEO y posicionamiento web",
  },

  {
    slug: "como-aumentar-tasa-conversion-sitio-web",
    title: "Cómo aumentar la tasa de conversión de un sitio web",
    seoTitle: "Cómo Aumentar la Tasa de Conversión Web | Suitwolf",
    metaDescription:
      "Cómo aumentar la tasa de conversión de tu sitio web: los cinco factores que más impactan, cómo priorizarlos y ejemplos concretos que multiplican conversión.",
    date: "2026-08-26",
    readingMinutes: 8,
    excerpt:
      "El mismo tráfico puede generar 5x más clientes con la web correcta. Estos son los cinco factores que más impactan la conversión —en orden de peso real.",
    primaryKeyword: "cómo aumentar la tasa de conversión de un sitio web",
    body: [
      {
        type: "p",
        text: "La tasa de conversión de una web se mueve mucho más de lo que parece con cambios chicos. Pasar de 1% a 3% no requiere más tráfico ni más presupuesto de publicidad: requiere una web que quite fricción y sepa cerrar. Estos son los cinco factores en orden de impacto.",
      },
      { type: "h2", text: "1. Claridad en el hero" },
      {
        type: "p",
        text: "El hero (lo primero que se ve) tiene 5 segundos para responder qué es, para quién y qué obtenés. Titulares abstractos como 'transformamos ideas en experiencias' fallan siempre. Titulares concretos como 'sitios web a medida que convierten visitantes en clientes' funcionan.",
      },
      { type: "h2", text: "2. Velocidad de carga" },
      {
        type: "p",
        text: "Cada segundo por encima de 1 pierde entre 7% y 20% de conversión. Optimizar imágenes, hosting, código y fuentes es la palanca de ROI más alta que existe.",
      },
      { type: "h2", text: "3. Prueba social visible" },
      {
        type: "p",
        text: "Logos de clientes, testimonios reales, casos con métricas. La confianza no se declara, se demuestra. Mostrar prueba social arriba del fold multiplica la conversión frente a esconderla en una sección aparte.",
      },
      { type: "h2", text: "4. CTA único y honesto" },
      {
        type: "p",
        text: "Un solo llamado a la acción principal, repetido, honesto. 'Comprá ahora' es mejor que 'contáctanos'. 'Pedí tu evaluación gratuita' es mejor que 'saber más'. Menús con 12 opciones dispersan; una sola acción concentra.",
      },
      { type: "h2", text: "5. Fricción en el formulario" },
      {
        type: "p",
        text: "Cada campo extra en un formulario reduce la conversión un 8–10%. Un formulario de 3 campos convierte hasta el triple que uno de 8. Pedir solo lo que necesitás para el siguiente paso —no para la ficha del CRM del comercial.",
      },
      { type: "h2", text: "Cómo priorizar" },
      {
        type: "p",
        text: "En este orden: velocidad, claridad del hero, prueba social, CTA, formularios. La razón: son los cambios con mayor impacto y menor costo. Rediseñar todo antes de arreglar velocidad es como comprarse un traje nuevo cuando el problema es que llegás tarde.",
      },
    ],
    relatedHref: "/servicios/landing-pages",
    relatedLabel: "Ver landing pages de alta conversión",
  },

  {
    slug: "errores-comunes-diseno-web-empresas",
    title: "Errores comunes en el diseño web de empresas",
    seoTitle: "Errores Comunes en el Diseño Web Empresarial | Suitwolf",
    metaDescription:
      "Los errores más comunes en el diseño web de empresas: hero confuso, sin prueba social, formularios interminables y menús saturados. Cómo evitarlos.",
    date: "2026-08-29",
    readingMinutes: 6,
    excerpt:
      "Casi todas las webs corporativas repiten los mismos siete errores. Corregirlos es más barato que rediseñar —y suele devolver más resultado.",
    primaryKeyword: "errores comunes diseño web",
    body: [
      {
        type: "p",
        text: "Después de auditar decenas de webs corporativas, aparecen los mismos errores una y otra vez. Ninguno es de diseño estético: son errores de estrategia y de entender cómo un visitante toma decisiones. Corregirlos es lo que separa una web bonita de una web que trae clientes.",
      },
      { type: "h2", text: "1. Hero abstracto o poético" },
      {
        type: "p",
        text: "'Somos la agencia que hace que las ideas cobren vida.' Cero información. El visitante no sabe qué hacés ni para quién. En 5 segundos decide irse.",
      },
      { type: "h2", text: "2. Sin prueba social visible" },
      {
        type: "p",
        text: "Testimonios enterrados en la página 3, casos sin métricas, logos de clientes que no aparecen hasta el footer. La confianza tiene que estar arriba —no escondida.",
      },
      { type: "h2", text: "3. Menú con 12 opciones" },
      {
        type: "p",
        text: "Cuando todo es importante, nada lo es. Un menú saturado disuade la decisión. Los mejores sitios tienen menús de 4–6 opciones y una acción principal destacada.",
      },
      { type: "h2", text: "4. Formularios interminables" },
      {
        type: "p",
        text: "Cada campo extra pierde 8–10% de conversión. Pedir teléfono, dirección, tamaño de empresa, presupuesto y sector antes del primer contacto es una forma cara de perder leads que sí querían hablar.",
      },
      { type: "h2", text: "5. Sin llamada a la acción clara" },
      {
        type: "p",
        text: "'Contactanos' es débil. 'Solicitar evaluación gratuita', 'Reservar mesa', 'Descargar guía' son concretas. El visitante necesita saber qué obtiene al hacer clic.",
      },
      { type: "h2", text: "6. Textos que hablan de la empresa" },
      {
        type: "p",
        text: "'Somos apasionados', 'nuestro equipo', 'nuestra misión'. Al visitante le importa lo que le va a pasar a él, no lo que sos vos. Reescribir cada sección desde el ángulo del cliente cambia la conversión drásticamente.",
      },
      { type: "h2", text: "7. Mobile roto o descuidado" },
      {
        type: "p",
        text: "El 60–80% del tráfico es móvil y la mayoría de las webs corporativas se diseñan primero en desktop. Textos ilegibles, botones tocables por accidente, layouts rotos: pérdida directa de conversión.",
      },
    ],
    relatedHref: "/servicios",
    relatedLabel: "Ver nuestros servicios",
  },

  {
    slug: "seo-tecnico-para-empresas",
    title: "SEO técnico para empresas: guía práctica",
    seoTitle: "SEO Técnico para Empresas: Guía Práctica | Suitwolf",
    metaDescription:
      "SEO técnico explicado para empresas: qué es, qué componentes lo forman (indexación, velocidad, arquitectura, datos estructurados) y cómo auditarlo.",
    date: "2026-09-01",
    readingMinutes: 8,
    excerpt:
      "El SEO técnico es la base sobre la que todo lo demás se construye. Sin él, el mejor contenido y las mejores keywords rinden por debajo de su potencial.",
    primaryKeyword: "SEO técnico para empresas",
    body: [
      {
        type: "p",
        text: "El SEO técnico es la parte invisible del posicionamiento: cómo Google entiende, indexa y sirve tu web. Sin una base técnica sólida, el mejor contenido y las mejores keywords rinden por debajo de su potencial. Y a diferencia del SEO de contenido, el técnico se resuelve una vez y sostiene por años.",
      },
      { type: "h2", text: "Los componentes que Google mira" },
      {
        type: "ul",
        items: [
          "Indexación: ¿Google encuentra tus páginas? ¿Están en sitemap y robots?",
          "Velocidad: Core Web Vitals dentro de umbral.",
          "Arquitectura: enlaces internos que distribuyen autoridad, URLs limpias, jerarquía clara.",
          "Datos estructurados: schema.org que explica qué es cada página (servicio, artículo, producto, FAQ).",
          "Mobile: responsive impecable, no versión aparte.",
          "HTTPS: obligatorio.",
          "Canonicals: sin contenido duplicado ni versiones que pelean entre sí.",
        ],
      },
      { type: "h2", text: "Cómo auditarlo básicamente" },
      {
        type: "ul",
        items: [
          "Google Search Console: cobertura, mobile usability, Core Web Vitals reales.",
          "PageSpeed Insights: velocidad y sugerencias por página.",
          "Screaming Frog: crawl completo, errores, redirecciones, meta duplicadas.",
          "Schema Markup Validator: datos estructurados sin errores.",
        ],
      },
      { type: "h2", text: "Los errores técnicos más comunes" },
      {
        type: "ul",
        items: [
          "Páginas importantes no indexadas por robots.txt o meta noindex accidental.",
          "Redirecciones 302 (temporales) en lugar de 301 (permanentes) en páginas migradas.",
          "URLs con parámetros que crean duplicados.",
          "Falta de schema en páginas clave (perder rich snippets).",
          "Sitemap desactualizado o incompleto.",
        ],
      },
      { type: "h2", text: "Por qué importa hacerlo bien de entrada" },
      {
        type: "p",
        text: "Un sitio construido con SEO técnico desde el diseño tiene una base que dura años. Un sitio que se optimiza técnicamente después casi siempre requiere rehacer código. Por eso las agencias serias construyen la arquitectura pensando en Google desde la primera línea, no como un ajuste posterior.",
      },
    ],
    relatedHref: "/servicios/seo-posicionamiento-web",
    relatedLabel: "Ver SEO y posicionamiento web",
  },

  {
    slug: "diseno-ux-por-que-impacta-ventas",
    title: "Qué es el diseño UX y por qué impacta directamente en tus ventas",
    seoTitle: "Diseño UX: Qué Es y Cómo Impacta las Ventas | Suitwolf",
    metaDescription:
      "Diseño UX explicado para empresas: qué es, por qué es distinto del diseño gráfico y cómo impacta directamente en la tasa de conversión y las ventas.",
    date: "2026-09-04",
    readingMinutes: 6,
    excerpt:
      "UX no es 'diseño bonito'. Es la disciplina que decide si tu cliente completa la acción o se va. Y su impacto en ventas es medible.",
    primaryKeyword: "qué es diseño UX",
    body: [
      {
        type: "p",
        text: "UX significa User Experience —experiencia de usuario. Pero se malinterpreta constantemente como sinónimo de diseño gráfico o de 'que se vea lindo'. UX es otra cosa: es la disciplina que estudia cómo un usuario interactúa con tu producto y diseña esa interacción para que sea fluida, intuitiva y termine en la acción esperada.",
      },
      { type: "h2", text: "UX vs diseño visual" },
      {
        type: "p",
        text: "El diseño visual (UI) es cómo se ve: colores, tipografía, layout. El UX es cómo funciona: dónde está el botón, cuántos pasos tiene el checkout, si el formulario pide lo justo o lo excesivo, si el mensaje de error explica qué hacer. Un sitio puede tener UI espectacular y UX horrible —y perder clientes cada minuto.",
      },
      { type: "h2", text: "Cómo el UX impacta ventas concretamente" },
      {
        type: "ul",
        items: [
          "Bajar un checkout de 5 pasos a 3 pasos: hasta 35% más ventas.",
          "Reducir campos del formulario a lo esencial: 30–50% más leads.",
          "Ordenar la navegación por prioridad, no alfabéticamente: 15–20% más engagement.",
          "Mostrar precio y tiempo de envío antes del checkout: 20% menos abandono de carrito.",
        ],
      },
      { type: "h2", text: "Qué mira un UX designer" },
      {
        type: "ul",
        items: [
          "Objetivos del usuario en cada pantalla.",
          "Recorridos: cómo el usuario llega desde entrada hasta acción.",
          "Fricciones: dónde se traba, dónde duda, dónde abandona.",
          "Jerarquía visual: qué debe leer primero, qué segundo, qué tercero.",
          "Feedback: cómo el sistema le confirma que hizo lo correcto.",
        ],
      },
      {
        type: "p",
        text: "Una web bien diseñada visualmente sin pensar en UX es un catálogo lindo. Una web con UX bien pensado —aunque estéticamente sea menos ambicioso— convierte más. Lo ideal es tener ambos, y para eso el equipo tiene que trabajar con las dos disciplinas desde el arranque.",
      },
    ],
    relatedHref: "/servicios/aplicaciones-web-a-medida",
    relatedLabel: "Ver aplicaciones web a medida",
  },

  {
    slug: "como-escribir-copy-pagina-web-vende",
    title: "Cómo escribir el copy de una página web que venda",
    seoTitle: "Cómo Escribir Copy de Página Web que Venda | Suitwolf",
    metaDescription:
      "Cómo escribir el copy de una página web que convierte: estructura del hero, propuesta de valor, prueba social, objeciones y CTA. Ejemplos y plantillas.",
    date: "2026-09-07",
    readingMinutes: 7,
    excerpt:
      "El diseño atrapa la mirada. El copy cierra la venta. Estas son las reglas del texto que convierte —y los patrones que casi todas las webs corporativas rompen.",
    primaryKeyword: "cómo escribir copy página web",
    body: [
      {
        type: "p",
        text: "El copy —el texto de tu web— hace el trabajo pesado de convertir. El diseño atrae, pero es el texto el que responde 'qué es', 'para quién', 'por qué debería confiar', 'qué obtengo si hago clic'. Un buen copy multiplica la conversión más que cualquier rediseño estético.",
      },
      { type: "h2", text: "La regla de oro: hablá de tu cliente, no de vos" },
      {
        type: "p",
        text: "El error más común es escribir sobre la empresa ('somos apasionados', 'nuestro equipo', 'desde 2010'). Al visitante no le importa. Le importa qué le pasa a él si compra tu servicio. Cada frase debería contestar: ¿esto me está diciendo qué gano yo?",
      },
      { type: "h2", text: "Estructura del hero (arriba del fold)" },
      {
        type: "ul",
        items: [
          "Titular: qué obtiene el visitante en una frase concreta.",
          "Subtítulo: cómo lo obtiene o para quién es.",
          "Prueba social (1 línea): 'usado por X empresas', 'ranked como el mejor…'",
          "CTA: acción específica ('Solicitar evaluación', 'Ver demo').",
        ],
      },
      { type: "h2", text: "Propuesta de valor" },
      {
        type: "p",
        text: "Fórmula que funciona: [Resultado concreto] para [audiencia específica] sin [dolor común]. Ejemplo: 'Sitios web a medida que convierten visitantes en clientes, para empresas que no quieren competir por precio.'",
      },
      { type: "h2", text: "Prueba social específica" },
      {
        type: "p",
        text: "'Aumentamos las conversiones' no dice nada. '3x más leads en 60 días para una consultora legal' sí. Métrica + audiencia + tiempo. Sin eso, es un adjetivo vacío.",
      },
      { type: "h2", text: "Objeciones anticipadas" },
      {
        type: "p",
        text: "Todo cliente tiene dudas antes de comprar. FAQ y secciones tipo 'esto no es para vos si…' anticipan esas dudas y las resuelven antes de que se conviertan en abandono. Cerrar objeciones aumenta la conversión más que cualquier promesa nueva.",
      },
      { type: "h2", text: "CTA que convierte" },
      {
        type: "p",
        text: "Concreto, honesto, con beneficio implícito. 'Solicitar evaluación sin costo' es mejor que 'contáctanos'. 'Ver demo de 5 minutos' es mejor que 'saber más'. Decile al visitante qué obtiene si hace clic, y qué NO tiene que dar (ej: 'sin registrarte', 'sin tarjeta de crédito').",
      },
    ],
    relatedHref: "/servicios/landing-pages",
    relatedLabel: "Ver landing pages con copy incluido",
  },

  {
    slug: "seguridad-web-empresas",
    title: "Seguridad web para empresas: qué protege un sitio serio",
    seoTitle: "Seguridad Web para Empresas: Qué Debe Proteger | Suitwolf",
    metaDescription:
      "Seguridad web para empresas: HTTPS, protección DDoS, gestión de vulnerabilidades, backups, cumplimiento normativo. Qué debe incluir un sitio profesional.",
    date: "2026-09-10",
    readingMinutes: 7,
    excerpt:
      "Un ataque a tu web puede tirarla, robar datos de clientes o inyectar malware. La mayoría es prevenible —si la agencia entiende de seguridad desde el diseño.",
    primaryKeyword: "seguridad web para empresas",
    body: [
      {
        type: "p",
        text: "La seguridad web se percibe como algo abstracto hasta que un incidente hace un daño concreto: sitio caído durante un lanzamiento, datos de clientes filtrados, marca dañada por malware inyectado en tu propia web. Casi todo eso es prevenible con decisiones tomadas en el diseño y desarrollo —no como parche posterior.",
      },
      { type: "h2", text: "Lo mínimo indispensable" },
      {
        type: "ul",
        items: [
          "HTTPS con certificado SSL válido (obligatorio: Google penaliza sin él).",
          "Actualizaciones automáticas del stack (base de datos, dependencias, framework).",
          "Backups automáticos con recuperación probada.",
          "Protección DDoS mínima (Cloudflare o similar).",
          "Aislamiento del panel de admin (no /wp-admin público).",
        ],
      },
      { type: "h2", text: "Vulnerabilidades más comunes" },
      {
        type: "ul",
        items: [
          "Plugins de CMS desactualizados (la puerta más grande en WordPress).",
          "Contraseñas débiles del panel de admin (2FA obligatorio).",
          "Inyección SQL en formularios sin validación.",
          "Cross-site scripting (XSS) en comentarios o campos de usuario.",
          "Exposición de archivos sensibles (.env, logs, backups viejos).",
        ],
      },
      { type: "h2", text: "Cumplimiento normativo" },
      {
        type: "p",
        text: "Según el mercado y sector, hay obligaciones legales: RGPD en Europa, LGPD en Brasil, CCPA en California, HIPAA en salud EE.UU., PCI-DSS si procesás tarjetas. Ignorarlas no es solo riesgo de multa: es riesgo de demanda y de daño reputacional serio.",
      },
      { type: "h2", text: "Qué mirar en tu agencia" },
      {
        type: "ul",
        items: [
          "¿Tienen protocolo de actualización y backups?",
          "¿Cumplen RGPD/LGPD desde el diseño del formulario?",
          "¿El panel de admin está protegido con 2FA?",
          "¿Monitorean el sitio 24/7 o solo cuando hay incidente?",
          "¿Qué respuesta tienen ante un incidente de seguridad?",
        ],
      },
      {
        type: "p",
        text: "Un sitio a medida bien construido, sin CMS público, con backup diario y monitoreo activo tiene una superficie de ataque radicalmente menor a un WordPress con 20 plugins. La seguridad, como el SEO técnico, no es un extra: es parte del estándar.",
      },
    ],
    relatedHref: "/servicios/diseno-web-corporativo",
    relatedLabel: "Ver diseño web corporativo a medida",
  },

  {
    slug: "tendencias-diseno-web-empresas-2026",
    title: "Tendencias de diseño web para empresas en 2026",
    seoTitle: "Tendencias de Diseño Web para Empresas 2026 | Suitwolf",
    metaDescription:
      "Tendencias de diseño web 2026 para empresas: tipografía editorial, motion sutil, dark modes premium, IA en la experiencia, performance como diferencial.",
    date: "2026-09-13",
    readingMinutes: 6,
    excerpt:
      "El diseño web en 2026 vuelve a lo editorial, se vuelve más veloz y usa la IA sin alardear. Estas son las tendencias que se instalan —y las que ya se van.",
    primaryKeyword: "tendencias diseño web 2026",
    body: [
      {
        type: "p",
        text: "Las tendencias en diseño web ya no son sobre efectos vistosos: son sobre cómo comunican percepción de valor y cómo se sienten a nivel experiencia. En 2026, el diseño premium se separa cada vez más claramente de las plantillas —y ese contraste es lo que decide compras.",
      },
      { type: "h2", text: "Lo que se instala" },
      {
        type: "ul",
        items: [
          "Tipografía editorial: serifas grandes, jerarquías fuertes, aire. Menos 'tech', más magazine premium.",
          "Motion sutil: microanimaciones que refuerzan jerarquía, no efectos gratuitos.",
          "Dark modes premium: cálidos, con acentos dorados o metálicos, no puro negro.",
          "IA integrada silenciosamente: chats contextuales, recomendaciones, personalización sin alardear.",
          "Performance como diferencial visible: sitios que cargan en 1 segundo se sienten distintos.",
          "Contenido humano en video corto: dueños, equipos, clientes reales hablando directamente.",
        ],
      },
      { type: "h2", text: "Lo que se va" },
      {
        type: "ul",
        items: [
          "Hero videos pesados que tapan todo y no dicen nada.",
          "Gradientes '2020 tech' saturados sin propósito.",
          "Ilustraciones vectoriales genéricas (las que vienen en cada plantilla).",
          "Formularios interminables que piden todo antes de dar valor.",
          "Efectos parallax exagerados que rompen mobile.",
        ],
      },
      { type: "h2", text: "Lo que sigue vigente (y siempre lo estará)" },
      {
        type: "ul",
        items: [
          "Claridad de propuesta en 5 segundos.",
          "Mobile-first, no mobile-second.",
          "Copy que habla del cliente.",
          "Prueba social visible y específica.",
          "Un CTA principal claro.",
        ],
      },
      {
        type: "p",
        text: "Las tendencias suman, pero no sustituyen los fundamentos. Una web con la última estética pero sin propuesta clara sigue convirtiendo mal. Una web con fundamentos sólidos y estética actualizada gana la partida siempre.",
      },
    ],
    relatedHref: "/servicios",
    relatedLabel: "Ver nuestros servicios",
  },

  /* ─── Contenido local — Paraná / Entre Ríos ──────────────────────────
   * Serie de artículos con intención local. Apuntan a keywords específicas
   * del mercado entrerriano (baja competencia, alta conversión) y refuerzan
   * la señal geo del sitio hacia Paraná.
   */

  {
    slug: "cuanto-cuesta-pagina-web-parana",
    title: "Cuánto sale una página web en Paraná (2026): guía honesta para PyMEs",
    seoTitle: "Cuánto Cuesta una Página Web en Paraná 2026 | Suitwolf",
    metaDescription:
      "Rangos reales de precios para páginas web en Paraná, Entre Ríos. Qué incluye cada tramo, qué esperar por cada dólar invertido y cómo evitar la trampa del 'low-cost'.",
    date: "2026-08-15",
    readingMinutes: 7,
    excerpt:
      "La pregunta más común de una PyME paranaense antes de contratar una web. Los rangos reales del mercado, qué incluye cada uno y por qué el más barato termina siendo el más caro.",
    primaryKeyword: "cuánto sale una página web en Paraná",
    body: [
      {
        type: "p",
        text: "Si tenés un negocio en Paraná y estás pidiendo presupuestos, seguramente viste cotizaciones que van desde 40 mil pesos hasta 3.000 dólares. No es que un proveedor esté loco y otro sea justo: son productos completamente distintos con el mismo nombre. Esta guía te ordena los tramos reales del mercado local y qué obtenés en cada uno.",
      },
      { type: "h2", text: "Los tres tramos reales en Paraná (2026)" },
      {
        type: "p",
        text: "El mercado local tiene tres realidades bien distintas. Cada una resuelve un problema diferente y el error más común es contratar una esperando otra.",
      },
      {
        type: "ul",
        items: [
          "Bajo (USD 400–900): plantilla WordPress o Wix con retoques mínimos.",
          "Medio (USD 1.500–3.000): sitio hecho sobre plantilla premium con customización real, contenido armado a medida y SEO básico.",
          "Premium a medida (USD 3.000–8.000+): diseño y desarrollo desde cero, estrategia, copy, SEO técnico y performance.",
        ],
      },
      { type: "h2", text: "Qué incluye realmente el tramo bajo" },
      {
        type: "p",
        text: "Una plantilla WordPress con tu logo, tus fotos y algún cambio de color. Tres o cuatro secciones estándar, formulario básico, hosting compartido que se cae cuando hay pico. Sirve para 'aparecer' — no para competir. Tu web se ve como la de otros 10.000 negocios que compraron la misma plantilla, y Google lo detecta.",
      },
      {
        type: "p",
        text: "Cuando el proveedor local te dice '20 mil pesos, entrego en 3 días' está vendiéndote esto. No hay estrategia, no hay diferenciación, y en 12 meses vas a estar pagando por una segunda web porque la primera no aporta clientes.",
      },
      { type: "h2", text: "Qué incluye el tramo medio" },
      {
        type: "p",
        text: "Acá aparece la mayoría de agencias locales de Paraná. Trabajan con plantillas premium (Divi, Elementor Pro, Astra) más customización real: estructura pensada para tu rubro, textos propios, algo de SEO on-page. Es el mínimo aceptable si tu negocio depende de la web para captar clientes.",
      },
      {
        type: "p",
        text: "El problema del tramo medio: seguís sobre una base que compartís con miles de sitios. Cargás plugins que suman peso y bajan tu velocidad. Tu sitio se ve profesional, pero el techo de rendimiento SEO y de conversión está capado por la infraestructura.",
      },
      { type: "h2", text: "Qué incluye una web premium a medida" },
      {
        type: "p",
        text: "Diseño 100% original desde cero, arquitectura pensada para tu propuesta comercial específica, copy que convierte, SEO técnico desde el primer día, performance real (PageSpeed 90+), sin plugins ni dependencias externas. Un stack moderno (Next.js, React, headless) que carga en menos de un segundo y se posiciona porque Google lo premia.",
      },
      {
        type: "p",
        text: "La diferencia no es solo estética. Es que tu web deja de ser 'una tarjeta digital' y pasa a ser el activo comercial más rentable de la empresa —el que trabaja las 24 horas mostrando el nivel real del negocio.",
      },
      { type: "h2", text: "La trampa del 'todo por 20 mil pesos'" },
      {
        type: "p",
        text: "Es el error más caro que ves en Paraná. Se contrata una web low-cost pensando 'después escalo', y termina pasando una de estas tres cosas: el proveedor desaparece, la web se cae a los 6 meses porque nadie la mantiene, o hay que rehacerla completa porque nunca estuvo pensada para tu negocio real.",
      },
      {
        type: "p",
        text: "Sumado a que en el medio perdiste 12 meses de posicionamiento, clientes que llegaron y se fueron, y presupuesto en Google Ads compensando lo que la web no capta orgánicamente.",
      },
      { type: "h2", text: "La pregunta correcta no es cuánto sale" },
      {
        type: "p",
        text: "Es qué retorno te tiene que dar. Si tu ticket promedio es de USD 500 y una web premium te trae 3 clientes por mes que no tenías antes, la inversión se recupera en el primer trimestre. Si tu ticket es de 5.000, se recupera con un cliente.",
      },
      {
        type: "p",
        text: "Para una PyME de Paraná con propuesta comercial clara y un plan de captación digital, el tramo medio-premium es el que tiene sentido económico real. Todo lo que esté por debajo es gasto, no inversión.",
      },
    ],
    relatedHref: "/diseno-web-parana",
    relatedLabel: "Ver diseño web en Paraná",
  },

  {
    slug: "seo-local-parana-entre-rios",
    title: "SEO local en Paraná: cómo aparecer en Google cuando alguien busca cerca tuyo",
    seoTitle: "SEO Local Paraná Entre Ríos: Guía 2026 | Suitwolf",
    metaDescription:
      "Guía completa de SEO local para Paraná y Entre Ríos: cómo aparecer en el 3-pack de Maps, Google Business Profile, contenido geo y schema. Práctica, para PyMEs.",
    date: "2026-08-20",
    readingMinutes: 8,
    excerpt:
      "Aparecer arriba cuando alguien en Paraná busca tu servicio no es suerte: es método. Los factores concretos que definen el 3-pack de Google Maps y cómo trabajarlos.",
    primaryKeyword: "SEO local Paraná",
    body: [
      {
        type: "p",
        text: "SEO local es distinto al SEO general. No compite por 'quién tiene el mejor contenido del mundo': compite por 'quién resuelve mejor a alguien que está buscando cerca'. Para un negocio de Paraná, es la palanca de mayor retorno —y la que casi nadie trabaja bien.",
      },
      { type: "h2", text: "El 3-pack de Google Maps es el objetivo" },
      {
        type: "p",
        text: "Cuando alguien busca 'agencia de diseño web Paraná' o 'consultorio dental cerca', Google muestra un mapa con tres resultados destacados —el famoso 3-pack. El primero se lleva el 40% de los clics, y los tres primeros el 75%. Estar cuarto es prácticamente no existir. Todo el juego del SEO local se reduce a entrar en esos tres.",
      },
      { type: "h2", text: "Los 5 factores que definen tu ranking local" },
      {
        type: "ul",
        items: [
          "Google Business Profile completo y verificado (el músculo #1).",
          "Proximidad: cuánto más cerca está tu negocio del que busca, mejor.",
          "Reviews: cantidad, frecuencia y calidad de las reseñas.",
          "NAP consistency: tu nombre, dirección y teléfono idénticos en todos lados.",
          "Señales on-page: schema LocalBusiness, contenido con menciones de Paraná/Entre Ríos.",
        ],
      },
      { type: "h2", text: "Google Business Profile: el músculo #1" },
      {
        type: "p",
        text: "Sin GBP verificado no hay 3-pack. Punto. Es gratis, se completa en una hora, y es el primer paso siempre. Categoría principal + secundarias, horarios exactos, fotos reales del negocio, servicios listados con descripción, área de servicio y —crítico— publicaciones semanales.",
      },
      {
        type: "p",
        text: "En Paraná se ven muchos negocios con GBP creado pero abandonado. Esa negligencia es tu oportunidad: mantener el perfil vivo te pone por encima del 90% de la competencia local sin gastar un peso extra.",
      },
      { type: "h2", text: "NAP consistency: el detalle silencioso" },
      {
        type: "p",
        text: "NAP = Name, Address, Phone. Tu negocio tiene que aparecer con exactamente el mismo nombre, dirección y teléfono en Google, tu sitio web, Facebook, Instagram, Páginas Amarillas, la Cámara de Comercio. Cualquier variación —Calle 25 de Mayo vs C. 25 de Mayo— debilita la señal de entidad.",
      },
      {
        type: "p",
        text: "Auditá ahora mismo: googleá el nombre exacto de tu negocio y revisá cada resultado. Si en tres lugares aparece un teléfono viejo o una dirección con abreviatura distinta, tenés un problema silencioso que te está costando ranking.",
      },
      { type: "h2", text: "Contenido local en tu sitio: qué escribir" },
      {
        type: "p",
        text: "Google necesita señales textuales de que servís a Paraná. Eso significa: una página específica para 'servicio X en Paraná', menciones naturales de ciudades entrerrianas donde también atendés, testimonios de clientes locales con nombre real, casos de estudio con referencia a la zona.",
      },
      {
        type: "p",
        text: "No es keyword stuffing —Google penaliza eso. Es escribir para tu cliente real, que vive en Paraná y quiere saber que entendés su mercado.",
      },
      { type: "h2", text: "Reviews: cómo pedirlas sin quemar el vínculo" },
      {
        type: "p",
        text: "Las reviews en GBP son el segundo factor más importante después del perfil mismo. La cantidad importa (10 vs 3), la frecuencia importa (constantes vs todas de golpe), y las respuestas del negocio importan (agradecer las buenas, gestionar las malas con altura).",
      },
      {
        type: "p",
        text: "El mejor momento para pedir una review es cuando el cliente te dijo 'gracias, quedó espectacular'. Mandale el link directo a tu perfil por WhatsApp. No en un email masivo dos meses después.",
      },
      { type: "h2", text: "Errores que te sacan del 3-pack" },
      {
        type: "ul",
        items: [
          "GBP sin categoría o con categoría equivocada.",
          "Dirección diferente en tu sitio y en Google.",
          "Reviews ignoradas (sin responder ninguna en meses).",
          "Web lenta —Google mide performance como factor de ranking local.",
          "Cero menciones de tu ciudad en el sitio.",
        ],
      },
      {
        type: "p",
        text: "SEO local no es magia ni un truco caro: es constancia y foco. Trabajado bien durante 90 días, es la palanca de captación más rentable para cualquier negocio de Paraná.",
      },
    ],
    relatedHref: "/diseno-web-parana",
    relatedLabel: "Diseño web en Paraná con SEO local",
  },

  {
    slug: "google-business-profile-negocios-parana",
    title: "Google Business Profile para negocios de Paraná: guía paso a paso",
    seoTitle: "Google Business Profile Paraná: Guía 2026 | Suitwolf",
    metaDescription:
      "Cómo crear y optimizar Google Business Profile en Paraná: verificación, categorías, fotos, publicaciones, reviews. Guía práctica para PyMEs entrerrianas.",
    date: "2026-08-25",
    readingMinutes: 7,
    excerpt:
      "Google Business Profile es tu primera reunión con el cliente que todavía no te conoce. La guía práctica para armarlo bien —desde la verificación hasta las publicaciones semanales.",
    primaryKeyword: "Google Business Profile Paraná",
    body: [
      {
        type: "p",
        text: "Antes de que alguien visite tu sitio, entre a tu Instagram o te llame por teléfono, va a ver tu Google Business Profile. Es la primera reunión con un cliente que todavía no te conoce —y como toda primera reunión, importa cómo llegás vestido. Esta guía te da los pasos concretos para armar y mantener el perfil que necesitás si estás en Paraná.",
      },
      { type: "h2", text: "1. Crear el perfil (10 minutos)" },
      {
        type: "p",
        text: "Entrá a business.google.com con la cuenta de Gmail que quieras asociar (idealmente una cuenta de la empresa, no personal). Buscá tu negocio: si ya aparece pero no lo administrás, reclamalo. Si no aparece, creá uno nuevo con el nombre exacto que usás siempre —sin agregar 'Paraná' ni categorías al final, solo el nombre.",
      },
      { type: "h2", text: "2. Verificación en Paraná" },
      {
        type: "p",
        text: "Google necesita confirmar que tu negocio existe. En Paraná las opciones habituales son postal (postal enviado a tu dirección, tarda 5-14 días), telefónica (código por SMS o llamada) o video (mostrar tu local o documentación en tiempo real).",
      },
      {
        type: "p",
        text: "Si trabajás desde tu casa o remoto, la video-verificación es la más rápida. Grabás un video corto mostrando el cartel, tu DNI y algún documento del negocio. Aprobación típica en 48 horas.",
      },
      { type: "h2", text: "3. Categoría principal + secundarias" },
      {
        type: "p",
        text: "La categoría principal es la que más pesa para el ranking. Elegí la más específica que describa tu negocio: 'Agencia de diseño gráfico' es mejor que 'Empresa de servicios', 'Consultorio odontológico' mejor que 'Centro médico'. Sumá 3-5 categorías secundarias para cubrir servicios adicionales.",
      },
      { type: "h2", text: "4. Fotos: las que sí sirven" },
      {
        type: "ul",
        items: [
          "Logo — versión cuadrada, fondo transparente o del color de marca.",
          "Portada — foto real, no stock. Fachada, oficina, producto insignia.",
          "10-15 fotos de interior/producto/equipo, mínimo.",
          "Fotos de trabajos reales con permiso del cliente.",
          "Actualizá cada 2-3 semanas: Google premia perfiles vivos.",
        ],
      },
      { type: "h2", text: "5. Publicaciones semanales (el hack silencioso)" },
      {
        type: "p",
        text: "Casi nadie usa la sección de publicaciones. Es un pecado: Google prioriza perfiles que publican con constancia. Una publicación por semana con foto, texto corto y un CTA (llamar, mensajear, visitar sitio) es suficiente para señalar actividad.",
      },
      {
        type: "p",
        text: "Ejemplos que funcionan: caso de un cliente reciente, oferta o novedad de la semana, artículo nuevo del blog, evento local en el que participás. No tiene que ser marketing pulido —tiene que ser regular.",
      },
      { type: "h2", text: "6. Reviews: cómo pedirlas bien" },
      {
        type: "p",
        text: "Copiate el link directo de tu perfil (Google te lo genera en la sección 'Compartir perfil'). Mandalo por WhatsApp al cliente cuando el trabajo salió bien y expresó satisfacción. Un mensaje corto: 'Fabián, te queda espectacular como quedó, un placer haber trabajado con vos. Si te sale, ¿te animarías a dejarme una reseña en Google? Te dejo el link acá'.",
      },
      {
        type: "p",
        text: "Objetivo realista: 1-2 reviews por mes. En un año son 15-20, más que la mayoría de tu competencia local. Y siempre responder — cada review sin respuesta le dice a Google que el perfil está semiabandonado.",
      },
      { type: "h2", text: "7. Reviews negativas: la altura importa" },
      {
        type: "p",
        text: "Van a llegar. La respuesta correcta no es defenderte: es reconocer el punto (si tiene razón), explicar breve qué pasó y ofrecer resolverlo por privado. Un comentario negativo bien respondido genera más confianza que uno positivo — muestra que gestionás profesionalmente.",
      },
      { type: "h2", text: "Chequeo mensual: 15 minutos que valen oro" },
      {
        type: "ul",
        items: [
          "Nuevas reviews sin responder.",
          "Fotos que subieron clientes (dejá o pedí quitar).",
          "Preguntas del público sin responder.",
          "Cambios de horario o feriados por venir.",
          "Insights: qué búsquedas te trajeron y cuántos clics/llamadas.",
        ],
      },
      {
        type: "p",
        text: "GBP no es 'un lugar donde figuro'. Es un canal de captación gratuito que la mayoría de negocios de Paraná desperdicia. Quince minutos al mes te ponen delante de esa mayoría.",
      },
    ],
    relatedHref: "/diseno-web-parana",
    relatedLabel: "Diseño web + SEO local en Paraná",
  },

  {
    slug: "agencia-diseno-web-parana",
    title: "Cómo elegir una agencia de diseño web en Paraná (checklist honesta)",
    seoTitle: "Agencia Diseño Web Paraná: Cómo Elegir 2026 | Suitwolf",
    metaDescription:
      "Guía honesta para elegir agencia de diseño web en Paraná: banderas rojas del mercado local, preguntas que sí importan, propiedad del sitio y cómo comparar propuestas.",
    date: "2026-08-30",
    readingMinutes: 6,
    excerpt:
      "El mercado local de agencias web en Paraná mezcla equipos serios con freelancers que desaparecen a los 3 meses. Los criterios concretos para elegir sin arrepentirte.",
    primaryKeyword: "agencia diseño web Paraná",
    body: [
      {
        type: "p",
        text: "Contratar una agencia de diseño web en Paraná parece simple hasta que sale mal. Sitios que se caen a los pocos meses, dominios registrados a nombre del proveedor, plazos que se estiran sin explicación. La mayoría de esos problemas se detectan antes de firmar, si sabés qué preguntar.",
      },
      { type: "h2", text: "El panorama local: qué hay realmente" },
      {
        type: "p",
        text: "En Paraná coexisten varias categorías de proveedores: freelancers que arman sobre plantillas, estudios pequeños con 2-3 personas, agencias medianas con estructura, y proveedores remotos que rankean como si fueran locales pero atienden desde otro punto del país. Cada uno tiene su lugar; el problema es contratar uno esperando otro.",
      },
      { type: "h2", text: "3 banderas rojas comunes" },
      {
        type: "ul",
        items: [
          "'Te lo hago por 20 mil pesos, entrego en 3 días'. Plantilla comprada, cero estrategia.",
          "'Yo te administro el dominio y el hosting'. Tu sitio queda rehén de su cuenta.",
          "'Después vemos el SEO'. Ese 'después' nunca llega, y tu web nace con techo bajo.",
        ],
      },
      { type: "h2", text: "Preguntas que sí importan antes de firmar" },
      {
        type: "ul",
        items: [
          "¿Diseño a medida o plantilla premium?",
          "¿A nombre de quién quedan el dominio y el hosting?",
          "¿Incluye copywriting o vos aportás los textos?",
          "¿Qué performance real garantizan (PageSpeed, tiempos de carga)?",
          "¿Qué pasa después del lanzamiento? ¿Qué incluye el soporte, con qué costo?",
          "¿Puedo ver 3 sitios reales que hayan hecho, con métricas si las tienen?",
        ],
      },
      { type: "h2", text: "A medida vs plantilla en el mercado local" },
      {
        type: "p",
        text: "La mayoría del mercado paranaense trabaja sobre plantillas —Divi, Elementor Pro, Astra, algunas más caras. No es intrínsecamente malo, es una elección con consecuencias: velocidad de entrega más rápida, techo de performance más bajo, diseño que compartís con otros miles de sitios.",
      },
      {
        type: "p",
        text: "Un proyecto a medida cuesta más y tarda más, pero rinde distinto: velocidad real, SEO técnico desde el arranque, y una presencia visual que no confundís con la de tu competencia. Para una empresa que compite por posicionamiento y no por precio, la diferencia se paga sola.",
      },
      { type: "h2", text: "Cómo comparar propuestas" },
      {
        type: "p",
        text: "No compares el número final —compará qué incluye cada uno. Una propuesta de USD 800 y otra de USD 2.500 no son 'la misma cosa más cara': son productos distintos. Pediles a los proveedores que te desagreguen: cuántas horas de estrategia, cuántas de diseño, cuántas de desarrollo, si el copy está incluido, cómo se maneja el SEO, qué pasa el mes 2 post-lanzamiento.",
      },
      { type: "h2", text: "Propiedad y contratos: el detalle silencioso" },
      {
        type: "p",
        text: "Lo más caro que te puede pasar es descubrir a los 8 meses que no sos dueño de tu sitio. Exigí: dominio registrado a nombre de tu empresa (no del proveedor), acceso completo al hosting y al panel de gestión, código fuente entregado al finalizar, y un contrato que aclare qué pasa si querés cambiar de proveedor.",
      },
      {
        type: "p",
        text: "La agencia correcta en Paraná no es la más barata ni la más grande —es la que te trata la web como un activo estratégico de tu empresa, no como un servicio recurrente que te ata.",
      },
    ],
    relatedHref: "/diseno-web-parana",
    relatedLabel: "Ver diseño web a medida en Paraná",
  },

  {
    slug: "tienda-online-parana-entre-rios",
    title: "Tienda online en Paraná y Entre Ríos: guía 2026 para vender por internet",
    seoTitle: "Tienda Online Paraná Entre Ríos 2026 | Suitwolf",
    metaDescription:
      "Cómo montar una tienda online en Paraná y Entre Ríos: plataformas, Mercado Pago, envíos con Andreani/OCA, SEO para e-commerce. Guía práctica para PyMEs.",
    date: "2026-09-05",
    readingMinutes: 8,
    excerpt:
      "Vender por internet desde Paraná ya no es opcional. La guía práctica para armar tu tienda online sin quemar plata: plataformas, medios de pago, envíos y los primeros 90 días.",
    primaryKeyword: "tienda online Paraná",
    body: [
      {
        type: "p",
        text: "El mercado entrerriano de e-commerce ya no es una promesa: es una realidad que crece dos dígitos por año. Si tenés un negocio en Paraná y todavía no vendés por internet, cada mes estás cediendo ventas a competidores que sí lo hacen. Esta guía te ordena qué necesitás para empezar bien —sin quemar presupuesto en errores comunes.",
      },
      { type: "h2", text: "Los tres caminos para arrancar" },
      {
        type: "p",
        text: "Todo depende de tu volumen, tu capacidad de gestión y tu ambición.",
      },
      {
        type: "ul",
        items: [
          "Marketplace (Mercado Libre, Tienda Nube marketplace): rápido, sin sitio propio, comisión alta y sin control de marca.",
          "Plataforma SaaS (Tienda Nube, Shopify, Empretienda): sitio propio, cuota mensual, personalización media.",
          "Tienda a medida: control total, mejor SEO, ideal para volumen alto o productos específicos que no encajan en plataformas genéricas.",
        ],
      },
      { type: "h2", text: "Medios de pago que importan en Argentina" },
      {
        type: "p",
        text: "Sin Mercado Pago no arrancás. Es lo que espera el 90% del comprador argentino. Después sumás según el ticket promedio: MODO (viene creciendo fuerte), Getnet, y para tickets altos alguna integración con transferencia bancaria directa.",
      },
      {
        type: "p",
        text: "El detalle que casi nadie mira: las comisiones acumuladas. Entre Mercado Pago, Tienda Nube y logística, podés estar cediendo 15-20% de cada venta antes de contar tu costo. Modelá esto ANTES de definir precios, no después.",
      },
      { type: "h2", text: "Envíos: qué usa realmente Paraná" },
      {
        type: "ul",
        items: [
          "Andreani — mejor cobertura nacional, tarifas competitivas, sucursales en Paraná.",
          "OCA — presencia histórica, buenas tarifas para interior de ER.",
          "Correo Argentino — más barato pero plazos irregulares.",
          "Envío local propio (moto o cadete) — para ventas dentro de Paraná ciudad, imbatible en tiempo.",
        ],
      },
      {
        type: "p",
        text: "Configurá al menos dos opciones en el checkout: envío estándar y envío express (o retiro en el local). El comprador argentino compara costo de envío antes de finalizar la compra —si solo ofrecés una opción cara, abandonan el carrito.",
      },
      { type: "h2", text: "SEO para e-commerce local" },
      {
        type: "p",
        text: "Este es el hueco más grande que ves en tiendas de Paraná: aparecen en Instagram, no en Google. Y la mitad de las búsquedas de producto arrancan en Google Search. Trabajá URL amigables por producto, descripciones únicas (no copy-paste del proveedor), schema Product en cada ficha, categorías con contenido real (no dos líneas).",
      },
      {
        type: "p",
        text: "Si vendés a la ciudad y provincia, cada categoría o producto debería tener alguna mención natural del área de servicio. 'Envíos a toda Paraná, Colón, Concordia y el resto de Entre Ríos' vale más que mil hashtags.",
      },
      { type: "h2", text: "Foto de producto sin presupuesto de agencia" },
      {
        type: "p",
        text: "Fondo blanco liso o color plano, luz natural cerca de una ventana grande, celular en trípode o apoyado sobre una pila de libros, misma altura para todas las fotos. Consistencia > perfección. Diez productos con la misma calidad visual convierten más que tres perfectas y siete arruinadas.",
      },
      { type: "h2", text: "Los primeros 90 días" },
      {
        type: "ul",
        items: [
          "Día 1-30: catálogo completo cargado, descripciones únicas, fotos consistentes, un artículo en el blog sobre cómo elegir tu producto estrella.",
          "Día 31-60: primeras campañas en Instagram Ads y Google Ads con presupuesto contenido. Analizar qué palabras convierten.",
          "Día 61-90: revisar métricas reales de conversion rate, ticket promedio y CAC. Recién ahí escalás lo que funciona.",
        ],
      },
      {
        type: "p",
        text: "Una tienda online no explota de un día para otro. Los primeros meses son de calibración —del producto, del mensaje y de los canales. Pero con la base bien puesta y constancia, en 12 meses estás en otra escala.",
      },
    ],
    relatedHref: "/servicios/tienda-online",
    relatedLabel: "Ver servicio de tienda online",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
