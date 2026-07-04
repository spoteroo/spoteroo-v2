"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type HistoryPoint = {
  score: number;
  votes: number;
  captured_at: string;
};

export default function TrendHistoryChart({
  data,
}: {
  data: HistoryPoint[];
}) {
  const chartData = data.map((item) => ({
    ...item,
    date: new Date(item.captured_at).toLocaleDateString(),
  }));

  return (
    <div className="glass rounded-3xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Trend Score History
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}