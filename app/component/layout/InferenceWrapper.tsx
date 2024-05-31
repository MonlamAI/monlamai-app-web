import React from "react";
import ListInput from "../ListInput";

function InferenceWrapper({
  children,
  selectedTool,
  setSelectedTool,
  options,
}) {
  return (
    <main>
      {selectedTool && (
        <div className="flex justify-between mb-3">
          <ListInput
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            options={options}
          />
        </div>
      )}
      <div className="flex flex-col  lg:flex-row gap-5">{children}</div>
    </main>
  );
}

export default InferenceWrapper;
