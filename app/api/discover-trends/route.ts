import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    // ------------------------------------------------
    // Secure the endpoint
    // ------------------------------------------------

    const authHeader = request.headers.get("authorization");

    if (
      authHeader !==
      `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ------------------------------------------------
    // Generate Trends
    // ------------------------------------------------

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Generate 5 emerging startup trends with strong commercial potential.

For EACH trend generate:

- title
- description
- category
- score (0-100)
- reason
- startup_idea
- market_analysis
- competitors
- risks

Opportunity Intelligence:

- opportunity_score (0-100)
- momentum (Low, Medium, High, Explosive)
- investment_rating (A+, A, B+, B, C)
- competition_level (Low, Medium, High)
- market_size (Small, Medium, Large, Huge)

Forecasting:

- forecast_30d (integer %)
- forecast_90d (integer %)
- forecast_1y (integer %)
- success_probability (0-100)
- unicorn_potential (0-100)

Return ONLY valid JSON.

Example:

[
  {
    "title":"AI Lawyers",
    "description":"...",
    "category":"AI",
    "score":95,
    "reason":"...",
    "startup_idea":"...",
    "market_analysis":"...",
    "competitors":"...",
    "risks":"...",
    "opportunity_score":96,
    "momentum":"Explosive",
    "investment_rating":"A+",
    "competition_level":"Medium",
    "market_size":"Huge",
    "forecast_30d":12,
    "forecast_90d":31,
    "forecast_1y":74,
    "success_probability":91,
    "unicorn_potential":76
  }
]
`,
    });

    let trends: any[] = [];

    try {
      trends = JSON.parse(response.output_text ?? "[]");
    } catch {
      return NextResponse.json(
        {
          error: "OpenAI returned invalid JSON.",
        },
        {
          status: 500,
        }
      );
    }

    let inserted = 0;

    for (const trend of trends) {
      if (
        !trend.title ||
        !trend.description
      ) {
        continue;
      }

      // --------------------------------------------
      // Duplicate Protection
      // --------------------------------------------

      const { data: existing } =
        await supabaseAdmin
          .from("trends")
          .select("id")
          .ilike("title", trend.title)
          .maybeSingle();

      if (existing) {
        continue;
      }

      const { error } =
        await supabaseAdmin
          .from("trends")
          .insert({
            title: trend.title,
            description:
              trend.description,
            category: trend.category,
            score: trend.score,
            reason: trend.reason,
            startup_idea:
              trend.startup_idea,
            market_analysis:
              trend.market_analysis,
            competitors:
              trend.competitors,
            risks: trend.risks,
          });

      if (!error) {
        inserted++;
      }
    }

    return NextResponse.json({
      success: true,
      generated: trends.length,
      inserted,
    });

  } catch (error) {
    console.error(
      "Trend Discovery Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to discover trends.",
      },
      {
        status: 500,
      }
    );
  }
}