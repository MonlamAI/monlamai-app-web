import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import TooltipComponent from "./Tooltip";
import { useFetcher } from "@remix-run/react";
import ReactionButtons from "~/component/ReactionButtons";
import CopyToClipboard from "~/component/CopyToClipboard";
import axios from "axios";

function SingleInptSection({ fetcher }: any) {
  const [ImageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  let { translation } = uselitteraTranlation();
  const likeFetcher = useFetcher();
  const data = fetcher?.data;
  const inferenceId = fetcher.data?.id;
  const isActionSubmission = fetcher.state !== "idle";
  const errorMessage = data?.error_message;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleFormClear = () => {
    setImageUrl(null);
    resetFetcher(fetcher);
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
          setUploadProgress(percentCompleted);
        },
      });

      if (uploadStatus.status === 200) {
        const uploadedFilePath = uploadStatus.request.responseURL;
        const baseUrl = uploadedFilePath?.split("?")[0]!;
        setImageUrl(baseUrl!);
        console.log(`File ${file.name} uploaded successfully.`, uploadStatus);
      }
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  };
  const handleSubmit = () => {
    fetcher.submit(
      { imageUrl: ImageUrl },
      {
        method: "POST",
        action: "/api/ocr",
      }
    );
  };
  return (
    <div className="flex w-full gap-3">
      <Card className="md:w-1/2 relative">
        <TooltipComponent />
        <div className="w-full min-h-[45vh] flex flex-col items-center justify-center gap-5">
          <div className={ImageUrl ? "hidden" : ""}>
            <div className="mb-5 block">
              <Label
                htmlFor="file"
                value={translation.uploadImage}
                className="text-lg text-slate-700"
              />
            </div>
            <FileInput
              key={ImageUrl}
              helperText={`${translation.acceptedImage} JPG, PNG, JPEG`}
              id="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </div>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div>progress:{uploadProgress}</div>
          )}

          {ImageUrl && (
            <img
              src={ImageUrl}
              alt="selected file"
              style={{
                maxWidth: "100%",
                maxHeight: "40vh",
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <div className="flex justify-between">
          <Button
            type="reset"
            color="gray"
            onClick={handleFormClear}
            className="text-gray-500"
          >
            <div className="pt-1">{translation.reset}</div>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!file || !ImageUrl}
            isProcessing={fetcher.state !== "idle"}
          >
            <div className="pt-1">{translation.submit}</div>
          </Button>
        </div>
      </Card>
      <Card className="md:w-1/2">
        <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
          {isActionSubmission ? (
            <div className="h-full flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="text-lg  tracking-wide leading-loose overflow-auto">
              {errorMessage && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}
              {data?.text && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.text.replaceAll("\n", "<br>"),
                  }}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <div className="flex gap-3 md:gap-5 items-center p-2">
            <ReactionButtons
              fetcher={likeFetcher}
              output={data?.text}
              sourceText={ImageUrl}
              inferenceId={inferenceId}
            />
            {data?.text && <CopyToClipboard textToCopy={data?.text} />}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SingleInptSection;
