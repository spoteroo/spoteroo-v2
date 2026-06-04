export default function TrendsPage() {
  const trends = [
    { name: "AI Agents", score: 94, category: "AI" },
    { name: "Vertical SaaS", score: 88, category: "Software" },
    { name: "Robotics", score: 81, category: "Hardware" },
    { name: "Creator Economy", score: 77, category: "Media" },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-8">Trending Opportunities</h1>

      <div className="grid gap-6">
        {trends.map((trend) => (
          <div
            key={trend.name}
            className="border border-gray-700 rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold">{trend.name}</h2>

            <p className="text-gray-400 mt-2">
              Category: {trend.category}
            </p>

            <p className="mt-3 text-green-400 font-bold">
              Opportunity Score: {trend.score}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}