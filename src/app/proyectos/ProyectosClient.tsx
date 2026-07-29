"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useProjects,
  STAGE_TEMPLATES, DEFAULT_STAGES, makeStages,
  type Project, type ProjectStatus, type StageStatus,
} from "@/hooks/useProjects";

/* ── Constants ───────────────────────────────────────────── */

const PROJECT_STATUSES: { id: ProjectStatus; label: string; color: string; dot: string }[] = [
  { id: "activo",     label: "Activo",     color: "text-emerald-400", dot: "bg-emerald-400" },
  { id: "pausado",    label: "Pausado",    color: "text-yellow-400",  dot: "bg-yellow-400"  },
  { id: "entregado",  label: "Entregado",  color: "text-blue-400",    dot: "bg-blue-400"    },
  { id: "cancelado",  label: "Cancelado",  color: "text-red-400",     dot: "bg-red-400"     },
];

const STAGE_STATUSES: { id: StageStatus; label: string; color: string; bg: string }[] = [
  { id: "pendiente",   label: "Pendiente",   color: "text-text-4",      bg: "bg-text-4/10"      },
  { id: "en-progreso", label: "En progreso", color: "text-gold",        bg: "bg-gold/10"        },
  { id: "revision",    label: "En revisión", color: "text-orange-400",  bg: "bg-orange-400/10"  },
  { id: "aprobado",    label: "Aprobado",    color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

const SERVICES = Object.keys(STAGE_TEMPLATES);

/* ── Helpers ─────────────────────────────────────────────── */

function fmtUSD(n: number) {
  if (!n) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

function stageInfo(s: StageStatus) { return STAGE_STATUSES.find(x => x.id === s)!; }
function projInfo(s: ProjectStatus)  { return PROJECT_STATUSES.find(x => x.id === s)!; }

function projectProgress(p: Project) {
  if (!p.stages.length) return 0;
  const done = p.stages.filter(s => s.status === "aprobado").length;
  return Math.round((done / p.stages.length) * 100);
}

const inputCls = "w-full bg-surface-2 border border-line-2 rounded px-3 py-2 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors";

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */

export function ProyectosClient() {
  const params = useSearchParams();
  const router = useRouter();
  const projectId = params.get("id");

  const {
    projects, loaded,
    addProject, updateProject, deleteProject,
    updateStage, addDeliverable, updateDeliverable, deleteDeliverable,
    exportJSON,
  } = useProjects();

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-4 text-sm font-mono">Cargando…</p>
      </div>
    );
  }

  const current = projects.find(p => p.id === projectId) ?? null;

  if (projectId && current) {
    return (
      <ProjectDetail
        project={current}
        onBack={() => router.push("/proyectos")}
        onUpdate={(patch) => updateProject(current.id, patch)}
        onDelete={() => { deleteProject(current.id); router.push("/proyectos"); }}
        onUpdateStage={(sid, patch) => updateStage(current.id, sid, patch)}
        onAddDeliverable={(sid, name) => addDeliverable(current.id, sid, name)}
        onUpdateDeliverable={(sid, did, patch) => updateDeliverable(current.id, sid, did, patch)}
        onDeleteDeliverable={(sid, did) => deleteDeliverable(current.id, sid, did)}
      />
    );
  }

  return (
    <ProjectList
      projects={projects}
      onAdd={(data) => {
        const p = addProject(data);
        router.push(`/proyectos?id=${p.id}`);
      }}
      onOpen={(id) => router.push(`/proyectos?id=${id}`)}
      onExport={exportJSON}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   LIST VIEW
   ══════════════════════════════════════════════════════════ */

const BLANK_PROJECT = {
  clientName: "", company: "", email: "", service: SERVICES[0]!,
  description: "", totalValue: 0, paidAmount: 0,
  startDate: new Date().toISOString().slice(0, 10),
  estimatedEndDate: "", status: "activo" as ProjectStatus,
  stages: makeStages(STAGE_TEMPLATES[SERVICES[0]!] ?? DEFAULT_STAGES),
  notes: "",
};

function ProjectList({
  projects, onAdd, onOpen, onExport,
}: {
  projects: Project[];
  onAdd: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  onOpen: (id: string) => void;
  onExport: () => void;
}) {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState<ProjectStatus | "todos">("todos");
  const [form, setForm] = useState({ ...BLANK_PROJECT });

  const stats = useMemo(() => {
    const activos    = projects.filter(p => p.status === "activo");
    const entregados = projects.filter(p => p.status === "entregado");
    const valorActivo = activos.reduce((s, p) => s + (p.totalValue || 0), 0);
    const pendiente   = activos.reduce((s, p) => s + ((p.totalValue || 0) - (p.paidAmount || 0)), 0);
    return { activos: activos.length, entregados: entregados.length, valorActivo, pendiente };
  }, [projects]);

  const visible = useMemo(() => {
    const list = filter === "todos" ? projects : projects.filter(p => p.status === filter);
    return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [projects, filter]);

  function patchForm<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleServiceChange(service: string) {
    const stages = makeStages(STAGE_TEMPLATES[service] ?? DEFAULT_STAGES);
    setForm(f => ({ ...f, service, stages }));
  }

  function handleAdd() {
    if (!form.clientName.trim()) return;
    onAdd({ ...form, service: form.service ?? "" });
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase mb-2 font-mono">Herramienta interna</p>
            <h1 className="text-4xl font-display text-text">Proyectos</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={onExport}
              className="px-3 py-2 text-xs rounded border border-line-2 text-text-3 hover:text-text hover:border-line transition-colors font-mono">
              Exportar JSON
            </button>
            <button onClick={() => { setForm({ ...BLANK_PROJECT }); setModal(true); }}
              className="px-4 py-2 text-sm rounded bg-gold text-surface font-medium hover:bg-gold-peak transition-colors">
              + Nuevo proyecto
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Activos"        value={String(stats.activos)} />
          <StatCard label="Entregados"     value={String(stats.entregados)} />
          <StatCard label="Valor activo"   value={fmtUSD(stats.valorActivo)} accent />
          <StatCard label="Por cobrar"     value={fmtUSD(stats.pendiente)} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <FilterBtn active={filter === "todos"} onClick={() => setFilter("todos")}>
            Todos ({projects.length})
          </FilterBtn>
          {PROJECT_STATUSES.map(s => (
            <FilterBtn key={s.id} active={filter === s.id} onClick={() => setFilter(s.id)}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${s.dot}`} />
              {s.label} ({projects.filter(p => p.status === s.id).length})
            </FilterBtn>
          ))}
        </div>

        {/* Project list */}
        {visible.length === 0 ? (
          <EmptyState hasProjects={projects.length > 0} onAdd={() => { setForm({ ...BLANK_PROJECT }); setModal(true); }} />
        ) : (
          <div className="space-y-3">
            {visible.map(p => (
              <ProjectCard key={p.id} project={p} onClick={() => onOpen(p.id)} />
            ))}
          </div>
        )}
      </div>

      {/* New project modal */}
      {modal && (
        <Modal title="Nuevo proyecto" onClose={() => setModal(false)}>
          <div className="space-y-4 px-6 py-5">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Cliente *">
                <input value={form.clientName} onChange={e => patchForm("clientName", e.target.value)}
                  placeholder="Ana García" className={inputCls} />
              </FormField>
              <FormField label="Empresa">
                <input value={form.company} onChange={e => patchForm("company", e.target.value)}
                  placeholder="Acme S.A." className={inputCls} />
              </FormField>
            </div>
            <FormField label="Email del cliente">
              <input value={form.email} onChange={e => patchForm("email", e.target.value)}
                type="email" placeholder="ana@empresa.com" className={inputCls} />
            </FormField>
            <FormField label="Servicio">
              <select value={form.service} onChange={e => handleServiceChange(e.target.value)} className={inputCls}>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Descripción del proyecto">
              <input value={form.description} onChange={e => patchForm("description", e.target.value)}
                placeholder="Sitio web para consultora de RRHH…" className={inputCls} />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Valor total (USD)">
                <input value={form.totalValue || ""} type="number" min={0}
                  onChange={e => patchForm("totalValue", Number(e.target.value) || 0)}
                  placeholder="3750" className={inputCls + " font-mono"} />
              </FormField>
              <FormField label="Cobrado hasta ahora">
                <input value={form.paidAmount || ""} type="number" min={0}
                  onChange={e => patchForm("paidAmount", Number(e.target.value) || 0)}
                  placeholder="1875" className={inputCls + " font-mono"} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Fecha de inicio">
                <input value={form.startDate} type="date"
                  onChange={e => patchForm("startDate", e.target.value)}
                  className={inputCls + " font-mono"} />
              </FormField>
              <FormField label="Entrega estimada">
                <input value={form.estimatedEndDate} type="date"
                  onChange={e => patchForm("estimatedEndDate", e.target.value)}
                  className={inputCls + " font-mono"} />
              </FormField>
            </div>

            {/* Stage preview */}
            <div>
              <p className="text-xs text-text-4 mb-2">Etapas del proyecto</p>
              <div className="flex flex-wrap gap-1.5">
                {form.stages.map((s, i) => (
                  <span key={s.id} className="text-xs bg-surface-2 text-text-3 px-2 py-1 rounded font-mono">
                    {i + 1}. {s.name}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text-4 mt-1.5">
                Podés renombrar o reorganizar etapas después desde el detalle del proyecto.
              </p>
            </div>
          </div>

          <ModalFooter>
            <button onClick={() => setModal(false)}
              className="px-4 py-2 text-sm rounded border border-line-2 text-text-2 hover:border-line hover:text-text transition-colors">
              Cancelar
            </button>
            <button onClick={handleAdd} disabled={!form.clientName.trim()}
              className={`px-5 py-2 text-sm rounded font-medium transition-colors ${
                form.clientName.trim()
                  ? "bg-gold text-surface hover:bg-gold-peak"
                  : "bg-surface-2 text-text-4 cursor-not-allowed"
              }`}>
              Crear proyecto →
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DETAIL VIEW
   ══════════════════════════════════════════════════════════ */

function ProjectDetail({
  project, onBack, onUpdate, onDelete,
  onUpdateStage, onAddDeliverable, onUpdateDeliverable, onDeleteDeliverable,
}: {
  project: Project;
  onBack: () => void;
  onUpdate: (p: Partial<Omit<Project, "id" | "createdAt">>) => void;
  onDelete: () => void;
  onUpdateStage: (stageId: string, patch: { status?: StageStatus; dueDate?: string; name?: string }) => void;
  onAddDeliverable: (stageId: string, name: string) => void;
  onUpdateDeliverable: (stageId: string, delivId: string, patch: { done?: boolean; url?: string; name?: string }) => void;
  onDeleteDeliverable: (stageId: string, delivId: string) => void;
}) {
  const [editModal, setEditModal]   = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);
  const [openStages, setOpenStages] = useState<string[]>([]);
  const [newDeliv,   setNewDeliv]   = useState<Record<string, string>>({});
  const [editForm,   setEditForm]   = useState({
    clientName: project.clientName, company: project.company, email: project.email,
    service: project.service, description: project.description,
    totalValue: project.totalValue, paidAmount: project.paidAmount,
    startDate: project.startDate, estimatedEndDate: project.estimatedEndDate,
    status: project.status, notes: project.notes,
  });

  const progress   = projectProgress(project);
  const pInfo      = projInfo(project.status);
  const pendingAmt = (project.totalValue || 0) - (project.paidAmount || 0);

  function toggleStage(id: string) {
    setOpenStages(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function handleAddDeliverable(stageId: string) {
    const name = (newDeliv[stageId] ?? "").trim();
    if (!name) return;
    onAddDeliverable(stageId, name);
    setNewDeliv(p => ({ ...p, [stageId]: "" }));
  }

  function handleSaveEdit() {
    onUpdate(editForm);
    setEditModal(false);
  }

  const currentStageIndex = project.stages.findIndex(s =>
    s.status === "en-progreso" || s.status === "revision"
  );
  const currentStageName = currentStageIndex >= 0
    ? (project.stages[currentStageIndex]?.name ?? "")
    : project.stages.find(s => s.status === "aprobado")
      ? "Completado"
      : "Sin iniciar";

  return (
    <div className="min-h-screen bg-surface px-4 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Back nav */}
        <button onClick={onBack}
          className="text-xs text-text-4 hover:text-text transition-colors font-mono mb-8 flex items-center gap-1.5">
          ← Proyectos
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${pInfo.dot}`} />
              <span className={`text-xs font-mono ${pInfo.color}`}>{pInfo.label}</span>
            </div>
            <h1 className="text-3xl font-display text-text">
              {project.clientName}
              {project.company && <span className="text-text-3"> · {project.company}</span>}
            </h1>
            <p className="text-text-3 text-sm mt-1">{project.service}</p>
            {project.description && (
              <p className="text-text-4 text-xs mt-1">{project.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setEditForm({
              clientName: project.clientName, company: project.company, email: project.email,
              service: project.service, description: project.description,
              totalValue: project.totalValue, paidAmount: project.paidAmount,
              startDate: project.startDate, estimatedEndDate: project.estimatedEndDate,
              status: project.status, notes: project.notes,
            }); setEditModal(true); }}
              className="px-3 py-1.5 text-xs rounded border border-line-2 text-text-3 hover:text-text hover:border-line transition-colors">
              Editar
            </button>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 text-xs text-text-4 font-mono mb-8 mt-3">
          {project.startDate && <span>Inicio: {fmtDate(project.startDate)}</span>}
          {project.estimatedEndDate && <span>Entrega: {fmtDate(project.estimatedEndDate)}</span>}
          {project.totalValue > 0 && <span className="text-text-3">{fmtUSD(project.totalValue)} total</span>}
          {pendingAmt > 0 && <span className="text-gold">{fmtUSD(pendingAmt)} pendiente</span>}
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs text-text-4 font-mono">
              Progreso — etapa actual: <span className="text-text-2">{currentStageName}</span>
            </p>
            <p className="text-xs text-text-3 font-mono">{progress}%</p>
          </div>
          <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.15em] text-text-4 uppercase font-mono mb-4">Etapas</p>
          <div className="space-y-2">
            {project.stages.map((stage, i) => {
              const si      = stageInfo(stage.status);
              const isOpen  = openStages.includes(stage.id);
              const doneCount = stage.deliverables.filter(d => d.done).length;

              return (
                <div key={stage.id} className="border border-line-2 rounded-xl overflow-hidden bg-surface-1">
                  {/* Stage header */}
                  <button onClick={() => toggleStage(stage.id)}
                    className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-surface-2/40 transition-colors">
                    <span className="text-xs text-text-4 font-mono w-5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-sm text-text font-medium">{stage.name}</span>
                    <div className="flex items-center gap-3">
                      {stage.deliverables.length > 0 && (
                        <span className="text-xs text-text-4 font-mono">{doneCount}/{stage.deliverables.length}</span>
                      )}
                      {stage.dueDate && (
                        <span className="text-xs text-text-4 font-mono hidden sm:inline">{fmtDate(stage.dueDate)}</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded ${si.bg} ${si.color}`}>{si.label}</span>
                      <span className="text-text-4 text-xs">{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </button>

                  {/* Stage body */}
                  {isOpen && (
                    <div className="px-5 pb-4 border-t border-line">

                      {/* Status selector */}
                      <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
                        {STAGE_STATUSES.map(s => (
                          <button key={s.id}
                            onClick={() => onUpdateStage(stage.id, { status: s.id })}
                            className={`px-2.5 py-1 rounded text-xs transition-colors ${
                              stage.status === s.id
                                ? `${s.bg} ${s.color} border border-current/20`
                                : "text-text-4 hover:text-text-2"
                            }`}>
                            {s.label}
                          </button>
                        ))}
                        <div className="ml-auto flex items-center gap-2">
                          <span className="text-xs text-text-4 font-mono">Fecha límite:</span>
                          <input type="date" value={stage.dueDate}
                            onChange={e => onUpdateStage(stage.id, { dueDate: e.target.value })}
                            className="bg-surface-2 border border-line-2 rounded px-2 py-0.5 text-xs text-text font-mono focus:outline-none focus:border-gold transition-colors" />
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div className="space-y-1.5 mb-3">
                        {stage.deliverables.map(d => (
                          <div key={d.id} className="flex items-center gap-2 group">
                            <button onClick={() => onUpdateDeliverable(stage.id, d.id, { done: !d.done })}
                              className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                                d.done ? "bg-emerald-500 border-emerald-500" : "border-line hover:border-gold"
                              }`}>
                              {d.done && <span className="text-white text-[9px] font-bold">✓</span>}
                            </button>
                            <span className={`text-sm flex-1 ${d.done ? "line-through text-text-4" : "text-text-2"}`}>
                              {d.name}
                            </span>
                            {d.url ? (
                              <a href={d.url} target="_blank" rel="noopener noreferrer"
                                className="text-xs text-gold hover:underline font-mono">↗</a>
                            ) : (
                              <input
                                defaultValue={d.url}
                                onBlur={e => { if (e.target.value !== d.url) onUpdateDeliverable(stage.id, d.id, { url: e.target.value }); }}
                                placeholder="URL…"
                                className="hidden group-hover:block w-32 bg-surface-2 border border-line-2 rounded px-2 py-0.5 text-xs text-text-3 focus:outline-none focus:border-gold font-mono" />
                            )}
                            <button onClick={() => onDeleteDeliverable(stage.id, d.id)}
                              className="text-text-4 hover:text-red-400 transition-colors text-xs opacity-0 group-hover:opacity-100">×</button>
                          </div>
                        ))}
                      </div>

                      {/* Add deliverable */}
                      <div className="flex gap-2">
                        <input
                          value={newDeliv[stage.id] ?? ""}
                          onChange={e => setNewDeliv(p => ({ ...p, [stage.id]: e.target.value }))}
                          onKeyDown={e => { if (e.key === "Enter") handleAddDeliverable(stage.id); }}
                          placeholder="Agregar entregable…"
                          className="flex-1 bg-surface-2 border border-line-2 rounded px-3 py-1.5 text-xs text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
                        <button onClick={() => handleAddDeliverable(stage.id)}
                          className="px-3 py-1.5 text-xs rounded border border-line-2 text-text-3 hover:text-gold hover:border-gold transition-colors">
                          + Agregar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.15em] text-text-4 uppercase font-mono mb-3">Notas internas</p>
          <textarea
            value={project.notes}
            onChange={e => onUpdate({ notes: e.target.value })}
            rows={4}
            placeholder="Observaciones, acuerdos verbales, pendientes…"
            className="w-full bg-surface-1 border border-line-2 rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors resize-none" />
        </div>

        {/* Danger zone */}
        <div className="border border-line-2 rounded-xl px-5 py-4">
          <p className="text-xs text-text-4 font-mono mb-3 uppercase tracking-wide">Zona de riesgo</p>
          {delConfirm ? (
            <div className="flex items-center gap-3">
              <p className="text-xs text-red-400 flex-1">¿Eliminar este proyecto permanentemente?</p>
              <button onClick={() => setDelConfirm(false)}
                className="px-3 py-1.5 text-xs rounded border border-line-2 text-text-3 hover:text-text transition-colors">
                Cancelar
              </button>
              <button onClick={onDelete}
                className="px-3 py-1.5 text-xs rounded bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors">
                Eliminar
              </button>
            </div>
          ) : (
            <button onClick={() => setDelConfirm(true)}
              className="text-xs text-text-4 hover:text-red-400 transition-colors">
              Eliminar proyecto
            </button>
          )}
        </div>

      </div>

      {/* Edit modal */}
      {editModal && (
        <Modal title="Editar proyecto" onClose={() => setEditModal(false)}>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Cliente *">
                <input value={editForm.clientName}
                  onChange={e => setEditForm(f => ({ ...f, clientName: e.target.value }))}
                  className={inputCls} />
              </FormField>
              <FormField label="Empresa">
                <input value={editForm.company}
                  onChange={e => setEditForm(f => ({ ...f, company: e.target.value }))}
                  className={inputCls} />
              </FormField>
            </div>
            <FormField label="Estado del proyecto">
              <div className="flex gap-2 flex-wrap">
                {PROJECT_STATUSES.map(s => (
                  <button key={s.id}
                    onClick={() => setEditForm(f => ({ ...f, status: s.id }))}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      editForm.status === s.id
                        ? `${s.dot.replace("bg-", "bg-").replace("-400", "-400/20")} ${s.color} border border-current/30`
                        : "text-text-4 hover:text-text-2"
                    }`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Valor total (USD)">
                <input value={editForm.totalValue || ""} type="number" min={0}
                  onChange={e => setEditForm(f => ({ ...f, totalValue: Number(e.target.value) || 0 }))}
                  className={inputCls + " font-mono"} />
              </FormField>
              <FormField label="Cobrado">
                <input value={editForm.paidAmount || ""} type="number" min={0}
                  onChange={e => setEditForm(f => ({ ...f, paidAmount: Number(e.target.value) || 0 }))}
                  className={inputCls + " font-mono"} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Inicio">
                <input value={editForm.startDate} type="date"
                  onChange={e => setEditForm(f => ({ ...f, startDate: e.target.value }))}
                  className={inputCls + " font-mono"} />
              </FormField>
              <FormField label="Entrega estimada">
                <input value={editForm.estimatedEndDate} type="date"
                  onChange={e => setEditForm(f => ({ ...f, estimatedEndDate: e.target.value }))}
                  className={inputCls + " font-mono"} />
              </FormField>
            </div>
          </div>
          <ModalFooter>
            <button onClick={() => setEditModal(false)}
              className="px-4 py-2 text-sm rounded border border-line-2 text-text-2 hover:border-line hover:text-text transition-colors">
              Cancelar
            </button>
            <button onClick={handleSaveEdit}
              className="px-5 py-2 text-sm rounded bg-gold text-surface font-medium hover:bg-gold-peak transition-colors">
              Guardar
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

/* ── Sub-components shared ───────────────────────────────── */

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

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="bg-surface-1 border border-line-2 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line sticky top-0 bg-surface-1 z-10">
          <p className="text-sm font-medium text-text">{title}</p>
          <button onClick={onClose} className="text-text-4 hover:text-text transition-colors text-xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-t border-line flex items-center justify-end gap-3 sticky bottom-0 bg-surface-1">
      {children}
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const pInfo    = projInfo(project.status);
  const progress = projectProgress(project);
  const current  = project.stages.find(s => s.status === "en-progreso" || s.status === "revision");

  return (
    <button onClick={onClick}
      className="w-full text-left bg-surface-1 border border-line-2 rounded-xl px-5 py-4 hover:border-line transition-colors group">
      <div className="flex items-start gap-4">
        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${pInfo.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-sm font-medium text-text">{project.clientName}</span>
            {project.company && <span className="text-xs text-text-4">· {project.company}</span>}
          </div>
          <p className="text-xs text-text-3">{project.service}</p>
          {current && (
            <p className="text-xs text-text-4 mt-1">Etapa: {current.name}</p>
          )}
          {progress > 0 && (
            <div className="mt-2.5 h-1 bg-surface-2 rounded-full overflow-hidden w-48">
              <div className="h-full bg-gold/60 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`text-xs font-mono ${pInfo.color}`}>{pInfo.label}</span>
          {project.totalValue > 0 && (
            <span className="text-xs text-text-3 font-mono">{fmtUSD(project.totalValue)}</span>
          )}
          {project.estimatedEndDate && (
            <span className="text-xs text-text-4 font-mono">{fmtDate(project.estimatedEndDate)}</span>
          )}
          {progress > 0 && (
            <span className="text-xs text-text-4 font-mono">{progress}%</span>
          )}
        </div>
      </div>
    </button>
  );
}

function EmptyState({ hasProjects, onAdd }: { hasProjects: boolean; onAdd: () => void }) {
  return (
    <div className="text-center py-20 border border-dashed border-line-2 rounded-2xl">
      <p className="text-text-3 text-sm mb-1">
        {hasProjects ? "No hay proyectos con ese filtro." : "Todavía no hay proyectos registrados."}
      </p>
      {!hasProjects && (
        <>
          <p className="text-text-4 text-xs mb-6">Registrá tu primer proyecto cuando arranque el trabajo.</p>
          <button onClick={onAdd}
            className="px-5 py-2.5 text-sm rounded bg-gold text-surface font-medium hover:bg-gold-peak transition-colors">
            + Crear primer proyecto
          </button>
        </>
      )}
    </div>
  );
}
