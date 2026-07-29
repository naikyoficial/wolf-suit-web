import { auth }      from "@/auth";
import { supabase }  from "@/lib/supabase";
import { NextRequest } from "next/server";

function mapLead(r: Record<string, unknown>) {
  return {
    id:              r.id,
    name:            r.name,
    company:         r.company,
    email:           r.email,
    phone:           r.phone,
    channel:         r.channel,
    status:          r.status,
    service:         r.service,
    estimatedValue:  Number(r.estimated_value),
    notes:           r.notes,
    nextAction:      r.next_action,
    nextActionDate:  r.next_action_date ?? "",
    createdAt:       r.created_at,
    updatedAt:       r.updated_at,
  };
}

export async function GET() {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json((data ?? []).map(mapLead));
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name:             body.name            ?? "",
      company:          body.company         ?? "",
      email:            body.email           ?? "",
      phone:            body.phone           ?? "",
      channel:          body.channel         ?? "",
      status:           body.status          ?? "nuevo",
      service:          body.service         ?? "",
      estimated_value:  body.estimatedValue  ?? 0,
      notes:            body.notes           ?? "",
      next_action:      body.nextAction      ?? "",
      next_action_date: body.nextActionDate  || null,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(mapLead(data as Record<string, unknown>), { status: 201 });
}
