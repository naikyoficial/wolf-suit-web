"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

/* ── Pricing catalogue ─────────────────────────────────────── */

const SERVICES = [
  { id: "corporativo",   label: "Sitio Web Corporativo",  price: 2500, icon: "◈" },
  { id: "landing",       label: "Landing Page de Impacto", price: 1200, icon: "◉" },
  { id: "ecommerce",     label: "Tienda Online Premium",   price: 3500, icon: "◎" },
  { id: "personal",      label: "Presencia Personal",      price: 1800, icon: "◐" },
  { id: "aplicacion",    label: "Aplicación Web",          price: 4000, icon: "◇" },
] as const;

const LEVELS = [
  { id: "standard",   label: "Estándar",   mult: 1.0, note: "Alcance base definido" },
  { id: "premium",    label: "Premium",    mult: 1.5, note: "Alcance ampliado + soporte prioritario" },
  { id: "enterprise", label: "Enterprise", mult: 2.0, note: "Solución compleja a medida" },
] as const;

const ADDONS = [
  { id: "copy",       label: "Copywriting estratégico",  price: 300  },
  { id: "branding",   label: "Identidad visual (branding)", price: 500 },
  { id: "multilang",  label: "Multi-idioma (EN/ES)",     price: 400  },
  { id: "cms",        label: "Blog / CMS",               price: 600  },
  { id: "crm",        label: "Integración CRM",          price: 400  },
  { id: "payments",   label: "Pasarela de pagos",        price: 300  },
  { id: "analytics",  label: "Analytics avanzado",       price: 200  },
  { id: "seo-setup",  label: "SEO inicial (setup)",      price: 350  },
] as const;

const RECURRING = [
  { id: "seo",         label: "SEO & Visibilidad", price: 500  },
  { id: "maintenance", label: "Mantenimiento web",  price: 150  },
  { id: "hosting",     label: "Hosting gestionado", price: 80   },
] as const;

type ServiceId   = typeof SERVICES[number]["id"];
type AddonId     = typeof ADDONS[number]["id"];
type RecurringId = typeof RECURRING[number]["id"];
type Level       = typeof LEVELS[number]["id"];

/* ── Component ─────────────────────────────────────────────── */

export default function CotizadorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-4 text-sm font-mono">Cargando…</p>
      </div>
    }>
      <CotizadorContent />
    </Suspense>
  );
}

function CotizadorContent() {
  const router = useRouter();
  const params = useSearchParams();

  // Client — prefill from CRM if coming via query params
  const [clientName,    setClientName]    = useState(params.get("name") ?? "");
  const [clientCompany, setClientCompany] = useState(params.get("company") ?? "");
  const [clientEmail,   setClientEmail]   = useState(params.get("email") ?? "");
  const [projectDesc,   setProjectDesc]   = useState(params.get("project") ?? "");

  // Services — prefill from CRM service param
  const initialService = params.get("service") as ServiceId | null;
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(
    initialService && SERVICES.some(s => s.id === initialService) ? [initialService] : []
  );
  const [level,            setLevel]            = useState<Level>("standard");

  // Add-ons
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>([]);

  // Recurring (months per service)
  const [recurringMonths, setRecurringMonths] = useState<Record<RecurringId, number>>({
    seo: 0, maintenance: 0, hosting: 0,
  });

  // Modifiers
  const [urgency,  setUrgency]  = useState(false);
  const [discount, setDiscount] = useState(0);

  /* ── Calculations ─────────────────────────────────────────── */
  const levelMult = LEVELS.find(l => l.id === level)!.mult;

  const servicesTotal = useMemo(() =>
    SERVICES.filter(s => selectedServices.includes(s.id))
             .reduce((sum, s) => sum + s.price * levelMult, 0),
    [selectedServices, levelMult]
  );

  const addonsTotal = useMemo(() =>
    ADDONS.filter(a => selectedAddons.includes(a.id))
          .reduce((sum, a) => sum + a.price, 0),
    [selectedAddons]
  );

  const subtotal   = servicesTotal + addonsTotal;
  const urgencyAmt = urgency ? subtotal * 0.25 : 0;
  const discountAmt = (subtotal + urgencyAmt) * (discount / 100);
  const total      = subtotal + urgencyAmt - discountAmt;

  const recurringTotal = RECURRING.reduce((sum, r) => {
    const months = recurringMonths[r.id];
    return sum + (months > 0 ? r.price : 0);
  }, 0);

  /* ── Helpers ──────────────────────────────────────────────── */
  const toggle = <T extends string>(arr: T[], id: T): T[] =>
    arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];

  const fmt = (n: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const canGenerate = clientName.trim() && selectedServices.length > 0;

  const handleGenerate = () => {
    const payload = {
      client:   { name: clientName, company: clientCompany, email: clientEmail, project: projectDesc },
      services: selectedServices,
      level,
      addons:   selectedAddons,
      recurring: recurringMonths,
      urgency,
      discount,
      date:     new Date().toISOString().slice(0, 10),
      validity: 30,
    };
    const q = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    router.push(`/propuesta?q=${q}`);
  };

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-surface px-4 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex gap-3 mb-4">
            <Link href="/crm"
              className="text-xs text-text-4 hover:text-text transition-colors font-mono flex items-center gap-1.5">
              ← CRM
            </Link>
            <Link href="/proyectos"
              className="text-xs text-text-4 hover:text-text transition-colors font-mono flex items-center gap-1.5">
              Proyectos →
            </Link>
          </div>
          <p className="text-xs tracking-[0.2em] text-gold uppercase mb-3 font-mono">Herramienta interna</p>
          <h1 className="text-4xl font-display text-text mb-2">Cotizador</h1>
          <p className="text-text-2 text-sm">Generá una propuesta comercial lista para enviar al cliente.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* ── LEFT: inputs ────────────────────────────────── */}
          <div className="space-y-8">

            {/* Client info */}
            <Section title="01 — Datos del cliente">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nombre completo *">
                  <input value={clientName} onChange={e => setClientName(e.target.value)}
                    placeholder="Ana García"
                    className="w-full bg-surface-1 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
                </Field>
                <Field label="Empresa">
                  <input value={clientCompany} onChange={e => setClientCompany(e.target.value)}
                    placeholder="Acme S.A."
                    className="w-full bg-surface-1 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
                </Field>
                <Field label="Email">
                  <input value={clientEmail} onChange={e => setClientEmail(e.target.value)}
                    type="email" placeholder="ana@empresa.com"
                    className="w-full bg-surface-1 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
                </Field>
                <Field label="Descripción del proyecto">
                  <input value={projectDesc} onChange={e => setProjectDesc(e.target.value)}
                    placeholder="Sitio web para consultora de RRHH..."
                    className="w-full bg-surface-1 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
                </Field>
              </div>
            </Section>

            {/* Services */}
            <Section title="02 — Servicios *">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map(s => {
                  const active = selectedServices.includes(s.id);
                  return (
                    <button key={s.id}
                      onClick={() => setSelectedServices(prev => toggle(prev, s.id))}
                      className={`text-left p-4 rounded border transition-all ${
                        active
                          ? "border-gold bg-gold/5"
                          : "border-line-2 bg-surface-1 hover:border-line"
                      }`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg mt-0.5 ${active ? "text-gold" : "text-text-4"}`}>{s.icon}</span>
                        <div>
                          <p className={`text-sm font-medium ${active ? "text-text" : "text-text-2"}`}>{s.label}</p>
                          <p className="text-xs text-text-4 mt-0.5">{fmt(s.price)} base</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* Level */}
            <Section title="03 — Nivel de proyecto">
              <div className="grid grid-cols-3 gap-3">
                {LEVELS.map(l => (
                  <button key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`p-3 rounded border text-center transition-all ${
                      level === l.id
                        ? "border-gold bg-gold/5"
                        : "border-line-2 bg-surface-1 hover:border-line"
                    }`}>
                    <p className={`text-sm font-medium ${level === l.id ? "text-gold" : "text-text-2"}`}>{l.label}</p>
                    <p className="text-xs text-text-4 mt-1">×{l.mult.toFixed(1)}</p>
                    <p className="text-xs text-text-3 mt-1 hidden sm:block">{l.note}</p>
                  </button>
                ))}
              </div>
            </Section>

            {/* Add-ons */}
            <Section title="04 — Add-ons">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map(a => {
                  const active = selectedAddons.includes(a.id);
                  return (
                    <label key={a.id}
                      className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-all ${
                        active ? "border-gold/60 bg-gold/5" : "border-line-2 bg-surface-1 hover:border-line"
                      }`}>
                      <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                        active ? "bg-gold border-gold" : "border-text-4"
                      }`}>
                        {active && <span className="text-surface text-[10px] font-bold">✓</span>}
                      </div>
                      <input type="checkbox" className="sr-only"
                        checked={active}
                        onChange={() => setSelectedAddons(prev => toggle(prev, a.id))} />
                      <div className="flex justify-between w-full">
                        <span className={`text-sm ${active ? "text-text" : "text-text-2"}`}>{a.label}</span>
                        <span className="text-xs text-text-4">+{fmt(a.price)}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </Section>

            {/* Recurring */}
            <Section title="05 — Servicios recurrentes">
              <p className="text-xs text-text-3 mb-4">Indicá la cantidad de meses (0 = no incluir).</p>
              <div className="space-y-3">
                {RECURRING.map(r => (
                  <div key={r.id} className="flex items-center gap-4 p-3 rounded border border-line-2 bg-surface-1">
                    <div className="flex-1">
                      <p className="text-sm text-text-2">{r.label}</p>
                      <p className="text-xs text-text-4">{fmt(r.price)}/mes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setRecurringMonths(p => ({ ...p, [r.id]: Math.max(0, (p[r.id] ?? 0) - 1) }))}
                        className="w-7 h-7 rounded border border-line-2 text-text-2 hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-lg leading-none">−</button>
                      <span className="w-8 text-center text-sm text-text font-mono">{recurringMonths[r.id]}</span>
                      <button onClick={() => setRecurringMonths(p => ({ ...p, [r.id]: (p[r.id] ?? 0) + 1 }))}
                        className="w-7 h-7 rounded border border-line-2 text-text-2 hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-lg leading-none">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Modifiers */}
            <Section title="06 — Modificadores">
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div onClick={() => setUrgency(p => !p)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${urgency ? "bg-gold" : "bg-surface-2 border border-line"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-text transition-transform ${urgency ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <div>
                    <p className="text-sm text-text-2 group-hover:text-text transition-colors">Urgencia (+25%)</p>
                    <p className="text-xs text-text-4">Entrega acelerada, prioridad máxima</p>
                  </div>
                </label>

                <Field label="Descuento (%)">
                  <div className="flex items-center gap-2">
                    <input type="number" min={0} max={50} value={discount}
                      onChange={e => setDiscount(Math.min(50, Math.max(0, Number(e.target.value))))}
                      className="w-24 bg-surface-1 border border-line-2 rounded px-3 py-2.5 text-sm text-text focus:outline-none focus:border-gold transition-colors font-mono" />
                    <span className="text-text-3 text-sm">%  →  −{fmt(discountAmt)}</span>
                  </div>
                </Field>
              </div>
            </Section>

          </div>

          {/* ── RIGHT: live summary ─────────────────────────── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-xl border border-line-2 bg-surface-1 overflow-hidden">

              <div className="px-5 py-4 border-b border-line">
                <p className="text-xs tracking-[0.15em] text-text-4 uppercase font-mono">Resumen</p>
              </div>

              <div className="px-5 py-4 space-y-3 text-sm">

                {/* Services */}
                {SERVICES.filter(s => selectedServices.includes(s.id)).map(s => (
                  <Row key={s.id}
                    label={s.label}
                    sub={level !== "standard" ? `×${levelMult.toFixed(1)}` : undefined}
                    value={fmt(s.price * levelMult)} />
                ))}

                {/* Add-ons */}
                {ADDONS.filter(a => selectedAddons.includes(a.id)).map(a => (
                  <Row key={a.id} label={a.label} value={`+${fmt(a.price)}`} dimValue />
                ))}

                {(servicesTotal > 0 || addonsTotal > 0) && (
                  <div className="border-t border-line pt-3">
                    <Row label="Subtotal" value={fmt(subtotal)} />
                    {urgency    && <Row label="Urgencia +25%" value={`+${fmt(urgencyAmt)}`} dimValue />}
                    {discount > 0 && <Row label={`Descuento −${discount}%`} value={`−${fmt(discountAmt)}`} dimValue />}
                  </div>
                )}

                {/* Recurring */}
                {RECURRING.some(r => recurringMonths[r.id] > 0) && (
                  <div className="border-t border-line pt-3 space-y-2">
                    <p className="text-xs text-text-4 uppercase tracking-wide font-mono">Recurrente</p>
                    {RECURRING.filter(r => recurringMonths[r.id] > 0).map(r => (
                      <Row key={r.id}
                        label={r.label}
                        sub={`${recurringMonths[r.id]} mes${recurringMonths[r.id] > 1 ? "es" : ""}`}
                        value={`${fmt(r.price)}/mo`} dimValue />
                    ))}
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="px-5 py-4 border-t border-line bg-surface-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-text-4 font-mono uppercase tracking-wide">Total proyecto</p>
                    {recurringTotal > 0 && (
                      <p className="text-xs text-text-3 mt-1">{fmt(recurringTotal)}/mes recurrente</p>
                    )}
                  </div>
                  <p className="text-2xl font-display text-gold">{fmt(total)}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 py-4">
                <button onClick={handleGenerate} disabled={!canGenerate}
                  className={`w-full py-3 rounded text-sm font-medium tracking-wide transition-all ${
                    canGenerate
                      ? "bg-gold text-surface hover:bg-gold-peak"
                      : "bg-surface-2 text-text-4 cursor-not-allowed"
                  }`}>
                  {canGenerate ? "Generar propuesta →" : "Completá nombre + servicio"}
                </button>
                {!canGenerate && (
                  <p className="text-xs text-text-4 text-center mt-2">
                    Requerido: nombre del cliente y al menos un servicio.
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs tracking-[0.15em] text-text-4 uppercase font-mono mb-4">{title}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-text-3 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Row({ label, sub, value, dimValue }: { label: string; sub?: string; value: string; dimValue?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div>
        <span className="text-text-2">{label}</span>
        {sub && <span className="text-text-4 text-xs ml-1.5">{sub}</span>}
      </div>
      <span className={`flex-shrink-0 font-mono text-xs ${dimValue ? "text-text-3" : "text-text"}`}>{value}</span>
    </div>
  );
}
