import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data: trends } = await supabase
    .from("trends")
    .select("*")
    .order("score", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero */}
        <h1 className="text-7xl md:text-8xl font-bold mb-6">
          Spoteroo
        </h1>

        <p className="text-2xl text-gray-300 mb-8">
          Spot Emerging Startup Opportunities
        </p>

        <p className="text-lg text-gray-400 max-w-3xl">
          AI-powered opportunity intelligence platform that discovers
          emerging trends, startups, technologies, keywords, and market
          opportunities before they become mainstream.
        </p>

        {/* Stats */}
        <div className="mt-10 flex gap-8 text-gray-400">
          <div>
            <div className="text-2xl font-bold text-white">
              5+
            </div>
            <div>Trends Tracked</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-white">
              AI
            </div>
            <div>Top Category</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-white">
              Weekly
            </div>
            <div>Trend Reports</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex gap-4">
          <Link
            href="/trends"
            className="px-6 py-3 bg-white text-black rounded-xl"
          >
            Explore Trends
          </Link>

          <Link
            href="/newsletter"
            className="px-6 py-3 border border-gray-600 rounded-xl"
          >
            Join Newsletter
          </Link>
        </div>

        {/* Top Trends */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold mb-8">
            Top Trends
          </h2>

          <div className="space-y-6">
            {trends?.map((trend) => (
              <Link
                key={trend.id}
                href={`/trends/${trend.id}`}
              >
                <div className="border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-2xl font-bold">
                      {trend.title}
                    </h3>

                    <span className="text-green-400">
                      {trend.score}
                    </span>
                  </div>

                  <p className="text-gray-400">
                    {trend.description}
                  </p>

                  {trend.reason && (
                    <p className="text-gray-500 italic mt-3">
                      {trend.reason}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-24 border-t border-gray-800 pt-12">
          <h2 className="text-4xl font-bold mb-4">
            Get Weekly Trend Reports
          </h2>

          <p className="text-gray-400 mb-6">
            Join Spoteroo and receive the top emerging
            trends directly in your inbox every week.
          </p>

          <Link
            href="/newsletter"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Subscribe Free
          </Link>
        </section>
      </section>
    </main>
  );
}