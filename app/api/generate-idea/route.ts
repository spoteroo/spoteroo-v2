import OpenAI from "openai";
import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  canUseFeature,
  incrementUsage,
} from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { email } = await requireUser();

    const body = await req.json();

    const id = body.id;
    const title = body.title?.trim();
    const description = body.description?.trim();

    if (!id || !title || !description) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const allowed = await canUseFeature(
  email,
  "startup_ideas",
  5
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

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      temperature: 0.7,
      max_output_tokens: 1200,
      input: [
        {
          role: "system",
          content:
            "You are an expert startup analyst. Always follow the requested output format exactly.",
        },
        {
          role: "user",
          content: `
Trend:
${title}

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
        },
      ],
    });

    const output = response.output_text ?? "";

    const startupIdea = output
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

    const { error } = await supabaseAdmin
      .from("trends")
      .update({
        startup_idea: startupIdea,
        market_analysis: marketAnalysis,
        competitors,
        risks,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    await incrementUsage(
      email,
      "startup_ideas"
    );

    return NextResponse.json({
      success: true,
      result: startupIdea,
      marketAnalysis,
      competitors,
      risks,
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