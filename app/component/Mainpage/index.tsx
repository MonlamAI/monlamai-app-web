import React from "react";
import Hero from "./Hero";
import List from "./List";
import PowerUser from "./PowerUser";
import Footer from "./Footer";

function Main() {
  return (
    <>
      <div className="w-full mx-auto relative  h-screen">
        <Hero />
        <List />
        <PowerUser />
        <Footer />
      </div>
    </>
  );
}

export default Main;
