import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const productId =
      body.plan === "yearly"
        ? process.env.DODO_YEARLY_PRODUCT_ID
        : process.env.DODO_MONTHLY_PRODUCT_ID;

    return NextResponse.json({
      success: true,
      productId,
    });
  } catch {
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}