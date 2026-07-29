import { createClient } from "@supabase/supabase-js";

// Server-only client with service role key — never import in client components
export const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  { auth: { persistSession: false } }
);
