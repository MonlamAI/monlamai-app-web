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

type props = {
  fetcher: any;
};

export default function PDFInputSection({ fetcher }: props) {
  let { translation } = uselitteraTranlation();
  const { inferenceList } = useLoaderData();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState<string | null>();

  function handleFormClear() {
    resetFetcher(fetcher);
    setFile(null);
    setFilePath(null);
    setFileName("");
    setUploadProgress(0);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    if (file?.name) {
      const uploadFiles = async () => {
        await uploadFile(file);
      };

      uploadFiles();
    }
  }, [file?.name]);
  const uploadFile = async (file: File) => {
    try {
      let formData = new FormData();
      let filename = Date.now() + "-" + file.name;
      setFileName(filename);
      formData.append("filename", filename);
      formData.append("filetype", file.type);

      const response = await axios.post("/api/get_presigned_url", formData);
      const { url } = response.data;
      // Use Axios to upload the file to S3
      const uploadStatus = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      if (uploadStatus.status === 200) {
        const uploadedFilePath = uploadStatus.config.url;
        const baseUrl = uploadedFilePath?.split("?")[0];
        setFilePath(baseUrl);
        console.log(`File ${file.name} uploaded successfully.`, uploadStatus);
      }
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  };
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
          <div className="mb-5 block">
            <Label
              htmlFor="file"
              value={translation.uploadImage}
              className="text-lg text-slate-700"
            />
            {!file ? (
              <FileInput
                helperText={`${translation.acceptedImage} PDF`}
                id="file"
                name="files"
                accept=".pdf"
                onChange={handleFileChange}
                key={file?.size}
              />
            ) : (
              <ul>
                <li className="p-2 flex justify-between">
                  <span>{file.name}</span>
                  {uploadProgress != 100 && (
                    <span>{uploadProgress ? uploadProgress + "%" : ""}</span>
                  )}
                </li>
              </ul>
            )}
          </div>
          <CancelButton
            type="button"
            color="gray"
            onClick={handleFormClear}
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
          {fetcher.data?.error && <div>{fetcher.data?.error}</div>}

          {inferenceList.map((inference) => {
            return <EachInference inference={inference} key={inference.id} />;
          })}
        </div>
      </CardComponent>
    </div>
  );
}
