"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Types ───────────────────────────────────────────────── */

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

/* ── Stage templates ─────────────────────────────────────── */

export const STAGE_TEMPLATES: Record<string, string[]> = {
  "Sitio Web Corporativo":  ["Briefing", "Wireframes", "Diseño", "Desarrollo", "Revisión", "Entrega"],
  "Landing Page de Impacto":["Briefing", "Diseño", "Desarrollo", "Revisión", "Entrega"],
  "Tienda Online Premium":  ["Briefing", "Arquitectura", "Diseño", "Desarrollo", "Testing", "Entrega"],
  "Presencia Personal":     ["Briefing", "Concepto", "Diseño", "Desarrollo", "Revisión", "Entrega"],
  "Aplicación Web":         ["Briefing & UX", "Diseño UI", "Frontend", "Backend", "Testing", "Deploy"],
  "SEO & Visibilidad Web":  ["Auditoría", "Estrategia", "Implementación", "Monitoreo"],
};

export const DEFAULT_STAGES = ["Briefing", "Diseño", "Desarrollo", "Entrega"];

export function makeStages(names: string[]): Stage[] {
  return names.map(name => ({
    id: crypto.randomUUID(),
    name,
    status: "pendiente" as StageStatus,
    deliverables: [],
    dueDate: "",
  }));
}

/* ── Hook ────────────────────────────────────────────────── */

const KEY = "sw_projects_v1";

function now() { return new Date().toISOString(); }

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded,   setLoaded]   = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProjects(JSON.parse(raw) as Project[]);
    } catch {}
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Project[]) => {
    setProjects(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }, []);

  const addProject = useCallback((data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const p: Project = { ...data, id: crypto.randomUUID(), createdAt: now(), updatedAt: now() };
    persist([...projects, p]);
    return p;
  }, [projects, persist]);

  const updateProject = useCallback((id: string, patch: Partial<Omit<Project, "id" | "createdAt">>) => {
    persist(projects.map(p => p.id === id ? { ...p, ...patch, updatedAt: now() } : p));
  }, [projects, persist]);

  const deleteProject = useCallback((id: string) => {
    persist(projects.filter(p => p.id !== id));
  }, [projects, persist]);

  // Stage operations
  const updateStage = useCallback((projectId: string, stageId: string, patch: Partial<Omit<Stage, "id">>) => {
    persist(projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        updatedAt: now(),
        stages: p.stages.map(s => s.id === stageId ? { ...s, ...patch } : s),
      };
    }));
  }, [projects, persist]);

  const addDeliverable = useCallback((projectId: string, stageId: string, name: string) => {
    const d: Deliverable = { id: crypto.randomUUID(), name, url: "", done: false };
    persist(projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        updatedAt: now(),
        stages: p.stages.map(s =>
          s.id === stageId ? { ...s, deliverables: [...s.deliverables, d] } : s
        ),
      };
    }));
  }, [projects, persist]);

  const updateDeliverable = useCallback((projectId: string, stageId: string, delivId: string, patch: Partial<Omit<Deliverable, "id">>) => {
    persist(projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        updatedAt: now(),
        stages: p.stages.map(s =>
          s.id === stageId
            ? { ...s, deliverables: s.deliverables.map(d => d.id === delivId ? { ...d, ...patch } : d) }
            : s
        ),
      };
    }));
  }, [projects, persist]);

  const deleteDeliverable = useCallback((projectId: string, stageId: string, delivId: string) => {
    persist(projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        updatedAt: now(),
        stages: p.stages.map(s =>
          s.id === stageId
            ? { ...s, deliverables: s.deliverables.filter(d => d.id !== delivId) }
            : s
        ),
      };
    }));
  }, [projects, persist]);

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
