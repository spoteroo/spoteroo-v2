import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description } = await req.json();

  return NextResponse.json({
  category: "AI",
  score: 95,
  title,
  description,
  reason:
    "AI automation is rapidly growing among SMBs and sales teams, creating strong startup opportunities.",
});}
