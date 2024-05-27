import { useLoaderData } from "@remix-run/react";
import React from "react";

function UserCount() {
  let { usercount } = useLoaderData();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Total Users</h1>
        <p className="mt-4 text-lg text-gray-600">{usercount}</p>
      </div>
    </div>
  );
}

export default UserCount;
