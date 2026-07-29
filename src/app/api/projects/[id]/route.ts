import { auth }      from "@/auth";
import { supabase }  from "@/lib/supabase";
import { NextRequest } from "next/server";

function mapDeliverable(r: Record<string, unknown>) {
  return { id: r.id, name: r.name, url: r.url, done: r.done };
}

function mapStage(r: Record<string, unknown>) {
  const deliverables = (r.sw_deliverables as Record<string, unknown>[] | null) ?? [];
  return {
    id: r.id, name: r.name, status: r.status, dueDate: r.due_date ?? "",
    deliverables: deliverables
      .sort((a, b) => Number(a.position) - Number(b.position))
      .map(mapDeliverable),
  };
}

function mapProject(r: Record<string, unknown>) {
  const stages = (r.sw_stages as Record<string, unknown>[] | null) ?? [];
  return {
    id: r.id, clientName: r.client_name, company: r.company, email: r.email,
    service: r.service, description: r.description, totalValue: Number(r.total_value),
    paidAmount: Number(r.paid_amount), startDate: r.start_date ?? "",
    estimatedEndDate: r.estimated_end_date ?? "", status: r.status, notes: r.notes,
    stages: stages.sort((a, b) => Number(a.position) - Number(b.position)).map(mapStage),
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { data, error } = await supabase
    .from("sw_projects")
    .select("*, sw_stages(*, sw_deliverables(*))")
    .eq("id", id)
    .single();

  if (error) return Response.json({ error: error.message }, { status: 404 });
  return Response.json(mapProject(data as Record<string, unknown>));
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body    = await req.json();

  const { error } = await supabase
    .from("sw_projects")
    .update({
      client_name:        body.clientName,
      company:            body.company,
      email:              body.email,
      service:            body.service,
      description:        body.description,
      total_value:        body.totalValue,
      paid_amount:        body.paidAmount,
      start_date:         body.startDate         || null,
      estimated_end_date: body.estimatedEndDate  || null,
      status:             body.status,
      notes:              body.notes,
      updated_at:         new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { data: full } = await supabase
    .from("sw_projects")
    .select("*, sw_stages(*, sw_deliverables(*))")
    .eq("id", id)
    .single();

  return Response.json(mapProject(full as Record<string, unknown>));
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from("sw_projects").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return new Response(null, { status: 204 });
}
