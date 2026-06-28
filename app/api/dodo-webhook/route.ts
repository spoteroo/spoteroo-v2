import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET webhook called");

  return NextResponse.json({
    message: "Dodo Webhook is running",
  });
}

export async function POST(request: Request) {
  console.log("🔥🔥🔥 DODO POST RECEIVED 🔥🔥🔥");

  const body = await request.text();

  console.log("BODY:");
  console.log(body);

  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
}