import { Suspense } from "react";
import type { Metadata } from "next";
import { PropuestaContent } from "./PropuestaContent";

export const metadata: Metadata = {
  title: "Propuesta Comercial",
  robots: { index: false, follow: false },
};

export default function PropuestaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-3 text-sm font-mono">Cargando propuesta…</p>
      </div>
    }>
      <PropuestaContent />
    </Suspense>
  );
}
