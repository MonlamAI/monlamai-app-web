import { Button, Card, FileInput, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import TooltipComponent from "./Tooltip";
import { useLoaderData } from "@remix-run/react";
import EachInference from "./EachInference";
import axios from "axios";
import CardComponent from "~/component/Card";
import { CancelButton } from "~/component/Buttons";
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import FileUpload from "./FileUpload";
import ErrorMessage from "../../../component/ErrorMessage";

type props = {
  fetcher: any;
};

export default function PDFInputSection({ fetcher }: props) {
  const { inferenceList } = useLoaderData();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState<string | null>();

  function handleClear() {
    resetFetcher(fetcher);
    setFile(null);
    setFilePath(null);
    setFileName("");
  }

  function handleStartJob() {
    let formData = new FormData();
    formData.append("pdf_file", filePath!);
    formData.append("file_name", fileName);
    fetcher.submit(formData, {
      method: "POST",
      action: "/api/ocr",
    });
  }

  let alldone = !!filePath;
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden max-w-[100vw] gap-3">
      <CardComponent>
        <div className="w-full relative min-h-[45vh] flex flex-col items-center justify-center gap-5">
          <TooltipComponent />
          <FileUpload
            file={file}
            setFile={setFile}
            inputUrl={filePath}
            setInputUrl={setFilePath}
            supported={[".pdf"]}
            setFilename={setFileName}
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
          {inferenceList.map((inference) => {
            return <EachInference inference={inference} key={inference.id} />;
          })}
        </div>
      </CardComponent>
    </div>
  );
}
