import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./supabase-config";

let singleton: SupabaseClient | null = null;

type GetOptions = {
  allowMissing?: boolean;
};

export function getSupabaseServerClient(options: GetOptions = {}) {
  if (singleton) return singleton;

  const url = supabaseConfig.url;
  const anonKey = supabaseConfig.anonKey;
  const serviceRoleKey = supabaseConfig.serviceRoleKey;

  if (!url || !anonKey) {
    if (options.allowMissing) return null;
    throw new Error("Supabase non configurato (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY mancanti).");
  }

  const keyToUse = serviceRoleKey || anonKey;
  singleton = createClient(url, keyToUse);
  return singleton;
}

export function createServerClient(options?: GetOptions) {
  return getSupabaseServerClient(options);
}
