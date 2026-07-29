import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PROTECTED = ["/cotizador", "/crm", "/proyectos"];

export default auth((req) => {
  const isProtected = PROTECTED.some(p => req.nextUrl.pathname.startsWith(p));
  if (isProtected && !req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/cotizador/:path*", "/crm/:path*", "/proyectos/:path*"],
};
