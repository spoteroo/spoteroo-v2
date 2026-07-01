import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  canUseFeature,
  incrementUsage,
} from "@/lib/subscription";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const {
      id,
      title,
      description,
      email,
    } = await req.json();

    // Check free/pro limits
    const allowed = await canUseFeature(
      email,
      "startup_ideas",
      3
    );

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Free plan limit reached. Upgrade to Pro for unlimited Startup Ideas.",
        },
        {
          status: 403,
        }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Trend: ${title}

Description:
${description}

Return EXACTLY in this format:

STARTUP_IDEA:
(detailed startup opportunity)

MARKET_ANALYSIS:
(market size and growth potential)

COMPETITORS:
(main competitors)

RISKS:
(main risks)
`,
    });

    const output = response.output_text;

    const startupIdea =
      output
        .split("MARKET_ANALYSIS:")[0]
        .replace("STARTUP_IDEA:", "")
        .trim();

    const marketAnalysis =
      output
        .split("MARKET_ANALYSIS:")[1]
        ?.split("COMPETITORS:")[0]
        ?.trim() || "";

    const competitors =
      output
        .split("COMPETITORS:")[1]
        ?.split("RISKS:")[0]
        ?.trim() || "";

    const risks =
      output
        .split("RISKS:")[1]
        ?.trim() || "";

    const { data, error } = await supabase
      .from("trends")
      .update({
        startup_idea: startupIdea,
        market_analysis: marketAnalysis,
        competitors,
        risks,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    // Increment daily usage for free users
    await incrementUsage(
      email,
      "startup_ideas"
    );

    return NextResponse.json({
      success: true,
      result: startupIdea,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate startup idea.",
      },
      {
        status: 500,
      }
    );
  }
}