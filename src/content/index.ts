import type { CaseStudy, ProcessStep, Transformation } from "@/types";

export const HERO_CONTENT = {
  eyebrow: "Firma Estratégica Digital",
  headline: "Tu empresa merece\nser percibida\ncomo lidera.",
  subheadline:
    "Construimos la representación digital de empresas que se niegan a ser una más.",
  cta: "Iniciar proyecto",
} as const;

export const MANIFESTO_CONTENT = {
  headline: "La percepción precede\nal crecimiento.",
  body: [
    "Las empresas son juzgadas antes de ser comprendidas. Esa fracción de segundo en la que alguien entra a tu sitio y decide si confía o no, es el momento que nos obsesiona.",
    "No construimos páginas web. Construimos la primera impresión definitiva de una empresa ambiciosa.",
  ],
} as const;

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
