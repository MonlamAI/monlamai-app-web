import { useLoaderData } from "@remix-run/react";
import React from "react";
import LoginPage from "./LoginPage";

function Main() {
  const { user } = useLoaderData();

  if (!user) return <LoginPage />;

  return <div>main</div>;
}

export default Main;
