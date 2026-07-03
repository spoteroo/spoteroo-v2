"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type RevenueChartProps = {
  data: {
    name: string;
    revenue: number;
  }[];
};

export default function RevenueChart({
  data,
}: RevenueChartProps) {
  return (
    <div className="glass p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Revenue
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}