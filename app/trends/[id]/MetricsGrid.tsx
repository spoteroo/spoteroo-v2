type MetricsGridProps = {
  trend: {
    opportunity_score?: number | null;
    market_size?: string | null;
    competition_level?: string | null;
    investment_rating?: string | null;
    momentum?: string | null;
  };
};

export default function MetricsGrid({
  trend,
}: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

      <div className="glass rounded-3xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
        <p className="text-sm uppercase tracking-wider text-slate-400">
          Opportunity Score
        </p>

        <h2 className="mt-3 text-4xl font-black text-green-400">
          {trend.opportunity_score ?? "-"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          AI Opportunity Rating
        </p>
      </div>

      <div className="glass rounded-3xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1">
        <p className="text-sm uppercase tracking-wider text-slate-400">
          Market Size
        </p>

        <h2 className="mt-3 text-3xl font-bold text-cyan-400">
          {trend.market_size ?? "-"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Estimated TAM
        </p>
      </div>

      <div className="glass rounded-3xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1">
        <p className="text-sm uppercase tracking-wider text-slate-400">
          Competition
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {trend.competition_level ?? "-"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Current Market
        </p>
      </div>

      <div className="glass rounded-3xl p-6 hover:border-yellow-500/40 transition-all duration-300 hover:-translate-y-1">
        <p className="text-sm uppercase tracking-wider text-slate-400">
          Investment
        </p>

        <h2 className="mt-3 text-3xl font-bold text-yellow-400">
          {trend.investment_rating ?? "-"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Investor Interest
        </p>
      </div>

      <div className="glass rounded-3xl p-6 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1">
        <p className="text-sm uppercase tracking-wider text-slate-400">
          Momentum
        </p>

        <h2 className="mt-3 text-3xl font-bold text-green-400">
          {trend.momentum ?? "-"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Growth Velocity
        </p>
      </div>

    </div>
  );
}