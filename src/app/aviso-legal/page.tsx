import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LEGAL } from "@/config/legal";
import { SEO } from "@/config/seo";

const URL = `${SEO.url}/aviso-legal`;

export const metadata: Metadata = {
  title: "Aviso Legal | Suitwolf",
  description:
    "Aviso legal e información sobre el titular y responsable del sitio suitwolf.com según la normativa vigente.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <LegalLayout
      breadcrumb="Aviso Legal"
      kicker="Legal"
      title="Aviso Legal"
      lastUpdated={LEGAL.ultimaActualizacion}
      intro={
        <p style={{ margin: 0 }}>
          Información legal sobre el titular del sitio, en cumplimiento con la Ley 34/2002
          de Servicios de la Sociedad de la Información y de Comercio Electrónico (España)
          y normativa equivalente en otros territorios donde el sitio es accesible.
        </p>
      }
      sections={[
        {
          heading: "1. Datos del titular",
          body: (
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong>Titular:</strong> {LEGAL.titular}</li>
              <li><strong>Identificación fiscal:</strong> {LEGAL.cuit}</li>
              <li><strong>Domicilio:</strong> {LEGAL.domicilio}</li>
              <li><strong>País de residencia:</strong> {LEGAL.pais}</li>
              <li>
                <strong>Email de contacto:</strong>{" "}
                <a href={`mailto:${LEGAL.emailLegal}`} style={{ color: "var(--color-gold)" }}>{LEGAL.emailLegal}</a>
              </li>
              <li><strong>Sitio web:</strong> {SEO.url}</li>
            </ul>
          ),
        },
        {
          heading: "2. Actividad",
          body: (
            <p style={{ margin: 0 }}>
              {LEGAL.titular}, operando bajo la marca <strong>Suitwolf</strong>, presta
              servicios profesionales de diseño y desarrollo web para empresas, incluyendo
              sitios corporativos, e-commerce, landing pages, aplicaciones web y consultoría
              de posicionamiento (SEO). La actividad es de carácter profesional y se ejerce
              como persona física.
            </p>
          ),
        },
        {
          heading: "3. Condiciones de uso",
          body: (
            <p style={{ margin: 0 }}>
              El uso del sitio se rige por los{" "}
              <Link href="/terminos" style={{ color: "var(--color-gold)" }}>términos y condiciones</Link>
              , la{" "}
              <Link href="/privacidad" style={{ color: "var(--color-gold)" }}>política de privacidad</Link>
              {" "}y la{" "}
              <Link href="/cookies" style={{ color: "var(--color-gold)" }}>política de cookies</Link>.
              Al acceder al sitio aceptás estos documentos.
            </p>
          ),
        },
        {
          heading: "4. Propiedad intelectual",
          body: (
            <p style={{ margin: 0 }}>
              Todos los elementos que componen el sitio —diseño, código fuente, textos,
              tipografía, identidad visual, imágenes, videos y logotipos— son propiedad
              exclusiva de {LEGAL.titular} o se utilizan bajo licencia. Queda prohibida
              su reproducción, distribución, comunicación pública o transformación sin
              autorización previa y por escrito. Las capturas de proyectos y logos de
              clientes se muestran con su consentimiento.
            </p>
          ),
        },
        {
          heading: "5. Enlaces externos",
          body: (
            <p style={{ margin: 0 }}>
              El sitio puede incluir enlaces a recursos externos. {LEGAL.titular} no se
              hace responsable de los contenidos, políticas o prácticas de sitios de
              terceros. Los enlaces se incluyen únicamente con fines informativos o de
              referencia.
            </p>
          ),
        },
        {
          heading: "6. Responsabilidad",
          body: (
            <p style={{ margin: 0 }}>
              {LEGAL.titular} pone medios técnicos razonables para mantener el sitio
              operativo y actualizado, pero no garantiza disponibilidad continua ni
              ausencia total de errores. No responde por daños derivados de
              interrupciones, fallos técnicos, virus o accesos no autorizados de terceros
              al sitio, salvo en los casos exigidos por la normativa aplicable.
            </p>
          ),
        },
        {
          heading: "7. Legislación y jurisdicción",
          body: (
            <p style={{ margin: 0 }}>
              El presente aviso legal se rige por la legislación de {LEGAL.pais}. Para
              cualquier controversia, las partes se someten a los tribunales del domicilio
              del titular, sin perjuicio de los derechos reconocidos a los consumidores
              por la normativa imperativa.
            </p>
          ),
        },
      ]}
    />
  );
}
