"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <section className="text-center mb-20">

          <h1 className="text-6xl font-bold mb-6">
            About Spoteroo
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Spoteroo is an AI-powered opportunity intelligence
            platform helping founders, investors and builders
            discover emerging startup opportunities before they
            become mainstream.
          </p>

        </section>

        <section className="glass p-10 rounded-3xl mb-20">

          <h2 className="text-4xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="text-slate-400 leading-8">
            We believe the biggest startup opportunities appear
            long before everyone notices them.
            Spoteroo uses AI to identify future market trends,
            validate opportunities and generate startup ideas.
          </p>

        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">

          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Discover
            </h3>

            <p className="text-slate-400">
              Discover emerging industries,
              technologies and startup ideas.
            </p>
          </div>

          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Analyze
            </h3>

            <p className="text-slate-400">
              AI-powered market research,
              competitors and opportunity scores.
            </p>
          </div>

          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Build
            </h3>

            <p className="text-slate-400">
              Turn opportunities into
              successful startups.
            </p>
          </div>

        </section>

        <section className="glass p-12 rounded-3xl text-center">

          <h2 className="text-5xl font-bold mb-6">
            Ready to Discover Tomorrow?
          </h2>

          <p className="text-slate-400 mb-8">
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