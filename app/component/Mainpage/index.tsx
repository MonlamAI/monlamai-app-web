import { useLoaderData } from "@remix-run/react";
import React from "react";
import LoginPage from "../LoginPage";
import Hero from "./Hero";
import List from "./List";
import PowerUser from "./PowerUser";
import Header from "./Header";
import Footer from "./Footer";

function Main() {
  const { user } = useLoaderData();

  return (
    <div className="text-white">
      <div className="w-full mx-auto relative  h-screen">
        <Hero />
        <List />
        <PowerUser />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
