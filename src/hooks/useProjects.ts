"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Types (unchanged interface) ─────────────────────────── */

export type ProjectStatus = "activo" | "pausado" | "entregado" | "cancelado";
export type StageStatus   = "pendiente" | "en-progreso" | "revision" | "aprobado";

export interface Deliverable {
  id: string;
  name: string;
  url: string;
  done: boolean;
}

export interface Stage {
  id: string;
  name: string;
  status: StageStatus;
  deliverables: Deliverable[];
  dueDate: string;
}

export interface Project {
  id: string;
  clientName: string;
  company: string;
  email: string;
  service: string;
  description: string;
  totalValue: number;
  paidAmount: number;
  startDate: string;
  estimatedEndDate: string;
  status: ProjectStatus;
  stages: Stage[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

/* ── Stage templates (unchanged) ────────────────────────── */

export const STAGE_TEMPLATES: Record<string, string[]> = {
  "Sitio Web Corporativo":   ["Briefing", "Wireframes", "Diseño", "Desarrollo", "Revisión", "Entrega"],
  "Landing Page de Impacto": ["Briefing", "Diseño", "Desarrollo", "Revisión", "Entrega"],
  "Tienda Online Premium":   ["Briefing", "Arquitectura", "Diseño", "Desarrollo", "Testing", "Entrega"],
  "Presencia Personal":      ["Briefing", "Concepto", "Diseño", "Desarrollo", "Revisión", "Entrega"],
  "Aplicación Web":          ["Briefing & UX", "Diseño UI", "Frontend", "Backend", "Testing", "Deploy"],
  "SEO & Visibilidad Web":   ["Auditoría", "Estrategia", "Implementación", "Monitoreo"],
};

export const DEFAULT_STAGES = ["Briefing", "Diseño", "Desarrollo", "Entrega"];

export function makeStages(names: string[]): Stage[] {
  return names.map(name => ({
    id:           crypto.randomUUID(),
    name,
    status:       "pendiente" as StageStatus,
    deliverables: [],
    dueDate:      "",
  }));
}

function now() { return new Date().toISOString(); }

/* ── Hook ────────────────────────────────────────────────── */

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded,   setLoaded]   = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((data: Project[]) => { setProjects(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  /* ── Project CRUD ──────────────────────────────────────── */

  const addProject = useCallback((data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const optimistic: Project = { ...data, id: crypto.randomUUID(), createdAt: now(), updatedAt: now() };
    setProjects(prev => [optimistic, ...prev]);

    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((saved: Project) => setProjects(prev => prev.map(p => p.id === optimistic.id ? saved : p)))
      .catch(console.error);

    return optimistic;
  }, []);

  const updateProject = useCallback((id: string, patch: Partial<Omit<Project, "id" | "createdAt">>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...patch, updatedAt: now() } : p));

    fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(console.error);
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    fetch(`/api/projects/${id}`, { method: "DELETE" }).catch(console.error);
  }, []);

  /* ── Stage operations ──────────────────────────────────── */

  const updateStage = useCallback((projectId: string, stageId: string, patch: Partial<Omit<Stage, "id">>) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, updatedAt: now(), stages: p.stages.map(s => s.id === stageId ? { ...s, ...patch } : s) };
    }));

    fetch(`/api/projects/${projectId}/stages/${stageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(console.error);
  }, []);

  /* ── Deliverable operations ────────────────────────────── */

  const addDeliverable = useCallback((projectId: string, stageId: string, name: string) => {
    const optimistic: Deliverable = { id: crypto.randomUUID(), name, url: "", done: false };

    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p, updatedAt: now(),
        stages: p.stages.map(s =>
          s.id === stageId ? { ...s, deliverables: [...s.deliverables, optimistic] } : s
        ),
      };
    }));

    fetch(`/api/projects/${projectId}/stages/${stageId}/deliverables`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((saved: Deliverable) => {
        setProjects(prev => prev.map(p => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            stages: p.stages.map(s =>
              s.id === stageId
                ? { ...s, deliverables: s.deliverables.map(d => d.id === optimistic.id ? saved : d) }
                : s
            ),
          };
        }));
      })
      .catch(console.error);
  }, []);

  const updateDeliverable = useCallback((projectId: string, stageId: string, delivId: string, patch: Partial<Omit<Deliverable, "id">>) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p, updatedAt: now(),
        stages: p.stages.map(s =>
          s.id === stageId
            ? { ...s, deliverables: s.deliverables.map(d => d.id === delivId ? { ...d, ...patch } : d) }
            : s
        ),
      };
    }));

    fetch(`/api/projects/${projectId}/stages/${stageId}/deliverables/${delivId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(console.error);
  }, []);

  const deleteDeliverable = useCallback((projectId: string, stageId: string, delivId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p, updatedAt: now(),
        stages: p.stages.map(s =>
          s.id === stageId
            ? { ...s, deliverables: s.deliverables.filter(d => d.id !== delivId) }
            : s
        ),
      };
    }));

    fetch(`/api/projects/${projectId}/stages/${stageId}/deliverables/${delivId}`, {
      method: "DELETE",
    }).catch(console.error);
  }, []);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `suitwolf-proyectos-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [projects]);

  return {
    projects, loaded,
    addProject, updateProject, deleteProject,
    updateStage, addDeliverable, updateDeliverable, deleteDeliverable,
    exportJSON,
  };
}
