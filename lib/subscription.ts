import { supabaseAdmin } from "./supabase-admin";

export async function isPro(email: string) {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("plan")
    .eq("email", email)
    .single();

  return data?.plan === "pro";
}

export async function getUsage(
  email: string,
  feature: string
) {
  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabaseAdmin
    .from("ai_usage")
    .select("count")
    .eq("email", email)
    .eq("feature", feature)
    .eq("usage_date", today)
    .single();

  return data?.count ?? 0;
}

export async function incrementUsage(
  email: string,
  feature: string
) {
  const today = new Date().toISOString().split("T")[0];

  const current = await getUsage(email, feature);

  if (current === 0) {
    await supabaseAdmin
      .from("ai_usage")
      .insert({
        email,
        feature,
        usage_date: today,
        count: 1,
      });

    return;
  }

  await supabaseAdmin
    .from("ai_usage")
    .update({
      count: current + 1,
    })
    .eq("email", email)
    .eq("feature", feature)
    .eq("usage_date", today);
}

export async function canUseFeature(
  email: string,
  feature: string,
  freeLimit: number
) {
  const pro = await isPro(email);

  if (pro) {
    return true;
  }

  const usage = await getUsage(email, feature);

  return usage < freeLimit;
}