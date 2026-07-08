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
      "premium_reports",
      1
    );

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Free plan limit reached. Upgrade to Pro for unlimited Premium Reports.",
        },
        {
          status: 403,
        }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key missing.",
        },
        {
          status: 500,
        }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a senior startup strategist and venture capital analyst. Produce professional, structured reports.",
        },
        {
          role: "user",
          content: `
Trend:
${title}

Description:
${description}

Create a professional startup investment report.

Include:

1. Executive Summary
2. SWOT Analysis
3. TAM / SAM / SOM
4. Competitor Analysis
5. Revenue Models
6. Go-To-Market Strategy
7. Funding Potential
8. Exit Opportunities
9. Risks
10. Recommendation
`,
        },
      ],
    });

    const report = response.output_text ?? "";

    const { error } = await supabaseAdmin
      .from("trends")
      .update({
        premium_report: report,
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
      "premium_reports"
    );

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate premium report.",
      },
      {
        status: 500,
      }
    );
  }
}