import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data: trends } = await supabase
    .from("trends")
    .select("*")
    .order("score", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen text-white">
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* Hero */}
        <div className="text-center mb-24">
          <h1
            className="
              text-7xl
              md:text-8xl
              font-extrabold
              bg-gradient-to-r
              from-white
              via-blue-300
              to-cyan-400
              bg-clip-text
              text-transparent
              mb-6
            "
          >
            Spot Tomorrow's
            <br />
            Opportunities Today
          </h1>

          <p className="text-2xl text-slate-300 mb-6">
            Discover emerging startup trends before everyone else.
          </p>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Spoteroo helps founders, investors, and builders discover
            high-potential trends, startup opportunities, and market shifts
            before they become mainstream.
          </p>

          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            <Link
              href="/trends"
              className="
                bg-blue-600
                px-8 py-4
                rounded-xl
                font-semibold
                hover:bg-blue-500
                transition
                shadow-[0_0_25px_rgba(59,130,246,0.4)]
              "
            >
              Explore Trends
            </Link>

            <Link
              href="/newsletter"
              className="
                glass
                px-8 py-4
                rounded-xl
                font-semibold
              "
            >
              Join Newsletter
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="glass p-8 text-center">
            <h3 className="text-5xl font-bold text-white">
              500+
            </h3>
            <p className="text-slate-400 mt-2">
              Trends Tracked
            </p>
          </div>

          <div className="glass p-8 text-center">
            <h3 className="text-5xl font-bold text-white">
              50+
            </h3>
            <p className="text-slate-400 mt-2">
              Categories
            </p>
          </div>

          <div className="glass p-8 text-center">
            <h3 className="text-5xl font-bold text-white">
              10K+
            </h3>
            <p className="text-slate-400 mt-2">
              Monthly Readers
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="glass p-8">
            <h3 className="text-2xl font-bold mb-4">
              🔍 Trend Discovery
            </h3>

            <p className="text-slate-400">
              Discover emerging technologies,
              industries, and startup opportunities.
            </p>
          </div>

          <div className="glass p-8">
            <h3 className="text-2xl font-bold mb-4">
              💡 Startup Ideas
            </h3>

            <p className="text-slate-400">
              Generate startup concepts from
              validated market trends.
            </p>
          </div>

          <div className="glass p-8">
            <h3 className="text-2xl font-bold mb-4">
              📈 Market Analysis
            </h3>

            <p className="text-slate-400">
              Understand competitors, risks,
              and market potential instantly.
            </p>
          </div>
        </div>

        {/* Top Trends */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-10">
            Top Trends
          </h2>

          <div className="space-y-5">
            {trends?.map((trend) => (
              <Link
                key={trend.id}
                href={`/trends/${trend.id}`}
              >
                <div
                  className="
                    glass
                    p-6
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {trend.title}
                      </h3>

                      <p className="text-slate-400 mt-3">
                        {trend.description}
                      </p>
                    </div>

                    <span
                      className="
                        px-4 py-2
                        rounded-full
                        bg-green-500/15
                        text-green-300
                        border border-green-500/20
                      "
                    >
                      {trend.score}
                    </span>
                  </div>

                  {trend.reason && (
                    <p className="text-slate-500 mt-4 italic">
                      {trend.reason}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass p-12 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to discover the next
            billion-dollar opportunity?
          </h2>

          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Join Spoteroo and stay ahead of emerging
            markets, startup opportunities, and future trends.
          </p>

          <Link
            href="/trends"
            className="
              inline-block
              bg-blue-600
              px-8 py-4
              rounded-xl
              font-semibold
              hover:bg-blue-500
              transition
              shadow-[0_0_25px_rgba(59,130,246,0.4)]
            "
          >
            Start Exploring →
          </Link>
        </section>

      </section>
    </main>
  );
}