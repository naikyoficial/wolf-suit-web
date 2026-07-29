import { auth }      from "@/auth";
import { supabase }  from "@/lib/supabase";
import { NextRequest } from "next/server";

/* ── Mappers ─────────────────────────────────────────────── */

function mapDeliverable(r: Record<string, unknown>) {
  return { id: r.id, name: r.name, url: r.url, done: r.done };
}

function mapStage(r: Record<string, unknown>) {
  const deliverables = (r.sw_deliverables as Record<string, unknown>[] | null) ?? [];
  return {
    id:          r.id,
    name:        r.name,
    status:      r.status,
    dueDate:     r.due_date ?? "",
    deliverables: deliverables
      .sort((a, b) => Number(a.position) - Number(b.position))
      .map(mapDeliverable),
  };
}

function mapProject(r: Record<string, unknown>) {
  const stages = (r.sw_stages as Record<string, unknown>[] | null) ?? [];
  return {
    id:                r.id,
    clientName:        r.client_name,
    company:           r.company,
    email:             r.email,
    service:           r.service,
    description:       r.description,
    totalValue:        Number(r.total_value),
    paidAmount:        Number(r.paid_amount),
    startDate:         r.start_date        ?? "",
    estimatedEndDate:  r.estimated_end_date ?? "",
    status:            r.status,
    notes:             r.notes,
    stages:            stages
      .sort((a, b) => Number(a.position) - Number(b.position))
      .map(mapStage),
    createdAt:  r.created_at,
    updatedAt:  r.updated_at,
  };
}

/* ── GET /api/projects ───────────────────────────────────── */

export async function GET() {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("sw_projects")
    .select("*, sw_stages(*, sw_deliverables(*))")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json((data ?? []).map(p => mapProject(p as Record<string, unknown>)));
}

/* ── POST /api/projects ──────────────────────────────────── */

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // 1. Create project
  const { data: project, error: projErr } = await supabase
    .from("sw_projects")
    .insert({
      client_name:         body.clientName         ?? "",
      company:             body.company            ?? "",
      email:               body.email              ?? "",
      service:             body.service            ?? "",
      description:         body.description        ?? "",
      total_value:         body.totalValue         ?? 0,
      paid_amount:         body.paidAmount         ?? 0,
      start_date:          body.startDate          || null,
      estimated_end_date:  body.estimatedEndDate   || null,
      status:              body.status             ?? "activo",
      notes:               body.notes              ?? "",
    })
    .select()
    .single();

  if (projErr) return Response.json({ error: projErr.message }, { status: 500 });

  // 2. Create stages
  const stages: unknown[] = body.stages ?? [];
  if (stages.length > 0) {
    const stageRows = stages.map((s: unknown, i: number) => {
      const stage = s as Record<string, unknown>;
      return {
        project_id: (project as Record<string, unknown>).id,
        name:       stage.name      ?? "",
        status:     stage.status    ?? "pendiente",
        due_date:   stage.dueDate   || null,
        position:   i,
      };
    });

    const { data: insertedStages, error: stagesErr } = await supabase
      .from("sw_stages")
      .insert(stageRows)
      .select();

    if (stagesErr) return Response.json({ error: stagesErr.message }, { status: 500 });

    // 3. Create deliverables per stage
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i] as Record<string, unknown>;
      const deliverables = (stage.deliverables as unknown[]) ?? [];
      const dbStage = insertedStages?.[i] as Record<string, unknown>;

      if (deliverables.length > 0 && dbStage) {
        const delivRows = deliverables.map((d: unknown, j: number) => {
          const deliv = d as Record<string, unknown>;
          return { stage_id: dbStage.id, name: deliv.name ?? "", url: deliv.url ?? "", done: deliv.done ?? false, position: j };
        });
        await supabase.from("sw_deliverables").insert(delivRows);
      }
    }
  }

  // Return full project
  const { data: full, error: fullErr } = await supabase
    .from("sw_projects")
    .select("*, sw_stages(*, sw_deliverables(*))")
    .eq("id", (project as Record<string, unknown>).id as string)
    .single();

  if (fullErr) return Response.json({ error: fullErr.message }, { status: 500 });
  return Response.json(mapProject(full as Record<string, unknown>), { status: 201 });
}
