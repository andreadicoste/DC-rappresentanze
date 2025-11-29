const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://untqycddahzrkndmbfhn.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudHF5Y2RkYWh6cmtuZG1iZmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDUyMjMsImV4cCI6MjA3ODk4MTIyM30.cxUEKpmY3oj0HCZAvHxLqCta2KsIDw9pabPH1iWkWwI";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudHF5Y2RkYWh6cmtuZG1iZmhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzQwNTIyMywiZXhwIjoyMDc4OTgxMjIzfQ.MAGP8zmzoYe_oge-08ifmkP7rauN1QLMSalBs7_cISg";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("[supabase-config] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars");
}

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  serviceRoleKey: supabaseServiceRoleKey,
};
