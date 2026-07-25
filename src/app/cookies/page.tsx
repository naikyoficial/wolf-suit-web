import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LEGAL } from "@/config/legal";
import { SEO } from "@/config/seo";

const URL = `${SEO.url}/cookies`;

export const metadata: Metadata = {
  title: "Política de Cookies | Suitwolf",
  description:
    "Qué cookies usa Suitwolf, para qué sirven, quién las gestiona y cómo aceptarlas o rechazarlas.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalLayout
      breadcrumb="Cookies"
      kicker="Legal"
      title="Política de Cookies"
      lastUpdated={LEGAL.ultimaActualizacion}
      intro={
        <p style={{ margin: 0 }}>
          Esta política te explica qué cookies usamos, para qué sirven y cómo podés
          gestionar tu consentimiento en cualquier momento.
        </p>
      }
      sections={[
        {
          heading: "1. Qué es una cookie",
          body: (
            <p style={{ margin: 0 }}>
              Una cookie es un pequeño archivo de texto que el sitio guarda en tu navegador
              cuando lo visitás. Sirve para recordar preferencias, medir el uso del sitio
              o mantener sesiones activas.
            </p>
          ),
        },
        {
          heading: "2. Cookies que usamos",
          body: (
            <>
              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, margin: "0 0 8px", color: "var(--color-text)" }}>
                Esenciales (siempre activas)
              </h3>
              <p style={{ margin: "0 0 16px" }}>
                Necesarias para que el sitio funcione y para recordar tu decisión sobre las
                cookies. No requieren consentimiento porque son técnicamente indispensables.
              </p>
              <ul style={{ margin: "0 0 20px", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>
                  <strong>suitwolf:consent</strong> — guarda tu elección sobre cookies
                  (aceptar / rechazar). Persistente. Origen: Suitwolf.
                </li>
              </ul>

              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, margin: "0 0 8px", color: "var(--color-text)" }}>
                Analíticas (opt-in)
              </h3>
              <p style={{ margin: "0 0 16px" }}>
                Nos ayudan a entender cómo se usa el sitio para mejorarlo. Solo se activan
                si aceptás explícitamente en el banner. Podés revocar cuando quieras.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>
                  <strong>_ga, _ga_&lt;ID&gt;</strong> — Google Analytics 4. Identifica sesiones
                  y usuarios de forma agregada. Duración: hasta 2 años. Origen: Google.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "3. Cómo cambiar tu decisión",
          body: (
            <>
              <p style={{ margin: "0 0 12px" }}>
                Podés cambiar tu consentimiento cuando quieras:
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>
                  Borrando el sitio de tus datos de navegación (Chrome, Safari, Firefox
                  tienen esa opción en Configuración → Privacidad).
                </li>
                <li>
                  Configurando tu navegador para bloquear cookies por defecto. Aviso: eso
                  puede afectar el funcionamiento del sitio.
                </li>
                <li>
                  Escribiéndonos a{" "}
                  <a href={`mailto:${LEGAL.emailLegal}`} style={{ color: "var(--color-gold)" }}>{LEGAL.emailLegal}</a>
                  {" "}para ejercer tus derechos.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "4. Cookies de terceros",
          body: (
            <p style={{ margin: 0 }}>
              Las cookies analíticas son gestionadas por Google. Podés consultar cómo
              trata tus datos en la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-gold)" }}
              >
                política de privacidad de Google
              </a>
              . Podés instalar el{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-gold)" }}
              >
                complemento oficial de exclusión de Google Analytics
              </a>{" "}
              para bloquearlo a nivel navegador.
            </p>
          ),
        },
        {
          heading: "5. Más información",
          body: (
            <p style={{ margin: 0 }}>
              Consultá también nuestra{" "}
              <Link href="/privacidad" style={{ color: "var(--color-gold)" }}>política de privacidad</Link>
              {" "}para conocer cómo tratamos tus datos personales.
            </p>
          ),
        },
      ]}
    />
  );
}
