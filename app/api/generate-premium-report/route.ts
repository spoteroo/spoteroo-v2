import OpenAI from "openai";
import { NextResponse } from "next/server";
import { buildPremiumPrompt } from "./prompt";
import { parsePremiumReport } from "./parser";

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
        "You are Spoteroo AI. Return only valid JSON that matches the requested schema.",
    },
    {
      role: "user",
      content: buildPremiumPrompt(
        title,
        description
      ),
    },
  ],
});

    const output = response.output_text ?? "";

const parsed = parsePremiumReport(output);

const report = parsed.premiumReport;

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