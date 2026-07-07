"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type GeneratedTrend = {
  title: string;
  description: string;
  category: string;
  score: number;
  reason: string;
};

export default function AdminPage() {
  const supabase = createClient();
  
  const router = useRouter();

  const [generatedTrends, setGeneratedTrends] =
    useState<GeneratedTrend[]>([]);

    const [checkingAuth, setCheckingAuth] =
  useState(true);

    const categories = [
  "All",
  ...new Set(
    generatedTrends.map(
      (trend) => trend.category
    )
  ),
];

  useEffect(() => {
  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const { data } = await supabase
      .from("admins")
      .select("email")
      .eq("email", user.email)
      .single();

    if (!data) {
      router.replace("/");
      return;
    }

    setCheckingAuth(false);
  }

  checkAdmin();
}, [router]);

  async function sendNewsletter() {
    try {
      const response = await fetch("/api/send-newsletter", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Newsletter sent!");
      } else {
        toast.error(result.error || "Failed to send newsletter");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send newsletter");
    }
  }

  async function generateTrends() {
    try {
      const response = await fetch("/api/generate-trends", {
        method: "POST",
      });

      const result = await response.json();

      if (!result.success) {
        toast.error("Generation failed");
        return;
      }

      const trends: GeneratedTrend[] =
        result.trends ?? [];

      setGeneratedTrends(trends);

      await fetch("/api/save-trends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trends,
        }),
      });

      toast.success(
  `${trends.length} trends generated and saved.`
);
    } catch (error) {
  console.error(error);
  toast.error("Generation failed");
}
  }

  async function logout() {
  await supabase.auth.signOut();
  router.push("/login");
}

  if (checkingAuth) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <p className="text-xl">Checking permissions...</p>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Admin Dashboard
          </h1>


          <button
            onClick={logout}
            className="
rounded-xl
bg-red-600
px-5
py-3
transition
hover:bg-red-500
"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={sendNewsletter}
            className="glass px-6 py-3 rounded-xl hover:border hover:border-green-500 transition"
          >
            Send Newsletter
          </button>

          <button
            onClick={generateTrends}
            className="glass px-6 py-3 rounded-xl hover:border hover:border-blue-500 transition"
          >
Generate AI Trends
          </button>
        </div>

       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

<p className="mb-6 text-slate-400">
AI-generated startup opportunities ready for review and publishing.
</p>

  <div className="glass p-6 rounded-2xl">

    <p className="text-slate-400 text-sm">
      Generated Trends
    </p>

    <h3 className="text-4xl font-bold mt-2">
      {generatedTrends.length}
    </h3>
  </div>

  <div className="glass p-6 rounded-2xl">
    <p className="text-slate-400 text-sm">
  Categories
</p>

<h3 className="text-4xl font-bold mt-2">
  {categories.length - 1}
</h3>
  </div>

  <div className="glass p-6 rounded-2xl">
    <p className="text-slate-400 text-sm">
      Selected
    </p>

    <h3 className="text-4xl font-bold mt-2">
      0
    </h3>
  </div>

  <div className="glass p-6 rounded-2xl">
    <p className="text-slate-400 text-sm">
      Categories
    </p>

    <h3 className="text-4xl font-bold mt-2">
      {categories.length - 1}
    </h3>
  </div>

</div>
       
      <div className="glass p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Spoteroo Admin
          </h2>

          <p>
            Click Generate AI Trends to create startup trends.
          </p>
        </div>

        {generatedTrends.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Generated Trends
            </h2>

            <div className="space-y-4">

              {generatedTrends.map((trend, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold">
                    {trend.title}
                  </h3>

                  <p className="text-slate-300 mt-2">
                    {trend.description}
                  </p>

                  <p className="text-blue-400 mt-2">
                    Category: {trend.category}
                  </p>

                  <p className="text-green-400 mt-2">
                    Score: {trend.score}
                  </p>

                  <p className="text-slate-400 mt-2">
                    {trend.reason}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}