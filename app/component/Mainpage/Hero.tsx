import React from "react";
import Header from "./Header";

function Hero() {
  return (
    <div className="text-white flex justify-between flex-col px-[50px] py-[100px] h-[800px]  bg-no-repeat bg-center backdrop-blur-sm ">
      <Header />
      <div className=" w-full flex justify-center items-center flex-col ">
        <img
          src="/assets/buddhalogo.png"
          alt="logo"
          className="w-1/5 object-cover"
        />
        <h1 className="text-center font-Elsie text-[80px] max-w-[1000px]">
          Artificial intelligence in service of Tibetan language and culture
        </h1>
      </div>
    </div>
  );
}

export default Hero;
