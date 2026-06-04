export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-6">
          Spoteroo
        </h1>

        <p className="text-2xl text-gray-300 mb-8">
          Discover What's Next
        </p>

        <p className="text-lg text-gray-400 max-w-3xl">
          AI-powered opportunity intelligence platform that discovers
          emerging trends, startups, technologies, keywords, and market
          opportunities before they become mainstream.
        </p>

        <div className="mt-12 flex gap-4">
          <button className="px-6 py-3 bg-white text-black rounded-xl">
            Explore Trends
          </button>

          <button className="px-6 py-3 border border-gray-600 rounded-xl">
            Join Newsletter
          </button>
        </div>
      </section>
    </main>
  );
}