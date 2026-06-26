"use client";

import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import UpgradePrompt from "@/app/components/UpgradePrompt";

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
  premium_report?: string;
};

export default function TrendDetailPage() {
  const params = useParams();

  const id = Number(
    Array.isArray(params.id)
      ? params.id[0]
      : params.id
  );

  const [trend, setTrend] = useState<Trend | null>(
    null
  );

  const [loadingIdea, setLoadingIdea] =
    useState(false);

    const [loadingReport, setLoadingReport] =
  useState(false);

    const [isPro, setIsPro] =
  useState(false);

  useEffect(() => {
    const fetchTrend = async () => {
      const { data, error } = await supabase
        .from("trends")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(
          "Trend fetch error:",
          error
        );
        return;
      }

      console.log("TREND DATA:", data);
console.log("PREMIUM REPORT:", data?.premium_report);

      setTrend(data);

      const {
  data: { user },
} = await supabase.auth.getUser();

if (user) {
  console.log("USER ID:", user.id);

  const { data: profile, error } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

  console.log("PROFILE:", profile);
  console.log("PROFILE ERROR:", error);

  setIsPro(profile?.plan === "pro");
}
    };

    if (id) {
      fetchTrend();
    }
  }, [id]);

  const downloadPDF = () => {
    if (!trend) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(trend.title, 20, 20);

    doc.setFontSize(12);

    doc.text(
      `Category: ${trend.category}`,
      20,
      40
    );

    doc.text(
      `Score: ${trend.score}`,
      20,
      50
    );

    doc.text(
      `Description: ${trend.description}`,
      20,
      70,
      { maxWidth: 170 }
    );

    doc.text(
      `Startup Idea: ${
        trend.startup_idea || "N/A"
      }`,
      20,
      110,
      { maxWidth: 170 }
    );

    doc.text(
      `Market Analysis: ${
        trend.market_analysis || "N/A"
      }`,
      20,
      160,
      { maxWidth: 170 }
    );

    doc.save(
      `${trend.title}-report.pdf`
    );
  };


 const generateIdea = async () => {
  if (!trend) return;

  setLoadingIdea(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await fetch("/api/generate-idea", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: trend.id,
      title: trend.title,
      description: trend.description,
      email: user?.email,
    }),
  });

  const { data } = await supabase
    .from("trends")
    .select("*")
    .eq("id", trend.id)
    .single();

  if (data) {
    setTrend(data);
  }

  setLoadingIdea(false);
};

const generatePremiumReport = async () => {
  if (!trend) return;

  console.log("BUTTON CLICKED");

  setLoadingReport(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await fetch(
    "/api/generate-premium-report",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: trend.id,
        title: trend.title,
        description: trend.description,
        email: user?.email,
      }),
    }
  );

  console.log("STATUS:", response.status);

  const { data } = await supabase
    .from("trends")
    .select("*")
    .eq("id", trend.id)
    .single();

  if (data) {
    setTrend(data);
  }

  setLoadingReport(false);
};

  if (!trend) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/trends"
          className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
        >
          ← Back to Trends
        </Link>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-5xl font-bold">
              {trend.title}
            </h1>

            <div className="flex gap-4 mt-4">
             <button
  onClick={async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    alert("Please login first");
    return;
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_email", user.email)
    .eq("trend_id", trend.id)
    .maybeSingle();

  if (existing) {
    alert("Already saved!");
    return;
  }

  const { error } = await supabase
    .from("favorites")
    .insert({
      user_email: user.email,
      trend_id: trend.id,
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Trend saved!");
}}
  className="
    bg-yellow-600
    px-4 py-2
    rounded-xl
    shadow-[0_0_20px_rgba(234,179,8,0.35)]
  "
>
  Save Trend
</button>

              <button
                onClick={downloadPDF}
                className="
                  bg-purple-600
                  px-4 py-2
                  rounded-xl
                  shadow-[0_0_20px_rgba(168,85,247,0.35)]
                "
              >
                Download Report
              </button>

              {isPro && (
  <button
    onClick={generatePremiumReport}
    className="
      bg-cyan-600
      px-4 py-2
      rounded-xl
      shadow-[0_0_20px_rgba(6,182,212,0.35)]
    "
  >
    {loadingReport
      ? "Generating..."
      : "Premium Report"}
  </button>
)}
            </div>
          </div>

          <div
            className="
              px-5 py-3
              rounded-full
              bg-green-500/20
              border border-green-500/20
              text-green-300
              text-2xl
              font-bold
            "
          >
            Score: {trend.score}
          </div>
        </div>

        <div className="mb-6">
          <span
            className="
              px-4 py-2
              rounded-full
              bg-blue-500/20
              text-blue-300
              border border-blue-500/20
            "
          >
            {trend.category}
          </span>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={async () => {
              await fetch(
                "/api/vote",
                {
                  method:
                    "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    trendId:
                      trend.id,
                    voteType:
                      "upvote",
                  }),
                }
              );

              alert(
                "Upvoted!"
              );
            }}
            className="
              bg-green-600
              px-4 py-2
              rounded-xl
              shadow-[0_0_20px_rgba(34,197,94,0.35)]
            "
          >
            👍 Upvote
          </button>

          <button
            onClick={async () => {
              await fetch(
                "/api/vote",
                {
                  method:
                    "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    trendId:
                      trend.id,
                    voteType:
                      "downvote",
                  }),
                }
              );

              alert(
                "Downvoted!"
              );
            }}
            className="
              bg-red-600
              px-4 py-2
              rounded-xl
              shadow-[0_0_20px_rgba(239,68,68,0.35)]
            "
          >
            👎 Downvote
          </button>
        </div>

        <div className="glass p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Description
          </h2>

          <p>
            {trend.description}
          </p>
        </div>

        <div className="glass p-6">
          <h2 className="text-2xl font-bold mb-2">
            Why This Trend
            Matters
          </h2>

          {!trend.startup_idea && (
  <>
    {isPro ? (
      <button
        onClick={generateIdea}
        disabled={loadingIdea}
        className="
          mt-6
          bg-blue-600
          px-6 py-3
          rounded-xl
          shadow-[0_0_20px_rgba(59,130,246,0.35)]
        "
      >
        {loadingIdea
          ? "Generating..."
          : "Generate Startup Ideas"}
      </button>
    ) : (
      <UpgradePrompt />
    )}
  </>
)}

<p>
  {trend.reason || "Analysis coming soon."}
</p>
      
       {trend.premium_report && (
      <div className="glass p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">
          Premium Startup Report
        </h2>

        <div
  className="prose prose-invert max-w-none"
  dangerouslySetInnerHTML={{
    __html: trend.premium_report
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
.replace(/^## (.*)$/gm, "<h2>$1</h2>")
.replace(/^# (.*)$/gm, "<h1>$1</h1>")
.replace(/\n/g, "<br/>")
  }}
/>
      </div>
    )}

{trend.startup_idea && (
  <>
    <div className="glass p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Startup Opportunity
      </h2>

      <pre className="whitespace-pre-wrap">
        {trend.startup_idea}
      </pre>
    </div>

    <div className="glass p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Market Analysis
      </h2>

      <p>{trend.market_analysis}</p>
    </div>

    <div className="glass p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Competitors
      </h2>

      <p>{trend.competitors}</p>
    </div>

    <div className="glass p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Risks
      </h2>

            <p>{trend.risks}</p>
    </div>
  </>
)}

        </div>
      </div>
    </main>
  );
}
