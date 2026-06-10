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
  reason: string;
};

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    async function fetchTrends() {
      const { data, error } = await supabase
        .from("trends")
        .select("*")
        .order("score", { ascending: false });

      if (!error && data) {
        setTrends(data);
      }
    }

    fetchTrends();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          Emerging Trends
        </h1>

        <div className="space-y-6">
          {trends.map((trend) => (
            <Link
              key={trend.id}
              href={`/trends/${trend.id}`}
            >
              <div className="border border-gray-800 rounded-xl p-4 hover:border-blue-500 cursor-pointer">
                <h2 className="text-2xl font-bold">
                  {trend.title}
                </h2>

                <p className="text-gray-400 mt-2">
                  {trend.description}
                </p>

                <p className="text-blue-400 mt-2">
                  {trend.category}
                </p>

                <p className="text-green-400 mt-2">
                  Score: {trend.score}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}