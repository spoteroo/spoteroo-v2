import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();

  console.log("Dodo Webhook");
  console.log(body);

  return NextResponse.json({
    success: true,
  });
}

export async function GET() {
  return NextResponse.json({
    message: "Dodo Webhook is running",
  });
}