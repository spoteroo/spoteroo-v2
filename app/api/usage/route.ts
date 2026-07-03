import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  return NextResponse.json({
    message: "Usage API is working",
  });
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const today = new Date().toISOString().split("T")[0];

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("plan, subscription_expires")
      .eq("email", email)
      .single();

    const { data: usage } = await supabaseAdmin
      .from("ai_usage")
      .select("feature, count")
      .eq("email", email)
      .eq("usage_date", today);

    const startupIdeas =
      usage?.find(
        (u) => u.feature === "startup_ideas"
      )?.count ?? 0;

    const premiumReports =
      usage?.find(
        (u) => u.feature === "premium_reports"
      )?.count ?? 0;

    const aiUsageToday =
      startupIdeas + premiumReports;

    return NextResponse.json({
      plan: profile?.plan ?? "free",

      aiUsageToday,

      startupIdeas,

      premiumReports,

      startupIdeasRemaining:
        profile?.plan === "pro"
          ? "Unlimited"
          : Math.max(0, 3 - startupIdeas),

      premiumReportsRemaining:
        profile?.plan === "pro"
          ? "Unlimited"
          : Math.max(0, 2 - premiumReports),

      subscriptionExpiry:
        profile?.subscription_expires ??
        "Free Plan",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to fetch usage.",
      },
      {
        status: 500,
      }
    );
  }
}