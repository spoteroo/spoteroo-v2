import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/discover-trends`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CRON_SECRET}`,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}