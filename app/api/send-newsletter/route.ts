import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const resend = new Resend(
  process.env.RESEND_API_KEY!
);

export async function POST(request: Request) {
 console.info("Newsletter job started");

  try {
    const authHeader = request.headers.get("authorization");

if (
  authHeader !==
  `Bearer ${process.env.CRON_SECRET}`
) {
  return NextResponse.json(
    {
      error: "Unauthorized",
    },
    {
      status: 401,
    }
  );
}
    const {
      data: subscribers,
      error: subscribersError,
    } = await supabase
      .from("subscribers")
      .select("email");

    if (subscribersError) {
      return NextResponse.json(
        {
          error: subscribersError.message,
        },
        {
          status: 500,
        }
      );
    }

    console.log("Subscribers:", subscribers);

    const emails =
      subscribers?.map((subscriber) => subscriber.email) ?? [];

    if (emails.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No subscribers found",
        },
        {
          status: 400,
        }
      );
    }

    const { data: trends } = await supabase
      .from("trends")
      .select("title, description, score")
      .order("score", {
        ascending: false,
      })
      .limit(5);

    const trendText =
      trends
        ?.map(
          (trend) =>
            `${trend.title}: ${trend.description}`
        )
        .join("\n\n") ?? "";

    const aiResponse =
      await openai.responses.create({
        model: "gpt-4.1-mini",
        input: `
Create a professional startup trends newsletter.

Use these trends:

${trendText}

Return HTML only.

Include:

- Eye-catching title
- Short introduction
- One section for each trend
- Closing paragraph encouraging readers to visit Spoteroo
`,
      });

    const newsletterHtml =
      aiResponse.output_text ??
      "<h1>No content generated</h1>";

    console.log("Sending newsletter to:", emails);

    const result =
      await resend.emails.send({
        from: "newsletter@spoteroo.com",
        to: emails,
        subject:
          "🚀 Spoteroo Weekly Startup Trends",
        html: newsletterHtml,
      });

    console.log("Resend Result:", result);

    if (result.error) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.data?.id,
    });
  } catch (error) {
    console.error("Newsletter Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send newsletter",
      },
      {
        status: 500,
      }
    );
  }
}