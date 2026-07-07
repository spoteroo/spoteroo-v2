"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-20">

        <section className="text-center mb-20">

  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
    About Spoteroo
  </h1>

  <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-8 text-slate-400">
    Spoteroo is an AI-powered opportunity intelligence
    platform helping founders, investors and builders
    discover emerging startup opportunities before they
    become mainstream.
  </p>

  <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
    <span className="glass rounded-full px-4 py-2">
      🚀 AI Opportunity Intelligence
    </span>

    <span className="glass rounded-full px-4 py-2">
      📈 Emerging Startup Trends
    </span>

    <span className="glass rounded-full px-4 py-2">
      💡 Startup Idea Generation
    </span>
  </div>

</section>

        <section className="glass rounded-3xl p-6 sm:p-8 lg:p-10 mb-20">

          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="text-slate-400 leading-8">
            We believe the biggest startup opportunities appear
            long before everyone notices them.
            Spoteroo uses AI to identify future market trends,
            validate opportunities and generate startup ideas.
          </p>

          <p className="mt-6 leading-8 text-slate-400">
  Spoteroo combines artificial intelligence with market intelligence
  to help entrepreneurs, investors, and innovation teams identify
  high-potential opportunities earlier, reducing research time and
  supporting better product and business decisions.
</p>

        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

          <div className="glass rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border hover:border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4">
              Discover
            </h3>

            <p className="text-slate-400">
              Discover emerging industries,
              technologies and startup ideas.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border hover:border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4">
              Analyze
            </h3>

            <p className="text-slate-400">
              AI-powered market research,
              competitors and opportunity scores.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border hover:border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4">
              Build
            </h3>

            <p className="text-slate-400">
              Turn opportunities into
              successful startups.
            </p>
          </div>

        </section>

        <section className="glass rounded-3xl p-8 sm:p-10 lg:p-12 text-center">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Discover Tomorrow?
          </h2>

          <p className="mb-8 text-base sm:text-lg text-slate-400">
            Join Spoteroo and stay ahead
            of emerging markets.
          </p>

          <Link
            href="/trends"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold"
          >
            Explore Trends →
          </Link>

        </section>

      </div>
    </main>
  );
}