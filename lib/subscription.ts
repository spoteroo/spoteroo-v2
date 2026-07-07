import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type UserPlan = "free" | "pro";

export async function getUserPlan(
  email: string
): Promise<UserPlan> {
  const { data } = await supabase
    .from("profiles")
    .select("plan")
    .eq("email", email)
    .single();

  if (!data) return "free";

  return data.plan === "pro"
    ? "pro"
    : "free";
}

export async function isPro(email: string) {
  return (await getUserPlan(email)) === "pro";
}

export async function upgradeUser(email: string) {
  await supabase
    .from("profiles")
    .update({
      plan: "pro",
    })
    .eq("email", email);
}

export async function downgradeUser(email: string) {
  await supabase
    .from("profiles")
    .update({
      plan: "free",
    })
    .eq("email", email);
}

export const PLAN_LIMITS = {
  free: {
    startupIdeas: 5,
    premiumReports: 2,
    aiRequests: 20,
  },

  pro: {
    startupIdeas: 30,
    premiumReports: 20,
    aiRequests: 100,
  },

  enterprise: {
    startupIdeas: -1, // unlimited
    premiumReports: -1,
    aiRequests: -1,
  },
};

export async function canUseFeature(
  email: string,
  feature: string,
  freeLimit: number
) {
  const pro = await isPro(email);

  if (pro) return true;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const { data } = await supabase
    .from("ai_usage")
    .select("count")
    .eq("email", email)
    .eq("feature", feature)
    .eq("usage_date", today)
    .maybeSingle();

  const count = data?.count ?? 0;

  return count < freeLimit;
}

export async function incrementUsage(
  email: string,
  feature: string
) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const { data } = await supabase
    .from("ai_usage")
    .select("*")
    .eq("email", email)
    .eq("feature", feature)
    .eq("usage_date", today)
    .maybeSingle();

  if (!data) {
    await supabase.from("ai_usage").insert({
      email,
      feature,
      usage_date: today,
      count: 1,
    });

    return;
  }

  await supabase
    .from("ai_usage")
    .update({
      count: data.count + 1,
    })
    .eq("id", data.id);
}