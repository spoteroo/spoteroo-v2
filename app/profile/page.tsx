/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [favorites, setFavorites] = useState(0);

  // Temporary values
  const [usageToday] = useState(0);
  const [startupIdeasRemaining] = useState(3);
  const [premiumReportsRemaining] = useState(1);
  const [subscriptionExpiry] = useState("Unlimited");

  const loadProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email ?? "");

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, subscription_expires")
      .eq("email", user.email)
      .single();

    if (profile) {
      setPlan(profile.plan);
    }

    const { data: favs } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_email", user.email);

    setFavorites(favs?.length ?? 0);
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          My Profile
        </h1>

        <div className="glass p-8 rounded-2xl">

          {/* Email */}

          <div className="mb-8">
            <p className="text-slate-400">
              Email
            </p>

            <p className="text-xl mt-2">
              {email}
            </p>
          </div>

          {/* Current Plan */}

          <div className="mb-8">
            <p className="text-slate-400">
              Current Plan
            </p>

            <p className="text-xl capitalize font-semibold">
              {plan}
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

            <div className="grid md:grid-cols-2 gap-6">

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  AI Usage Today
                </p>

                <p className="text-3xl font-bold mt-2">
                  {usageToday}
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  Startup Ideas Remaining
                </p>

                <p className="text-3xl font-bold mt-2">
                  {plan === "pro"
                    ? "Unlimited"
                    : startupIdeasRemaining}
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  Premium Reports Remaining
                </p>

                <p className="text-3xl font-bold mt-2">
                  {plan === "pro"
                    ? "Unlimited"
                    : premiumReportsRemaining}
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <p className="text-slate-400">
                  Subscription Expires
                </p>

                <p className="text-xl mt-2">
                  {plan === "pro"
                    ? subscriptionExpiry
                    : "Free Plan"}
                </p>
              </div>

            </div>

          </div>

          {/* Upgrade Button */}

          {plan !== "pro" && (
            <div className="mt-10 text-center">

              <button
                onClick={() => {
                  window.location.href = "/pricing";
                }}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                "
              >
                Upgrade to Pro
              </button>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}