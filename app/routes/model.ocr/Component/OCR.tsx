import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import ListInput from "~/component/ListInput";
import SingleInputSection from "./SingleInputSection";
import PDFInputSection from "./PDFInputSection";
import ZipInputSection from "./ZipInputSection";
import { resetFetcher } from "~/component/utils/resetFetcher";

function OCR() {
  const [selectedTool, setSelectedTool] = useState("single");
  const SingleFilefetcher = useFetcher();
  const pdfFetcher = useFetcher();
  const zipFetcher = useFetcher();
  useEffect(() => {
    resetFetcher(pdfFetcher);
    resetFetcher(zipFetcher);
    resetFetcher(SingleFilefetcher);
  }, [selectedTool]);
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
      {selectedTool === "zip" && <ZipInputSection fetcher={zipFetcher} />}
      {selectedTool === "PDF" && <PDFInputSection fetcher={pdfFetcher} />}
    </div>
  );
}

export default OCR;
