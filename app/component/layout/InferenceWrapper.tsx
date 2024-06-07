import React from "react";
import ListInput from "../ListInput";

function InferenceWrapper({
  children,
  selectedTool,
  setSelectedTool,
  options,
  reset,
}) {
  return (
    <main>
      {selectedTool && (
        <div className="flex justify-between mb-3">
          <ListInput
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            options={options}
            reset={reset}
          />
        </div>
      )}
      <div className="flex flex-col">{children}</div>
    </main>
  );
}

export default InferenceWrapper;
