import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET webhook called");

  return NextResponse.json({
    message: "Dodo Webhook is running",
  });
}

export async function POST(request: Request) {
  console.log("========== DODO WEBHOOK ==========");

  const headers = Object.fromEntries(request.headers.entries());
  console.log("HEADERS:");
  console.log(JSON.stringify(headers, null, 2));

  const body = await request.text();

  console.log("BODY:");
  console.log(body);

  return Response.json({ success: true });
}