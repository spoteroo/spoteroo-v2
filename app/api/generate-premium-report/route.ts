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
      "premium_reports",
      2
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

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Trend: ${title}

Description:
${description}

Create a detailed startup investment report.

Include:

1. SWOT Analysis
2. TAM SAM SOM
3. Competitor Analysis
4. Revenue Models
5. Go To Market Strategy
6. Funding Potential
7. Exit Opportunities
`,
    });

    const report = response.output_text;

    const { error } = await supabase
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

    // Track usage
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