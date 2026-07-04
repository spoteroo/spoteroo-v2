import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from("trend_history")
      .select("score,votes,captured_at")
      .eq("trend_id", Number(id))
      .order("captured_at", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load history." },
      { status: 500 }
    );
  }
}