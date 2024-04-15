import { useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { Button, FileInput, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FiCameraOff } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { CancelButton } from "~/component/Buttons";
import CardComponent from "~/component/Card";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import WebcamCapture from "~/routes/model.ocr/Component/WebcamCapture";
import TextOverlayImage from "./TextOverlay";

function ImageTranslateComponent() {
  const [ImageUrl, setImageUrl] = useState<string | null>(null);
  const [isCameraOpen, setCameraiOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  let fetcher = useFetcher();
  let { translation } = uselitteraTranlation();
  const { isMobile } = useLoaderData();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const toggleCamera = () => {
    setCameraiOpen(!isCameraOpen);
  };
  const handleSubmit = () => {
    fetcher.submit(
      { imageUrl: ImageUrl, show_coordinate: true },
      {
        method: "POST",
        action: "/api/ocr",
      }
    );
  };
  console.log(fetcher.data);
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
  useEffect(() => {
    if (file) {
      const uploadFiles = async () => {
        await uploadFile(file);
      };
      uploadFiles();
    }
  }, [file]);

  const handleFormClear = () => {
    setImageUrl(null);
    resetFetcher(fetcher);
  };
  let textData = fetcher.data?.coordinate;
  let showCanva = textData?.length > 1;
  return (
    <div className="flex justify-center mt-3">
      {!showCanva && (
        <CardComponent>
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
                  maxHeight: "0",
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
      )}

      {showCanva && (
        <div className="flex flex-col gap-2">
          <TextOverlayImage
            imageUrl={ImageUrl} // URL or path to the image you want to use
            textData={textData}
          />
          <div className="flex gap-3 justify-center">
            <button onClick={handleFormClear}> cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageTranslateComponent;
