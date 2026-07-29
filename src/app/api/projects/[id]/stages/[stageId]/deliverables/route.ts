import { auth }      from "@/auth";
import { supabase }  from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; stageId: string }> }
) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { stageId } = await params;
  const body = await req.json();

  // Get current max position
  const { data: existing } = await supabase
    .from("deliverables")
    .select("position")
    .eq("stage_id", stageId)
    .order("position", { ascending: false })
    .limit(1);

  const position = (existing?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from("deliverables")
    .insert({ stage_id: stageId, name: body.name ?? "", url: body.url ?? "", done: false, position })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ id: (data as Record<string, unknown>).id, name: (data as Record<string, unknown>).name, url: (data as Record<string, unknown>).url, done: (data as Record<string, unknown>).done }, { status: 201 });
}
