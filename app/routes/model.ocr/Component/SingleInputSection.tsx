import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import TooltipComponent from "./Tooltip";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ReactionButtons from "~/component/ReactionButtons";
import CopyToClipboard from "~/component/CopyToClipboard";
import axios from "axios";
import Speak from "~/component/Speak";
import { GoPencil } from "react-icons/go";
import { EditActionButtons } from "~/routes/model.mt/components/UtilityComponent";
import EditDisplay from "~/component/EditDisplay";
import WebcamCapture from "./WebcamCapture";
import { FaCamera } from "react-icons/fa";
import { FiCameraOff } from "react-icons/fi";
import CardComponent from "~/component/Card";
import { RxCross2 } from "react-icons/rx";
import { CancelButton } from "~/component/Buttons";
import { NonEditButtons } from "~/component/ActionButtons";

function SingleInptSection({ fetcher }: any) {
  const [ImageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [isCameraOpen, setCameraiOpen] = useState(false);

  let { translation } = uselitteraTranlation();
  const likeFetcher = useFetcher();
  const editfetcher = useFetcher();
  const { isMobile } = useLoaderData();

  const editData = editfetcher.data?.edited;
  const data = fetcher?.data;
  const text = data?.text;
  const inferenceId = fetcher.data?.inferenceId;
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
    resetFetcher(editfetcher);
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

  function handleCancelEdit() {
    setEdit(false);
    setEditText("");
  }

  function handleEditSubmit() {
    let edited = editText;
    editfetcher.submit(
      {
        inferenceId,
        edited,
      },
      {
        method: "PATCH",
      }
    );
    setEdit(false);
  }

  const toggleCamera = () => {
    setCameraiOpen(!isCameraOpen);
  };

  function handleCopy() {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex flex-col lg:flex-row  overflow-hidden max-w-[100vw] gap-3">
      <CardComponent>
        {/* <TooltipComponent /> */}
        <div className="w-full relative min-h-[45vh] flex flex-col items-center justify-center gap-5">
          <div className={ImageUrl || isCameraOpen ? "hidden" : ""}>
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
          {!ImageUrl && !isCameraOpen && <div>OR</div>}
          {!isMobile && (
            <Button
              color="dark"
              onClick={toggleCamera}
              className={ImageUrl ? "hidden" : ""}
            >
              {isCameraOpen ? (
                <>
                  <FiCameraOff className="mr-2" />
                  <p>Camera off</p>
                </>
              ) : (
                <>
                  <FaCamera className="mr-2" />
                  <p>Take Photo</p>
                </>
              )}
            </Button>
          )}
          {isCameraOpen && !ImageUrl && !isMobile && (
            <WebcamCapture setFile={setFile} />
          )}
          {!ImageUrl && isMobile && (
            <>
              <Label
                htmlFor="take_photo"
                className="flex justify-center items-center bg-black rounded-md text-white py-2 px-3"
              >
                <FaCamera className="mr-2" />
                <p>Take Photo</p>
              </Label>
              <input
                type="file"
                accept="image/*"
                capture="environment" // Use "user" for front camera if needed
                id="take_photo"
                name="take_photo"
                className="opacity-0"
                onChange={handleFileChange}
              />
            </>
          )}
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
              onLoad={handleSubmit}
            />
          )}
          <CancelButton
            type="reset"
            color="gray"
            onClick={handleFormClear}
            hidden={!file || !ImageUrl}
          >
            <RxCross2 size={20} />
          </CancelButton>
        </div>
      </CardComponent>
      <CardComponent>
        <div className="w-full flex flex-1 max-h-[45vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
          {isActionSubmission ? (
            <div className="w-full flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              <div className="text-lg tracking-wide leading-loose">
                {errorMessage && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{errorMessage}</span>
                  </div>
                )}
                {!edit && text && !editData && (
                  <div
                    className="text-xl"
                    dangerouslySetInnerHTML={{
                      __html: text?.replaceAll("\n", "<br>"),
                    }}
                  />
                )}
              </div>
              {edit && (
                <EditDisplay editText={editText} setEditText={setEditText} />
              )}
              {!edit && editData && <p className="text-xl">{editData}</p>}
            </>
          )}
        </div>
        {edit && (
          <EditActionButtons
            handleCancelEdit={handleCancelEdit}
            handleEditSubmit={handleEditSubmit}
            editfetcher={editfetcher}
            editText={editText}
            outputText={text}
          />
        )}
        {!edit && inferenceId && (
          <NonEditButtons
            selectedTool="text"
            likefetcher={likeFetcher}
            sourceText={ImageUrl || ""}
            inferenceId={inferenceId}
            setEdit={setEdit}
            text={editData ?? text}
            handleCopy={handleCopy}
            setEditText={setEditText}
            sourceLang="en"
          />
        )}
      </CardComponent>
    </div>
  );
}

export default SingleInptSection;
