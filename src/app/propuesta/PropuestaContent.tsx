"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

/* ── Catalogue (mirrors cotizador) ───────────────────────── */
const SERVICES_MAP: Record<string, { label: string; price: number; desc: string }> = {
  corporativo: { label: "Sitio Web Corporativo",  price: 2500, desc: "Diseño exclusivo, arquitectura estratégica y desarrollo técnico de alto nivel." },
  landing:     { label: "Landing Page de Impacto", price: 1200, desc: "Estructura persuasiva orientada a conversión con copywriting incluido." },
  ecommerce:   { label: "Tienda Online Premium",   price: 3500, desc: "E-commerce con experiencia de compra premium y checkout optimizado." },
  personal:    { label: "Presencia Personal",      price: 1800, desc: "Narrativa personal estratégica para consultores y figuras públicas." },
  aplicacion:  { label: "Aplicación Web",          price: 4000, desc: "Portal, dashboard o sistema de gestión a medida para tu operación." },
};

const LEVELS_MAP: Record<string, { label: string; mult: number; desc: string }> = {
  standard:   { label: "Estándar",   mult: 1.0, desc: "Alcance base definido" },
  premium:    { label: "Premium",    mult: 1.5, desc: "Alcance ampliado + soporte prioritario" },
  enterprise: { label: "Enterprise", mult: 2.0, desc: "Solución compleja completamente a medida" },
};

const ADDONS_MAP: Record<string, { label: string; price: number }> = {
  "copy":       { label: "Copywriting estratégico",     price: 300  },
  "branding":   { label: "Identidad visual (branding)", price: 500  },
  "multilang":  { label: "Multi-idioma (EN/ES)",        price: 400  },
  "cms":        { label: "Blog / CMS",                  price: 600  },
  "crm":        { label: "Integración CRM",             price: 400  },
  "payments":   { label: "Pasarela de pagos",           price: 300  },
  "analytics":  { label: "Analytics avanzado",          price: 200  },
  "seo-setup":  { label: "SEO inicial (setup)",         price: 350  },
};

const RECURRING_MAP: Record<string, { label: string; price: number }> = {
  seo:         { label: "SEO & Visibilidad Web", price: 500 },
  maintenance: { label: "Mantenimiento web",     price: 150 },
  hosting:     { label: "Hosting gestionado",    price: 80  },
};

/* ── Types ───────────────────────────────────────────────── */
interface QuoteData {
  client:    { name: string; company: string; email: string; project: string };
  services:  string[];
  level:     string;
  addons:    string[];
  recurring: Record<string, number>;
  urgency:   boolean;
  discount:  number;
  date:      string;
  validity:  number;
}

/* ── Helpers ─────────────────────────────────────────────── */
const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" });
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" });
}

function proposalNumber(date: string): string {
  const d = date.replace(/-/g, "");
  const n = parseInt(d.slice(-4)) % 9000 + 1000;
  return `SW-${d.slice(0, 6)}-${n}`;
}

/* ── Component ───────────────────────────────────────────── */
export function PropuestaContent() {
  const params = useSearchParams();
  const router = useRouter();

  const data = useMemo<QuoteData | null>(() => {
    const q = params.get("q");
    if (!q) return null;
    try {
      return JSON.parse(decodeURIComponent(escape(atob(q)))) as QuoteData;
    } catch {
      return null;
    }
  }, [params]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-text-2">No se encontró ninguna propuesta.</p>
        <button onClick={() => router.push("/cotizador")}
          className="text-sm text-gold hover:underline">
          ← Ir al cotizador
        </button>
      </div>
    );
  }

  const levelInfo  = LEVELS_MAP[data.level] ?? { label: "Estándar", mult: 1.0, desc: "Alcance base definido" };
  const levelMult  = levelInfo.mult;

  const serviceLines = data.services
    .map(id => SERVICES_MAP[id] ? { ...SERVICES_MAP[id], id, total: SERVICES_MAP[id].price * levelMult } : null)
    .filter((l): l is NonNullable<typeof l> => l !== null);

  const addonLines = data.addons
    .map(id => ADDONS_MAP[id] ? { ...ADDONS_MAP[id], id } : null)
    .filter((l): l is NonNullable<typeof l> => l !== null);

  const recurringLines = Object.entries(data.recurring)
    .filter(([id, months]) => months > 0 && RECURRING_MAP[id])
    .map(([id, months]) => ({ ...(RECURRING_MAP[id] as { label: string; price: number }), id, months }));

  const servicesTotal  = serviceLines.reduce((s, l) => s + l.total, 0);
  const addonsTotal    = addonLines.reduce((s, l) => s + l.price, 0);
  const subtotal       = servicesTotal + addonsTotal;
  const urgencyAmt     = data.urgency ? subtotal * 0.25 : 0;
  const discountAmt    = (subtotal + urgencyAmt) * (data.discount / 100);
  const total          = subtotal + urgencyAmt - discountAmt;
  const recurringTotal = recurringLines.reduce((s, l) => s + (l.price ?? 0), 0);

  const propNum = proposalNumber(data.date);

  return (
    <>
      {/* ── Print / PDF styles ──────────────────────────────────── */}
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          body { background: white !important; color: #111 !important; }
          .print-page {
            background: white !important;
            color: #111 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-card { border: 1px solid #e5e7eb !important; background: white !important; }
          .print-th { background: #f9fafb !important; color: #374151 !important; }
          .print-td { color: #374151 !important; border-bottom: 1px solid #e5e7eb !important; }
          .print-total-box { background: #111 !important; color: white !important; }
          .print-gold { color: #b8860b !important; }
          .print-muted { color: #6b7280 !important; }
          .print-divider { border-color: #e5e7eb !important; }
          .print-next-steps { background: #f9fafb !important; border: 1px solid #e5e7eb !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }

        @page { size: A4; margin: 18mm 16mm; }
      `}</style>

      {/* ── Screen action bar ───────────────────────────────────── */}
      <div className="no-print fixed bottom-6 right-6 flex gap-3 z-50">
        <button onClick={() => router.push("/cotizador")}
          className="px-4 py-2.5 text-sm rounded border border-line-2 bg-surface-1 text-text-2 hover:text-text hover:border-line transition-colors">
          ← Editar
        </button>
        <button onClick={() => window.print()}
          className="px-5 py-2.5 text-sm rounded bg-gold text-surface font-medium hover:bg-gold-peak transition-colors">
          Descargar PDF
        </button>
      </div>

      {/* ── Document ────────────────────────────────────────────── */}
      <div className="print-page max-w-[760px] mx-auto px-4 py-12 md:py-16 text-text">

        {/* Header */}
        <div className="flex justify-between items-start mb-12 print-divider border-b pb-8">
          <div>
            {/* Logo text */}
            <p className="text-2xl font-display tracking-tight text-text print-gold">SUITWOLF</p>
            <p className="text-xs text-text-4 print-muted mt-0.5 font-mono tracking-wide">Diseño & Desarrollo Web</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-4 print-muted font-mono tracking-wide uppercase">Propuesta Comercial</p>
            <p className="text-sm text-gold print-gold font-mono mt-1">{propNum}</p>
            <p className="text-xs text-text-4 print-muted mt-1">Emitida: {fmtDate(data.date)}</p>
            <p className="text-xs text-text-4 print-muted">Válida hasta: {addDays(data.date, data.validity)}</p>
          </div>
        </div>

        {/* Client block */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.15em] text-text-4 print-muted uppercase font-mono mb-3">Preparada para</p>
          <div className="print-card border border-line-2 rounded-xl p-5 bg-surface-1">
            <p className="text-xl font-display text-text">{data.client.name}</p>
            {data.client.company && <p className="text-text-2 print-muted mt-0.5">{data.client.company}</p>}
            {data.client.email   && <p className="text-sm text-text-3 print-muted mt-1 font-mono">{data.client.email}</p>}
            {data.client.project && (
              <div className="mt-4 pt-4 border-t border-line print-divider">
                <p className="text-xs text-text-4 print-muted uppercase tracking-wide font-mono mb-1.5">Proyecto</p>
                <p className="text-sm text-text-2 print-muted leading-relaxed">{data.client.project}</p>
              </div>
            )}
          </div>
        </div>

        {/* Services table */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.15em] text-text-4 print-muted uppercase font-mono mb-4">Servicios</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="print-th border-b border-line print-divider">
                <th className="text-left py-2.5 text-xs text-text-4 print-muted font-mono tracking-wide uppercase">Descripción</th>
                <th className="text-right py-2.5 text-xs text-text-4 print-muted font-mono tracking-wide uppercase pl-4">Precio base</th>
                <th className="text-right py-2.5 text-xs text-text-4 print-muted font-mono tracking-wide uppercase pl-4">Nivel</th>
                <th className="text-right py-2.5 text-xs text-text-4 print-muted font-mono tracking-wide uppercase pl-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {serviceLines.map(s => (
                <tr key={s.id} className="print-td border-b border-line print-divider">
                  <td className="py-3.5 pr-4">
                    <p className="text-text font-medium">{s.label}</p>
                    <p className="text-xs text-text-3 print-muted mt-0.5 leading-snug">{s.desc}</p>
                  </td>
                  <td className="py-3.5 text-right text-text-3 print-muted font-mono pl-4 align-top pt-4">{fmt(s.price)}</td>
                  <td className="py-3.5 text-right text-text-3 print-muted font-mono pl-4 align-top pt-4">×{levelMult.toFixed(1)}</td>
                  <td className="py-3.5 text-right font-mono text-text pl-4 align-top pt-4">{fmt(s.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {levelInfo.label !== "Estándar" && (
            <p className="text-xs text-text-4 print-muted mt-2">
              Nivel <span className="text-gold print-gold">{levelInfo.label}</span> — {levelInfo.desc}
            </p>
          )}
        </div>

        {/* Add-ons */}
        {addonLines.length > 0 && (
          <div className="mb-8">
            <p className="text-xs tracking-[0.15em] text-text-4 print-muted uppercase font-mono mb-4">Add-ons</p>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {addonLines.map(a => (
                  <tr key={a.id} className="print-td border-b border-line print-divider">
                    <td className="py-3 text-text-2 print-muted">{a.label}</td>
                    <td className="py-3 text-right font-mono text-text-3 print-muted">{fmt(a.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Recurring */}
        {recurringLines.length > 0 && (
          <div className="mb-8">
            <p className="text-xs tracking-[0.15em] text-text-4 print-muted uppercase font-mono mb-4">Servicios recurrentes</p>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {recurringLines.map(r => (
                  <tr key={r.id} className="print-td border-b border-line print-divider">
                    <td className="py-3 text-text-2 print-muted">
                      {r.label}
                      <span className="text-xs text-text-4 print-muted ml-2">{r.months} {r.months === 1 ? "mes" : "meses"}</span>
                    </td>
                    <td className="py-3 text-right font-mono text-text-3 print-muted">{fmt(r.price)}/mes</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Price breakdown */}
        <div className="mb-10">
          <div className="print-card border border-line-2 rounded-xl overflow-hidden bg-surface-1">
            <div className="px-5 py-4 space-y-2.5 text-sm">
              <SummaryRow label="Subtotal" value={fmt(subtotal)} />
              {data.urgency    && <SummaryRow label="Urgencia (+25%)" value={`+${fmt(urgencyAmt)}`} dim />}
              {data.discount > 0 && <SummaryRow label={`Descuento (−${data.discount}%)`} value={`−${fmt(discountAmt)}`} dim />}
            </div>
            <div className="print-total-box bg-surface-2 px-5 py-5 border-t border-line">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-mono text-text-4 tracking-wide uppercase">Total del proyecto</p>
                  {recurringTotal > 0 && (
                    <p className="text-sm text-text-3 mt-1">
                      + <span className="text-gold print-gold">{fmt(recurringTotal)}/mes</span> en servicios recurrentes
                    </p>
                  )}
                </div>
                <p className="text-3xl font-display text-gold print-gold">{fmt(total)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.15em] text-text-4 print-muted uppercase font-mono mb-4">Próximos pasos</p>
          <div className="print-next-steps border border-line-2 rounded-xl p-5 bg-surface-1">
            <ol className="space-y-3">
              {[
                "Confirmación de la propuesta por email",
                "Firma del contrato de servicios",
                "Pago inicial del 50% del total del proyecto",
                "Kickoff — sesión de briefing y arranque del proyecto",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-gold print-gold font-mono text-xs mt-0.5 flex-shrink-0">0{i + 1}</span>
                  <span className="text-text-2 print-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="print-divider border-t border-line pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-text-4 print-muted">
          <div>
            <p className="text-text-3 print-muted font-medium mb-1">Suitwolf</p>
            <p>hola@suitwolf.com</p>
            <p>suitwolf.com</p>
          </div>
          <div className="text-sm:text-right">
            <p>Propuesta válida por {data.validity} días.</p>
            <p>Los precios están expresados en dólares estadounidenses (USD).</p>
            <p className="mt-1">Ante cualquier duda, respondé a este email o escribinos directamente.</p>
          </div>
        </div>

      </div>
    </>
  );
}

function SummaryRow({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={dim ? "text-text-3 print-muted" : "text-text-2 print-muted"}>{label}</span>
      <span className={`font-mono ${dim ? "text-text-3 print-muted" : "text-text"}`}>{value}</span>
    </div>
  );
}
