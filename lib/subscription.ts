import { supabase } from "@/lib/supabase";

export async function isPro(userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single();

  return data?.plan === "pro";
}