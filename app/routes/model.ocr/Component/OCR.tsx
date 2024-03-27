import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import ListInput from "~/component/ListInput";
import SingleInputSection from "./SingleInputSection";
import PDFInputSection from "./PDFInputSection";
import ZipInputSection from "./ZipInputSection";

function OCR() {
  const [selectedTool, setSelectedTool] = useState("single");
  const SingleFilefetcher = useFetcher();
  const multipleFileFetcher = useFetcher();

  return (
    <div className="flex flex-col gap-2 w-full">
      <ListInput
        options={["single", "zip", "PDF"]}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      {selectedTool === "single" && (
        <SingleInputSection fetcher={SingleFilefetcher} />
      )}
      {selectedTool === "zip" && <ZipInputSection />}
      {selectedTool === "PDF" && (
        <PDFInputSection fetcher={multipleFileFetcher} />
      )}
    </div>
  );
}

export default OCR;
