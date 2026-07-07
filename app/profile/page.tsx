/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ProfilePage() {
  const supabase = createClient();
  
  const [email, setEmail] = useState("");

  const [plan, setPlan] = useState("pro");

  const [favorites, setFavorites] = useState(0);

  const [usageToday, setUsageToday] = useState(0);

  const [
    startupIdeasRemaining,
    setStartupIdeasRemaining,
  ] = useState(0);

  const [
    premiumReportsRemaining,
    setPremiumReportsRemaining,
  ] = useState(0);

  const [
    subscriptionExpiry,
    setSubscriptionExpiry,
  ] = useState("N/A");

  const [
    subscriptionStatus,
    setSubscriptionStatus,
  ] = useState("Inactive");

  const loadProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email ?? "");

   const { data: profile } = await supabase
  .from("profiles")
  .select("plan, subscription_expires_at, subscription_status")
  .eq("email", user.email)
  .single();

    if (profile) {
      setPlan(profile.plan);

      setSubscriptionStatus(
        profile.subscription_status ??
          "Inactive"
      );

      if (profile.subscription_expires_at) {
        setSubscriptionExpiry(
          new Date(
            profile.subscription_expires_at
          ).toLocaleDateString()
        );
      }
    }

    const usageResponse = await fetch("/api/usage");

    if (usageResponse.ok) {
      const usage =
        await usageResponse.json();

      setStartupIdeasRemaining(
        usage.startupIdeasRemaining
      );

      setPremiumReportsRemaining(
        usage.premiumReportsRemaining
      );
    }

    const { data: favs } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_email", user.email);

    setFavorites(favs?.length ?? 0);

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const { data: usageRows } =
      await supabase
        .from("ai_usage")
        .select("count")
        .eq("email", user.email)
        .eq("usage_date", today);

    setUsageToday(
      usageRows?.reduce(
        (sum, row) => sum + row.count,
        0
      ) ?? 0
    );
  }, []);

    useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <main className="min-h-screen text-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10">
          My Profile
        </h1>

        <div className="glass rounded-2xl p-6 sm:p-8">

          {/* Email */}

          <div className="mb-8">
            <p className="text-slate-400">
              Email
            </p>

            <p className="text-lg sm:text-xl mt-2 break-words">
              {email}
            </p>
          </div>

          {/* Current Plan */}

          <div className="mb-8">
            <p className="text-slate-400">
              Current Plan
            </p>

            <span
  className={`
    inline-block
    mt-2
    rounded-full
    px-4
    py-2
    text-sm
    font-semibold

    ${
      plan === "pro"
        ? "bg-green-500/20 text-green-400 border border-green-500/30"
        : "bg-slate-700 text-slate-300 border border-slate-600"
    }
  `}
>
  {plan.toUpperCase()}
</span>
          </div>

          {/* Subscription Status */}

          <div className="mb-8">
            <p className="text-slate-400">
              Subscription Status
            </p>

            <p
              className={`text-xl font-semibold mt-2 ${
                subscriptionStatus === "active"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {subscriptionStatus}
            </p>
          </div>

          {/* Saved Trends */}

          <div className="mb-8">
            <p className="text-slate-400">
              Saved Trends
            </p>

            <p className="text-xl">
              {favorites}
            </p>
          </div>

          {/* AI Usage */}

          <div className="border-t border-slate-700 pt-8">

            <h2 className="text-2xl font-bold mb-6">
              AI Usage
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  AI Usage Today
                </p>

                <p className="text-2xl sm:text-3xl font-bold mt-2 break-words">
                  {usageToday}
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  Startup Ideas Remaining
                </p>

                <p className="text-2xl sm:text-3xl font-bold mt-2 break-words">
                  {plan === "pro"
                    ? "Unlimited"
                    : startupIdeasRemaining}
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  Premium Reports Remaining
                </p>

                <p className="text-2xl sm:text-3xl font-bold mt-2 break-words">
                  {plan === "pro"
                    ? "Unlimited"
                    : premiumReportsRemaining}
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  Subscription Expires
                </p>

                <p className="text-lg sm:text-xl mt-2 break-words">
                  {plan === "pro"
                    ? subscriptionExpiry
                    : "Free Plan"}
                </p>
              </div>

            </div>

          </div>

          {/* Upgrade Button */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            {plan !== "pro" ? (
              <button
                onClick={() => {
                  window.location.href = "/pricing";
                }}
                className="
  w-full
  sm:w-auto
  bg-blue-600
  hover:bg-blue-700
  px-8
  py-4
  rounded-xl
  transition
"
              >
                Upgrade to Pro
              </button>
            ) : (
              <button
  onClick={async () => {
    try {
      const response = await fetch(
        "/api/billing",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ??
            "Unable to open billing portal."
        );
        return;
      }

      window.location.href =
        result.url;
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to open billing portal."
      );
    }
  }}
  className="
  w-full
  sm:w-auto
  bg-slate-700
  hover:bg-slate-600
  px-8
  py-4
  rounded-xl
  transition
"
>
  Manage Subscription
</button>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}