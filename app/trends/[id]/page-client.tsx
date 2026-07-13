"use client";

import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import UpgradePrompt from "@/app/components/UpgradePrompt";
import TrendHistoryChart from "@/app/components/charts/TrendHistoryChart";
import { toast } from "sonner";
import TrendHero from "./components/TrendHero";
import MetricsGrid from "./components/MetricsGrid";
import AIForecast from "./components/AIForecast";
import AIIntelligence from "./components/AIIntelligence";
import OpportunityRisk from "./components/OpportunityRisk";
import InsightCards from "./components/InsightCards";

type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
  created_at: string;

  reason?: string;

  startup_idea?: string;
  market_analysis?: string;
  competitors?: string;
  risks?: string;

  premium_report?: string;

  opportunity_score?: number | null;
  momentum?: string | null;
  investment_rating?: string | null;
  competition_level?: string | null;
  market_size?: string | null;

  forecast_30d?: number | null;
  forecast_90d?: number | null;
  forecast_1y?: number | null;

  success_probability?: number | null;
  unicorn_potential?: number | null;
};

type HistoryPoint = {
  score: number;
  votes: number;
  captured_at: string;
};

export default function TrendDetailClient() {
  const supabase = createClient();

  const params = useParams();

  const id = Number(
    Array.isArray(params.id)
      ? params.id[0]
      : params.id
  );

  const [trend, setTrend] =
  useState<Trend | null>(null);

  const [history, setHistory] =
    useState<HistoryPoint[]>([]);

  const [loadingIdea, setLoadingIdea] =
    useState(false);

  const [
    loadingReport,
    setLoadingReport,
  ] = useState(false);

  const [isPro, setIsPro] =
    useState(false);

  useEffect(() => {
    async function loadTrend() {
      const { data, error } =
        await supabase
          .from("trends")
          .select(`
  id,
  title,
  description,
  category,
  score,
  created_at,
  reason,
  startup_idea,
  market_analysis,
  competitors,
  risks,
  premium_report,
  opportunity_score,
  momentum,
  investment_rating,
  competition_level,
  market_size,
  forecast_30d,
  forecast_90d,
  forecast_1y,
  success_probability,
  unicorn_potential
`)
          .eq("id", id)
          .single();

      if (error) {
        console.error(error);

        toast.error(
          "Unable to load trend."
        );

        return;
      }

      setTrend(data);

      try {
  const response = await fetch(
    `/api/trends/${id}/history`
  );

  if (response.ok) {
    const historyData = await response.json();

    setHistory(historyData);
  }
} catch (error) {
  console.error(error);
}

      const {
        data: { user },
      } = await supabase.auth.getUser();

      

      if (!user) return;

      const { data: profile } = await supabase
  .from("profiles")
  .select("plan")
  .eq("email", user.email)
  .maybeSingle();

setIsPro(profile?.plan === "pro");

  
    }

    if (id) {
      loadTrend();
    }
  }, [id, supabase]);

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
      {
        maxWidth: 170,
      }
    );

    doc.text(
      `Startup Idea: ${
        trend.startup_idea ?? "N/A"
      }`,
      20,
      110,
      {
        maxWidth: 170,
      }
    );

    doc.text(
      `Market Analysis: ${
        trend.market_analysis ?? "N/A"
      }`,
      20,
      160,
      {
        maxWidth: 170,
      }
    );

    doc.addPage();

doc.setFontSize(16);

doc.text(
  "Premium Report",
  20,
  20
);

doc.setFontSize(11);

doc.text(
  trend.premium_report ??
    "No premium report generated.",
  20,
  40,
  {
    maxWidth: 170,
    align: "left",
  }
);

    doc.save(
      `${trend.title}-report.pdf`
    );
  };

    const generateIdea = async () => {
    if (!trend) return;

    setLoadingIdea(true);

    try {
      const response = await fetch(
        "/api/generate-idea",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: trend.id,
            title: trend.title,
            description:
              trend.description,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ??
            "Failed to generate startup idea."
        );

        return;
      }

      const { data } =
        await supabase
          .from("trends")
          .select("*")
          .eq("id", trend.id)
          .single();

      if (data) {
        setTrend(data);
      }

      toast.success(
        "Startup idea generated!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoadingIdea(false);
    }
  };

  const generatePremiumReport =
    async () => {
      if (!trend) return;

      setLoadingReport(true);

      try {
        const response =
          await fetch(
            "/api/generate-premium-report",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                id: trend.id,
                title: trend.title,
                description:
                  trend.description,
              }),
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          toast.error(
            result.error ??
              "Failed to generate premium report."
          );

          return;
        }

        const { data } =
          await supabase
            .from("trends")
            .select("*")
            .eq("id", trend.id)
            .single();

        if (data) {
          setTrend(data);
        }

        toast.success(
          "Premium report generated!"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Something went wrong."
        );
      } finally {
        setLoadingReport(false);
      }
    };

  if (!trend) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </main>
  );
}

  return (
  <main className="min-h-screen text-white px-4 py-8 sm:px-6 lg:px-10">

   <script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: trend.title,
      description: trend.description,
      articleSection: trend.category,
      datePublished: trend.created_at,
      dateModified: trend.created_at,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://spoteroo.com/trends/${trend.id}`,
      },
      author: {
        "@type": "Organization",
        name: "Spoteroo",
      },
      publisher: {
        "@type": "Organization",
        name: "Spoteroo",
        logo: {
          "@type": "ImageObject",
          url: "https://spoteroo.com/SPOTEROO%20NEW%20LOGO1.png",
        },
      },
    }),
  }}
/>

    <div className="mx-auto w-full max-w-screen-2xl">
      <script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://spoteroo.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Trends",
          item: "https://spoteroo.com/trends",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: trend.title,
          item: `https://spoteroo.com/trends/${trend.id}`,
        },
      ],
    }),
  }}
/>
<Link
  href="/trends"
  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
>
  ← Back to Trends
</Link>

<TrendHero trend={trend} />

<MetricsGrid trend={trend} />

<AIForecast trend={trend} />

<AIIntelligence trend={trend} />

<OpportunityRisk trend={trend} />

<InsightCards trend={trend} />



          <section className="glass rounded-3xl p-6 mb-10">

  <div className="flex flex-wrap items-center gap-4">

    <button
      onClick={generateIdea}
      disabled={loadingIdea}
      className="rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-700 disabled:opacity-50"
    >
      {loadingIdea ? "Generating..." : "💡 Startup Idea"}
    </button>

    {isPro && (
      <button
        onClick={generatePremiumReport}
        disabled={loadingReport}
        className="rounded-xl bg-cyan-600 px-5 py-3 font-medium transition hover:bg-cyan-700 disabled:opacity-50"
      >
        {loadingReport ? "Generating..." : "📄 Premium Report"}
      </button>
    )}

    <button
      onClick={downloadPDF}
      className="rounded-xl bg-purple-600 px-5 py-3 font-medium transition hover:bg-purple-700"
    >
      ⬇ Download PDF
    </button>

    <button
      onClick={async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user?.email) {
          toast.error("Please login first");
          return;
        }

        const { data: existing } = await supabase
          .from("favorites")
          .select("id")
          .eq("user_email", user.email)
          .eq("trend_id", trend.id)
          .maybeSingle();

        if (existing) {
          toast.info("Already saved!");
          return;
        }

        const { error } = await supabase
          .from("favorites")
          .insert({
            trend_id: trend.id,
            user_email: user.email,
          });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success("Trend saved!");
      }}
      className="rounded-xl bg-yellow-600 px-5 py-3 font-medium transition hover:bg-yellow-700"
    >
      ⭐ Save
    </button>

    <button
      onClick={() => window.print()}
      className="rounded-xl bg-green-600 px-5 py-3 font-medium transition hover:bg-green-700"
    >
      🖨 Print
    </button>

    <button
      onClick={async () => {
        if (navigator.share) {
          await navigator.share({
            title: trend.title,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied!");
        }
      }}
      className="rounded-xl bg-slate-700 px-5 py-3 font-medium transition hover:bg-slate-600"
    >
      🔗 Share
    </button>

  </div>

</section>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

  {/* Description */}

  <section className="glass rounded-3xl p-8">

    <div className="flex items-center gap-3 mb-6">

      <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-xl">
        📖
      </div>

      <div>

        <h2 className="text-2xl font-bold">
          Description
        </h2>

        <p className="text-slate-400 text-sm">
          Overview of the trend
        </p>

      </div>

    </div>

    <p className="text-slate-300 leading-8 whitespace-pre-wrap">
      {trend.description}
    </p>

  </section>

  {/* Why This Trend Matters */}

  {trend.reason && (

    <section className="glass rounded-3xl p-8 border border-blue-500/20">

      <div className="flex items-center gap-3 mb-6">

        <div className="h-10 w-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-xl">
          💡
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Why This Trend Matters
          </h2>

          <p className="text-slate-400 text-sm">
            AI market reasoning
          </p>

        </div>

      </div>

      <p className="text-slate-300 leading-8 whitespace-pre-wrap">
        {trend.reason}
      </p>

    </section>

  )}

</div>

          <section className="glass rounded-3xl p-8 mb-10">

  <div className="text-center mb-8">

    <h2 className="text-3xl font-bold">
      👥 Community Feedback
    </h2>

    <p className="text-slate-400 mt-3">
      Vote to improve Spoteroo's AI opportunity rankings.
    </p>

  </div>

  <div className="flex justify-center mb-8">

    <div className="glass rounded-3xl px-10 py-6 text-center">

      <p className="text-sm uppercase tracking-widest text-slate-400">
        Current Score
      </p>

      <h3 className="mt-3 text-6xl font-black text-green-400">
        {trend.score}
      </h3>

    </div>

  </div>

  <div className="flex flex-wrap justify-center gap-5">

    <button
      onClick={async () => {
        const response = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trendId: trend.id,
            voteType: "upvote",
          }),
        });

        if (!response.ok) {
          toast.error("Unable to record vote.");
          return;
        }

        const { data: refreshedTrend } = await supabase
          .from("trends")
          .select("score")
          .eq("id", trend.id)
          .single();

        if (refreshedTrend) {
          setTrend({
            ...trend,
            score: refreshedTrend.score,
          });
        }

        toast.success("Thanks for your vote!");
      }}
      className="
        rounded-2xl
        bg-green-600
        hover:bg-green-700
        px-8
        py-4
        text-lg
        font-semibold
        transition-all
        hover:scale-105
      "
    >
      👍 Upvote
    </button>

    <button
      onClick={async () => {
        const response = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trendId: trend.id,
            voteType: "downvote",
          }),
        });

        if (!response.ok) {
          toast.error("Unable to record vote.");
          return;
        }

        const { data: refreshedTrend } = await supabase
          .from("trends")
          .select("score")
          .eq("id", trend.id)
          .single();

        if (refreshedTrend) {
          setTrend({
            ...trend,
            score: refreshedTrend.score,
          });
        }

        toast.success("Vote recorded!");
      }}
      className="
        rounded-2xl
        bg-red-600
        hover:bg-red-700
        px-8
        py-4
        text-lg
        font-semibold
        transition-all
        hover:scale-105
      "
    >
      👎 Downvote
    </button>

  </div>

</section>

          <div className="glass rounded-3xl p-8 mb-10">

  <div className="flex items-center justify-between mb-8">

    <div>

      <h2 className="text-3xl font-bold">
        💡 AI Startup Idea
      </h2>

      <p className="text-slate-400 mt-2">
        AI-generated business opportunity based on this trend.
      </p>

    </div>

  </div>

  {trend.startup_idea ? (

    <div className="grid gap-6">

      {/* Startup Idea */}

      <div className="glass rounded-2xl p-6">

        <h3 className="text-xl font-bold text-blue-400 mb-4">
          🚀 Startup Idea
        </h3>

        <p className="text-slate-300 whitespace-pre-wrap leading-8">
          {trend.startup_idea}
        </p>

      </div>

      {/* Market */}

      <div className="glass rounded-2xl p-6">

        <h3 className="text-xl font-bold text-green-400 mb-4">
          📈 Market Analysis
        </h3>

        <p className="text-slate-300 whitespace-pre-wrap leading-8">
          {trend.market_analysis}
        </p>

      </div>

      {/* Competitors */}

      <div className="glass rounded-2xl p-6">

        <h3 className="text-xl font-bold text-purple-400 mb-4">
          🏢 Competitors
        </h3>

        <p className="text-slate-300 whitespace-pre-wrap leading-8">
          {trend.competitors}
        </p>

      </div>

      {/* Risks */}

      <div className="glass rounded-2xl p-6">

        <h3 className="text-xl font-bold text-red-400 mb-4">
          ⚠ Risks
        </h3>

        <p className="text-slate-300 whitespace-pre-wrap leading-8">
          {trend.risks}
        </p>

      </div>

    </div>

  ) : (

    <div className="glass rounded-2xl p-12 text-center">

      <div className="text-6xl mb-6">
        💡
      </div>

      <h3 className="text-2xl font-bold mb-3">
        No Startup Idea Yet
      </h3>

      <p className="text-slate-400 max-w-xl mx-auto leading-8">
        Click the "Startup Idea" button above to let Spoteroo's AI generate a complete startup opportunity based on this emerging trend.
      </p>

    </div>

  )}

</div>


          {isPro ? (

  <section className="glass rounded-3xl p-8 mb-10">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h2 className="text-3xl font-bold">
          📄 Premium Investment Report
        </h2>

        <p className="text-slate-400 mt-2">
          AI-generated investment research and market intelligence.
        </p>

      </div>

      {trend.premium_report && (

        <button
          onClick={async () => {
            await navigator.clipboard.writeText(
              trend.premium_report ?? ""
            );

            toast.success("Report copied!");
          }}
          className="rounded-xl bg-slate-700 hover:bg-slate-600 px-5 py-3"
        >
          📋 Copy Report
        </button>

      )}

    </div>

    {trend.premium_report ? (

      <div
        className="
          glass
          rounded-2xl
          p-8
          max-h-[700px]
          overflow-y-auto
        "
      >

        <article
          className="
            whitespace-pre-wrap
            leading-8
            text-slate-300
            prose
            prose-invert
            max-w-none
          "
        >
          {trend.premium_report}
        </article>

      </div>

    ) : (

      <div className="glass rounded-2xl p-12 text-center">

        <div className="text-6xl mb-6">
          📄
        </div>

        <h3 className="text-2xl font-bold mb-3">
          No Premium Report Yet
        </h3>

        <p className="text-slate-400 max-w-xl mx-auto leading-8">
          Click the "Premium Report" button above to generate a detailed
          investment report, competitor analysis, market outlook,
          opportunities, risks, and strategic recommendations.
        </p>

      </div>

    )}

  </section>

) : (

  <UpgradePrompt />

)}

          <section className="glass rounded-3xl p-8 mb-10">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

    <div>

      <h2 className="text-3xl font-bold">
        📈 Trend History
      </h2>

      <p className="text-slate-400 mt-2">
        Historical opportunity score performance over time.
      </p>

    </div>

    <div className="flex gap-4">

      <div className="glass rounded-2xl px-6 py-4">

        <p className="text-xs uppercase tracking-wider text-slate-400">
          Current Score
        </p>

        <p className="text-3xl font-black text-green-400">
          {trend.score}
        </p>

      </div>

      <div className="glass rounded-2xl px-6 py-4">

        <p className="text-xs uppercase tracking-wider text-slate-400">
          History
        </p>

        <p className="text-3xl font-black text-blue-400">
          {history.length}
        </p>

      </div>

    </div>

  </div>

  <TrendHistoryChart data={history} />

</section>

    </div>

  </main>
);
}