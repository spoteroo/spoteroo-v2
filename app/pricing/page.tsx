"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PricingPage() {
  const supabase = createClient();

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
      console.error(error);
      alert("Unable to open checkout.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-10 text-white">

      {/* Hero */}

      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Spoteroo Pro
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
          Unlock unlimited AI startup ideas,
          premium reports, market analysis,
          and advanced opportunity discovery.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-300">
  <span className="glass px-4 py-2 rounded-full">
    ✓ Cancel Anytime
  </span>

  <span className="glass px-4 py-2 rounded-full">
    ✓ Secure Payments
  </span>

  <span className="glass px-4 py-2 rounded-full">
    ✓ Instant Access
  </span>
</div>
      </section>

      {/* Pricing Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Monthly */}

        <div className="glass rounded-2xl p-8 border border-slate-700">

          <h2 className="text-2xl sm:text-3xl font-bold">
            Monthly
          </h2>

          <p className="text-4xl sm:text-5xl font-bold mt-5">
            $49
            <span className="text-lg text-slate-400">
              /month
            </span>
          </p>

          <ul className="space-y-3 mt-8 text-slate-300">

            <li>✅ Unlimited Startup Ideas</li>

            <li>✅ Unlimited Premium Reports</li>

            <li>✅ AI Market Analysis</li>

            <li>✅ AI Competitor Analysis</li>

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
            className="mt-10 w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-semibold transition disabled:opacity-50"
          >
            {loading === "monthly"
              ? "Redirecting..."
              : "Upgrade Monthly"}
          </button>

        </div>

        {/* Yearly */}

        <div className="glass rounded-2xl p-8 border border-green-600 relative">

          <div className="absolute top-4 right-4 rounded-full bg-green-600 px-3 py-1 text-xs sm:px-4 sm:text-sm">
            Best Value
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold">
            Yearly
          </h2>

          <p className="text-4xl sm:text-5xl font-bold mt-5">
            $490
            <span className="text-lg text-slate-400">
              /year
            </span>
          </p>

          <p className="text-green-400 mt-2 font-semibold">
            Save 2 Months
          </p>

          <ul className="space-y-3 mt-8 text-slate-300">

            <li>✅ Unlimited Startup Ideas</li>

            <li>✅ Unlimited Premium Reports</li>

            <li>✅ AI Market Analysis</li>

            <li>✅ AI Competitor Analysis</li>

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
            className="mt-10 w-full bg-green-600 hover:bg-green-700 rounded-xl py-4 font-semibold transition disabled:opacity-50"
          >
            {loading === "yearly"
              ? "Redirecting..."
              : "Upgrade Yearly"}
          </button>

        </div>

      </div>

      {/* Feature Comparison */}

      <section className="mt-24">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Feature Comparison
        </h2>

        <div className="glass rounded-2xl overflow-x-auto">

          <table className="min-w-[600px] w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-5">
                  Feature
                </th>

                <th className="p-5">
                  Free
                </th>

                <th className="p-5">
                  Pro
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t border-slate-700">

                <td className="p-5">
                  Startup Ideas
                </td>

                <td className="text-center">
                  3/day
                </td>

                <td className="text-center">
                  Unlimited
                </td>

              </tr>

              <tr className="border-t border-slate-700">

                <td className="p-5">
                  Premium Reports
                </td>

                <td className="text-center">
                  1/day
                </td>

                <td className="text-center">
                  Unlimited
                </td>

              </tr>

              <tr className="border-t border-slate-700">

                <td className="p-5">
                  Priority Support
                </td>

                <td className="text-center">
                  —
                </td>

                <td className="text-center">
                  ✓
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

      {/* FAQ */}

      <section className="mt-24">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">

          <div className="glass p-6 rounded-xl">
            <h3 className="font-bold text-xl">
              Can I cancel anytime?
            </h3>

            <p className="mt-3 text-slate-400">
              Yes. You can cancel your subscription whenever you want.
            </p>
          </div>

          <div className="glass p-6 rounded-xl">
            <h3 className="font-bold text-xl">
              Is there a free plan?
            </h3>

            <p className="mt-3 text-slate-400">
              Yes. Spoteroo includes a free plan with daily AI limits.
            </p>
          </div>

          <div className="glass p-6 rounded-xl">
            <h3 className="font-bold text-xl">
              Is payment secure?
            </h3>

            <p className="mt-3 text-slate-400">
              Yes. All payments are securely processed through Dodo Payments.
            </p>
          </div>

        </div>

      </section>

      {/* Testimonials */}

      <section className="mt-24">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          What Early Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="glass p-6 rounded-xl">
            <p className="italic text-slate-300">
              "Spoteroo helped me discover trends much earlier than I expected."
            </p>

            <p className="mt-5 font-semibold">
              — Early Founder
            </p>
          </div>

          <div className="glass p-6 rounded-xl">
            <p className="italic text-slate-300">
              "The AI reports saved hours of research every week."
            </p>

            <p className="mt-5 font-semibold">
              — Startup Builder
            </p>
          </div>

          <div className="glass p-6 rounded-xl">
            <p className="italic text-slate-300">
              "A valuable tool for discovering new market opportunities."
            </p>

            <p className="mt-5 font-semibold">
              — Beta User
            </p>
          </div>

        </div>

      </section>

      {/* Trust Badges */}

      <section className="mt-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="glass rounded-xl p-6 text-center">
            🛡️ 30-Day Money Back Guarantee
          </div>

          <div className="glass rounded-xl p-6 text-center">
            🔒 Secure Checkout Powered by Dodo Payments
          </div>

        </div>

      </section>

    </main>
  );
}