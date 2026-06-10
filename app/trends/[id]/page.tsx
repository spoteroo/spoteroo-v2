"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
  reason: string | null;
  startup_idea?: string | null;
};

export default function TrendDetailPage() {
  const params = useParams();
  const id = params.id;

  const [trend, setTrend] = useState<Trend | null>(null);
  const [idea, setIdea] = useState("");
  const [loadingIdea, setLoadingIdea] = useState(false);

  useEffect(() => {
  const fetchTrend = async () => {
    const { data, error } = await supabase
      .from("trends")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setTrend(data);

    if (data.startup_idea) {
      setIdea(data.startup_idea);
    }
  };

  if (id) {
    fetchTrend();
  }
}, [id]);

  async function generateIdea() {
  if (!trend) return;

  setLoadingIdea(true);

  const response = await fetch("/api/generate-idea", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  id: trend.id,
  title: trend.title,
  description: trend.description,
}),
  });

  const result = await response.json();

  setIdea(result.result);
  setLoadingIdea(false);
}

  if (!trend) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/trends"
          className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
        >
          ← Back to Trends
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-bold">
            {trend.title}
          </h1>

          <span className="text-3xl text-green-400 font-bold">
            {trend.score}
          </span>
        </div>

        <p className="text-blue-400 text-xl mb-6">
          {trend.category}
        </p>

        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Description
          </h2>

          <p>{trend.description}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-2">
            Why This Trend Matters
          </h2>

          <p>
            {trend.reason || "Analysis coming soon."}
          </p>

          <button
  onClick={generateIdea}
  disabled={loadingIdea}
  className="mt-6 bg-blue-600 px-6 py-3 rounded-xl"
>
  {loadingIdea ? "Generating..." : "Generate Startup Ideas"}
</button>
        </div>

        {idea && (
          <div className="bg-gray-900 p-6 rounded-xl mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Startup Opportunity
            </h2>

            <pre className="whitespace-pre-wrap">
              {idea}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}