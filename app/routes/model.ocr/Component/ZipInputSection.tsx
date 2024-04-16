import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import TooltipComponent from "./Tooltip";
import { useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import EachInference from "./EachInference";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { CancelButton } from "~/component/Buttons";
import { RxCross2 } from "react-icons/rx";
import CardComponent from "~/component/Card";
import { IoSend } from "react-icons/io5";

function ZipInputSection({ fetcher }: any) {
  const { inferenceList } = useLoaderData();

  const [file, setFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState({});
  let { translation } = uselitteraTranlation();

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    setFile(file);
  };
  useEffect(() => {
    if (file) {
      const uploadFiles = async () => {
        await uploadFile(file);
      };
      uploadFiles();
    }
  }, [file]);

  const uploadFile = async (file: File) => {
    try {
      let formData = new FormData();
      let uniqueFilename = Date.now() + "-" + file.name;
      formData.append("filename", uniqueFilename);
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
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: percentCompleted,
          }));
        },
      });

      if (uploadStatus.status === 200) {
        const uploadedFilePath = uploadStatus.config.url;
        const baseUrl = uploadedFilePath?.split("?")[0]!;
        setInputUrl(baseUrl);
        console.log(`File ${file.name} uploaded successfully.`, uploadStatus);
      }
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  };
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
    setUploadProgress({});
    setFile(null);
    setInputUrl(null);
    resetFetcher(fetcher);
  }
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
                helperText={`${translation.acceptedImage} Zip , gz`}
                id="file"
                name="files"
                accept=".zip, .gz"
                onChange={handleFileChange}
                key={inputUrl}
              />
            ) : (
              <ul>
                <li className="p-2 flex justify-between">
                  <span>{file.name}</span>
                  {uploadProgress[file.name] != 100 && (
                    <span>
                      {uploadProgress[file.name]
                        ? uploadProgress[file.name] + "%"
                        : ""}
                    </span>
                  )}
                </li>
              </ul>
            )}
          </div>
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
          {fetcher.data?.error && <div>{fetcher.data?.error}</div>}
          {inferenceList.map((inference) => {
            return <EachInference inference={inference} key={inference.id} />;
          })}
        </div>
      </CardComponent>
    </div>
  );
}

export default ZipInputSection;
