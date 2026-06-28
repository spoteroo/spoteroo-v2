import { NextResponse } from "next/server";

export async function GET() {
  console.error("GET webhook called");

  return NextResponse.json({
    message: "Dodo Webhook is running",
  });
}

export async function POST(request: Request) {
  console.error("========== WEBHOOK RECEIVED ==========");

  try {
    const body = await request.text();

    console.error("BODY:");
    console.error(body);

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}