type Props = {
  trend: {
    opportunity_score?: number | null;
    competition_level?: string | null;
  };
};

export default function OpportunityRisk({ trend }: Props) {
  const opportunity = trend.opportunity_score ?? 70;

  const risk =
    trend.competition_level === "High"
      ? 75
      : trend.competition_level === "Medium"
      ? 45
      : 20;

  return (
    <section className="grid lg:grid-cols-2 gap-8 mb-10">

      <MetricCard
        title="🎯 Opportunity Meter"
        score={opportunity}
        color="from-green-500 via-emerald-400 to-cyan-400"
        label={
          opportunity >= 90
            ? "Exceptional Opportunity"
            : opportunity >= 75
            ? "Excellent Opportunity"
            : opportunity >= 60
            ? "Good Opportunity"
            : "Emerging Opportunity"
        }
      />

      <MetricCard
        title="⚠ Risk Meter"
        score={risk}
        color="from-red-500 via-orange-400 to-yellow-400"
        label={
          risk >= 70
            ? "High Risk"
            : risk >= 40
            ? "Moderate Risk"
            : "Low Risk"
        }
      />

    </section>
  );
}

type MetricCardProps = {
  title: string;
  score: number;
  color: string;
  label: string;
};

function MetricCard({
  title,
  score,
  color,
  label,
}: MetricCardProps) {
  return (
    <div className="glass rounded-3xl p-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <span className="text-4xl font-black">
          {score}
        </span>

      </div>

      <div className="h-4 rounded-full bg-slate-800 overflow-hidden mb-5">

        <div
          className={`h-full bg-gradient-to-r ${color}`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <p className="text-slate-300">
        {label}
      </p>

    </div>
  );
}