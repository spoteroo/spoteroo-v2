import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          error: "Email required",
        },
        {
          status: 400,
        }
      );
    }

    // TODO:
    // Replace this with Dodo Customer Portal API
    // once available.

    return NextResponse.json({
      success: true,
      url: "/pricing",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}