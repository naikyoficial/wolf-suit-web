"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Types (unchanged interface) ─────────────────────────── */

export type LeadStatus = "nuevo" | "contactado" | "propuesta" | "negociacion" | "ganado" | "perdido";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  channel: string;
  status: LeadStatus;
  service: string;
  estimatedValue: number;
  notes: string;
  nextAction: string;
  nextActionDate: string;
  createdAt: string;
  updatedAt: string;
}

function now() { return new Date().toISOString(); }

/* ── Hook ────────────────────────────────────────────────── */

export function useLeads() {
  const [leads,  setLeads]  = useState<Lead[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/leads")
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((data: Lead[]) => { setLeads(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const addLead = useCallback((data: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const optimistic: Lead = { ...data, id: crypto.randomUUID(), createdAt: now(), updatedAt: now() };
    setLeads(prev => [optimistic, ...prev]);

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((saved: Lead) => setLeads(prev => prev.map(l => l.id === optimistic.id ? saved : l)))
      .catch(console.error);

    return optimistic;
  }, []);

  const updateLead = useCallback((id: string, patch: Partial<Omit<Lead, "id" | "createdAt">>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch, updatedAt: now() } : l));

    fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...leads.find(l => l.id === id), ...patch }),
    })
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((saved: Lead) => setLeads(prev => prev.map(l => l.id === id ? saved : l)))
      .catch(console.error);
  }, [leads]);

  const deleteLead = useCallback((id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    fetch(`/api/leads/${id}`, { method: "DELETE" }).catch(console.error);
  }, []);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `suitwolf-crm-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [leads]);

  return { leads, loaded, addLead, updateLead, deleteLead, exportJSON };
}
