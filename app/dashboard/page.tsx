"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
  reason?: string;

  startup_idea?: string;
  market_analysis?: string;
  competitors?: string;
  risks?: string;
};

export default function DashboardPage() {
  const [totalTrends, setTotalTrends] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [categories, setCategories] = useState(0);
  const [subscribers, setSubscribers] = useState(0);

  const [trendsList, setTrendsList] = useState<Trend[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const { data: trends, error: trendsError } =
        await supabase
          .from("trends")
          .select("*");

      const { data: emails, error: emailError } =
        await supabase
          .from("newsletter_subscribers")
          .select("*");

      if (trendsError) {
        console.error(trendsError);
      }

      if (emailError) {
        console.error(emailError);
      }

      if (trends) {
        setTrendsList(trends);

        setTotalTrends(trends.length);

        const avg =
          trends.length > 0
            ? trends.reduce(
                (sum, trend) => sum + trend.score,
                0
              ) / trends.length
            : 0;

        setAvgScore(Math.round(avg));

        const uniqueCategories = new Set(
          trends.map((t) => t.category)
        );

        setCategories(uniqueCategories.size);
      }

      if (emails) {
        setSubscribers(emails.length);
      }
    }

    loadDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>
        <button
  onClick={async () => {
    const res = await fetch(
      "/api/discover-trends",
      {
        method: "POST",
      }
    );

    const data = await res.json();

    console.log(data);

    alert(`${data.inserted} trends added`);

    window.location.reload();
  }}
  className="bg-blue-600 px-6 py-3 rounded-xl mb-8"
>
  Discover New Trends
  
</button>

<button
  onClick={async () => {
    const res = await fetch(
      "/api/send-newsletter",
      {
        method: "POST",
      }
    );

    const data = await res.json();

    alert("Newsletter sent!");
    console.log(data);
  }}
  className="bg-green-600 px-6 py-3 rounded-xl"
>
  Send Newsletter
</button>
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-gray-400">
              Total Trends
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalTrends}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-gray-400">
              Average Score
            </h2>

            <p className="text-4xl font-bold mt-2">
              {avgScore}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-gray-400">
              Categories
            </h2>

            <p className="text-4xl font-bold mt-2">
              {categories}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-gray-400">
              Subscribers
            </h2>

            <p className="text-4xl font-bold mt-2">
              {subscribers}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">
            All Trends
          </h2>

          <div className="space-y-4">
            {trendsList.map((trend) => (
  <Link
    key={trend.id}
    href={`/trends/${trend.id}`}
  >
    <div className="bg-gray-900 p-4 rounded-xl flex justify-between items-center hover:border hover:border-blue-500 cursor-pointer">
      <div>
      <h3 className="text-xl font-bold">
                    {trend.title}
                  </h3>

                  <p className="text-gray-400">
                    {trend.category}
                  </p>
                </div>

                <div className="flex items-center gap-4">
  <span className="text-green-400 font-bold">
    Score: {trend.score}
  </span>

  <button
    onClick={async (e) => {
      e.preventDefault();

      const confirmed = confirm(
        "Delete this trend?"
      );

      if (!confirmed) return;

      await supabase
        .from("trends")
        .delete()
        .eq("id", trend.id);

      setTrendsList(
        trendsList.filter(
          (t) => t.id !== trend.id
        )
      );
    }}
    className="bg-red-600 px-3 py-1 rounded"
  >
    Delete
  </button>
</div>
              </div>
</Link>
))}
          </div>
        </div>
      </div>
    </main>
  );
}