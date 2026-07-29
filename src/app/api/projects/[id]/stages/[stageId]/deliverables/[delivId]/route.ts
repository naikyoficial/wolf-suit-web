import { auth }      from "@/auth";
import { supabase }  from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ delivId: string }> }
) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { delivId } = await params;
  const body = await req.json();

  const { error } = await supabase
    .from("deliverables")
    .update({
      ...(body.name !== undefined && { name: body.name }),
      ...(body.url  !== undefined && { url:  body.url  }),
      ...(body.done !== undefined && { done: body.done }),
    })
    .eq("id", delivId);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ delivId: string }> }
) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { delivId } = await params;
  const { error } = await supabase.from("deliverables").delete().eq("id", delivId);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return new Response(null, { status: 204 });
}
