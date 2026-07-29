import { auth }      from "@/auth";
import { supabase }  from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; stageId: string }> }
) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { stageId } = await params;
  const body = await req.json();

  const { error } = await supabase
    .from("stages")
    .update({
      ...(body.name     !== undefined && { name:     body.name     }),
      ...(body.status   !== undefined && { status:   body.status   }),
      ...(body.dueDate  !== undefined && { due_date: body.dueDate || null }),
    })
    .eq("id", stageId);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
