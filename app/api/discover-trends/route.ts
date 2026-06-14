import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Generate 5 emerging startup trends.

For each trend generate:

- title
- description
- category
- score
- reason
- startup_idea
- market_analysis
- competitors
- risks

Return JSON array only:

[
 {
   "title":"",
   "description":"",
   "category":"",
   "score":90,
   "reason":"",
   "startup_idea":"",
   "market_analysis":"",
   "competitors":"",
   "risks":""
 }
]
`,
    });

    console.log(response.output_text);

const trends = JSON.parse(response.output_text);

const { error } = await supabase
  .from("trends")
  .insert(trends);

if (error) {
  console.error(error);

  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}

return NextResponse.json({
  success: true,
  inserted: trends.length,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}