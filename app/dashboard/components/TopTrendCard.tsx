import Link from "next/link";

type Trend = {
  id: number;
  title: string;
  category: string;
  score: number;
};

type TopTrendCardProps = {
  trend: Trend | null;
};

export default function TopTrendCard({
  trend,
}: TopTrendCardProps) {
  if (!trend) {
    return null;
  }

  return (
    <div className="glass p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">
        Top Trend
      </h2>

      <h3 className="text-3xl font-bold">
        {trend.title}
      </h3>

      <p className="text-slate-400 mt-2">
        {trend.category}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
          Score {trend.score}
        </span>

        <Link
          href={`/trends/${trend.id}`}
          className="text-blue-400 hover:underline"
        >
          View →
        </Link>
      </div>
    </div>
  );
}