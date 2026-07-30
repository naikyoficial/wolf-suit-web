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
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        @page {
          size: A4;
          margin: 0;
        }
        .proposal-doc {
          --gold: #C6A04A;
          --gold-light: #D4B06A;
          --dark: #0A0A0A;
          --dark-2: #111111;
          --dark-3: #1A1A1A;
          --text-main: #E8E4DC;
          --text-dim: #9E9888;
          --text-muted: #6B6557;
          --line: #2A2722;
        }
        @media print {
          .proposal-doc {
            --gold: #B8860B;
            --gold-light: #C6960B;
            --dark: #FFFFFF;
            --dark-2: #FAFAF8;
            --dark-3: #F4F3F0;
            --text-main: #1A1A1A;
            --text-dim: #555555;
            --text-muted: #888888;
            --line: #E5E2DC;
          }
        }
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
      <div className="proposal-doc" style={{ background: "var(--dark)", color: "var(--text-main)", minHeight: "100vh" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 32px" }}>

          {/* ═══ HEADER ═══ */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 56 }}>
            <div>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                letterSpacing: "0.12em",
                background: "linear-gradient(135deg, #B98A3E 0%, #D9B36A 40%, #F1DCA4 60%, #D9B36A 80%, #B98A3E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                SUITWOLF
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em", marginTop: 4, textTransform: "uppercase" }}>
                Diseño & Desarrollo Web Premium
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Propuesta Comercial
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--gold)", marginTop: 6, fontWeight: 500 }}>
                {propNum}
              </p>
              <div style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.8 }}>
                <p>Emitida: {fmtDate(data.date)}</p>
                <p>Válida hasta: {addDays(data.date, data.validity)}</p>
              </div>
            </div>
          </div>

          {/* Gold divider line */}
          <div style={{ height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", marginBottom: 48, opacity: 0.4 }} />

          {/* ═══ CLIENT ═══ */}
          <div style={{ marginBottom: 48 }}>
            <SectionLabel>Preparada para</SectionLabel>
            <div style={{
              background: "var(--dark-2)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "28px 32px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: 3, height: "100%",
                background: "linear-gradient(180deg, var(--gold), transparent)",
              }} />
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-main)" }}>
                {data.client.name}
              </p>
              {data.client.company && (
                <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 4 }}>
                  {data.client.company}
                </p>
              )}
              {data.client.email && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
                  {data.client.email}
                </p>
              )}
              {data.client.project && (
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                    Proyecto
                  </p>
                  <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7 }}>
                    {data.client.project}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ═══ SERVICES ═══ */}
          <div style={{ marginBottom: 40 }}>
            <SectionLabel>Alcance del proyecto</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {serviceLines.map((s, i) => (
                <div key={s.id} style={{
                  background: "var(--dark-2)",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: "24px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 24,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gold)", opacity: 0.6 }}>
                        0{i + 1}
                      </span>
                      <p style={{ fontSize: 16, fontWeight: 500, color: "var(--text-main)" }}>
                        {s.label}
                      </p>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.6, paddingLeft: 32 }}>
                      {s.desc}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--text-main)", fontWeight: 500 }}>
                      {fmt(s.total)}
                    </p>
                    {levelMult !== 1 && (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>
                        {fmt(s.price)} × {levelMult.toFixed(1)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {levelInfo.label !== "Estándar" && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 12, paddingLeft: 4 }}>
                Nivel <span style={{ color: "var(--gold)" }}>{levelInfo.label}</span> — {levelInfo.desc}
              </p>
            )}
          </div>

          {/* ═══ ADD-ONS ═══ */}
          {addonLines.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <SectionLabel>Servicios complementarios</SectionLabel>
              <div style={{
                background: "var(--dark-2)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                {addonLines.map((a, i) => (
                  <div key={a.id} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 28px",
                    borderBottom: i < addonLines.length - 1 ? "1px solid var(--line)" : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", opacity: 0.5 }} />
                      <span style={{ fontSize: 14, color: "var(--text-dim)" }}>{a.label}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-dim)" }}>
                      {fmt(a.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ RECURRING ═══ */}
          {recurringLines.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <SectionLabel>Servicios recurrentes</SectionLabel>
              <div style={{
                background: "var(--dark-2)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                {recurringLines.map((r, i) => (
                  <div key={r.id} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 28px",
                    borderBottom: i < recurringLines.length - 1 ? "1px solid var(--line)" : "none",
                  }}>
                    <div>
                      <span style={{ fontSize: 14, color: "var(--text-dim)" }}>{r.label}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginLeft: 10 }}>
                        {r.months} {r.months === 1 ? "mes" : "meses"}
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-dim)" }}>
                      {fmt(r.price)}/mes
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ INVESTMENT SUMMARY ═══ */}
          <div style={{ marginBottom: 48 }}>
            <SectionLabel>Inversión</SectionLabel>
            <div style={{
              border: "1px solid var(--line)",
              borderRadius: 16,
              overflow: "hidden",
            }}>
              {/* Breakdown rows */}
              <div style={{ padding: "24px 28px" }}>
                <InvestmentRow label="Subtotal servicios" value={fmt(subtotal)} />
                {data.urgency && (
                  <InvestmentRow label="Urgencia (+25%)" value={`+${fmt(urgencyAmt)}`} dim />
                )}
                {data.discount > 0 && (
                  <InvestmentRow label={`Descuento (−${data.discount}%)`} value={`−${fmt(discountAmt)}`} dim />
                )}
              </div>

              {/* Total */}
              <div style={{
                background: "linear-gradient(135deg, var(--dark-3), var(--dark-2))",
                borderTop: "1px solid var(--gold)",
                padding: "32px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    Total del proyecto
                  </p>
                  {recurringTotal > 0 && (
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
                      + <span style={{ color: "var(--gold)" }}>{fmt(recurringTotal)}/mes</span> en recurrentes
                    </p>
                  )}
                </div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  color: "var(--gold)",
                  fontWeight: 400,
                }}>
                  {fmt(total)}
                </p>
              </div>
            </div>
          </div>

          {/* ═══ NEXT STEPS ═══ */}
          <div style={{ marginBottom: 48 }}>
            <SectionLabel>Próximos pasos</SectionLabel>
            <div style={{
              background: "var(--dark-2)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "28px 32px",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  "Confirmación de la propuesta por email",
                  "Firma del contrato de servicios",
                  "Pago inicial del 50% del total del proyecto",
                  "Kickoff — sesión de briefing y arranque",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--dark-2)",
                      background: "var(--gold)",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: 600,
                    }}>
                      {i + 1}
                    </span>
                    <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7, paddingTop: 2 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ FOOTER ═══ */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", marginBottom: 32, opacity: 0.3 }} />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
            flexWrap: "wrap",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                letterSpacing: "0.1em",
                color: "var(--gold)",
                marginBottom: 8,
              }}>
                SUITWOLF
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>hola@suitwolf.com</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>suitwolf.com</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8 }}>
                Propuesta válida por {data.validity} días.
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8 }}>
                Precios en dólares estadounidenses (USD).
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 4 }}>
                Respondé a este email o escribinos directamente.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ── Sub-components ──────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-muted)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      marginBottom: 16,
    }}>
      {children}
    </p>
  );
}

function InvestmentRow({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
    }}>
      <span style={{ fontSize: 14, color: dim ? "var(--text-muted)" : "var(--text-dim)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: dim ? "var(--text-muted)" : "var(--text-main)" }}>{value}</span>
    </div>
  );
}
