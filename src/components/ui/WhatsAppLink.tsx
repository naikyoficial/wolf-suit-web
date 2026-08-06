"use client";

import type { CSSProperties, ReactNode } from "react";
import { useWhatsAppUrl } from "@/lib/whatsapp";

interface Props {
  /** Mensaje que se prellena en el chat. Default: mensaje genérico. */
  message?: string;
  /** Contenido del link (texto, icono, lo que sea). */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Atributos data-* para el cursor custom. */
  dataCursorHover?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Link a WhatsApp con URL optimizada por dispositivo (cero fricción)
 * y `target="_blank"` para no perder al usuario del sitio.
 */
export function WhatsAppLink({
  message,
  children,
  className,
  style,
  dataCursorHover,
  onClick,
  ariaLabel,
}: Props) {
  const href = useWhatsAppUrl(message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(dataCursorHover ? { "data-cursor-hover": "" } : {})}
    >
      {children}
    </a>
  );
}

/** Icono oficial de WhatsApp (glyph vectorial, sin dependencias). */
export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.365.68 4.577 1.859 6.454L4 29l7.71-1.822A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.818c-1.881 0-3.7-.53-5.278-1.535l-.378-.238-4.577 1.082 1.115-4.462-.247-.386A9.79 9.79 0 0 1 6.182 15c0-5.412 4.407-9.818 9.819-9.818S25.82 9.588 25.82 15c0 5.412-4.407 9.818-9.819 9.818zm5.418-7.328c-.297-.148-1.756-.867-2.028-.966-.272-.099-.47-.148-.669.149-.198.297-.767.966-.94 1.164-.173.198-.346.223-.643.074-.297-.149-1.254-.462-2.388-1.474-.883-.788-1.478-1.76-1.651-2.057-.173-.297-.019-.457.13-.605.134-.133.297-.346.446-.52.148-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.148-.669-1.612-.917-2.208-.242-.581-.487-.502-.669-.512l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.48s1.065 2.877 1.214 3.075c.149.198 2.096 3.2 5.079 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.873.118.571-.086 1.756-.718 2.004-1.411.248-.694.248-1.288.173-1.412-.074-.124-.272-.198-.569-.347z" />
    </svg>
  );
}
