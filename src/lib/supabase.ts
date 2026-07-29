import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only client with service role key — never import in client components.
// Lazy-initialized so the module evaluates cleanly at build time even when
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars are absent.
let _client: SupabaseClient | undefined;

function getClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (client as unknown as Record<string, unknown>)[prop as string];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    return typeof value === "function" ? (value as Function).bind(client) : value;
  },
});
