"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const callbackUrl = (formData.get("callbackUrl") as string) || "/crm";
  try {
    await signIn("credentials", {
      email:       formData.get("email"),
      password:    formData.get("password"),
      redirectTo:  callbackUrl,
    });
    return null;
  } catch (err) {
    if (err instanceof AuthError) return { error: "Credenciales incorrectas." };
    throw err; // re-throw redirect (NEXT_REDIRECT)
  }
}
