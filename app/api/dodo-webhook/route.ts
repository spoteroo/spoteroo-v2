import { NextResponse } from "next/server";
import { upgradeUser, downgradeUser } from "@/lib/subscription";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Dodo webhook is running",
  });
}

export async function POST(request: Request) {
  try {
    console.log("========== DODO WEBHOOK ==========");

    // ------------------------------------------------------------------
    // TODO:
    // Add Dodo webhook signature verification before production.
    // https://docs.dodopayments.com/developer-resources/webhooks
    // ------------------------------------------------------------------

    const payload = await request.json();

    console.log(JSON.stringify(payload, null, 2));

    const event = payload?.type;

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing event type",
        },
        {
          status: 400,
        }
      );
    }

    console.log("Webhook Event:", event);

    const email =
      payload?.data?.customer?.email ??
      payload?.data?.email ??
      null;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer email missing",
        },
        {
          status: 400,
        }
      );
    }

    const customerId =
      payload?.data?.customer?.customer_id ??
      payload?.data?.customer_id ??
      null;

    const subscriptionId =
      payload?.data?.subscription?.subscription_id ??
      payload?.data?.subscription_id ??
      null;

    const subscriptionStatus =
      payload?.data?.status ??
      "active";

    const subscriptionExpiresAt =
      payload?.data?.subscription?.current_period_end ??
      payload?.data?.current_period_end ??
      payload?.data?.expires_at ??
      null;

    //-------------------------------------------------------------------
    // Upgrade Events
    //-------------------------------------------------------------------

    const upgradeEvents = [
      "payment.succeeded",
      "subscription.active",
      "subscription.created",
      "subscription.renewed",
    ];

    //-------------------------------------------------------------------
    // Downgrade Events
    //-------------------------------------------------------------------

    const downgradeEvents = [
      "subscription.cancelled",
      "subscription.expired",
      "subscription.failed",
      "payment.failed",
    ];

    //-------------------------------------------------------------------
    // Upgrade User
    //-------------------------------------------------------------------

    if (upgradeEvents.includes(event)) {
      console.log("Upgrading user:", email);

      await upgradeUser(email);

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          subscription_status: subscriptionStatus,
          dodo_customer_id: customerId,
          dodo_subscription_id: subscriptionId,
          subscription_expires_at: subscriptionExpiresAt,
        })
        .eq("email", email);

      if (error) {
        console.error(error);

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

      console.log("User upgraded.");

      return NextResponse.json({
        success: true,
      });
    }

    //-------------------------------------------------------------------
    // Downgrade User
    //-------------------------------------------------------------------

    if (downgradeEvents.includes(event)) {
      console.log("Downgrading user:", email);

      await downgradeUser(email);

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          subscription_status: subscriptionStatus,
          subscription_expires_at: null,
        })
        .eq("email", email);

      if (error) {
        console.error(error);

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

      console.log("User downgraded.");

      return NextResponse.json({
        success: true,
      });
    }

    //-------------------------------------------------------------------
    // Ignore Unknown Events
    //-------------------------------------------------------------------

    console.log("Ignoring event:", event);

    return NextResponse.json({
      success: true,
      ignored: true,
    });
  } catch (error) {
    console.error("Webhook Error:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Webhook failed",
      },
      {
        status: 500,
      }
    );
  }
}