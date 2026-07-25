import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LEGAL } from "@/config/legal";
import { SEO } from "@/config/seo";

const URL = `${SEO.url}/terminos`;

export const metadata: Metadata = {
  title: "Términos y Condiciones | Suitwolf",
  description:
    "Términos y condiciones de uso del sitio Suitwolf y de los servicios de diseño y desarrollo web.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <LegalLayout
      breadcrumb="Términos"
      kicker="Legal"
      title="Términos y Condiciones"
      lastUpdated={LEGAL.ultimaActualizacion}
      intro={
        <p style={{ margin: 0 }}>
          Al usar suitwolf.com aceptás estos términos. Están redactados sin jerga para que
          puedas entender rápido qué esperar y qué no esperar del sitio y de una relación
          comercial con Suitwolf.
        </p>
      }
      sections={[
        {
          heading: "1. Titular del sitio",
          body: (
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Titular: {LEGAL.titular}</li>
              <li>Identificación fiscal: {LEGAL.cuit}</li>
              <li>Domicilio: {LEGAL.domicilio}</li>
              <li>
                Contacto: <a href={`mailto:${LEGAL.emailLegal}`} style={{ color: "var(--color-gold)" }}>{LEGAL.emailLegal}</a>
              </li>
            </ul>
          ),
        },
        {
          heading: "2. Objeto",
          body: (
            <p style={{ margin: 0 }}>
              El sitio ofrece información sobre servicios profesionales de diseño y
              desarrollo web. La contratación efectiva de servicios se formaliza mediante
              propuesta y acuerdo por escrito posterior — el sitio en sí no es una oferta
              contractual vinculante.
            </p>
          ),
        },
        {
          heading: "3. Uso permitido",
          body: (
            <>
              <p style={{ margin: "0 0 12px" }}>Al usar el sitio te comprometés a:</p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>No realizar accesos no autorizados, ingeniería inversa o intentos de escalada.</li>
                <li>No enviar información falsa o suplantar identidades a través de los formularios.</li>
                <li>No usar el sitio para actividades ilegales, difamatorias o abusivas.</li>
                <li>No sobrecargar la infraestructura con solicitudes automatizadas o scrapers.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "4. Propiedad intelectual",
          body: (
            <p style={{ margin: 0 }}>
              Todos los contenidos del sitio (diseño, textos, imágenes, código, identidad
              visual) son propiedad de {LEGAL.titular} o se usan con autorización.
              Está prohibida su reproducción total o parcial sin consentimiento previo por
              escrito. Los mockups y capturas de proyectos de clientes se muestran con su
              autorización expresa.
            </p>
          ),
        },
        {
          heading: "5. Enlaces a sitios de terceros",
          body: (
            <p style={{ margin: 0 }}>
              El sitio puede contener enlaces a sitios externos. No controlamos ni somos
              responsables del contenido, políticas de privacidad ni prácticas de esos
              terceros. Los incluimos por conveniencia; el uso de esos sitios se rige por
              sus propios términos.
            </p>
          ),
        },
        {
          heading: "6. Limitación de responsabilidad",
          body: (
            <p style={{ margin: 0 }}>
              El sitio se ofrece &laquo;tal cual&raquo;. Hacemos todo lo razonable para
              mantenerlo disponible y actualizado, pero no garantizamos disponibilidad
              ininterrumpida ni ausencia total de errores. En ningún caso Suitwolf o su
              titular serán responsables por daños indirectos, incidentales o
              consecuenciales derivados del uso del sitio, en la medida permitida por la
              ley aplicable.
            </p>
          ),
        },
        {
          heading: "7. Privacidad",
          body: (
            <p style={{ margin: 0 }}>
              El tratamiento de datos personales se rige por nuestra{" "}
              <Link href="/privacidad" style={{ color: "var(--color-gold)" }}>política de privacidad</Link>
              {" "}y{" "}
              <Link href="/cookies" style={{ color: "var(--color-gold)" }}>política de cookies</Link>.
            </p>
          ),
        },
        {
          heading: "8. Modificaciones",
          body: (
            <p style={{ margin: 0 }}>
              Podemos actualizar estos términos cuando corresponda. La fecha arriba
              indica la última revisión. El uso continuado del sitio tras cambios implica
              aceptación de la nueva versión.
            </p>
          ),
        },
        {
          heading: "9. Ley aplicable y jurisdicción",
          body: (
            <p style={{ margin: 0 }}>
              Estos términos se rigen por las leyes de {LEGAL.pais}. Para cualquier
              controversia derivada del uso del sitio, las partes se someten a los
              tribunales competentes del domicilio del titular, salvo que la ley
              imperativamente disponga otra jurisdicción.
            </p>
          ),
        },
      ]}
    />
  );
}
