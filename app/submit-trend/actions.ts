"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitTrend(
  formData: FormData
): Promise<void> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const source_url = formData.get("source_url") as string;
  const category = formData.get("category") as string;

  const { data, error } = await supabaseAdmin
    .from("trend_submissions")
    .insert({
      title,
      description,
      source_url,
      category,
    })
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }
}