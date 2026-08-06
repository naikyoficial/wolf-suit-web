"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/config/site";

const DEFAULT_MSG =
  "Hola! Me interesa coordinar una reunión con Suitwolf.";

/**
 * Zero-friction WhatsApp URL:
 *
 * - mobile → `wa.me/NUMBER?text=...`  (abre la app nativa directamente,
 *   sin pantalla intermedia)
 * - desktop → `web.whatsapp.com/send?phone=NUMBER&text=...`  (abre
 *   WhatsApp Web / Desktop con el mensaje ya cargado, sin la pantalla
 *   "Continue to chat" que muestra wa.me en escritorio)
 */
function pickUrl(message: string, isMobile: boolean): string {
  const enc = encodeURIComponent(message);
  return isMobile
    ? `https://wa.me/${SITE.whatsapp}?text=${enc}`
    : `https://web.whatsapp.com/send?phone=${SITE.whatsapp}&text=${enc}`;
}

/**
 * Hook cliente. En SSR devuelve el link `wa.me` (fallback seguro que
 * funciona en cualquier lado). En cliente detecta el dispositivo y
 * actualiza para eliminar toda fricción.
 */
export function useWhatsAppUrl(message: string = DEFAULT_MSG): string {
  const [url, setUrl] = useState(
    () => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`,
  );

  useEffect(() => {
    const ua = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    setUrl(pickUrl(message, isMobile));
  }, [message]);

  return url;
}
