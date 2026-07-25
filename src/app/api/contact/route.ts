import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/**
 * Endpoint de contacto — endurecido para producción:
 *   1. Rate limit por IP (5 solicitudes / 10 min en memoria)
 *   2. Honeypot: campo "website" oculto → si viene lleno = bot
 *   3. Validación estricta: formato email, longitudes máx
 *   4. Escape HTML en toda interpolación → evita inyección en el mail
 *   5. Sin logs de datos sensibles
 */

/* ─── Escape HTML ─────────────────────────────────────────── */
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

/* ─── Rate limit in-memory (por IP) ───────────────────────── */
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length <= RATE_MAX;
}

/* ─── Validación ──────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 160, company: 160, role: 120, vision: 4000, answer: 800 };

const QUESTIONS: { id: string; label: string; emoji: string }[] = [
  { id: "q1", label: "Presencia digital actual",    emoji: "🌐" },
  { id: "q2", label: "Tipo de solución buscada",    emoji: "🎯" },
  { id: "q3", label: "Objetivo central del proyecto", emoji: "🚀" },
  { id: "q4", label: "Situación actual de la empresa", emoji: "🏢" },
  { id: "q5", label: "Urgencia para avanzar",       emoji: "⏱️" },
];

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intentá en unos minutos." },
      { status: 429 },
    );
  }

  let body: {
    name?: string;
    email?: string;
    company?: string;
    role?: string;
    vision?: string;
    answers?: Record<string, string>;
    website?: string; // honeypot
    consent?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot: bots suelen llenar todos los inputs; el humano no ve este campo.
  if (body.website && body.website.trim() !== "") {
    // Respuesta "ok" para que el bot no reintente, pero no envía nada.
    return NextResponse.json({ ok: true });
  }

  // Consentimiento explícito requerido (RGPD)
  if (body.consent !== true) {
    return NextResponse.json(
      { error: "Es necesario aceptar el tratamiento de datos." },
      { status: 400 },
    );
  }

  const { name, email, company, role, vision, answers } = body;

  if (!name || !email || !company || !vision) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email con formato inválido" }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    company.length > LIMITS.company ||
    (role && role.length > LIMITS.role) ||
    vision.length > LIMITS.vision
  ) {
    return NextResponse.json({ error: "Uno de los campos excede el límite permitido" }, { status: 400 });
  }
  // El email no puede contener saltos de línea (evita header injection en replyTo)
  if (/[\r\n]/.test(email)) {
    return NextResponse.json({ error: "Email con caracteres no permitidos" }, { status: 400 });
  }

  // Escape para inyectar seguro en el HTML del mail
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    company: escapeHtml(company),
    role: role ? escapeHtml(role) : "",
    vision: escapeHtml(vision).replace(/\n/g, "<br>"),
  };

  const answerRows = QUESTIONS.map(({ id, label, emoji }) => {
    const raw = answers?.[id];
    const trimmed = raw && raw.length > LIMITS.answer ? raw.slice(0, LIMITS.answer) : raw;
    const answer = trimmed ? escapeHtml(trimmed) : "—";
    return `
      <tr>
        <td style="padding:16px 24px;border-bottom:1px solid #1E1E1C;vertical-align:top;width:40%">
          <span style="font-size:16px;line-height:1">${emoji}</span>
          <span style="display:block;margin-top:6px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#7A7672">${label}</span>
        </td>
        <td style="padding:16px 24px;border-bottom:1px solid #1E1E1C;color:#F0EDE8;font-size:13px;line-height:1.6;vertical-align:top">
          ${answer}
        </td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nueva solicitud — SuitWolf</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:48px 20px 64px">
    <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%">

      <tr>
        <td style="padding-bottom:40px;text-align:center">
          <p style="margin:0 0 4px;font-size:22px">🐺</p>
          <p style="margin:0 0 10px;font-size:9px;letter-spacing:.55em;text-transform:uppercase;color:#C8920C">SuitWolf Studio</p>
          <h1 style="margin:0 0 6px;font-size:26px;font-weight:300;color:#F7F5F0;letter-spacing:-.02em;line-height:1.2">
            Nueva solicitud de colaboración
          </h1>
          <p style="margin:0;font-size:12px;color:#5A5855">
            Recibida el ${new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <div style="margin:24px auto 0;width:40px;height:1px;background:linear-gradient(to right,transparent,rgba(200,146,12,.4),transparent)"></div>
        </td>
      </tr>

      <tr>
        <td style="padding-bottom:28px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111110;border:1px solid #1E1E1C;border-radius:2px">
            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1E1E1C">
                <p style="margin:0;font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#C8920C">👤 &nbsp;Quién escribe</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px">
                <p style="margin:0 0 4px;font-size:20px;font-weight:400;color:#F7F5F0;letter-spacing:-.015em">${safe.name}</p>
                ${safe.role ? `<p style="margin:0 0 12px;font-size:12px;color:#7A7672">${safe.role}${safe.company ? ` · ${safe.company}` : ""}</p>` : `<p style="margin:0 0 12px;font-size:12px;color:#7A7672">${safe.company}</p>`}
                <a href="mailto:${safe.email}" style="display:inline-block;font-size:13px;color:#D4A020;text-decoration:none;border-bottom:1px solid rgba(212,160,32,.25);padding-bottom:1px">${safe.email}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding-bottom:28px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111110;border:1px solid #1E1E1C;border-radius:2px">
            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1E1E1C" colspan="2">
                <p style="margin:0;font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#C8920C">📋 &nbsp;Evaluación completada</p>
              </td>
            </tr>
            ${answerRows}
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding-bottom:40px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111110;border:1px solid #1E1E1C;border-radius:2px">
            <tr>
              <td style="padding:20px 24px 16px;border-bottom:1px solid #1E1E1C">
                <p style="margin:0;font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#C8920C">💭 &nbsp;Visión del proyecto</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px">
                <p style="margin:0;font-size:14px;color:#D8D4CE;line-height:1.85;font-style:italic">
                  "${safe.vision}"
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding-bottom:48px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,146,12,.05);border:1px solid rgba(200,146,12,.15);border-radius:2px">
            <tr>
              <td style="padding:18px 24px">
                <p style="margin:0 0 4px;font-size:12px;color:#C8920C">✨ &nbsp;Próximo paso sugerido</p>
                <p style="margin:0;font-size:13px;color:#ABA8A2;line-height:1.7">
                  Respondé directamente a este email para contactar a <strong style="color:#F0EDE8">${safe.name}</strong> — el <em>reply-to</em> ya apunta a <a href="mailto:${safe.email}" style="color:#D4A020;text-decoration:none">${safe.email}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="text-align:center;border-top:1px solid #1A1A18;padding-top:32px">
          <p style="margin:0 0 4px;font-size:11px;color:#3A3835">🐺 SuitWolf — Sistema de evaluación de proyectos</p>
          <p style="margin:0;font-size:10px;color:#2E2C2A;letter-spacing:.06em">Este mensaje fue generado automáticamente al recibir una solicitud</p>
        </td>
      </tr>

    </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "🐺 SUITWOLF — NUEVA SOLICITUD DE COLABORACIÓN",
    `Recibida el ${new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}`,
    "",
    "👤 QUIÉN ESCRIBE",
    `Nombre:  ${name}`,
    role ? `Cargo:   ${role}` : "",
    `Empresa: ${company}`,
    `Email:   ${email}`,
    "",
    "📋 EVALUACIÓN COMPLETADA",
    ...QUESTIONS.map(({ id, label }) => `${label}: ${answers?.[id] ?? "—"}`),
    "",
    "💭 VISIÓN DEL PROYECTO",
    `"${vision}"`,
    "",
    "——",
    "Respondé directamente a este email para contactar al solicitante.",
    "🐺 SuitWolf — Sistema de evaluación de proyectos",
  ]
    .filter((l) => l !== "")
    .join("\n");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"SuitWolf Studio" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `🐺 Nueva solicitud · ${company} — ${name}`,
      html,
      text,
    });
  } catch {
    return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
