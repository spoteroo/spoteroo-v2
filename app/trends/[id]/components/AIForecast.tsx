type AIForecastProps = {
  trend: {
    forecast_30d?: number | null;
    forecast_90d?: number | null;
    forecast_1y?: number | null;
    success_probability?: number | null;
    unicorn_potential?: number | null;
  };
};

export default function AIForecast({
  trend,
}: AIForecastProps) {
  return (
    <section className="glass rounded-3xl p-8 mb-10">

      <h2 className="text-3xl font-bold mb-8">
        📈 AI Forecast
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

        <ForecastCard
          title="30 Days"
          value={`+${trend.forecast_30d ?? 0}%`}
          color="text-green-400"
        />

        <ForecastCard
          title="90 Days"
          value={`+${trend.forecast_90d ?? 0}%`}
          color="text-blue-400"
        />

        <ForecastCard
          title="1 Year"
          value={`+${trend.forecast_1y ?? 0}%`}
          color="text-cyan-400"
        />

        <ForecastCard
          title="Success"
          value={`${trend.success_probability ?? 0}%`}
          color="text-yellow-400"
        />

        <ForecastCard
          title="Unicorn"
          value={`${trend.unicorn_potential ?? 0}%`}
          color="text-pink-400"
        />

      </div>

    </section>
  );
}

type ForecastCardProps = {
  title: string;
  value: string;
  color: string;
};

function ForecastCard({
  title,
  value,
  color,
}: ForecastCardProps) {
  return (
    <div className="glass rounded-2xl p-5">

      <p className="text-slate-400">
        {title}
      </p>

      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>

    </div>
  );
}