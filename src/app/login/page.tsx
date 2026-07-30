"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loginAction } from "./actions";

function LoginForm() {
  const params      = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/crm";

  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-10">
          <p className="text-3xl font-display text-text tracking-tight">SUITWOLF</p>
          <p className="text-xs text-text-4 font-mono mt-1 tracking-wide">Panel interno</p>
        </div>

        {/* Form */}
        <form action={formAction}
          className="bg-surface-1 border border-line-2 rounded-2xl p-8 space-y-5">

          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div>
            <label className="block text-xs text-text-4 mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-surface-2 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
          </div>

          <div>
            <label className="block text-xs text-text-4 mb-1.5">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-surface-2 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
          </div>

          {state?.error && (
            <p className="text-xs text-red-400 text-center">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className={`w-full py-3 rounded text-sm font-medium tracking-wide transition-all ${
              pending
                ? "bg-surface-2 text-text-4 cursor-not-allowed"
                : "bg-gold text-surface hover:bg-gold-peak"
            }`}>
            {pending ? "Verificando…" : "Ingresar"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
