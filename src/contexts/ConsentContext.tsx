"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Gestor de consentimiento de cookies (RGPD / LSSI-CE / ePrivacy).
 *
 * Estado en localStorage bajo "suitwolf:consent":
 * - "accepted"  → el usuario aceptó cookies analíticas (GA4)
 * - "rejected"  → rechazó, solo cookies esenciales
 * - "pending"   → todavía no decidió, banner visible
 *
 * Cookies "esenciales" (funcionamiento del sitio, preferencia de consentimiento)
 * son legales sin consentimiento. Todo lo demás requiere opt-in explícito.
 */

export type ConsentValue = "accepted" | "rejected" | "pending";

const STORAGE_KEY = "suitwolf:consent";

interface ConsentContextValue {
  consent: ConsentValue;
  accept: () => void;
  reject: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue>("pending");

  // Hidratar desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
      }
    } catch {
      /* localStorage puede estar bloqueado (modo privado); banner queda visible */
    }
  }, []);

  const persist = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* si falla, al menos vive en memoria durante la sesión */
    }
    setConsent(value);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        accept: () => persist("accepted"),
        reject: () => persist("rejected"),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent debe usarse dentro de <ConsentProvider>");
  return ctx;
}
