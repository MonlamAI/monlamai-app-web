import { useFetcher, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import ListInput from "~/component/ListInput";
import SingleInputSection from "./SingleInputSection";
import PDFInputSection from "./PDFInputSection";
import ZipInputSection from "./ZipInputSection";
import { resetFetcher } from "~/component/utils/resetFetcher";

function OCR() {
  const [params, setParams] = useSearchParams();
  const selectedTool = params.get("tool") || "image";
  const SingleFilefetcher = useFetcher();
  const pdfFetcher = useFetcher();
  const zipFetcher = useFetcher();
  useEffect(() => {
    if (selectedTool !== "image") {
      resetFetcher(pdfFetcher);
      resetFetcher(zipFetcher);
      resetFetcher(SingleFilefetcher);
    }
  }, [selectedTool]);
  const setSelectedTool = (tool: string) => {
    setParams((p) => {
      p.set("tool", tool);
      return p;
    });
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <ListInput
        options={["image", "zip", "PDF"]}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      {selectedTool === "image" && (
        <SingleInputSection fetcher={SingleFilefetcher} />
      )}
      {selectedTool === "zip" && <ZipInputSection fetcher={zipFetcher} />}
      {selectedTool === "PDF" && <PDFInputSection fetcher={pdfFetcher} />}
    </div>
  );
}

export default OCR;
