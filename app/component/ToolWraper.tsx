import React from "react";
import { models } from "~/helper/models";

function ToolWraper({ title, children }) {
  let model = models.find((model) => model.name === title) ?? null;
  return (
    <>
      <div className="mx-auto w-11/12 md:w-4/5">
        <h1 className="flex gap-4 justify-center items-center mb-2 text-2xl lg:text-3xl text-center text-slate-700 ">
          {model?.icon}
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}

export default ToolWraper;
