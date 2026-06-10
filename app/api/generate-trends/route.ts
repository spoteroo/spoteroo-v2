import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "user",
            content: `
Generate 10 emerging AI startup trends.

Return JSON:

{
  "trends": [
    {
  "title": "",
  "description": "",
  "category": "",
  "score": 95,
  "reason": "",
  "analysis": "",
  "opportunity": "",
  "risks": ""
}
  ]
}
`,
          },
        ],
      });

    const data = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    return NextResponse.json({
      success: true,
      trends: data.trends || [],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}