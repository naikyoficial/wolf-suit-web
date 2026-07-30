"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "#0D0D0D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{ width: "100%", maxWidth: "360px" }}>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "1.875rem", color: "#F7F5F0", letterSpacing: "-0.03em", margin: 0 }}>SUITWOLF</p>
          <p style={{ fontSize: "0.75rem", color: "#555452", fontFamily: "monospace", marginTop: "0.25rem", letterSpacing: "0.1em" }}>Panel interno</p>
        </div>

        <form
          action={formAction}
          style={{
            background: "#141414",
            border: "1px solid #2A2928",
            borderRadius: "1rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}>

          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#555452", marginBottom: "0.375rem" }}>Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              style={{
                width: "100%",
                background: "#1C1C1C",
                border: "1px solid #2A2928",
                borderRadius: "4px",
                padding: "0.625rem 0.75rem",
                fontSize: "0.875rem",
                color: "#F7F5F0",
                outline: "none",
                boxSizing: "border-box",
              }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#555452", marginBottom: "0.375rem" }}>Contraseña</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                background: "#1C1C1C",
                border: "1px solid #2A2928",
                borderRadius: "4px",
                padding: "0.625rem 0.75rem",
                fontSize: "0.875rem",
                color: "#F7F5F0",
                outline: "none",
                boxSizing: "border-box",
              }} />
          </div>

          {state?.error && (
            <p style={{ fontSize: "0.75rem", color: "#f87171", textAlign: "center", margin: 0 }}>{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              border: "none",
              background: pending ? "#1C1C1C" : "#D4A020",
              color: pending ? "#555452" : "#0D0D0D",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              cursor: pending ? "not-allowed" : "pointer",
            }}>
            {pending ? "Verificando…" : "Ingresar"}
          </button>
        </form>

      </div>
    </div>
  );
}
