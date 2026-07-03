type BusinessMetricsProps = {
  revenue: number;
  mrr: number;
  proUsers: number;
  freeUsers: number;
  conversionRate: number;
};

export default function BusinessMetrics({
  revenue,
  mrr,
  proUsers,
  freeUsers,
  conversionRate,
}: BusinessMetricsProps) {
  return (
    <div className="grid md:grid-cols-5 gap-6 mb-10">
      <div className="glass p-6">
        <p className="text-slate-400 text-sm">
          Total Revenue
        </p>

        <h2 className="text-4xl font-bold mt-3 text-green-400">
          ${revenue}
        </h2>
      </div>

      <div className="glass p-6">
        <p className="text-slate-400 text-sm">
          Monthly Recurring Revenue
        </p>

        <h2 className="text-4xl font-bold mt-3 text-blue-400">
          ${mrr}
        </h2>
      </div>

      <div className="glass p-6">
        <p className="text-slate-400 text-sm">
          Pro Users
        </p>

        <h2 className="text-4xl font-bold mt-3 text-yellow-400">
          {proUsers}
        </h2>
      </div>

      <div className="glass p-6">
        <p className="text-slate-400 text-sm">
          Free Users
        </p>

        <h2 className="text-4xl font-bold mt-3 text-cyan-400">
          {freeUsers}
        </h2>
      </div>

      <div className="glass p-6">
        <p className="text-slate-400 text-sm">
          Conversion Rate
        </p>

        <h2 className="text-4xl font-bold mt-3 text-purple-400">
          {conversionRate}%
        </h2>
      </div>
    </div>
  );
}