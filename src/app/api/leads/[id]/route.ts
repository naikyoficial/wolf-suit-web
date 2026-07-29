import { auth }      from "@/auth";
import { supabase }  from "@/lib/supabase";
import { NextRequest } from "next/server";

function mapLead(r: Record<string, unknown>) {
  return {
    id:             r.id,
    name:           r.name,
    company:        r.company,
    email:          r.email,
    phone:          r.phone,
    channel:        r.channel,
    status:         r.status,
    service:        r.service,
    estimatedValue: Number(r.estimated_value),
    notes:          r.notes,
    nextAction:     r.next_action,
    nextActionDate: r.next_action_date ?? "",
    createdAt:      r.created_at,
    updatedAt:      r.updated_at,
  };
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("leads")
    .update({
      name:             body.name,
      company:          body.company,
      email:            body.email,
      phone:            body.phone,
      channel:          body.channel,
      status:           body.status,
      service:          body.service,
      estimated_value:  body.estimatedValue,
      notes:            body.notes,
      next_action:      body.nextAction,
      next_action_date: body.nextActionDate || null,
      updated_at:       new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(mapLead(data as Record<string, unknown>));
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return new Response(null, { status: 204 });
}
