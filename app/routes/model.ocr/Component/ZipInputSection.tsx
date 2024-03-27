import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import TooltipComponent from "./Tooltip";
import { useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import EachInference from "./EachInference";
import { resetFetcher } from "~/component/utils/resetFetcher";
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
    <div className="flex w-full gap-3">
      <Card className="md:w-1/2 relative">
        <TooltipComponent />
        <div>
          <div className="w-full min-h-[45vh] flex flex-col items-center justify-center gap-5">
            <div className="mb-5 block w-full">
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
                  accept=".zip"
                  onChange={handleFileChange}
                  key={inputUrl}
                />
              ) : (
                <ul>
                  <li className="p-2 flex justify-between">
                    <span>{file.name}</span>
                    <span>
                      {uploadProgress[file.name]
                        ? uploadProgress[file.name] + "%"
                        : ""}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              color="gray"
              className="text-gray-500"
              onClick={handleClear}
            >
              <div className="pt-1">{translation.reset}</div>
            </Button>
            <Button
              type="button"
              isProcessing={fetcher.state !== "idle"}
              onClick={handleStartJob}
              disabled={!alldone}
            >
              <div className="pt-1">{translation.submit}</div>
            </Button>
          </div>
        </div>
      </Card>
      <Card className="md:w-1/2">
        <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
          {inferenceList.map((inference) => {
            return <EachInference inference={inference} key={inference.id} />;
          })}
        </div>
      </Card>
    </div>
  );
}

export default ZipInputSection;
