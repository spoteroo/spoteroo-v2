"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [email, setEmail] =
    useState("");

  const [plan, setPlan] =
    useState("free");

  const [favorites, setFavorites] =
    useState(0);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email || "");

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("plan")
        .eq("email", user.email)
        .single();

    if (profile) {
      setPlan(profile.plan);
    }

    const { data: favs } =
      await supabase
        .from("favorites")
        .select("*")
        .eq(
          "user_email",
          user.email
        );

    setFavorites(
      favs?.length || 0
    );
  }

  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          My Profile
        </h1>

        <div className="glass p-8">

          <div className="mb-6">
            <p className="text-slate-400">
              Email
            </p>

            <p className="text-xl">
              {email}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-slate-400">
              Current Plan
            </p>

            <p className="text-xl">
              {plan}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-slate-400">
              Saved Trends
            </p>

            <p className="text-xl">
              {favorites}
            </p>
          </div>

          {plan !== "pro" && (
            <button
              onClick={() =>
                window.location.href =
                  "/pricing"
              }
              className="
                bg-blue-600
                px-6 py-3
                rounded-xl
              "
            >
              Upgrade to Pro
            </button>
          )}

        </div>
      </div>
    </main>
  );
}