import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data: trends, error } =
    await supabaseAdmin
      .from("trends")
      .select("id, score");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  if (!trends?.length) {
    return NextResponse.json({
      success: true,
      inserted: 0,
    });
  }

  const rows = trends.map((trend) => ({
    trend_id: trend.id,
    score: trend.score,
    votes: 0, // we'll replace this with actual vote totals later
  }));

  const { error: insertError } =
    await supabaseAdmin
      .from("trend_history")
      .insert(rows);

  if (insertError) {
    return NextResponse.json(
      {
        error: insertError.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
    inserted: rows.length,
  });
}