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
    slug: "diseno-web-miami",
    city: "Miami",
    region: "Florida",
    country: "Estados Unidos",
    seoTitle: "Diseño de Páginas Web en Miami en Español | Suitwolf",
    metaDescription:
      "Diseño de páginas web a la medida en Miami, en español y sin plantillas. Sitios corporativos, tiendas en línea y landing pages para el mercado hispano de Florida.",
    h1: "Diseño de páginas web en español para empresas de Miami",
    intro: [
      "Miami concentra una de las comunidades hispanas de negocios más ricas de Estados Unidos: real estate, servicios financieros, hospitality, importadores y consultoras que compiten en un mercado de altísimo ticket. En ese entorno, tu sitio web es la primera reunión con un cliente que todavía no te conoció.",
      "Diseñamos páginas web a la medida, en español, para empresas hispanas de Miami: sitios corporativos, tiendas online y landing pages construidos desde cero, con la estrategia y el nivel visual que exige competir en South Florida.",
    ],
    quoteWord: "cotización",
    localAngle:
      "Trabajamos remotamente con empresas hispanas de Miami, Fort Lauderdale, Doral y toda Florida. En español, con procesos claros de entrega, y con la comprensión cultural que solo tiene un equipo que entiende tu mercado —no una plantilla comprada.",
    faqs: [
      {
        q: "¿Diseñan páginas web en español para el mercado de Miami?",
        a: "Sí. Trabajamos 100% en español con empresas hispanas de Miami y toda Florida. Cada proyecto se construye a la medida, sin plantillas, entendiendo el vocabulario y las expectativas visuales del mercado hispano premium.",
      },
      {
        q: "¿Aceptan proyectos de real estate y servicios profesionales en Miami?",
        a: "Sí. Trabajamos con empresas de real estate, consultoras, importadores, hospitality y servicios profesionales. Cada sector tiene su propia estrategia de contenido y conversión —y así lo diseñamos.",
      },
      {
        q: "¿El sitio queda a nombre de mi empresa?",
        a: "Sí. Registramos el dominio y entregamos el sitio a nombre de tu empresa, con todos los accesos. Es tuyo: sin licencias que te aten ni dependencias del proveedor.",
      },
    ],
  },
  {
    slug: "diseno-web-madrid",
    city: "Madrid",
    region: "Comunidad de Madrid",
    country: "España",
    seoTitle: "Diseño Web en Madrid a Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a medida en Madrid, sin plantillas. Sitios corporativos, e-commerce y landing pages para empresas madrileñas exigentes. Pide tu presupuesto.",
    h1: "Diseño web a medida para empresas de Madrid",
    intro: [
      "Madrid es el corazón económico de España: sedes corporativas, sector financiero, consultoras internacionales y un tejido de empresas medianas que compiten en Europa. La competencia visual y de contenido es la más dura del país hispanohablante, y una presencia digital genérica sencillamente no aguanta.",
      "Construimos sitios web a medida para empresas madrileñas: diseño 100% original, sin plantillas, con desarrollo técnico y SEO desde el primer día. La presencia que necesitás para competir en la capital.",
    ],
    quoteWord: "presupuesto",
    localAngle:
      "Trabajamos con empresas de Madrid y toda España en remoto, con reuniones por videollamada y entregas por hitos. El mismo estándar, la misma cercanía profesional, sin la sobrecarga de una agencia local con overhead pesado.",
    faqs: [
      {
        q: "¿Cuánto cuesta una página web para una empresa en Madrid?",
        a: "Cada proyecto se presupuesta a medida según su alcance: no vendemos paquetes. La evaluación inicial es sin coste y define exactamente qué necesita tu empresa antes de hablar de cifras, con una propuesta clara.",
      },
      {
        q: "¿Trabajáis con empresas de Madrid en remoto?",
        a: "Sí. Colaboramos con empresas madrileñas 100% en remoto, con videollamadas y entregas por hitos. El estándar de diseño y desarrollo es el mismo —o superior— al de una agencia local.",
      },
      {
        q: "¿Qué diferencia una web a medida de una plantilla premium?",
        a: "Una plantilla premium sigue siendo un diseño compartido con miles de sitios: tu presencia se ve como la de tu competencia. Una web a medida se construye desde tu estrategia, tu público y tus objetivos —no desde un layout genérico.",
      },
    ],
  },
  {
    slug: "diseno-web-barcelona",
    city: "Barcelona",
    region: "Cataluña",
    country: "España",
    seoTitle: "Diseño Web en Barcelona a Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a medida en Barcelona, sin plantillas. Sitios corporativos, tiendas online y aplicaciones web para empresas catalanas. Pide tu presupuesto.",
    h1: "Diseño web a medida para empresas de Barcelona",
    intro: [
      "Barcelona es el hub creativo y tecnológico del Mediterráneo: startups, empresas de diseño, hospitality, moda y un ecosistema industrial fuerte. En este mercado, el nivel visual esperado por tus clientes es más alto que en cualquier otra ciudad de habla hispana.",
      "Diseñamos y desarrollamos sitios web a medida para empresas catalanas: sin plantillas, con la estética, la estrategia y el rendimiento técnico que exige un mercado donde el diseño se percibe con especial exigencia.",
    ],
    quoteWord: "presupuesto",
    localAngle:
      "Trabajamos con empresas de Barcelona y toda Cataluña en remoto, con procesos pensados para colaborar a distancia sin perder cercanía. La distancia no cambia el estándar: el mismo diseño a medida, el mismo rigor técnico.",
    faqs: [
      {
        q: "¿Trabajáis con empresas de Barcelona en remoto?",
        a: "Sí. Colaboramos con empresas catalanas de forma 100% remota, con videollamadas e hitos de entrega claros. El resultado es el mismo que en persona: diseño a medida y desarrollo de primer nivel.",
      },
      {
        q: "¿Cuánto cuesta un sitio web profesional en Barcelona?",
        a: "Se presupuesta a medida según el alcance del proyecto. La evaluación inicial es sin coste y define qué necesita tu empresa antes de hablar de cifras.",
      },
    ],
  },
  {
    slug: "diseno-web-ciudad-de-mexico",
    city: "Ciudad de México",
    region: "CDMX",
    country: "México",
    seoTitle: "Diseño Web en CDMX a la Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a la medida en Ciudad de México, sin plantillas. Sitios corporativos, tiendas en línea y landing pages para empresas capitalinas.",
    h1: "Diseño web a la medida para empresas de Ciudad de México",
    intro: [
      "Ciudad de México concentra la mayor densidad de corporativos, consultoras y empresas medianas de Latinoamérica. La competencia por atención en Google y por autoridad de marca es la más agresiva del mercado hispanohablante, y una web genérica ni siquiera aparece en la conversación.",
      "Construimos sitios web a la medida para empresas capitalinas: diseño 100% original, sin plantillas, con desarrollo técnico robusto y SEO desde el primer día para que tu marca compita al nivel que le corresponde.",
    ],
    quoteWord: "cotización",
    localAngle:
      "Trabajamos con empresas de CDMX y todo México de manera remota, con procesos pensados para colaborar a distancia. Atendemos también al mercado hispano de Estados Unidos y a España con el mismo estándar.",
    faqs: [
      {
        q: "¿Cuánto cuesta un sitio web para una empresa en CDMX?",
        a: "Se cotiza a la medida de tu proyecto. Empezamos con una evaluación sin costo que define el alcance exacto, y a partir de ahí te entregamos una propuesta clara —sin paquetes genéricos ni sorpresas.",
      },
      {
        q: "¿Manejan proyectos grandes de corporativos en CDMX?",
        a: "Sí. Trabajamos con empresas medianas y corporativos con procesos formales de aprobación, hitos claros y documentación detallada. El nivel del entregable es el mismo que espera un director de marketing exigente.",
      },
    ],
  },
  {
    slug: "diseno-web-guadalajara",
    city: "Guadalajara",
    region: "Jalisco",
    country: "México",
    seoTitle: "Diseño Web en Guadalajara a la Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a la medida en Guadalajara, sin plantillas. Sitios corporativos, tiendas en línea y landing pages para empresas tapatías. Cotiza tu proyecto.",
    h1: "Diseño web a la medida para empresas de Guadalajara",
    intro: [
      "Guadalajara es el segundo polo empresarial y tecnológico de México: hub de software, industria manufacturera, moda y un ecosistema de empresas medianas que compiten a nivel nacional. Para muchas de esas empresas, la web no acompaña el nivel del negocio detrás.",
      "Diseñamos y desarrollamos sitios a la medida para empresas tapatías: sin plantillas, alineados a la estrategia comercial y con la calidad técnica que espera un mercado exigente.",
    ],
    quoteWord: "cotización",
    localAngle:
      "Trabajamos con empresas de Guadalajara y todo Jalisco en remoto, con procesos formales de entrega. El estándar es el mismo que ofreceríamos en persona, sin overhead de agencia local.",
    faqs: [
      {
        q: "¿Trabajan con empresas de Guadalajara de forma remota?",
        a: "Sí. Colaboramos con empresas tapatías 100% en remoto, con videollamadas y entregas por hitos. El proceso es claro y el estándar de diseño y desarrollo es el mismo que en persona.",
      },
      {
        q: "¿Qué necesito para arrancar un proyecto?",
        a: "Sólo una llamada inicial de evaluación sin costo. Ahí definimos alcance, tiempos y objetivos, y sobre eso te pasamos una propuesta clara y sin ambigüedades.",
      },
    ],
  },
  {
    slug: "diseno-web-bogota",
    city: "Bogotá",
    region: "Cundinamarca",
    country: "Colombia",
    seoTitle: "Diseño Web en Bogotá a la Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a la medida en Bogotá, sin plantillas. Sitios corporativos, tiendas en línea y landing pages para empresas colombianas. Cotiza tu proyecto.",
    h1: "Diseño web a la medida para empresas de Bogotá",
    intro: [
      "Bogotá es el centro económico y financiero de Colombia: sedes corporativas, banca, consultoras y un ecosistema empresarial creciente que compite regionalmente. En ese contexto, la presencia digital diferencia entre ser opción o ser la primera opción.",
      "Construimos sitios web a la medida para empresas bogotanas: diseño 100% original, sin plantillas, con desarrollo técnico y SEO desde el primer día para posicionar tu marca al nivel de tu negocio.",
    ],
    quoteWord: "cotización",
    localAngle:
      "Trabajamos con empresas de Bogotá y toda Colombia de manera remota, con procesos claros de entrega. Atendemos también proyectos de LatAm, España y Estados Unidos hispanoparlante con el mismo estándar.",
    faqs: [
      {
        q: "¿Cuánto cuesta un sitio web en Bogotá?",
        a: "Se cotiza a la medida de tu proyecto según su alcance. Empezamos con una evaluación sin costo y de ahí sale una propuesta clara —sin paquetes ni sorpresas.",
      },
      {
        q: "¿Trabajan con empresas colombianas de forma remota?",
        a: "Sí. Colaboramos con empresas bogotanas y de toda Colombia 100% en remoto, con videollamadas y entregas por hitos.",
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
