import React from "react";
import ListInput from "../ListInput";

function InferenceWrapper({
  children,
  selectedTool,
  setSelectedTool,
  options,
}) {
  return (
    <main className="mx-auto w-11/12 ">
      {selectedTool && (
        <div className="flex justify-between mb-3">
          <ListInput
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            options={options}
          />
        </div>
      )}
      <div className="flex flex-col  lg:flex-row gap-3 lg:h-[60vh]">
        {children}
      </div>
    </main>
  );
}

export default InferenceWrapper;
