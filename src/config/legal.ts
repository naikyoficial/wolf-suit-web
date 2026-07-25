/**
 * Datos legales del titular (persona física).
 * Rellenar con los datos reales antes de considerar el sitio compliant.
 *
 * Nota: los textos legales referencian estos valores, así que actualizar
 * aquí impacta las 4 páginas legales de una sola vez.
 */

export const LEGAL = {
  /** Nombre y apellido / persona física titular del sitio. */
  titular: "[COMPLETAR: nombre y apellido del titular]",
  /** CUIT o identificación fiscal. */
  cuit: "[COMPLETAR: CUIT/CUIL/identificación fiscal]",
  /** Domicilio postal donde se pueden dirigir comunicaciones legales. */
  domicilio: "[COMPLETAR: domicilio postal completo]",
  /** Email de contacto legal (privacidad, derechos ARCO, etc.). */
  emailLegal: "[COMPLETAR: email para consultas legales]",
  /** País de residencia del titular (para saber qué ley base aplica). */
  pais: "Argentina",
  /** Fecha de última revisión de los textos legales (formato "DD de mes de YYYY"). */
  ultimaActualizacion: "26 de julio de 2026",
} as const;
