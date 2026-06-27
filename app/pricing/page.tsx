"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PricingPage() {
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);

  async function handleCheckout(plan: "monthly" | "yearly") {
    try {
      setLoading(plan);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.checkout_url;
    } catch (error) {
      console.error(error);
      alert("Unable to start checkout.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-10">
        Spoteroo Pro
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">Monthly</h2>

          <p className="text-4xl mt-4">$49</p>

          <p className="mt-4 text-gray-400">
            Unlimited AI Reports
            <br />
            Unlimited Startup Ideas
            <br />
            Premium Trend Analysis
            <br />
            Priority Support
          </p>

          <button
            onClick={() => handleCheckout("monthly")}
            disabled={loading !== null}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold disabled:opacity-50"
          >
            {loading === "monthly"
              ? "Redirecting..."
              : "Upgrade Monthly"}
          </button>
        </div>

        <div className="border rounded-xl p-6">

          <h2 className="text-2xl font-bold">
            Yearly
          </h2>

          <p className="text-4xl mt-4">
            $490
          </p>

          <p className="mt-4 text-gray-400">
            Save 2 Months
            <br />
            Unlimited AI Reports
            <br />
            Unlimited Startup Ideas
            <br />
            Premium Trend Analysis
          </p>

          <button
            onClick={() => handleCheckout("yearly")}
            disabled={loading !== null}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 rounded-lg py-3 font-semibold disabled:opacity-50"
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