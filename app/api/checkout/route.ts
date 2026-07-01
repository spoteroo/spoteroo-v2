import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as
    | "test_mode"
    | "live_mode",
});

export async function POST(request: Request) {
  try {
    const { plan, email } = await request.json();

    console.log("========== DODO CHECKOUT ==========");

    const productId =
      plan === "yearly"
        ? process.env.DODO_YEARLY_PRODUCT_ID
        : process.env.DODO_MONTHLY_PRODUCT_ID;

    if (!productId) {
      console.error("❌ Product ID missing");

      return NextResponse.json(
        {
          error: "Product ID missing",
        },
        {
          status: 500,
        }
      );
    }

    console.log("Plan:", plan);
    console.log("Email:", email);
    console.log("Environment:", process.env.DODO_PAYMENTS_ENVIRONMENT);
    console.log("API Key Exists:", !!process.env.DODO_PAYMENTS_API_KEY);
    console.log(
      "API Key Prefix:",
      process.env.DODO_PAYMENTS_API_KEY?.substring(0, 8)
    );
    console.log("Product ID:", productId);

    const session = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email,
      },
      return_url: process.env.DODO_PAYMENTS_RETURN_URL!,
    });

    console.log("========== DODO SUCCESS ==========");
    console.log(session);

    return NextResponse.json({
      checkout_url: session.checkout_url,
    });
  } catch (error: any) {
    console.error("========== DODO ERROR ==========");
    console.error(error);

    if (error?.message) {
      console.error("Message:", error.message);
    }

    if (error?.status) {
      console.error("Status:", error.status);
    }

    if (error?.response) {
      console.error("Response:", error.response);
    }

    if (error?.body) {
      console.error("Body:", error.body);
    }

    console.error("=================================");

    return NextResponse.json(
      {
        error: error?.message || "Checkout failed",
        details: error,
      },
      {
        status: 500,
      }
    );
  }
}