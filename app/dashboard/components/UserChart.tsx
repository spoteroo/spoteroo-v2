"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

type UserChartProps = {
  data: {
    name: string;
    users: number;
  }[];
};

export default function UserChart({
  data,
}: UserChartProps) {
  return (
    <div className="glass p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        User Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="users"
            nameKey="name"
            outerRadius={110}
            label
          >
            <Cell fill="#3b82f6" />
            <Cell fill="#eab308" />
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}