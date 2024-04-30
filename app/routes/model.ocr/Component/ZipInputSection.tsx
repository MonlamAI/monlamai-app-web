import { Button } from "flowbite-react";
import { useState } from "react";
import TooltipComponent from "./Tooltip";
import { useLoaderData } from "@remix-run/react";
import EachInference from "./EachInference";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { CancelButton } from "~/component/Buttons";
import { RxCross2 } from "react-icons/rx";
import CardComponent from "~/component/Card";
import { IoSend } from "react-icons/io5";
import FileUpload from "./FileUpload";
import ErrorMessage from "../../../component/ErrorMessage";
import { InferenceList } from "~/component/InferenceList";

function ZipInputSection({ fetcher }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState<string | null>(null);

  let alldone = !!file && !!inputUrl;

  function handleStartJob() {
    fetcher.submit(
      { zip_input_url: inputUrl },
      {
        method: "POST",
        action: "/api/ocr",
      }
    );
  }
  function handleClear() {
    setFile(null);
    resetFetcher(fetcher);
  }
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden max-w-[100vw] gap-3">
      <CardComponent>
        <div className="w-full relative min-h-[45vh] flex flex-col items-center justify-center gap-5">
          <TooltipComponent />
          <FileUpload
            file={file}
            setFile={setFile}
            inputUrl={inputUrl}
            setInputUrl={setInputUrl}
            supported={[".zip", ".gz"]}
            setFilename={() => {}}
          />
          <CancelButton
            type="button"
            color="gray"
            onClick={handleClear}
            hidden={!file}
          >
            <RxCross2 size={20} />
          </CancelButton>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            size="xs"
            isProcessing={fetcher.state !== "idle"}
            onClick={handleStartJob}
            disabled={!alldone}
          >
            <IoSend size={18} />
          </Button>
        </div>
      </CardComponent>
      <CardComponent>
        <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
          {fetcher.data?.error && (
            <ErrorMessage
              message={fetcher.data?.error}
              handleClose={handleClear}
            />
          )}
          <InferenceList />
        </div>
      </CardComponent>
    </div>
  );
}

export default ZipInputSection;
