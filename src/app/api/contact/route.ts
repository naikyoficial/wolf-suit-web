import { Resend } from "resend";
import { NextResponse } from "next/server";

const QUESTIONS: Record<string, string> = {
  q1: "¿Tu empresa ya tiene presencia digital?",
  q2: "¿Qué tipo de solución estás buscando?",
  q3: "¿Cuál es el objetivo central de este proyecto?",
  q4: "¿Cómo definirías a tu empresa hoy?",
  q5: "¿Con qué urgencia querés avanzar?",
};

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, email, company, role, vision, answers } = body;

  if (!name || !email || !company || !vision) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const questionRows = Object.entries(QUESTIONS)
    .map(([id, question]) => {
      const answer = (answers as Record<string, string>)?.[id] ?? "—";
      return `
        <tr>
          <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#ABA8A2;font-size:11px;letter-spacing:.08em;text-transform:uppercase;width:35%;vertical-align:top">${question}</td>
          <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#F7F5F0;font-size:13px;vertical-align:top">${answer}</td>
        </tr>`;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Nueva solicitud – SuitWolf</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:48px 24px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr>
          <td style="padding:0 0 36px;text-align:center">
            <div style="display:inline-block;border-bottom:1px solid rgba(212,160,32,.25);padding-bottom:24px;width:100%">
              <p style="margin:0 0 6px;font-size:9px;letter-spacing:.52em;text-transform:uppercase;color:rgba(212,160,32,.6)">SuitWolf Studio</p>
              <h1 style="margin:0;font-size:28px;font-weight:300;color:#F7F5F0;letter-spacing:-.025em">Nueva solicitud de colaboración</h1>
            </div>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td style="padding:0 0 32px">
            <p style="margin:0 0 16px;font-size:9px;letter-spacing:.4em;text-transform:uppercase;color:rgba(212,160,32,.5)">Datos de contacto</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;border:1px solid #1a1a1a">
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#ABA8A2;font-size:11px;letter-spacing:.08em;text-transform:uppercase;width:35%">Nombre</td>
                <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#F7F5F0;font-size:13px">${name}</td>
              </tr>
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#ABA8A2;font-size:11px;letter-spacing:.08em;text-transform:uppercase">Email</td>
                <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#F7F5F0;font-size:13px"><a href="mailto:${email}" style="color:#D4A020;text-decoration:none">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#ABA8A2;font-size:11px;letter-spacing:.08em;text-transform:uppercase">Empresa</td>
                <td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#F7F5F0;font-size:13px">${company}</td>
              </tr>
              ${role ? `
              <tr>
                <td style="padding:14px 20px;color:#ABA8A2;font-size:11px;letter-spacing:.08em;text-transform:uppercase">Cargo</td>
                <td style="padding:14px 20px;color:#F7F5F0;font-size:13px">${role}</td>
              </tr>` : ""}
            </table>
          </td>
        </tr>

        <!-- Questionnaire -->
        <tr>
          <td style="padding:0 0 32px">
            <p style="margin:0 0 16px;font-size:9px;letter-spacing:.4em;text-transform:uppercase;color:rgba(212,160,32,.5)">Cuestionario de evaluación</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;border:1px solid #1a1a1a">
              ${questionRows}
            </table>
          </td>
        </tr>

        <!-- Vision -->
        <tr>
          <td style="padding:0 0 48px">
            <p style="margin:0 0 16px;font-size:9px;letter-spacing:.4em;text-transform:uppercase;color:rgba(212,160,32,.5)">Visión del proyecto</p>
            <div style="background:#0D0D0D;border:1px solid #1a1a1a;padding:20px;color:#F7F5F0;font-size:13px;line-height:1.8">
              ${vision.replace(/\n/g, "<br>")}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="text-align:center;border-top:1px solid #1a1a1a;padding-top:32px">
            <p style="margin:0;font-size:10px;color:#555452;letter-spacing:.1em">SuitWolf — Evaluación de proyecto</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "NUEVA SOLICITUD DE COLABORACIÓN — SUITWOLF",
    "",
    "DATOS DE CONTACTO",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa: ${company}`,
    role ? `Cargo: ${role}` : "",
    "",
    "CUESTIONARIO",
    ...Object.entries(QUESTIONS).map(
      ([id, q]) => `${q}\n→ ${(answers as Record<string, string>)?.[id] ?? "—"}`
    ),
    "",
    "VISIÓN DEL PROYECTO",
    vision,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const { error } = await resend.emails.send({
    from: "SuitWolf <noreply@suitwolf.com>",
    to: ["proyectos@suitwolf.com"],
    replyTo: email,
    subject: `Nueva solicitud: ${company} — ${name}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
