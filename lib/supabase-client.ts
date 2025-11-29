import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./supabase-config";

export const supabaseBrowserClient = supabaseConfig.url && supabaseConfig.anonKey
  ? createClient(supabaseConfig.url, supabaseConfig.anonKey)
  : null;

export function getSupabaseBrowserClient() {
  if (!supabaseBrowserClient) {
    throw new Error("Supabase client non configurato: verifica NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return supabaseBrowserClient;
}
