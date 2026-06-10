import { createClient } from "@supabase/supabase-js";
console.log(
  "KEY PREFIX:",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20)
);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);