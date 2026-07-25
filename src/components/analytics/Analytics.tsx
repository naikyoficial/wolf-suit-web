"use client";

import Script from "next/script";
import { useConsent } from "@/contexts/ConsentContext";

/**
 * Google Analytics 4 — se activa solo si:
 *   1. Existe NEXT_PUBLIC_GA_ID en el entorno
 *   2. El usuario aceptó cookies analíticas (consent === "accepted")
 *
 * Sin consentimiento, no se carga ni un byte de gtag → cumple RGPD.
 * Cuando el usuario acepta, el <Script> se monta y comienza el tracking.
 * Los eventos de conversión (generate_lead) se disparan desde el formulario.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const { consent } = useConsent();

  if (!gaId) return null;
  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

/** Dispara un evento GA4 de forma segura (no-op si GA no está cargado). */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag("event", name, params ?? {});
}
