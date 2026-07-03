type Trend = {
  title: string;
  description: string;
  category: string;
  score: number;
  reason: string;
};

type Props = {
  trend: Trend;
  selected: boolean;
  onToggle: () => void;
};

export default function GeneratedTrendCard({
  trend,
  selected,
  onToggle,
}: Props) {
  return (
    <div className="glass p-6 rounded-2xl">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          <h3 className="text-2xl font-bold">
            {trend.title}
          </h3>

          <p className="text-slate-400 mt-3">
            {trend.description}
          </p>

          <div className="flex gap-3 mt-4 flex-wrap">

            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20">
              {trend.category}
            </span>

            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/20">
              Score {trend.score}
            </span>

          </div>

          {trend.reason && (
            <p className="text-slate-500 italic mt-4">
              {trend.reason}
            </p>
          )}

        </div>

        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-5 h-5 ml-6"
        />

      </div>

    </div>
  );
}