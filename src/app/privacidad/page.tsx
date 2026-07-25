import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LEGAL } from "@/config/legal";
import { SEO } from "@/config/seo";

const URL = `${SEO.url}/privacidad`;

export const metadata: Metadata = {
  title: "Política de Privacidad | Suitwolf",
  description:
    "Cómo tratamos tus datos personales en Suitwolf: qué recogemos, con qué finalidad, cuánto los conservamos y qué derechos podés ejercer.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout
      breadcrumb="Privacidad"
      kicker="Legal"
      title="Política de Privacidad"
      lastUpdated={LEGAL.ultimaActualizacion}
      intro={
        <p style={{ margin: 0 }}>
          Esta política explica qué datos personales recogemos cuando visitás{" "}
          <strong>suitwolf.com</strong>, con qué finalidad los tratamos, con quién los
          compartimos y qué derechos podés ejercer. Redactada de forma directa, sin jerga.
        </p>
      }
      sections={[
        {
          heading: "1. Responsable del tratamiento",
          body: (
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Titular: {LEGAL.titular}</li>
              <li>Identificación fiscal: {LEGAL.cuit}</li>
              <li>Domicilio: {LEGAL.domicilio}</li>
              <li>
                Email para consultas: <a href={`mailto:${LEGAL.emailLegal}`} style={{ color: "var(--color-gold)" }}>{LEGAL.emailLegal}</a>
              </li>
            </ul>
          ),
        },
        {
          heading: "2. Qué datos recogemos",
          body: (
            <>
              <p style={{ margin: "0 0 12px" }}>
                Solo los estrictamente necesarios para cada finalidad:
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>
                  <strong>Formulario de evaluación:</strong> nombre, email, empresa, cargo
                  (opcional) y la información que decidas compartir sobre tu proyecto.
                </li>
                <li>
                  <strong>Datos técnicos:</strong> dirección IP anonimizada, tipo de navegador,
                  páginas visitadas y tiempo en el sitio — únicamente si aceptaste cookies
                  analíticas.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "3. Finalidad y base legal",
          body: (
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>
                <strong>Responder tu consulta o solicitud de evaluación</strong> — base:
                ejecución precontractual y consentimiento explícito.
              </li>
              <li>
                <strong>Mejorar el sitio con analítica agregada</strong> — base:
                consentimiento (podés revocarlo cuando quieras desde el banner de cookies).
              </li>
              <li>
                <strong>Cumplir obligaciones legales</strong> (facturación, respuesta a
                autoridades) — base: obligación legal.
              </li>
            </ul>
          ),
        },
        {
          heading: "4. Con quién compartimos tus datos",
          body: (
            <>
              <p style={{ margin: "0 0 12px" }}>
                No vendemos ni cedemos datos a terceros con fines comerciales. Los datos
                pueden ser tratados por proveedores estrictamente necesarios:
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <li><strong>Google (Analytics 4)</strong> — solo si aceptaste cookies analíticas.</li>
                <li><strong>Google (Gmail SMTP)</strong> — para procesar el envío del formulario.</li>
                <li><strong>Vercel</strong> — infraestructura de hosting del sitio.</li>
              </ul>
              <p style={{ margin: "12px 0 0" }}>
                Estos proveedores actúan como encargados del tratamiento y están sujetos a
                sus propias políticas de privacidad y cláusulas contractuales estándar cuando
                los datos salen del país de origen.
              </p>
            </>
          ),
        },
        {
          heading: "5. Cuánto conservamos los datos",
          body: (
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>
                <strong>Datos del formulario:</strong> mientras exista una relación
                comercial activa o interés legítimo, y luego el tiempo mínimo exigido por
                obligaciones fiscales.
              </li>
              <li>
                <strong>Datos analíticos:</strong> los definidos por la configuración de
                Google Analytics 4 (por defecto 14 meses).
              </li>
            </ul>
          ),
        },
        {
          heading: "6. Tus derechos",
          body: (
            <>
              <p style={{ margin: "0 0 12px" }}>
                Podés ejercer los siguientes derechos escribiendo a{" "}
                <a href={`mailto:${LEGAL.emailLegal}`} style={{ color: "var(--color-gold)" }}>{LEGAL.emailLegal}</a>:
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <li><strong>Acceso:</strong> saber qué datos tuyos tenemos.</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
                <li><strong>Supresión:</strong> pedir que borremos tus datos.</li>
                <li><strong>Oposición y limitación:</strong> restringir el uso de tus datos.</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en un formato reutilizable.</li>
                <li><strong>Retirada del consentimiento:</strong> revocar cuando quieras el consentimiento otorgado.</li>
              </ul>
              <p style={{ margin: "12px 0 0" }}>
                Respondemos en un plazo máximo de 30 días. Si considerás que el tratamiento
                infringe la normativa, podés presentar una reclamación ante la autoridad
                de protección de datos del país donde residís.
              </p>
            </>
          ),
        },
        {
          heading: "7. Cookies",
          body: (
            <p style={{ margin: 0 }}>
              Usamos cookies esenciales para el funcionamiento del sitio y, si lo aceptás,
              cookies analíticas de Google Analytics. El detalle completo está en la{" "}
              <Link href="/cookies" style={{ color: "var(--color-gold)" }}>política de cookies</Link>.
            </p>
          ),
        },
        {
          heading: "8. Menores de edad",
          body: (
            <p style={{ margin: 0 }}>
              El sitio está dirigido a mayores de 18 años. No recogemos deliberadamente
              datos de menores. Si detectás que un menor nos envió datos, escribinos y los
              eliminaremos.
            </p>
          ),
        },
        {
          heading: "9. Cambios en la política",
          body: (
            <p style={{ margin: 0 }}>
              Podemos actualizar esta política. Cualquier cambio material se comunica en
              esta misma página, indicando la fecha de última actualización arriba.
            </p>
          ),
        },
      ]}
    />
  );
}
