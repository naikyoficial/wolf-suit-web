import { Resend } from "resend";
import { NextResponse } from "next/server";

const QUESTIONS: { id: string; label: string; emoji: string }[] = [
  { id: "q1", label: "Presencia digital actual",    emoji: "🌐" },
  { id: "q2", label: "Tipo de solución buscada",    emoji: "🎯" },
  { id: "q3", label: "Objetivo central del proyecto", emoji: "🚀" },
  { id: "q4", label: "Situación actual de la empresa", emoji: "🏢" },
  { id: "q5", label: "Urgencia para avanzar",       emoji: "⏱️" },
];

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, email, company, role, vision, answers } = body;

  if (!name || !email || !company || !vision) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const answerRows = QUESTIONS.map(({ id, label, emoji }) => {
    const answer = (answers as Record<string, string>)?.[id] ?? "—";
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


      <!-- ── CABECERA ── -->
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


      <!-- ── QUIÉN ESCRIBIÓ ── -->
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
                <p style="margin:0 0 4px;font-size:20px;font-weight:400;color:#F7F5F0;letter-spacing:-.015em">${name}</p>
                ${role ? `<p style="margin:0 0 12px;font-size:12px;color:#7A7672">${role}${company ? ` · ${company}` : ""}</p>` : `<p style="margin:0 0 12px;font-size:12px;color:#7A7672">${company}</p>`}
                <a href="mailto:${email}" style="display:inline-block;font-size:13px;color:#D4A020;text-decoration:none;border-bottom:1px solid rgba(212,160,32,.25);padding-bottom:1px">${email}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>


      <!-- ── CUESTIONARIO ── -->
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


      <!-- ── VISIÓN ── -->
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
                  "${vision.replace(/\n/g, "<br>")}"
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>


      <!-- ── ACCIÓN SUGERIDA ── -->
      <tr>
        <td style="padding-bottom:48px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,146,12,.05);border:1px solid rgba(200,146,12,.15);border-radius:2px">
            <tr>
              <td style="padding:18px 24px">
                <p style="margin:0 0 4px;font-size:12px;color:#C8920C">✨ &nbsp;Próximo paso sugerido</p>
                <p style="margin:0;font-size:13px;color:#ABA8A2;line-height:1.7">
                  Respondé directamente a este email para contactar a <strong style="color:#F0EDE8">${name}</strong> — el <em>reply-to</em> ya apunta a <a href="mailto:${email}" style="color:#D4A020;text-decoration:none">${email}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>


      <!-- ── FOOTER ── -->
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
    ...QUESTIONS.map(({ id, label }) =>
      `${label}: ${(answers as Record<string, string>)?.[id] ?? "—"}`
    ),
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

  const { error } = await resend.emails.send({
    // onboarding@resend.dev is Resend's pre-verified domain — works without DNS setup.
    // Switch to "SuitWolf <noreply@suitwolf.com>" once suitwolf.com is verified in Resend.
    from: "SuitWolf <onboarding@resend.dev>",
    to: ["proyectos@suitwolf.com", "naikymusic.contact@gmail.com"],
    replyTo: email,
    subject: `🐺 Nueva solicitud · ${company} — ${name}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
