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
  /**
   * Bloquea la indexación de la página. Se aplica a ubicaciones cuya
   * contenido todavía no es lo suficientemente distintivo para superar
   * el filtro de "thin content" de Google — mejor no indexar que arrastrar
   * al resto del sitio. Se remueve cuando la página se reescribe con
   * datos locales genuinos.
   */
  noindex?: boolean;
}

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "diseno-web-parana",
    city: "Paraná",
    region: "Entre Ríos",
    country: "Argentina",
    seoTitle: "Diseño Web en Paraná, Entre Ríos | Suitwolf",
    metaDescription:
      "Agencia de diseño y desarrollo web en Paraná, Entre Ríos. Sitios a medida —sin plantillas— para empresas, PyMEs y emprendedores paranaenses. Pedí tu presupuesto sin costo.",
    h1: "Diseño web a medida en Paraná, Entre Ríos",
    intro: [
      "Paraná es la capital de Entre Ríos, con más de 260.000 habitantes en la ciudad y cerca de 350.000 en el aglomerado. Concentra la administración provincial, la Universidad Nacional de Entre Ríos, dos hospitales de referencia regional y un ecosistema empresarial diverso que va desde el comercio de calle Corrientes y avenida Ramírez hasta las consultoras profesionales de la zona céntrica, pasando por la agroindustria del sur, el turismo del río y una nueva camada de emprendedores digitales que dejaron de mirar solo a Buenos Aires.",
      "En ese contexto tu página web deja de ser un accesorio: es el primer filtro por el que atraviesan tus clientes. Un consultorio en Belgrano, un estudio contable en el microcentro, una PyME de servicios en Thouars o un e-commerce que envía a toda la región compiten hoy por atención en Google contra decenas de opciones — la mayoría todavía sobre plantillas WordPress genéricas que se ven idénticas entre sí. Ahí se abre la ventana para diferenciarse.",
      "Diseñamos y desarrollamos sitios web a medida para empresas, negocios y emprendedores de Paraná: sin plantillas, con la estrategia comercial, el sistema visual y el rendimiento técnico que instalan autoridad frente a la competencia local. Cada proyecto arranca desde tu propuesta específica —qué vendés, a quién, por qué te elegirían— y termina en un sitio que trabaja las 24 horas mostrando el nivel real del negocio detrás.",
      "Trabajamos con rubros muy distintos: consultorios médicos y odontológicos del centro, estudios jurídicos y contables, PyMEs de servicios profesionales, comercios de gastronomía y hospitality del casco céntrico y la costanera, industria y agroindustria de la zona sur, inmobiliarias, empresas constructoras, escuelas privadas y proyectos personales de consultores y profesionales independientes que necesitan presentarse con la seriedad que ganaron.",
    ],
    quoteWord: "presupuesto",
    localAngle:
      "Somos una firma con base en Paraná trabajando para empresas de toda la ciudad, la provincia y el país. La proximidad se traduce en decisiones rápidas —una llamada corta que resuelve lo que en una agencia grande demoraría una semana de emails—, en reuniones presenciales cuando el proyecto lo pide, y en entender el mercado real que enfrenta tu negocio. Al mismo tiempo, el estándar de diseño, desarrollo y estrategia es el que aplicamos con clientes en Buenos Aires, Madrid, Miami o Ciudad de México: no hay una versión regional del trabajo, hay un solo nivel.",
    faqs: [
      {
        q: "¿Trabajan con empresas y emprendedores de Paraná?",
        a: "Sí. Somos una agencia con base en Paraná, Entre Ríos. Trabajamos con empresas, PyMEs y emprendedores de la ciudad, del interior de la provincia y del resto del país. La modalidad estándar es remota con reuniones por videollamada, pero coordinamos reuniones presenciales cuando el proyecto lo requiere —briefing inicial, revisión de propuesta, kickoff. Somos entrerrianos: si necesitás vernos, estamos.",
      },
      {
        q: "¿Cuánto sale una página web para un negocio en Paraná?",
        a: "Cada proyecto se presupuesta a medida según su alcance. En Paraná el mercado se divide en tres tramos claros: bajo (USD 400–900, plantillas con retoques), medio (USD 1.500–3.000, plantilla premium con customización real) y premium a medida (USD 3.000–8.000+, diseño y desarrollo desde cero). Nosotros trabajamos en el tramo premium a medida. Empezamos con una charla sin costo para definir qué necesita realmente tu negocio y de ahí sale una propuesta clara.",
      },
      {
        q: "¿Hacen SEO local para posicionar en Paraná y Entre Ríos?",
        a: "Sí. Todo sitio que construimos arranca con SEO técnico desde el día uno: arquitectura optimizada, schema LocalBusiness, meta geo tags, contenido con señales locales reales. Además configuramos y optimizamos tu Google Business Profile —el músculo principal para aparecer en el 3-pack de Maps— y te dejamos un plan concreto de contenido y reviews para escalar la posición mes a mes.",
      },
      {
        q: "¿Con qué rubros paranaenses tienen experiencia?",
        a: "Trabajamos con rubros muy diversos: consultorios médicos y odontológicos, estudios contables y jurídicos, PyMEs de servicios profesionales, gastronomía y hospitality (bares, restaurantes, hoteles), industria y agroindustria, comercios minoristas y mayoristas, inmobiliarias, constructoras, escuelas privadas, y marcas personales de profesionales independientes. La receta no es la misma para todos: cada sector tiene su propio recorrido de decisión y su propia estrategia de contenido.",
      },
      {
        q: "¿Qué diferencia una web a medida de una plantilla comprada?",
        a: "Una plantilla es un diseño compartido con miles de sitios: te obliga a competir por precio y a verte igual que la competencia local. Una web a medida se construye desde tu estrategia comercial concreta —tu propuesta de valor, tu público real, tus objetivos de negocio— con la performance (PageSpeed 90+), el SEO técnico y la estética exclusiva que hacen que instales autoridad en lugar de sumar ruido. Para un negocio que compite por posicionamiento, no por precio, la diferencia se paga sola.",
      },
      {
        q: "¿Qué pasa después del lanzamiento?",
        a: "El lanzamiento es el arranque, no el final. Ofrecemos planes de soporte y evolución mensual: mantenimiento técnico, actualizaciones de contenido, monitoreo de métricas reales (tráfico, conversiones, palabras clave que rankean), tests de conversión y mejoras iterativas basadas en cómo se usa realmente el sitio. Tu web es un activo vivo, no un entregable estático.",
      },
      {
        q: "¿Se puede hacer una reunión presencial en Paraná?",
        a: "Sí. Para proyectos que arrancan en Paraná o alrededores, la reunión inicial de briefing puede ser en persona sin costo — vamos nosotros o coordinamos un café en la zona céntrica. Después del kickoff el trabajo continúa 100% remoto con videollamadas quincenales, pero la puerta queda abierta para vernos cuando haga falta.",
      },
    ],
  },
  {
    slug: "diseno-web-entre-rios",
    city: "Entre Ríos",
    region: "Entre Ríos",
    country: "Argentina",
    seoTitle: "Diseño Web en Entre Ríos, Argentina | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a medida para empresas de Entre Ríos: Concordia, Gualeguaychú, Colón, Villaguay, Concepción del Uruguay, Federación. Sitios sin plantillas, SEO desde el arranque.",
    h1: "Diseño web a medida para empresas de Entre Ríos",
    intro: [
      "Entre Ríos no es una economía monolítica: es un tejido distribuido de negocios muy distintos según la zona. La costa del Uruguay concentra el turismo termal —Colón, Federación, Villa Elisa, Chajarí— con hoteles, cabañas, spa y complejos que compiten por reservas contra destinos de otras provincias. El corredor del río Paraná mezcla comercio, servicios y salud —Paraná, Diamante, Victoria—. El interior productivo maneja arroz en Villaguay y San Salvador, avicultura fuerte en Basavilbaso y Concepción del Uruguay, industria naval en el sur, exportadores de miel y cítricos que le venden al mundo desde localidades que en el mapa parecen chicas.",
      "La particularidad entrerriana: una parte importante del negocio real no está en la capital. Concordia tiene su propia gravedad económica como segunda ciudad de la provincia. Gualeguaychú vive del turismo y del comercio de frontera con Uruguay. Colón y Federación viven del termalismo. Cada mercado local pide su propio recorrido, su propio contenido, su propio posicionamiento — y ninguno se conforma con la web genérica que se ve en la mayoría del interior.",
      "Construimos sitios web a medida para empresas entrerrianas de toda la provincia: diseño 100% original, sin plantillas, con la estrategia comercial y el rendimiento técnico que exige competir en un mercado que ya no es solo local. Un hotel termal de Colón que compite contra propuestas de Federación y de las termas de Río Hondo. Una arrocera de Villaguay que le vende a molinos de otras provincias. Un estudio profesional de Concordia que atiende a empresas de todo el noreste. Cada uno tiene su propio mapa competitivo, y su web tiene que reflejarlo.",
      "La presencia digital de la provincia todavía no acompaña al nivel real del negocio detrás. Ese desajuste es una oportunidad concreta: en la mayoría de los rubros entrerrianos, quien primero se profesionaliza en la web se queda con el terreno por 5-10 años.",
    ],
    quoteWord: "presupuesto",
    localAngle:
      "Somos una firma con base en Paraná que trabaja con empresas de toda la provincia — arroceras y avícolas del interior, hoteles termales de la costa del Uruguay, consultoras y estudios profesionales de Concordia, comercios de Gualeguaychú, PyMEs de Villaguay, San Salvador y Federación, exportadores y productores agropecuarios de la zona. Modalidad remota estándar con reuniones por videollamada, y coordinación de reuniones presenciales cuando el proyecto lo pide. Sin plantillas, sin subcontratos ni agencias satélite: un equipo con arraigo local y estándar internacional.",
    faqs: [
      {
        q: "¿Trabajan con empresas de toda Entre Ríos, no solo Paraná?",
        a: "Sí. Desde Paraná trabajamos con empresas de toda la provincia: Concordia, Gualeguaychú, Colón, Villaguay, Concepción del Uruguay, Federación, San Salvador, Chajarí, Victoria, Diamante, Basavilbaso y el resto del interior. La modalidad estándar es remota con reuniones por videollamada, y coordinamos reuniones presenciales cuando el proyecto lo requiere.",
      },
      {
        q: "¿Cuánto sale una web para una empresa en Entre Ríos?",
        a: "Depende del alcance del proyecto. Cada web se cotiza a medida —sin paquetes cerrados ni licencias que te aten a un sistema. Empezamos con una charla sin costo para entender qué necesita tu empresa antes de hablar de números. Como referencia, nuestros proyectos en la provincia arrancan en el orden de USD 2.500 y escalan según complejidad, contenido y funcionalidad.",
      },
      {
        q: "¿Tienen experiencia con hoteles y complejos termales de Colón o Federación?",
        a: "Sí. Hemos trabajado con propuestas del rubro hospitality y turismo termal, que tienen una lógica muy propia: alta estacionalidad, competencia interprovincial fuerte, dependencia de reservas online, integración con canales de venta como Booking o Despegar, y necesidad de contar la experiencia (no solo listar servicios). Cada web de complejo termal se piensa desde la conversión de reservas, no desde una plantilla genérica de hotel.",
      },
      {
        q: "¿Hacen webs para arroceras, avícolas o agroindustria entrerriana?",
        a: "Sí. La agroindustria entrerriana tiene una comunicación muy distinta a la del retail: cliente institucional, ciclos de compra largos, decisiones basadas en confianza y certificaciones. Diseñamos webs que reflejan la escala real de la operación, con presencia clara de instalaciones, procesos, certificaciones (SENASA, orgánico, exportación), y contactos comerciales bien diferenciados por segmento.",
      },
      {
        q: "¿Cubren SEO local para ciudades del interior de la provincia?",
        a: "Sí. Todo sitio se construye con SEO técnico desde el arranque, con foco en las palabras clave y ubicación real de tu negocio. Si tu foco es Concordia, Gualeguaychú, Colón o cualquier ciudad de la provincia, optimizamos schema, contenido geo, meta tags y estructura interna para posicionar en tu mercado. También configuramos y optimizamos tu Google Business Profile, que en ciudades chicas del interior es donde se juega el 70% del tráfico local.",
      },
      {
        q: "¿Hay reuniones presenciales fuera de Paraná?",
        a: "En proyectos que lo requieren, sí. Coordinamos visitas a Concordia, Gualeguaychú, Colón y otras ciudades de la provincia para reuniones de kickoff o sesiones de trabajo específicas. El resto del proyecto continúa remoto con videollamadas quincenales.",
      },
      {
        q: "¿Aceptan proyectos pequeños de emprendedores del interior?",
        a: "Sí, con un criterio: que haya una propuesta comercial clara y un plan de negocio detrás. Trabajamos con emprendedores serios en cualquier localidad de la provincia. Lo que no hacemos son 'webs de tarjeta personal' de USD 300 — no es el nivel que sostenemos y no serviría a un emprendedor que realmente quiere crecer.",
      },
    ],
  },
  {
    slug: "diseno-web-valencia",
    noindex: true,
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
    noindex: true,
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
    noindex: true,
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
    noindex: true,
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
    noindex: true,
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
    noindex: true,
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
    noindex: true,
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
    noindex: true,
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
    noindex: true,
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
    region: "Ciudad Autónoma de Buenos Aires",
    country: "Argentina",
    seoTitle: "Diseño Web en Buenos Aires a Medida | Suitwolf",
    metaDescription:
      "Diseño y desarrollo web a medida en Buenos Aires, sin plantillas. Sitios corporativos, e-commerce, landing pages y aplicaciones para empresas porteñas exigentes.",
    h1: "Diseño web a medida para empresas de Buenos Aires",
    intro: [
      "Buenos Aires concentra la mayor densidad de oferta de diseño web del país hispanohablante: agencias grandes con estructura pesada en Puerto Madero, boutiques creativas en Palermo, estudios técnicos en Colegiales y Villa Crespo, freelancers repartidos por toda la ciudad, y una avalancha de proveedores low-cost que venden plantillas WordPress bajo el rótulo de 'a medida'. En ese contexto, la elección del proveedor pesa tanto como el proyecto en sí — y una decisión errada cuesta seis meses de trabajo perdido y una web que hay que rehacer.",
      "Al mismo tiempo, el mercado empresarial porteño es exigente por naturaleza: sedes corporativas de compañías regionales, servicios financieros, real estate premium en Puerto Madero, Palermo y Belgrano, consultoras internacionales, marcas de retail que compiten en shoppings de primer nivel, hospitality, y un tejido enorme de empresas medianas que necesitan una presencia digital acorde a su facturación. El nivel visual y de contenido esperado por el cliente porteño está por encima del promedio nacional — una web amateur cuesta reuniones, no solo consultas.",
      "Diseñamos y desarrollamos sitios web a medida para empresas de CABA y GBA: sin plantillas, con la estrategia comercial, el sistema visual y el rendimiento técnico que exige competir en Buenos Aires. Cada proyecto arranca desde una lectura clara de tu propuesta de valor, tu público real y tu ventaja competitiva concreta —no desde una plantilla comprada que después customizamos.",
      "Trabajamos con corporativos, consultoras, empresas medianas, PyMEs con propuesta clara y marcas personales de profesionales que compiten en el segmento premium. La ventaja de trabajar con nosotros y no con una agencia porteña con oficinas en Puerto Madero es simple: el mismo estándar de entrega, sin el overhead de una estructura pesada que se cobra en la factura final.",
    ],
    quoteWord: "presupuesto",
    localAngle:
      "Trabajamos con empresas de CABA, Gran Buenos Aires y todo el país en modalidad remota, con procesos claros de entrega. Reuniones por videollamada, entregas por hitos, revisiones documentadas. Para proyectos que requieren presencia, coordinamos reuniones en la ciudad en fechas específicas del proyecto. También atendemos con el mismo estándar a clientes de España, México, Estados Unidos hispano y el resto de LatAm — el proceso está pensado para funcionar sin fricción a distancia.",
    faqs: [
      {
        q: "¿Cuánto sale una página web para una empresa en Buenos Aires?",
        a: "Cada proyecto se presupuesta a medida según su alcance: no vendemos paquetes ni licencias mensuales. En el mercado porteño los rangos van desde USD 500 (plantillas customizadas por freelancers) hasta USD 15.000+ (agencias grandes con estructura). Nuestro sweet spot son proyectos a medida a partir de USD 3.000, con la diferencia de que no cobramos overhead de estructura porteña ni pases de trabajo entre departamentos.",
      },
      {
        q: "¿Trabajan con corporativos y empresas medianas de CABA?",
        a: "Sí. Trabajamos con empresas medianas y corporativos con procesos formales de aprobación, requerimientos de documentación y hitos claros de entrega. Manejamos ciclos de revisión con multiples stakeholders, presentamos avances de forma estructurada y firmamos los acuerdos formales que requiere una operación seria — sin la burocracia interna que hace que una agencia grande cobre el triple.",
      },
      {
        q: "¿Compiten con las agencias grandes de Puerto Madero o Palermo?",
        a: "Sí, en calidad de entrega y estándar visual. La diferencia principal es de modelo de negocio: una agencia grande tiene oficinas, cuentas, project managers, arquitectos, diseñadores y desarrolladores separados en departamentos — y todo eso se paga. Nosotros somos un equipo pequeño y senior, cada persona ejecuta lo suyo directamente. El resultado final es del mismo nivel, con el proceso más limpio y sin duplicaciones de rol.",
      },
      {
        q: "¿Trabajan con empresas de Gran Buenos Aires y el conurbano?",
        a: "Sí. Trabajamos con empresas del oeste (Morón, Ituzaingó, Ramos Mejía, Merlo), del norte (Vicente López, San Isidro, Tigre, Pilar), del sur (Quilmes, Avellaneda, Lomas de Zamora) y del resto del GBA. La modalidad es la misma que con clientes de CABA: remoto con reuniones por videollamada, y coordinación presencial cuando el proyecto lo pide.",
      },
      {
        q: "¿Qué diferencia una web a medida de una plantilla premium?",
        a: "Una plantilla premium sigue siendo un diseño compartido con miles de sitios: tu presencia se ve como la de miles de otras empresas que compraron la misma. Una web a medida se construye desde tu estrategia comercial específica, tu público real y tus objetivos concretos. En un mercado como Buenos Aires, donde el nivel esperado es alto y la competencia es intensa, la diferencia entre una y otra decide si tu web genera consultas de calidad o si es solo una tarjeta digital que no capta nada.",
      },
      {
        q: "¿Hay reuniones presenciales en Buenos Aires?",
        a: "Para proyectos que lo justifican, coordinamos reuniones presenciales en la ciudad en fechas específicas —briefing inicial, presentación de propuesta, kickoff, revisión de hitos importantes. El resto del proyecto continúa remoto con videollamadas quincenales. Al no tener oficinas fijas en la ciudad, no hay costo de mantenimiento que se traslade al precio final.",
      },
      {
        q: "¿Cuánto tiempo lleva un proyecto?",
        a: "Un sitio corporativo mediano de 5-8 secciones lleva entre 6 y 10 semanas de calendario, con hitos quincenales claros: briefing y estrategia, arquitectura y wireframes, diseño visual, desarrollo, revisiones y lanzamiento. Un e-commerce o una aplicación web tienen su propio calendario, típicamente 10-16 semanas. Todo con fechas comprometidas por escrito antes de empezar.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((l) => l.slug === slug);
}
