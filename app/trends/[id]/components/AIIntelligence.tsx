type Props = {
  trend: {
    opportunity_score?: number | null;
    momentum?: string | null;
    investment_rating?: string | null;
    market_size?: string | null;
  };
};

export default function AIIntelligence({ trend }: Props) {
  const confidence = Math.min(
    100,
    Math.max(40, trend.opportunity_score ?? 70)
  );

  return (
    <section className="glass rounded-3xl p-8 mb-10">

      <div className="flex items-center gap-3 mb-8">

        <div className="h-12 w-12 rounded-2xl bg-blue-500/15 flex items-center justify-center text-2xl">
          🤖
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Intelligence
          </h2>

          <p className="text-slate-400">
            Spoteroo AI confidence and market signals
          </p>
        </div>

      </div>

      <div className="mb-8">

        <div className="flex justify-between mb-3">

          <span className="text-slate-300">
            Confidence Score
          </span>

          <span className="font-bold text-green-400">
            {confidence}%
          </span>

        </div>

        <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 transition-all duration-700"
            style={{ width: `${confidence}%` }}
          />

        </div>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <SignalCard
          icon="📈"
          title="Momentum"
          value={trend.momentum ?? "Growing"}
        />

        <SignalCard
          icon="💰"
          title="Investment"
          value={trend.investment_rating ?? "Medium"}
        />

        <SignalCard
          icon="🌍"
          title="Market"
          value={trend.market_size ?? "Emerging"}
        />

        <SignalCard
          icon="⭐"
          title="Opportunity"
          value={`${trend.opportunity_score ?? 0}/100`}
        />

      </div>

    </section>
  );
}

type SignalCardProps = {
  icon: string;
  title: string;
  value: string;
};

function SignalCard({
  icon,
  title,
  value,
}: SignalCardProps) {
  return (
    <div className="glass rounded-2xl p-6">

      <div className="text-3xl mb-4">
        {icon}
      </div>

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold">
        {value}
      </h3>

    </div>
  );
}