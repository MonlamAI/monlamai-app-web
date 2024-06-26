import { useLoaderData } from "@remix-run/react";
import React from "react";

function UserCount() {
  let { usercount } = useLoaderData();

  let totalUsers = usercount.reduce((acc, curr) => acc + curr._count._all, 0);
  return (
    <div className="md:w-1/2 p-4">
      <h2 className="text-xl font-bold mb-4">User Counts by Country</h2>
      <table className="min-w-full bg-white text-gray-700 shadow-md rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm">
              Country
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm">
              User Count
            </th>
          </tr>
        </thead>
        <tbody>
          {usercount.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{data.country}</td>
              <td className="py-2 px-4">{data._count._all}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-2 px-4 font-bold">Total</td>
            <td className="py-2 px-4 font-bold">{totalUsers}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default UserCount;
