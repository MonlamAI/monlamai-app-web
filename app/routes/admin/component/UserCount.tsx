import { useLoaderData } from "@remix-run/react";
import React from "react";

function UserCount() {
  let { usercount } = useLoaderData();

  return <div>total user: {usercount}</div>;
}

export default UserCount;
