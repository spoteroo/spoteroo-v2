"use client";

import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import UpgradePrompt from "@/app/components/UpgradePrompt";
import TrendHistoryChart from "@/app/components/charts/TrendHistoryChart";
import { toast } from "sonner";

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

    <div className="max-w-4xl mx-auto">
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
          className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
        >
          ← Back to Trends
        </Link>

        <div>

  <h1
    className="
      text-4xl
      sm:text-5xl
      lg:text-6xl
      font-extrabold
      leading-tight
      bg-gradient-to-r
      from-white
      via-blue-300
      to-cyan-400
      bg-clip-text
      text-transparent
    "
  >
    {trend.title}
  </h1>

  <div className="mt-6 flex flex-wrap items-center gap-4">

    <div
      className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-green-500/15
        border
        border-green-500/20
        text-green-300
        text-xl
        font-bold
      "
    >
      {trend.score}
    </div>

    <span
      className="
        rounded-full
        border
        border-blue-500/20
        bg-blue-500/15
        px-4
        py-2
        text-blue-300
        font-medium
      "
    >
      {trend.category}
    </span>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 mb-10">

    <div
      className="
        glass
        rounded-2xl
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border
        hover:border-blue-500/40
      "
    >
      <p className="text-slate-400 text-sm">
        Opportunity Score
      </p>

      <h2 className="text-3xl font-bold text-green-400">
        {trend.opportunity_score ?? "-"}
      </h2>
    </div>

    <div
      className="
        glass
        rounded-2xl
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border
        hover:border-blue-500/40
      "
    >
      <p className="text-slate-400 text-sm">
        Momentum
      </p>

      <h2 className="text-2xl font-bold text-blue-400">
        {trend.momentum ?? "-"}
      </h2>
    </div>

    <div
      className="
        glass
        rounded-2xl
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border
        hover:border-blue-500/40
      "
    >
      <p className="text-slate-400 text-sm">
        Investment Rating
      </p>

      <h2 className="text-2xl font-bold text-yellow-400">
        {trend.investment_rating ?? "-"}
      </h2>
    </div>

    <div
      className="
        glass
        rounded-2xl
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border
        hover:border-blue-500/40
      "
    >
      <p className="text-slate-400 text-sm">
        Competition
      </p>

      <h2 className="text-2xl font-bold">
        {trend.competition_level ?? "-"}
      </h2>
    </div>

    <div
      className="
        glass
        rounded-2xl
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border
        hover:border-blue-500/40
      "
    >
      <p className="text-slate-400 text-sm">
        Market Size
      </p>

      <h2 className="text-2xl font-bold text-cyan-400">
        {trend.market_size ?? "-"}
      </h2>
    </div>

  </div>

</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 mb-10">

          <div className="glass rounded-3xl p-8 mb-10">

            <h2 className="text-3xl font-bold mb-8">
              📈 AI Forecast
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

              <div className="glass rounded-2xl p-5">
                <p className="text-slate-400">
                  30 Days
                </p>

                <p className="text-3xl font-bold text-green-400">
                  +{trend.forecast_30d ?? 0}%
                </p>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="text-slate-400">
                  90 Days
                </p>

                <p className="text-3xl font-bold text-blue-400">
                  +{trend.forecast_90d ?? 0}%
                </p>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="text-slate-400">
                  1 Year
                </p>

                <p className="text-3xl font-bold text-cyan-400">
                  +{trend.forecast_1y ?? 0}%
                </p>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="text-slate-400">
                  Success
                </p>

                <p className="text-3xl font-bold text-yellow-400">
                  {trend.success_probability ?? 0}%
                </p>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="text-slate-400">
                  Unicorn Chance
                </p>

                <p className="text-3xl font-bold text-pink-400">
                  {trend.unicorn_potential ?? 0}%
                </p>
              </div>

            </div>

          </div>

          <div className="flex flex-wrap gap-4 mt-8">

            <button
              onClick={downloadPDF}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl"
            >
              Download PDF
            </button>

            <button
              onClick={() => {
  window.print();
}}
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
            >
              Print
            </button>

            <button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({
                    title: trend.title,
                    url: window.location.href,
                  });
                } else {
                  await navigator.clipboard.writeText(
                    window.location.href
                  );

                  toast.success(
                    "Link copied!"
                  );
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
            >
              Share
            </button>

            <button
              onClick={async () => {
                await navigator.clipboard.writeText(
                  window.location.href
                );

                toast.success(
                  "Link copied!"
                );
              }}
              className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
            >
              Copy Link
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
  className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-xl"
>
  ⭐ Save Trend
</button>

            {isPro && (
              <button
                onClick={
                  generatePremiumReport
                }
                disabled={
                  loadingReport
                }
                className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl disabled:opacity-50"
              >
                {loadingReport
                  ? "Generating..."
                  : "Premium Report"}
              </button>
            )}

          </div>

          <div
  className="
    glass
    rounded-3xl
    p-8
    mb-8
  "
>

            <h2 className="text-3xl font-bold mb-4">
              Description
            </h2>

            <p className="text-slate-300 leading-8">
              {trend.description}
            </p>

          </div>

          {trend.reason && (

            <div
  className="
    glass
    rounded-3xl
    p-8
    mb-8
    border
    border-blue-500/20
  "
>

              <h2 className="text-3xl font-bold mb-4">
                Why This Trend Matters
              </h2>

              <p className="text-slate-300 leading-8">
                {trend.reason}
              </p>

            </div>

          )}

          <div className="flex flex-wrap gap-4 mb-8">

            <button
  onClick={async () => {
    const response = await fetch(
      "/api/vote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trendId: trend.id,
          voteType: "upvote",
        }),
      }
    );

    if (!response.ok) {
      toast.error("Unable to record vote.");
      return;
    }

    const { data: refreshedTrend } =
      await supabase
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
  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
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

const { data: refreshedTrend } =
  await supabase
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
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
            >
              👎 Downvote
            </button>

          </div>

          <div className="glass p-6 mb-6">

            <div className="flex flex-col sm:flex-row justify-between gap-4">

              <h2 className="text-3xl font-bold mb-6">
                AI Startup Idea
              </h2>

              <button
                onClick={generateIdea}
                disabled={loadingIdea}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl disabled:opacity-50"
              >
                {loadingIdea
                  ? "Generating..."
                  : "Generate Startup Idea"}
              </button>

            </div>

            {trend.startup_idea ? (

  <div className="mt-6 space-y-8">

    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Startup Idea
      </h3>

      <p className="text-slate-300 whitespace-pre-wrap leading-8">
        {trend.startup_idea}
      </p>
    </div>

    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Market Analysis
      </h3>

      <p className="text-slate-300 whitespace-pre-wrap leading-8">
        {trend.market_analysis}
      </p>
    </div>

    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Competitors
      </h3>

      <p className="text-slate-300 whitespace-pre-wrap leading-8">
        {trend.competitors}
      </p>
    </div>

    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Risks
      </h3>

      <p className="text-slate-300 whitespace-pre-wrap leading-8">
        {trend.risks}
      </p>
    </div>

  </div>

) : (

  <div className="glass rounded-2xl p-6 mt-6">
    <p className="text-slate-500">
      No startup idea generated yet.
    </p>
  </div>

)}

          </div>

          {isPro ? (

            <div className="glass p-6 mb-6">

              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Premium Investment Report
              </h2>

              {trend.premium_report ? (

                <div
  className="
    glass
    rounded-2xl
    p-6
    whitespace-pre-wrap
    leading-8
    text-slate-300
  "
>
                  {trend.premium_report}
                </div>

              ) : (

                <p className="text-slate-500">
                  Click "Premium Report" to generate an investment report.
                </p>

              )}

            </div>

          ) : (

            <UpgradePrompt />

          )}

          <TrendHistoryChart
            data={history}
          />

        </div>

      </div>

    </main>
  );
}