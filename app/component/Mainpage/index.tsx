import { useLoaderData } from "@remix-run/react";
import React from "react";
import LoginPage from "../LoginPage";
import Hero from "./Hero";
import List from "./List";
import PowerUser from "./PowerUser";

function Main() {
  const { user } = useLoaderData();

  return (
    <div className="bg-[#1d2d44] text-white">
      <div className="w-full mx-auto">
        <Hero />
        <List />
        <PowerUser />
      </div>
    </div>
  );
}

export default Main;
