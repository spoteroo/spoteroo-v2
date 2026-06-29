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

    console.log("Event Type:", event);

    if (
      event === "subscription.active" ||
      event === "payment.succeeded"
    ) {
      console.log("ENTERED UPDATE BLOCK");

      const email = payload.data.customer.email;
      const customerId = payload.data.customer.customer_id;
      const subscriptionId = payload.data.subscription_id;
      const status = payload.data.status;

      console.log("Webhook Email:", email);
      console.log("Customer ID:", customerId);
      console.log("Subscription ID:", subscriptionId);
      console.log("Status:", status);

      const { data, error } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: "pro",
          subscription_status: status,
          dodo_customer_id: customerId,
          dodo_subscription_id: subscriptionId,
        })
        .eq("email", email)
        .select();

      console.log("========== SUPABASE UPDATE ==========");
      console.log("Updated Rows:", data);
      console.log("Supabase Error:", error);

      if (error) {
        console.error("Supabase Update Failed:", error);

        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          {
            status: 500,
          }
        );
      }

      if (!data || data.length === 0) {
        console.log("⚠️ No profile found for email:", email);
      } else {
        console.log("✅ Profile upgraded:", email);
      }
    } else {
      console.log("Ignoring event:", event);
    }

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