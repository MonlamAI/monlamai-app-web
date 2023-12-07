import React from "react";
import { models } from "~/helper/models";

function ToolWraper({ title, children }) {
  let model = models.find((model) => model.name === title) ?? null;
  return (
    <>
      <div className="mx-auto w-11/12 md:w-4/5">
        <h1 className="flex gap-4 justify-center items-center mb-2 text-2xl lg:text-3xl text-center text-slate-700 dark:text-gray-200 ">
          <div className="dark:invert">{model?.icon}</div>
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}

export default ToolWraper;
