"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function PricingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState<
    "monthly" | "yearly" | null
  >(null);

  async function startCheckout(
    plan: "monthly" | "yearly",
    checkoutUrl: string
  ) {
    try {
      setLoading(plan);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        router.push("/login");
        return;
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Unable to open checkout.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-10 text-white">
      <h1 className="text-5xl font-bold mb-10 text-center">
        Spoteroo Pro
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Monthly Plan */}

        <div className="glass rounded-2xl p-8 border border-slate-700">
          <h2 className="text-3xl font-bold">
            Monthly
          </h2>

          <p className="text-5xl font-bold mt-4">
            $49
            <span className="text-lg text-gray-400">
              /month
            </span>
          </p>

          <ul className="mt-8 space-y-3 text-gray-300">
            <li>✅ Unlimited AI Reports</li>
            <li>✅ Unlimited Startup Ideas</li>
            <li>✅ Premium Trend Analysis</li>
            <li>✅ Priority Support</li>
          </ul>

          <button
            onClick={() =>
              startCheckout(
                "monthly",
                "https://checkout.dodopayments.com/buy/pdt_0NhBCHTFHfDlJoYBnXcTv?quantity=1&redirect_url=https://spoteroo.com/dashboard"
              )
            }
            disabled={loading !== null}
            className="mt-8 w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 font-semibold transition disabled:opacity-50"
          >
            {loading === "monthly"
              ? "Redirecting..."
              : "Upgrade Monthly"}
          </button>
        </div>

        {/* Yearly Plan */}

        <div className="glass rounded-2xl p-8 border border-green-600 relative">

          <div className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Best Value
          </div>

          <h2 className="text-3xl font-bold">
            Yearly
          </h2>

          <p className="text-5xl font-bold mt-4">
            $490
            <span className="text-lg text-gray-400">
              /year
            </span>
          </p>

          <p className="mt-2 text-green-400 font-semibold">
            Save 2 Months
          </p>

          <ul className="mt-8 space-y-3 text-gray-300">
            <li>✅ Unlimited AI Reports</li>
            <li>✅ Unlimited Startup Ideas</li>
            <li>✅ Premium Trend Analysis</li>
            <li>✅ Priority Support</li>
          </ul>

          <button
            onClick={() =>
              startCheckout(
                "yearly",
                "https://checkout.dodopayments.com/buy/pdt_0NhBa6L4p8lBA35za31WC?quantity=1&redirect_url=https://spoteroo.com/dashboard"
              )
            }
            disabled={loading !== null}
            className="mt-8 w-full rounded-xl bg-green-600 hover:bg-green-700 py-3 font-semibold transition disabled:opacity-50"
          >
            {loading === "yearly"
              ? "Redirecting..."
              : "Upgrade Yearly"}
          </button>

        </div>

      </div>
    </main>
  );
}