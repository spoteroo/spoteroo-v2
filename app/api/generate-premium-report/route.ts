import OpenAI from "openai";
import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  canUseFeature,
  incrementUsage,
} from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const { email } = await requireUser();

    const {
      id,
      title,
      description,
    } = await req.json();

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

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Trend: ${title}

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