import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { email } = await requireUser();

    const today = new Date().toISOString().split("T")[0];

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("plan, subscription_expires_at")
      .eq("email", email)
      .single();

    if (profileError) {
      console.error(profileError);

      return NextResponse.json(
        { error: "Profile not found." },
        { status: 404 }
      );
    }

    const { data: usage, error: usageError } = await supabaseAdmin
      .from("ai_usage")
      .select("feature, count")
      .eq("email", email)
      .eq("usage_date", today);

    if (usageError) {
      console.error(usageError);

      return NextResponse.json(
        { error: "Unable to fetch usage." },
        { status: 500 }
      );
    }

    const startupIdeas =
      usage?.find((u) => u.feature === "startup_ideas")?.count ?? 0;

    const premiumReports =
      usage?.find((u) => u.feature === "premium_reports")?.count ?? 0;

    return NextResponse.json({
      plan: profile.plan,

      startupIdeas,

      premiumReports,

      startupIdeasRemaining:
        profile.plan === "pro"
          ? "Unlimited"
          : Math.max(0, 3 - startupIdeas),

      premiumReportsRemaining:
        profile.plan === "pro"
          ? "Unlimited"
          : Math.max(0, 2 - premiumReports),

      subscriptionExpiry:
  profile.subscription_expires_at ?? "Free Plan",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}