/**
 * Datos legales del titular (persona física).
 * Rellenar con los datos reales antes de considerar el sitio compliant.
 *
 * Nota: los textos legales referencian estos valores, así que actualizar
 * aquí impacta las 4 páginas legales de una sola vez.
 */

export const LEGAL = {
  /** Nombre y apellido / persona física titular del sitio. */
  titular: "Nicolás Acosta",
  /** CUIL / identificación fiscal (usar CUIT cuando facture). */
  cuit: "CUIL 20-43168005-0",
  /** Domicilio postal — solo provincia y país por privacidad. */
  domicilio: "Entre Ríos, Argentina",
  /** Email de contacto legal (privacidad, derechos ARCO, etc.). */
  emailLegal: "proyectos@suitwolf.com",
  /** País de residencia del titular (para saber qué ley base aplica). */
  pais: "Argentina",
  /** Fecha de última revisión de los textos legales (formato "DD de mes de YYYY"). */
  ultimaActualizacion: "26 de julio de 2026",
} as const;
