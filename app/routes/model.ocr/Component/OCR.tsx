import { useFetcher, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import SingleInputSection from "./SingleInputSection";
import { resetFetcher } from "~/component/utils/resetFetcher";
import HeaderComponent from "~/component/HeaderComponent";

function OCR() {
  const [params, setParams] = useSearchParams();
  const SingleFilefetcher = useFetcher();

  const reset = () => {
    resetFetcher(SingleFilefetcher);
  };

  return (
    <div className="flex flex-col w-full mb-20">
      <div className="rounded-lg overflow-hidden">
        <HeaderComponent model="OCR" />
        <SingleInputSection fetcher={SingleFilefetcher} />
      </div>
    </div>
  );
}

export default OCR;
