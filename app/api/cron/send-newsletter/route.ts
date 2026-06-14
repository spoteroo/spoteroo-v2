import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  const authHeader =
    request.headers.get("authorization");

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  console.log(
    "CRON NEWSLETTER RUNNING"
  );

  try {
    const {
      data: subscribers,
      error,
    } = await supabase
      .from("subscribers")
      .select("email");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const emails =
      subscribers?.map(
        (s) => s.email
      ) || [];

    if (emails.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No subscribers found",
        },
        { status: 400 }
      );
    }

    const { data: trends } =
      await supabase
        .from("trends")
        .select(
          "title, description, score"
        )
        .order("score", {
          ascending: false,
        })
        .limit(5);

    const trendText =
      trends
        ?.map(
          (t) =>
            `${t.title}: ${t.description}`
        )
        .join("\n\n") || "";

    const aiResponse =
      await openai.responses.create({
        model: "gpt-4.1-mini",

        input: `
Create a professional startup trends newsletter.

Use these trends:

${trendText}

Return clean HTML only.

Include:
- Newsletter title
- Introduction
- One section per trend
- Closing paragraph
`,
      });

    const newsletterHtml =
      aiResponse.output_text;

    console.log(
      "Subscribers:",
      emails
    );

    console.log(
      "Generated newsletter"
    );

    const result =
      await resend.emails.send({
        from:
          "newsletter@spoteroo.com",
        to: emails,
        subject:
          "🚀 Spoteroo Weekly Trends",
        html: newsletterHtml,
      });

    console.log(
      "Resend result:",
      result
    );

    if (result.error) {
      return NextResponse.json(
        {
          success: false,
          error:
            result.error.message,
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
        error:
          "Failed to send newsletter",
      },
      { status: 500 }
    );
  }
}