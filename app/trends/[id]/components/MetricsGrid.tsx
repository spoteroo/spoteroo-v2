type Trend = {
  opportunity_score?: number | null;
  market_size?: string | null;
  competition_level?: string | null;
  investment_rating?: string | null;
  momentum?: string | null;
};

export default function MetricsGrid({
  trend,
}: {
  trend: Trend;
}) {
  const cards = [
    {
      title: "Opportunity Score",
      value: trend.opportunity_score ?? "-",
      color: "text-green-400",
      subtitle: "AI Opportunity Rating",
    },
    {
      title: "Market Size",
      value: trend.market_size ?? "-",
      color: "text-cyan-400",
      subtitle: "Estimated TAM",
    },
    {
      title: "Competition",
      value: trend.competition_level ?? "-",
      color: "text-purple-400",
      subtitle: "Current Market",
    },
    {
      title: "Investment",
      value: trend.investment_rating ?? "-",
      color: "text-yellow-400",
      subtitle: "Investor Interest",
    },
    {
      title: "Momentum",
      value: trend.momentum ?? "-",
      color: "text-green-400",
      subtitle: "Growth Velocity",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="glass rounded-3xl p-6 hover:-translate-y-1 transition-all"
        >
          <p className="text-sm uppercase tracking-wider text-slate-400">
            {card.title}
          </p>

          <h2 className={`mt-3 text-3xl font-black ${card.color}`}>
            {card.value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}