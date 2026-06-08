import type { Variants } from "framer-motion";

/* Easing curves (mirrored from CSS tokens for use in Framer Motion) */
const EASE_DEFAULT  = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_OUT_EXPO = [0.16, 1.00, 0.30, 1.00] as const;
const EASE_IN_OUT   = [0.77, 0.00, 0.18, 1.00] as const;

/* Fade up — entrada estándar para elementos de contenido */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/* Fade in — aparición sin movimiento */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_DEFAULT },
  },
};

/* Slide from left — para elementos secundarios o decorativos */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/* Scale in — para cards, imágenes */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_DEFAULT },
  },
};

/* Draw line — para divisores y líneas decorativas */
export const drawLine: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: EASE_IN_OUT },
  },
};

/* Stagger container — orquesta la entrada de hijos */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/* Stagger container lento — para listas largas */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* Hero entrance — para el titular principal del Hero */
export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: EASE_OUT_EXPO },
  },
};
