import { useLoaderData } from "@remix-run/react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ClientOnly } from "remix-utils/client-only";
import Map from "../component/Map.client";

function UserCount() {
  let { usercount } = useLoaderData();

  let totalUsers = usercount.reduce((acc, curr) => acc + curr._count._all, 0);
  const data = usercount.map((item) => ({
    country: item.country,
    count: item._count._all,
  }));

  return (
    <div className="w-full p-4">
      <div className="h-[30vh] md:h-[50vh] w-full">
        <ClientOnly fallback={<div>loading</div>}>{() => <Map />}</ClientOnly>
      </div>

      <h2 className="text-xl font-bold mb-4">User Counts by Country</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 font-bold">Total Users: {totalUsers}</div>
    </div>
  );
}

export default UserCount;
