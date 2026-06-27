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
  reason: string | null;
  startup_idea?: string | null;
  market_analysis?: string | null;
  competitors?: string | null;
  risks?: string | null;
};

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
const [sortBy, setSortBy] = useState("score");


  useEffect(() => {
    async function fetchTrends() {
      const { data, error } = await supabase
        .from("trends")
        .select("*")
        .order("score", { ascending: false });

      if (error) {
        console.error("Error loading trends:", error);
        return;
      }

      setTrends(data || []);
    }

    fetchTrends();
  }, []);

  const categories = [
    "All",
    ...new Set(trends.map((trend) => trend.category)),
  ];

  const filteredTrends = trends
  .filter((trend) => {
    const matchesSearch =
      trend.title.toLowerCase().includes(search.toLowerCase()) ||
      trend.description.toLowerCase().includes(search.toLowerCase()) ||
      trend.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      trend.category === selectedCategory;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (sortBy === "score") {
      return b.score - a.score;
    }

    return a.title.localeCompare(b.title);
  });

  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1
          className="
            text-5xl
            font-bold
            mb-8
            bg-gradient-to-r
            from-blue-400
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          Emerging Trends
        </h1>

        <input
          type="text"
          placeholder="Search trends..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            p-4
            rounded-xl
            bg-slate-900
            border
            border-slate-700
            text-white
            mb-6
          "
        />

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                px-4 py-2 rounded-xl transition-all
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="text-gray-400 mb-6">
          {filteredTrends.length} trends found
        </p>

<div className="mb-6">
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="
      bg-slate-900
      border
      border-slate-700
      rounded-xl
      px-4
      py-2
    "
  >
    <option value="score">
      Highest Score
    </option>

    <option value="title">
      Alphabetical
    </option>
  </select>
</div>

        <div className="space-y-5">
          {filteredTrends.map((trend) => (
            <Link
              key={trend.id}
              href={`/trends/${trend.id}`}
            >
              <div
                className="
                  glass
                  p-5
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:scale-[1.01]
                "
              >
                <h2 className="text-2xl font-bold">
                  {trend.title}
                </h2>

                <p className="text-gray-400 mt-3">
                  {trend.description}
                </p>

                <div className="flex gap-3 mt-4 flex-wrap">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-blue-500/20
                      text-blue-300
                      text-sm
                      border
                      border-blue-500/20
                    "
                  >
                    {trend.category}
                  </span>

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-green-500/20
                      text-green-300
                      text-sm
                      border
                      border-green-500/20
                    "
                  >
                    Score: {trend.score}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTrends.length === 0 && (
          <div className="glass p-8 text-center mt-8">
            <h2 className="text-2xl font-bold">
              No Trends Found
            </h2>

            <p className="text-slate-400 mt-2">
              Try a different search or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}