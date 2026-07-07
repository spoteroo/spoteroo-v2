"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import DashboardHeader from "./components/DashboardHeader";
import BusinessMetrics from "./components/BusinessMetrics";
import RevenueChart from "./components/RevenueChart";
import UserChart from "./components/UserChart";
import AIUsageCard from "./components/AIUsageCard";
import TopTrendCard from "./components/TopTrendCard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";
import TrendTable from "./components/TrendTable";

type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
  reason: string | null;
};

type Usage = {
  plan: string;
  startupIdeasRemaining: number;
  premiumReportsRemaining: number;
};

type Analytics = {
  revenue: number;
  mrr: number;
  freeUsers: number;
  proUsers: number;
  subscribers: number;
  votes: number;
  aiRequests: number;
  topCategories: [string, number][];
};

const ITEMS_PER_PAGE = 10;

export default function DashboardPage() {
  const supabase = createClient();

  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [usage, setUsage] = useState<Usage | null>(null);

  const [trendsList, setTrendsList] = useState<Trend[]>([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [revenue, setRevenue] =
    useState(0);

  const [mrr, setMrr] =
    useState(0);

  const [freeUsers, setFreeUsers] =
    useState(0);

  const [proUsers, setProUsers] =
    useState(0);

  const [conversionRate, setConversionRate] =
    useState(0);

  const [aiUsageToday, setAiUsageToday] =
    useState(0);

const [subscriberCount, setSubscriberCount] =
  useState(0);

const [votesCount, setVotesCount] =
  useState(0);

const [topCategory, setTopCategory] =
  useState("");

  const [revenueChartData, setRevenueChartData] =
    useState<
      {
        name: string;
        revenue: number;
      }[]
    >([]);

  const [userChartData, setUserChartData] =
    useState<
      {
        name: string;
        users: number;
      }[]
    >([]);

  useEffect(() => {
  async function loadDashboard() {


    const {
      data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
      router.push("/login");
      return;
    }

    setCheckingAuth(false);

    const usageResponse = await fetch("/api/usage");

      if (usageResponse.ok) {
        setUsage(await usageResponse.json());
      }

      const { data: trends } =
        await supabase
          .from("trends")
.select(
  "id,title,description,category,score,reason"
)
          .order("score", {
            ascending: false,
          });

      if (trends) {
        setTrendsList(trends);
      }

      const { data: profiles } =
        await supabase
          .from("profiles")
          .select("plan");

      if (profiles) {
        const pro =
          profiles.filter(
            (p) => p.plan === "pro"
          ).length;

        const free =
          profiles.length - pro;

        setProUsers(pro);
        setFreeUsers(free);

        const monthlyRevenue =
          pro * 49;

        setRevenue(monthlyRevenue);
        setMrr(monthlyRevenue);

        setConversionRate(
          profiles.length === 0
            ? 0
            : Math.round(
                (pro / profiles.length) *
                  100
              )
        );

        setRevenueChartData([
          {
            name: "Current",
            revenue: monthlyRevenue,
          },
        ]);

        setUserChartData([
          {
            name: "Free",
            users: free,
          },
          {
            name: "Pro",
            users: pro,
          },
        ]);
      }

     try {
  const analyticsResponse = await fetch(
    "/api/dashboard/analytics"
  );

  if (analyticsResponse.ok) {
    const analytics: Analytics =
      await analyticsResponse.json();

    setSubscriberCount(analytics.subscribers);

    setVotesCount(analytics.votes);

    setTopCategory(
      analytics.topCategories?.[0]?.[0] ??
        "N/A"
    );
  }
} catch (error) {
  console.error(error);
}
      
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const { data: usageRows } = await supabase
  .from("ai_usage")
  .select("count")
  .eq("email", user.email)
  .eq("usage_date", today);

  console.log("Today's Usage Rows:", usageRows);

      if (usageRows) {
        const totalUsage = usageRows.reduce(
  (sum, row) => sum + row.count,
  0
);

console.log("Today's Total Usage:", totalUsage);

setAiUsageToday(totalUsage);
      }
    }

    loadDashboard();
  }, [router]);

    if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  const categories = [
    "All",
    ...new Set(trendsList.map((trend) => trend.category)),
  ];

  const filteredTrends = trendsList.filter((trend) => {
    const matchesSearch =
      trend.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      trend.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      trend.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTrends.length / ITEMS_PER_PAGE)
  );

  const paginatedTrends = filteredTrends.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const topTrend =
    trendsList.length > 0 ? trendsList[0] : null;

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">

        <DashboardHeader
  onDiscover={async () => {
    await fetch("/api/discover-trends", {
      method: "POST",
    });

    window.location.reload();
  }}
  onNewsletter={async () => {
    await fetch("/api/send-newsletter", {
      method: "POST",
    });

    alert("Newsletter Sent");
  }}
/>
        {usage && (
          <div className="glass p-6 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Your AI Plan
            </h2>

            <p>
              <strong>Plan:</strong> {usage.plan}
            </p>

            <p>
              <strong>Startup Ideas Remaining:</strong>{" "}
              {usage.startupIdeasRemaining}
            </p>

            <p>
              <strong>Premium Reports Remaining:</strong>{" "}
              {usage.premiumReportsRemaining}
            </p>

            {usage.plan !== "pro" && (
              <Link
                href="/pricing"
                className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
              >
                Upgrade to Pro
              </Link>
            )}
          </div>
        )}

        <BusinessMetrics
          revenue={revenue}
          mrr={mrr}
          proUsers={proUsers}
          freeUsers={freeUsers}
          conversionRate={conversionRate}
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <RevenueChart
            data={revenueChartData}
          />

          <UserChart
            data={userChartData}
          />

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

  <AIUsageCard
    aiUsageToday={aiUsageToday}
  />

  {topTrend && (
    <TopTrendCard trend={topTrend} />
  )}

</div>

<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="glass p-6 rounded-2xl">
    <h3 className="text-slate-400">
      Newsletter Subscribers
    </h3>

    <p className="text-4xl font-bold mt-3">
      {subscriberCount}
    </p>
  </div>

  <div className="glass p-6 rounded-2xl">
    <h3 className="text-slate-400">
      Total Votes
    </h3>

    <p className="text-4xl font-bold mt-3">
      {votesCount}
    </p>
  </div>

  <div className="glass p-6 rounded-2xl">
    <h3 className="text-slate-400">
      Top Category
    </h3>

    <p className="text-2xl font-bold mt-3">
      {topCategory}
    </p>
  </div>

</div>

        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />

        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
        />

                <TrendTable
          trends={paginatedTrends}
          onDelete={async (id: number) => {
            const confirmed = confirm(
              "Delete this trend?"
            );

            if (!confirmed) return;

            const { error } = await supabase
              .from("trends")
              .delete()
              .eq("id", id);

            if (error) {
              alert(error.message);
              return;
            }

            setTrendsList((previous) =>
              previous.filter(
                (trend) => trend.id !== id
              )
            );
          }}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() =>
            setCurrentPage((page) =>
              Math.max(page - 1, 1)
            )
          }
          onNext={() =>
            setCurrentPage((page) =>
              Math.min(page + 1, totalPages)
            )
          }
        />

      </div>
    </main>
  );
}