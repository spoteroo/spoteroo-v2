export async function POST(request: Request) {

  const authHeader =
    request.headers.get("authorization");

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  console.log("CRON NEWSLETTER RUNNING");

  try {