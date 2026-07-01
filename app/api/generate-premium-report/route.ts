import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    console.log("========== PREMIUM REPORT API HIT ==========");

    const { id, title, description, email } = await req.json();

    console.log("Trend ID:", id);
    console.log("Email:", email);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("plan")
      .eq("email", email)
      .single();

    if (profileError) {
      console.error("PROFILE ERROR:", profileError);

      return NextResponse.json(
        {
          error: "Unable to verify subscription.",
        },
        {
          status: 500,
        }
      );
    }

    console.log("PROFILE FOUND:", profile);

    if (!profile || profile.plan !== "pro") {
      return NextResponse.json(
        {
          error: "Pro subscription required.",
        },
        {
          status: 403,
        }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log("Generating premium report...");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Trend: ${title}

Description:
${description}

Create a detailed startup investment report.

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
10. Overall Recommendation
`,
    });

    const report = response.output_text;

    console.log("Report generated.");
    console.log("Length:", report?.length);

    const { error: updateError } = await supabase
      .from("trends")
      .update({
        premium_report: report,
      })
      .eq("id", id);

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);

      return NextResponse.json(
        {
          error: "Failed to save report.",
        },
        {
          status: 500,
        }
      );
    }

    console.log("Premium report saved successfully.");

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("PREMIUM REPORT ERROR:", error);

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