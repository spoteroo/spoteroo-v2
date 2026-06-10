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

Generate:

1. Startup Idea
2. Target Customer
3. Revenue Model
4. MVP Plan
`,
  });

  const idea = response.output_text;

const { data, error } = await supabase
  .from("trends")
  .update({
    startup_idea: idea,
  })
  .eq("id", id)
  .select();

return NextResponse.json({
  result: idea,
});
}