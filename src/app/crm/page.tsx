"use client";

import { useState, useMemo } from "react";
import { useLeads, type Lead, type LeadStatus } from "@/hooks/useLeads";

/* ── Constants ───────────────────────────────────────────── */

const STATUSES: { id: LeadStatus; label: string; color: string; dot: string }[] = [
  { id: "nuevo",       label: "Nuevo",         color: "text-text-3",        dot: "bg-text-4" },
  { id: "contactado",  label: "Contactado",     color: "text-blue-400",      dot: "bg-blue-400" },
  { id: "propuesta",   label: "Propuesta",      color: "text-gold",          dot: "bg-gold" },
  { id: "negociacion", label: "Negociación",    color: "text-orange-400",    dot: "bg-orange-400" },
  { id: "ganado",      label: "Ganado",         color: "text-emerald-400",   dot: "bg-emerald-400" },
  { id: "perdido",     label: "Perdido",        color: "text-red-400",       dot: "bg-red-400" },
];

const CHANNELS = ["Instagram", "LinkedIn", "Referido", "WhatsApp", "Email", "Google", "Frío", "Otro"];

const SERVICES = [
  "Sitio Web Corporativo",
  "Landing Page de Impacto",
  "Tienda Online Premium",
  "Presencia Personal",
  "Aplicación Web",
  "SEO & Visibilidad Web",
];

const OPEN_STATUSES: LeadStatus[] = ["nuevo", "contactado", "propuesta", "negociacion"];

const BLANK: Omit<Lead, "id" | "createdAt" | "updatedAt"> = {
  name: "", company: "", email: "", phone: "",
  channel: "Instagram", status: "nuevo", service: "",
  estimatedValue: 0, notes: "", nextAction: "", nextActionDate: "",
};

/* ── Helpers ─────────────────────────────────────────────── */

function statusInfo(s: LeadStatus) {
  return STATUSES.find(x => x.id === s)!;
}

function fmtUSD(n: number) {
  if (!n) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

function isOverdue(dateStr: string) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
}

/* ── Main Component ──────────────────────────────────────── */

export default function CrmPage() {
  const { leads, loaded, addLead, updateLead, deleteLead, exportJSON } = useLeads();

  const [filter,    setFilter]    = useState<LeadStatus | "todos">("todos");
  const [search,    setSearch]    = useState("");
  const [modal,     setModal]     = useState<"add" | "edit" | null>(null);
  const [selected,  setSelected]  = useState<Lead | null>(null);
  const [form,      setForm]      = useState<Omit<Lead, "id" | "createdAt" | "updatedAt">>(BLANK);
  const [delConfirm, setDelConfirm] = useState(false);

  /* ── Stats ──────────────────────────────────────────────── */
  const stats = useMemo(() => {
    const open      = leads.filter(l => OPEN_STATUSES.includes(l.status));
    const ganados   = leads.filter(l => l.status === "ganado");
    const pipeline  = open.reduce((s, l) => s + (l.estimatedValue || 0), 0);
    const conv      = leads.length ? Math.round((ganados.length / leads.length) * 100) : 0;
    return { total: leads.length, open: open.length, ganados: ganados.length, pipeline, conv };
  }, [leads]);

  /* ── Filtered list ──────────────────────────────────────── */
  const visible = useMemo(() => {
    let list = filter === "todos" ? leads : leads.filter(l => l.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.notes.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [leads, filter, search]);

  /* ── Modal helpers ──────────────────────────────────────── */
  function openAdd() {
    setForm(BLANK);
    setModal("add");
    setDelConfirm(false);
  }

  function openEdit(lead: Lead) {
    setSelected(lead);
    setForm({
      name: lead.name, company: lead.company, email: lead.email, phone: lead.phone,
      channel: lead.channel, status: lead.status, service: lead.service,
      estimatedValue: lead.estimatedValue, notes: lead.notes,
      nextAction: lead.nextAction, nextActionDate: lead.nextActionDate,
    });
    setModal("edit");
    setDelConfirm(false);
  }

  function closeModal() {
    setModal(null);
    setSelected(null);
    setDelConfirm(false);
  }

  function handleSave() {
    if (!form.name.trim()) return;
    if (modal === "add") {
      addLead(form);
    } else if (modal === "edit" && selected) {
      updateLead(selected.id, form);
    }
    closeModal();
  }

  function handleDelete() {
    if (!selected) return;
    deleteLead(selected.id);
    closeModal();
  }

  function patch<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm(f => ({ ...f, [key]: val }));
  }

  /* ── Render ─────────────────────────────────────────────── */
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-4 text-sm font-mono">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase mb-2 font-mono">Herramienta interna</p>
            <h1 className="text-4xl font-display text-text">CRM de Leads</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={exportJSON}
              className="px-3 py-2 text-xs rounded border border-line-2 text-text-3 hover:text-text hover:border-line transition-colors font-mono">
              Exportar JSON
            </button>
            <button onClick={openAdd}
              className="px-4 py-2 text-sm rounded bg-gold text-surface font-medium hover:bg-gold-peak transition-colors">
              + Nuevo lead
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Total leads"   value={String(stats.total)} />
          <StatCard label="Abiertos"      value={String(stats.open)} />
          <StatCard label="Pipeline"      value={fmtUSD(stats.pipeline)} accent />
          <StatCard label="Conversión"    value={`${stats.conv}%`} />
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex flex-wrap gap-1.5">
            <FilterBtn active={filter === "todos"} onClick={() => setFilter("todos")}>
              Todos ({leads.length})
            </FilterBtn>
            {STATUSES.map(s => (
              <FilterBtn key={s.id} active={filter === s.id} onClick={() => setFilter(s.id)}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${s.dot}`} />
                {s.label} ({leads.filter(l => l.status === s.id).length})
              </FilterBtn>
            ))}
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar…"
            className="sm:ml-auto w-full sm:w-48 bg-surface-1 border border-line-2 rounded px-3 py-1.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
        </div>

        {/* Lead list */}
        {visible.length === 0 ? (
          <EmptyState onAdd={openAdd} hasLeads={leads.length > 0} />
        ) : (
          <div className="space-y-2">
            {visible.map(lead => (
              <LeadRow key={lead.id} lead={lead} onClick={() => openEdit(lead)} />
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
          <div className="bg-surface-1 border border-line-2 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-line sticky top-0 bg-surface-1 z-10">
              <p className="text-sm font-medium text-text">
                {modal === "add" ? "Nuevo lead" : "Editar lead"}
              </p>
              <button onClick={closeModal} className="text-text-4 hover:text-text transition-colors text-xl leading-none">×</button>
            </div>

            <div className="px-6 py-5 space-y-4">

              {/* Status (top of form for quick update) */}
              <div>
                <label className="block text-xs text-text-4 mb-2">Estado</label>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map(s => (
                    <button key={s.id}
                      onClick={() => patch("status", s.id)}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        form.status === s.id
                          ? "bg-surface-2 border border-line " + s.color
                          : "text-text-4 hover:text-text-2"
                      }`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${s.dot}`} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Company */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Nombre *">
                  <input value={form.name} onChange={e => patch("name", e.target.value)}
                    placeholder="Ana García"
                    className={inputCls} />
                </FormField>
                <FormField label="Empresa">
                  <input value={form.company} onChange={e => patch("company", e.target.value)}
                    placeholder="Acme S.A."
                    className={inputCls} />
                </FormField>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Email">
                  <input value={form.email} onChange={e => patch("email", e.target.value)}
                    type="email" placeholder="ana@empresa.com"
                    className={inputCls} />
                </FormField>
                <FormField label="Teléfono">
                  <input value={form.phone} onChange={e => patch("phone", e.target.value)}
                    placeholder="+54 11 1234-5678"
                    className={inputCls} />
                </FormField>
              </div>

              {/* Channel + Service */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Canal de origen">
                  <select value={form.channel} onChange={e => patch("channel", e.target.value)}
                    className={inputCls}>
                    {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Servicio de interés">
                  <select value={form.service} onChange={e => patch("service", e.target.value)}
                    className={inputCls}>
                    <option value="">— Sin definir —</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>

              {/* Value */}
              <FormField label="Valor estimado (USD)">
                <input value={form.estimatedValue || ""}
                  onChange={e => patch("estimatedValue", Number(e.target.value) || 0)}
                  type="number" min={0} placeholder="2500"
                  className={inputCls + " font-mono"} />
              </FormField>

              {/* Notes */}
              <FormField label="Notas">
                <textarea value={form.notes} onChange={e => patch("notes", e.target.value)}
                  rows={3} placeholder="Contexto, necesidades, observaciones…"
                  className={inputCls + " resize-none"} />
              </FormField>

              {/* Next action */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Próxima acción">
                  <input value={form.nextAction} onChange={e => patch("nextAction", e.target.value)}
                    placeholder="Enviar propuesta"
                    className={inputCls} />
                </FormField>
                <FormField label="Fecha">
                  <input value={form.nextActionDate} onChange={e => patch("nextActionDate", e.target.value)}
                    type="date"
                    className={inputCls + " font-mono"} />
                </FormField>
              </div>

            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-line flex items-center gap-3 sticky bottom-0 bg-surface-1">
              {modal === "edit" && (
                delConfirm ? (
                  <>
                    <span className="text-xs text-red-400 flex-1">¿Confirmar eliminación?</span>
                    <button onClick={() => setDelConfirm(false)}
                      className="px-3 py-1.5 text-xs rounded border border-line-2 text-text-3 hover:text-text transition-colors">
                      Cancelar
                    </button>
                    <button onClick={handleDelete}
                      className="px-3 py-1.5 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors border border-red-500/30">
                      Eliminar
                    </button>
                  </>
                ) : (
                  <button onClick={() => setDelConfirm(true)}
                    className="text-xs text-text-4 hover:text-red-400 transition-colors mr-auto">
                    Eliminar lead
                  </button>
                )
              )}
              <button onClick={closeModal}
                className="px-4 py-2 text-sm rounded border border-line-2 text-text-2 hover:text-text hover:border-line transition-colors ml-auto">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={!form.name.trim()}
                className={`px-5 py-2 text-sm rounded font-medium transition-colors ${
                  form.name.trim()
                    ? "bg-gold text-surface hover:bg-gold-peak"
                    : "bg-surface-2 text-text-4 cursor-not-allowed"
                }`}>
                {modal === "add" ? "Agregar" : "Guardar"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────── */

const inputCls = "w-full bg-surface-2 border border-line-2 rounded px-3 py-2 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors";

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-surface-1 border border-line-2 rounded-xl px-4 py-4">
      <p className="text-xs text-text-4 font-mono uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-display ${accent ? "text-gold" : "text-text"}`}>{value}</p>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`px-2.5 py-1 rounded text-xs transition-colors ${
        active ? "bg-surface-2 text-text border border-line" : "text-text-4 hover:text-text-2"
      }`}>
      {children}
    </button>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-text-4 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function LeadRow({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  const si = statusInfo(lead.status);
  const overdue = isOverdue(lead.nextActionDate);

  return (
    <button onClick={onClick}
      className="w-full text-left bg-surface-1 border border-line-2 rounded-xl px-5 py-4 hover:border-line transition-colors group">
      <div className="flex items-start gap-4">

        {/* Status dot */}
        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${si.dot}`} />

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-text">{lead.name}</span>
            {lead.company && <span className="text-xs text-text-4">· {lead.company}</span>}
          </div>
          {lead.notes && (
            <p className="text-xs text-text-3 mt-0.5 truncate max-w-[480px]">{lead.notes}</p>
          )}
          {lead.nextAction && (
            <p className={`text-xs mt-1.5 ${overdue ? "text-red-400" : "text-text-4"}`}>
              {overdue ? "⚠ Vencida: " : "→ "}{lead.nextAction}
              {lead.nextActionDate && <span className="ml-1 opacity-70">{fmtDate(lead.nextActionDate)}</span>}
            </p>
          )}
        </div>

        {/* Right meta */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`text-xs font-mono ${si.color}`}>{si.label}</span>
          {lead.estimatedValue > 0 && (
            <span className="text-xs text-text-3 font-mono">{fmtUSD(lead.estimatedValue)}</span>
          )}
          <div className="flex gap-1.5 items-center">
            {lead.channel && (
              <span className="text-[10px] text-text-4 font-mono bg-surface-2 px-1.5 py-0.5 rounded">{lead.channel}</span>
            )}
            {lead.service && (
              <span className="text-[10px] text-text-4 font-mono bg-surface-2 px-1.5 py-0.5 rounded hidden sm:inline">{lead.service.split(" ").slice(0, 2).join(" ")}</span>
            )}
          </div>
        </div>

      </div>
    </button>
  );
}

function EmptyState({ onAdd, hasLeads }: { onAdd: () => void; hasLeads: boolean }) {
  return (
    <div className="text-center py-20 border border-dashed border-line-2 rounded-2xl">
      <p className="text-text-3 text-sm mb-1">
        {hasLeads ? "No hay leads con ese filtro." : "Todavía no hay leads registrados."}
      </p>
      {!hasLeads && (
        <>
          <p className="text-text-4 text-xs mb-6">
            Registrá cada conversación desde el día uno, aunque sea una consulta informal.
          </p>
          <button onClick={onAdd}
            className="px-5 py-2.5 text-sm rounded bg-gold text-surface font-medium hover:bg-gold-peak transition-colors">
            + Agregar primer lead
          </button>
        </>
      )}
    </div>
  );
}
