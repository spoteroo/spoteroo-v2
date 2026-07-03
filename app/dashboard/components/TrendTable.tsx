import Link from "next/link";

type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
  reason: string | null;
};

type TrendTableProps = {
  trends: Trend[];
  onDelete: (id: number) => void;
};

export default function TrendTable({
  trends,
  onDelete,
}: TrendTableProps) {
  if (trends.length === 0) {
    return (
      <div className="glass p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold">
          No Trends Found
        </h2>

        <p className="text-slate-400 mt-3">
          Generate or discover trends to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-slate-700">
          <tr className="text-left">
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Score</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {trends.map((trend) => (
            <tr
              key={trend.id}
              className="border-b border-slate-800 hover:bg-slate-900/40"
            >
              <td className="p-4">
                <Link
                  href={`/trends/${trend.id}`}
                  className="font-semibold hover:text-blue-400"
                >
                  {trend.title}
                </Link>

                <p className="text-sm text-slate-400 mt-1">
                  {trend.description}
                </p>
              </td>

              <td className="p-4">
                {trend.category}
              </td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300">
                  {trend.score}
                </span>
              </td>

              <td className="p-4">
                <button
                  onClick={() => onDelete(trend.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}