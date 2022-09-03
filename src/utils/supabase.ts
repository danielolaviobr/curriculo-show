import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey)
  throw new Error("SUPABASE SECRETS REQUIRED");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
