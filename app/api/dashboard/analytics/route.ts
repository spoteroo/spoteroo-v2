import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const [
      profiles,
      subscribers,
      trends,
      votes,
      usage,
    ] = await Promise.all([
      supabaseAdmin.from("profiles").select("plan"),
      supabaseAdmin
        .from("newsletter_subscribers")
        .select("id"),
      supabaseAdmin
        .from("trends")
        .select("category,score"),
      supabaseAdmin.from("votes").select("id"),
      supabaseAdmin.from("ai_usage").select("id"),
    ]);

    const freeUsers =
      profiles.data?.filter(
        (u) => u.plan !== "pro"
      ).length ?? 0;

    const proUsers =
      profiles.data?.filter(
        (u) => u.plan === "pro"
      ).length ?? 0;

    const subscribersCount =
      subscribers.data?.length ?? 0;

    const votesCount =
      votes.data?.length ?? 0;

    const aiRequests =
      usage.data?.length ?? 0;

    const revenue =
      proUsers * 49;

    const mrr = revenue;

    const categoryCounts: Record<
      string,
      number
    > = {};

    trends.data?.forEach((trend) => {
      categoryCounts[trend.category] =
        (categoryCounts[trend.category] ?? 0) + 1;
    });

    const topCategories = Object.entries(
      categoryCounts
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return NextResponse.json({
      revenue,
      mrr,
      freeUsers,
      proUsers,
      subscribers: subscribersCount,
      votes: votesCount,
      aiRequests,
      topCategories,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Analytics failed",
      },
      {
        status: 500,
      }
    );
  }
}