import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

console.log("PREMIUM REPORT API HIT");

export async function POST(req: Request) {
  const {
    id,
    title,
    description,
    email,
  } = await req.json();

  console.log("EMAIL RECEIVED:", email);

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("email", email)
    .single();

    console.log("PROFILE FOUND:", profile);

  if (!profile || profile.plan !== "pro") {
    return NextResponse.json(
      { error: "Pro required" },
      { status: 403 }
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log("CALLING OPENAI...");

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

console.log("REPORT LENGTH:", report?.length);
console.log("REPORT PREVIEW:", report?.slice(0, 200));

console.log("SAVING REPORT...");

const { error } = await supabase
  .from("trends")
  .update({
    premium_report: report,
  })
  .eq("id", id);

console.log("UPDATE ERROR:", error);

return NextResponse.json({
  success: true,
  reportLength: report?.length,
});
}