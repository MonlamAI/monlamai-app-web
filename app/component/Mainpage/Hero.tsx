import React from "react";
import Header from "./Header";
import { TypeAnimation } from "react-type-animation";
function Hero() {
  let sequence = [
    "Monalm AI.",
    2000,
    "Neural Machine Translation.",
    2000,
    "Text to Speech.",
    2000,
    "OCR",
    2000,
    "སྨོན་ལམ་རིག་ནུས།",
    2000,
    "ཡིག་སྒྱུར་རིག་ནུས།",
    2000,
  ];
  return (
    <>
      <Header />
      <div className="flex justify-between flex-col h-screen  bg-[url('/assets/robot.jpg')] bg-no-repeat bg-center bg-cover  backdrop-blur-sm ">
        <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50 absolute inset-0 -z-10"></div>
        <div className=" w-full flex-1 flex justify-center items-center flex-col ">
          <h1 className="text-center text-[40px]  md:text-[50px] max-w-[1000px] mb-2">
            སྨོན་ལམ་རིག་ནུས།
          </h1>
          <TypeAnimation
            className="text-2xl md:text-3xl inline-block"
            sequence={sequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      </div>
    </>
  );
}

export default Hero;
