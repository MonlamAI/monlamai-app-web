import { useLoaderData } from "@remix-run/react";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28FF4",
  "#FF8383",
  "#83FF8A",
];

function InferenceCount() {
  let { inferenceCount } = useLoaderData();
  if (!inferenceCount) return null;

  const data = inferenceCount.map((item) => ({
    name: item.model,
    value: item._count._all,
  }));

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Inference Counts
        </h1>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InferenceCount;
