import { Suspense } from "react";
import type { Metadata } from "next";
import { ProyectosClient } from "./ProyectosClient";

export const metadata: Metadata = {
  title: "Proyectos",
  robots: { index: false, follow: false },
};

export default function ProyectosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-4 text-sm font-mono">Cargando…</p>
      </div>
    }>
      <ProyectosClient />
    </Suspense>
  );
}
