import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data: subscribers, error } = await supabase
      .from("subscribers")
      .select("email");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const emails =
      subscribers?.map((s) => s.email) || [];

    if (emails.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No subscribers found",
        },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "newsletter@spoteroo.com",
      to: emails,
      subject: "Spoteroo Weekly Trends",
      html: `
        <h1>🚀 Spoteroo Weekly Trends</h1>

        <p>Welcome to Spoteroo.</p>

        <ul>
          <li>AI Sales Agents</li>
          <li>AI Recruiting Agents</li>
          <li>Vertical AI</li>
        </ul>

        <p>More trends coming soon.</p>
      `,
    });

    if (result.error) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.data?.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send newsletter",
      },
      { status: 500 }
    );
  }
}