import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Dodo Webhook is running",
  });
}

export async function POST(request: Request) {
  try {
    const headers = Object.fromEntries(request.headers.entries());
    const body = await request.text();

    console.log("========== DODO WEBHOOK ==========");
    console.log("Headers:");
    console.log(headers);
    console.log("Body:");
    console.log(body);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}