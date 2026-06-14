import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { id, title, description } = await req.json();

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
      competitors: competitors,
      risks: risks,
    })
    .eq("id", id)
    .select();

  console.log("UPDATE DATA:", data);
  console.log("UPDATE ERROR:", error);

  return NextResponse.json({
    result: startupIdea,
  });
}