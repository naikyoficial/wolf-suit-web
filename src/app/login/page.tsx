"use client";

import { useState } from "react";
import { signIn }   from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router      = useRouter();
  const params      = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/crm";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Credenciales incorrectas.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-10">
          <p className="text-3xl font-display text-text tracking-tight">SUITWOLF</p>
          <p className="text-xs text-text-4 font-mono mt-1 tracking-wide">Panel interno</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}
          className="bg-surface-1 border border-line-2 rounded-2xl p-8 space-y-5">

          <div>
            <label className="block text-xs text-text-4 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-surface-2 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
          </div>

          <div>
            <label className="block text-xs text-text-4 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-surface-2 border border-line-2 rounded px-3 py-2.5 text-sm text-text placeholder:text-text-4 focus:outline-none focus:border-gold transition-colors" />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-sm font-medium tracking-wide transition-all ${
              loading
                ? "bg-surface-2 text-text-4 cursor-not-allowed"
                : "bg-gold text-surface hover:bg-gold-peak"
            }`}>
            {loading ? "Verificando…" : "Ingresar"}
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
