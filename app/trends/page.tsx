"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";


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

   const ITEMS_PER_PAGE = 10;

export default function TrendsPage() {
  const supabase = createClient();

  const [trends, setTrends] =
    useState<Trend[]>([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("score");

  const [currentPage, setCurrentPage] =
    useState(1);


useEffect(() => {
  async function fetchTrends() {
      const { data, error } = await supabase
        .from("trends")
        .select("*")
        .order("score", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Error loading trends:",
          error
        );
        return;
      }

      setTrends(data || []);
    }

    fetchTrends();
  }, []);

  const categories = [
    "All",
    ...new Set(
      trends.map(
        (trend) => trend.category
      )
    ),
  ];

  const filteredTrends = [...trends]
  .filter((trend) => {
    const query = search.toLowerCase();

    const matchesSearch =
      trend.title
        .toLowerCase()
        .includes(query) ||
      trend.description
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      trend.category === selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(
          b.title
        );

      case "title-desc":
        return b.title.localeCompare(
          a.title
        );

      case "lowest":
        return a.score - b.score;

      default:
        return b.score - a.score;
    }
  });

const totalPages = Math.max(
  1,
  Math.ceil(
    filteredTrends.length /
      ITEMS_PER_PAGE
  )
);

const paginatedTrends =
  filteredTrends.slice(
    (currentPage - 1) *
      ITEMS_PER_PAGE,
    currentPage *
      ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-6xl mx-auto">

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

        {/* Search + Sort */}

        <div className="grid md:grid-cols-2 gap-4 mb-8">

          <input
            type="text"
            placeholder="Search trends..."
            value={search}
            onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
            
            className="
              glass-input
              p-4
              rounded-xl
            "
          />

          <select
            value={sortBy}
            onChange={(e) => {
  setSortBy(e.target.value);
  setCurrentPage(1);
}}
            
            className="
              glass-input
              p-4
              rounded-xl
            "
          >
            <option value="score">
              Highest Score
            </option>

            <option value="lowest">
              Lowest Score
            </option>

            <option value="title">
              A → Z
            </option>

            <option value="title-desc">
              Z → A
            </option>
          </select>

        </div>

        {/* Categories */}

        <div className="flex gap-3 flex-wrap mb-8">

          {categories.map(
            (category) => (
              <button
                key={category}
                onClick={() => {
  setSelectedCategory(category);
  setCurrentPage(1);
}}
                
                className={`
                  px-4
                  py-2
                  rounded-xl
                  transition

                  ${
                    selectedCategory ===
                    category
                      ? "bg-blue-600 text-white"
                      : "glass text-slate-300"
                  }
                `}
              >
                {category}
              </button>
            )
          )}

        </div>

        <p className="text-slate-400 mb-8">
          {filteredTrends.length} trend
          {filteredTrends.length !==
          1
            ? "s"
            : ""}{" "}
          found
        </p>

        <div className="space-y-5">

          {paginatedTrends.map(
            (trend) => (
              <Link
                key={trend.id}
                href={`/trends/${trend.id}`}
              >
                <div
                  className="
                    glass
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border
                    hover:border-blue-500
                    cursor-pointer
                  "
                >
                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {trend.title}
                      </h2>

                      <p className="text-slate-400 mt-3">
                        {trend.description}
                      </p>

                    </div>

                    <span
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-green-500/20
                        text-green-300
                        border
                        border-green-500/20
                      "
                    >
                      {trend.score}
                    </span>

                  </div>

                  <div className="flex gap-3 mt-5">

                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-500/20
                        text-blue-300
                        border
                        border-blue-500/20
                        text-sm
                      "
                    >
                      {trend.category}
                    </span>

                  </div>

                  {trend.reason && (
                    <p className="text-slate-500 italic mt-4">
                      {trend.reason}
                    </p>
                  )}

                </div>
              </Link>
            )
          )}

        </div>

        <div className="flex justify-center items-center gap-4 mt-10">

  <button
    disabled={currentPage === 1}
    onClick={() =>
  setCurrentPage((page) =>
    Math.max(page - 1, 1)
  )
}
    className="glass px-5 py-2 rounded-xl disabled:opacity-40"
  >
    Previous
  </button>

  <span>
  Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
  setCurrentPage((page) =>
    Math.min(page + 1, totalPages)
  )
}
    className="glass px-5 py-2 rounded-xl disabled:opacity-40"
  >
    Next
  </button>

</div>

        {filteredTrends.length ===
          0 && (
          <div className="glass p-10 mt-10 text-center">

            <h2 className="text-2xl font-bold">
              No Trends Found
            </h2>

            <p className="text-slate-400 mt-3">
              Try changing your
              search or selected
              category.
            </p>

          </div>
        )}

      </div>
    </main>
  );
}