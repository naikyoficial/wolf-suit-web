"use client";

import { useState, useEffect, useCallback } from "react";

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

const KEY = "sw_crm_leads_v1";

function now() {
  return new Date().toISOString();
}

export function useLeads() {
  const [leads, setLeads]   = useState<Lead[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLeads(JSON.parse(raw) as Lead[]);
    } catch {}
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Lead[]) => {
    setLeads(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }, []);

  const addLead = useCallback((data: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const lead: Lead = { ...data, id: crypto.randomUUID(), createdAt: now(), updatedAt: now() };
    persist([...leads, lead]);
    return lead;
  }, [leads, persist]);

  const updateLead = useCallback((id: string, patch: Partial<Omit<Lead, "id" | "createdAt">>) => {
    persist(leads.map(l => l.id === id ? { ...l, ...patch, updatedAt: now() } : l));
  }, [leads, persist]);

  const deleteLead = useCallback((id: string) => {
    persist(leads.filter(l => l.id !== id));
  }, [leads, persist]);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `suitwolf-crm-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [leads]);

  return { leads, loaded, addLead, updateLead, deleteLead, exportJSON };
}
