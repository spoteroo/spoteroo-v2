import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  return NextResponse.json({
    message: "Dodo Webhook is running",
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("========== DODO WEBHOOK ==========");
    console.log(JSON.stringify(payload, null, 2));

    const event = payload.type;

    if (
      event === "subscription.active" ||
      event === "payment.succeeded"
    ) {
      const email = payload.data.customer.email;
      const customerId = payload.data.customer.customer_id;
      const subscriptionId = payload.data.subscription_id;
      const status = payload.data.status;

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: "pro",
          subscription_status: status,
          dodo_customer_id: customerId,
          dodo_subscription_id: subscriptionId,
        })
        .eq("email", email);

      if (error) {
        console.error(error);

        return NextResponse.json(
          {
            success: false,
          },
          {
            status: 500,
          }
        );
      }

      console.log("Profile upgraded:", email);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

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