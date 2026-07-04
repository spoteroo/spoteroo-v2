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
    const body = await request.json();

    const plan = body.plan;
    const email = body.email;

    //-------------------------------------------------------
    // Validation
    //-------------------------------------------------------

    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      plan !== "monthly" &&
      plan !== "yearly"
    ) {
      return NextResponse.json(
        {
          error: "Invalid plan.",
        },
        {
          status: 400,
        }
      );
    }

    //-------------------------------------------------------
    // Product
    //-------------------------------------------------------

    const productId =
      plan === "yearly"
        ? process.env.DODO_YEARLY_PRODUCT_ID
        : process.env.DODO_MONTHLY_PRODUCT_ID;

    if (!productId) {
      throw new Error(
        `Missing product id for ${plan}`
      );
    }

    if (!process.env.DODO_PAYMENTS_RETURN_URL) {
      throw new Error(
        "Missing DODO_PAYMENTS_RETURN_URL"
      );
    }

    console.log("========== CHECKOUT ==========");
    console.log({
      email,
      plan,
      productId,
    });

    //-------------------------------------------------------
    // Create Checkout Session
    //-------------------------------------------------------

    const session =
      await client.checkoutSessions.create({
        product_cart: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
        customer: {
          email,
        },
        return_url:
          process.env.DODO_PAYMENTS_RETURN_URL,
      });

    if (!session.checkout_url) {
      throw new Error(
        "Checkout URL not returned."
      );
    }

    console.log("Checkout Created");

    return NextResponse.json({
      success: true,
      checkout_url: session.checkout_url,
    });
  } catch (error) {
    console.error("Checkout Error");
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Checkout failed";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}