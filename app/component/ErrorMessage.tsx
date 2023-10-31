import { Link } from "@remix-run/react";
import React from "react";

function ErrorMessage({ error }) {
  console.log(error);
  return (
    <>
      <div className="py-10 m-auto w-[90%] md:w-[80%]">
        <div className="flex flex-col justify-center items-center gap-10 px-4 md:flex-row">
          <img
            src="/assets/about.jpg"
            alt="monlam"
            className="w-[80%] md:w-[60%] lg:w-[40%] border-[#dddcdc] rounded-lg shadow-sm hover:scale-105 transition-all duration-500"
          />
          <div className="w-[80%] md:w-[60%] lg:w-[40%] text-center">
            <h4 className="text-2xl mb-4 text-red-500">སྐྱོན་ཞིག་ཤོར་བ་རེད།</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorMessage;
