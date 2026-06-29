import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { plan, email } = await request.json();

    if (!plan || !email) {
      return NextResponse.json(
        { error: "Missing plan or email" },
        { status: 400 }
      );
    }

    const productId =
      plan === "yearly"
        ? process.env.DODO_YEARLY_PRODUCT_ID
        : process.env.DODO_MONTHLY_PRODUCT_ID;

    if (!productId) {
      return NextResponse.json(
        { error: "Product not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.dodopayments.com/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_cart: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
        customer: {
          email,
        },
        return_url: process.env.DODO_PAYMENTS_RETURN_URL,
      }),
    });

   const data = await response.json();

console.log("========== DODO RESPONSE ==========");
console.log("Status:", response.status);
console.log(JSON.stringify(data, null, 2));

if (!response.ok) {
  return NextResponse.json(
    {
      error: data,
    },
    {
      status: response.status,
    }
  );
}

    return NextResponse.json({
      checkout_url: data.checkout_url,
    });
  } 
  catch (error: any) {
  console.error("CHECKOUT ERROR");
  console.error(error);

  return NextResponse.json(
    {
      error: error.message,
    },
    {
      status: 500,
    }
  );
}