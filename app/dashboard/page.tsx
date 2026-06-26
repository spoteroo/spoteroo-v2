"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
  import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
};

export default function DashboardPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [totalTrends, setTotalTrends] =
    useState(0);

  const [avgScore, setAvgScore] =
    useState(0);

  const [categories, setCategories] =
    useState(0);

  const [subscribers, setSubscribers] =
    useState(0);

  const [favorites, setFavorites] =
    useState(0);

    const [votes, setVotes] =
  useState(0);

  const [proUsers, setProUsers] =
  useState(0);

    const [categoryData, setCategoryData] =
  useState<
    {
      name: string;
      value: number;
    }[]
  >([]);
  
  const [trendsList, setTrendsList] =
    useState<Trend[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setCheckingAuth(false);

      // Trends
      const {
        data: trends,
        error: trendsError,
      } = await supabase
        .from("trends")
        .select("*");

      if (trendsError) {
        console.error(
          "Failed to load trends:",
          trendsError
        );
      }

      if (trends) {
        setTrendsList(trends);

        setTotalTrends(trends.length);

        const avg =
          trends.length > 0
            ? trends.reduce(
                (sum, trend) =>
                  sum + trend.score,
                0
              ) / trends.length
            : 0;

        setAvgScore(Math.round(avg));

        const uniqueCategories =
          new Set(
            trends.map(
              (trend) => trend.category
            )
          );

        setCategories(
          uniqueCategories.size
        );

        const counts: Record<
  string,
  number
> = {};

trends.forEach((trend) => {
  counts[trend.category] =
    (counts[trend.category] || 0) + 1;
});

setCategoryData(
  Object.entries(counts).map(
    ([name, value]) => ({
      name,
      value,
    })
  )
);
      }

      // Subscribers
      const {
  count: subscribersCount,
} = await supabase
  .from("newsletter_subscribers")
  .select("*", {
    count: "exact",
    head: true,
  });

setSubscribers(
  subscribersCount || 0
);


      // Favorites
      const {
        data: favoriteData,
      } = await supabase
        .from("favorites")
        .select("*");

      if (favoriteData) {
        setFavorites(
          favoriteData.length
        );
      }

      // Votes
      const {
        data: voteData,
      } = await supabase
        .from("votes")
        .select("*");

      if (voteData) {
        setVotes(
          voteData.length
        );
      }

      const {
  data: profiles,
} = await supabase
  .from("profiles")
  .select("plan");

if (profiles) {
  const proCount =
    profiles.filter(
      (p) => p.plan === "pro"
    ).length;

  setProUsers(proCount);
}
    }

    loadDashboard();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const topTrend =
    trendsList.length > 0
      ? [...trendsList].sort(
          (a, b) =>
            b.score - a.score
        )[0]
      : null;

  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        {/* ACTION BUTTONS */}

        <div className="flex gap-4 mb-10 flex-wrap">
          <button
            onClick={async () => {
              const res =
                await fetch(
                  "/api/discover-trends",
                  {
                    method: "POST",
                  }
                );

              const data =
                await res.json();

              alert(
                `${data.inserted || 0} trends added`
              );

              window.location.reload();
            }}
            className="
              bg-blue-600
              px-6 py-3
              rounded-xl
              shadow-[0_0_20px_rgba(59,130,246,0.4)]
            "
          >
            Discover New Trends
          </button>

          <button
            onClick={async () => {
              const res =
                await fetch(
                  "/api/send-newsletter",
                  {
                    method: "POST",
                  }
                );

              const data =
                await res.json();

              if (!res.ok) {
                alert(
                  data.error ||
                    "Failed to send newsletter"
                );
                return;
              }

              alert(
                "Newsletter sent!"
              );
            }}
            className="
              bg-green-600
              px-6 py-3
              rounded-xl
              shadow-[0_0_20px_rgba(34,197,94,0.4)]
            "
          >
            Send Newsletter
          </button>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-6 mb-10">
          <div className="glass p-6">
            <h2 className="text-slate-400 text-sm">
              Total Trends
            </h2>

            <p className="text-5xl font-bold mt-4">
              {totalTrends}
            </p>
          </div>

          <div className="glass p-6">
            <h2 className="text-slate-400 text-sm">
              Avg Score
            </h2>

            <p className="text-5xl font-bold mt-4">
              {avgScore}
            </p>
          </div>

          <div className="glass p-6">
            <h2 className="text-slate-400 text-sm">
              Categories
            </h2>

            <p className="text-5xl font-bold mt-4">
              {categories}
            </p>
          </div>

          <div className="glass p-6">
            <h2 className="text-slate-400 text-sm">
              Subscribers
            </h2>

            <p className="text-5xl font-bold mt-4">
              {subscribers}
            </p>
          </div>

          <div className="glass p-6">
            <h2 className="text-slate-400 text-sm">
              Favorites
            </h2>

            <p className="text-5xl font-bold mt-4">
              {favorites}
            </p>
          </div>

          <div className="glass p-6">
            <h2 className="text-slate-400 text-sm">
              Votes
            </h2>

            <p className="text-5xl font-bold mt-4">
              {votes}
            </p>
          </div>
          <div className="glass p-6">
  <h2 className="text-slate-400 text-sm">
    Pro Users
  </h2>

  <p className="text-5xl font-bold mt-4">
    {proUsers}
  </p>
</div>
        </div>

        {/* TOP TREND */}

        {topTrend && (
          <div className="glass p-8 mb-10 border border-yellow-500/30">
            <h2 className="text-3xl font-bold text-yellow-400">
              🏆 Top Trend
            </h2>

            <p className="text-2xl font-bold mt-3">
              {topTrend.title}
            </p>

            <p className="text-slate-400 mt-2">
              Score: {topTrend.score}
            </p>
          </div>
        )}

        <div className="glass p-8 mb-10">
  <h2 className="text-3xl font-bold mb-6">
    Trends by Category
  </h2>

  <div
    style={{
      width: "100%",
      height: 400,
      minWidth: 300,
    }}
  >
    <BarChart
      width={800}
      height={400}
      data={categoryData}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="value"
        fill="#3b82f6"
      />
    </BarChart>
  </div>
</div>

        {/* ALL TRENDS */}

        <h2 className="text-3xl font-bold mb-6">
          All Trends
        </h2>

        <div className="space-y-4">
          {trendsList.map((trend) => (
            <Link
              key={trend.id}
              href={`/trends/${trend.id}`}
            >
              <div className="glass p-4 rounded-xl flex justify-between items-center hover:border hover:border-blue-500 cursor-pointer">
                <div>
                  <h3 className="text-xl font-bold">
                    {trend.title}
                  </h3>

                  <p className="text-gray-400">
                    {trend.category}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/20 text-sm">
                    Score: {trend.score}
                  </span>

                  <button
                    onClick={async (
                      e
                    ) => {
                      e.preventDefault();

                      const confirmed =
                        confirm(
                          "Delete this trend?"
                        );

                      if (
                        !confirmed
                      ) {
                        return;
                      }

                      const {
                        error,
                      } =
                        await supabase
                          .from(
                            "trends"
                          )
                          .delete()
                          .eq(
                            "id",
                            trend.id
                          );

                      if (
                        error
                      ) {
                        alert(
                          error.message
                        );
                        return;
                      }

                      const updated =
                        trendsList.filter(
                          (
                            t
                          ) =>
                            t.id !==
                            trend.id
                        );

                      setTrendsList(
                        updated
                      );

                      window.location.reload();
                    }}

                    className="
                      bg-red-600
                      px-3
                      py-1
                      rounded-xl
                      shadow-[0_0_15px_rgba(239,68,68,0.35)]
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}