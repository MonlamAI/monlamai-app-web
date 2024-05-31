import React, { useState, ChangeEvent } from "react";

import { Button, FileInput, Label } from "flowbite-react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import WebcamCapture from "./WebcamCapture";
import { useLoaderData } from "@remix-run/react";
import { FaCamera } from "react-icons/fa";
import { CancelButton } from "~/component/Buttons";
import { RxCross2 } from "react-icons/rx";
import {
  BiRotateLeft,
  BiRotateRight,
  BiSave,
  BiZoomIn,
  BiZoomOut,
} from "react-icons/bi";
import { IoSend } from "react-icons/io5";

import { Cropper, CropperRef } from "react-advanced-cropper";
export const ImageCropper = ({
  uploadFile,
  handleReset,
}: {
  uploadFile: (data: File) => void;
  handleReset: () => void;
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cropperRef = React.useRef<CropperRef>(null);
  const [cropped, setCropped] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [filename, setFilename] = useState("");
  const [shouldCrop, setShouldCrop] = useState(false);
  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFilename(file?.name || "");
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setOriginalImageSrc(reader.result);
      };
    }
    event.target.value = "";
    setShouldCrop(true);
  };

  let { translation } = uselitteraTranlation();
  const [isCameraOpen, setCameraOpen] = useState(false);
  const { isMobile } = useLoaderData();

  const toggleCamera = () => {
    setCameraOpen(!isCameraOpen);
  };

  const handleCroppedImage = async () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      const newSRC = canvas?.toDataURL();
      if (newSRC) setImageSrc(newSRC);
    }
    setShouldCrop(false);
    setCropped(true);
  };
  async function handleSubmitImage() {
    let cropped_image = base64toFile(imageSrc, filename, "image/jpeg");
    uploadFile(cropped_image);
  }
  function cancelCrop() {
    setImageSrc(originalImageSrc);
    setCameraOpen(false);
    setCropped(false);
    setShouldCrop(false);
  }

  function handleFormClear() {
    setCropped(false);
    handleReset();
    setImageSrc(null);
    setShouldCrop(false);
  }
  const newFile = async (file) => {
    if (file) {
      setFilename(file?.name || "");
      let prom = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setOriginalImageSrc(reader.result);
          setImageSrc(reader.result);
          setShouldCrop(true);
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
      return await prom;
    }
  };
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await newFile(file);
    }
  };
  return (
    <>
      <CancelButton
        type="reset"
        color="gray"
        onClick={handleFormClear}
        hidden={!imageSrc}
      >
        <RxCross2 size={20} />
      </CancelButton>
      {!shouldCrop && !!imageSrc && (
        <Button onClick={() => setShouldCrop(true)} className="mb-3">
          Crop Image
        </Button>
      )}
      {shouldCrop ? (
        <div className="flex flex-col">
          <div className="relative w-full  md:h-[35vh]">
            <Cropper
              ref={cropperRef}
              backgroundClassName="bg-neutral-00 dark:bg-secondary-700"
              src={imageSrc}
            />
          </div>
          <div className="flex gap-2 w-full mt-2 ">
            <Button
              onClick={cancelCrop}
              title="reset"
              className="flex-1"
              color="failure"
            >
              <RxCross2 />
            </Button>
            <Button
              onClick={handleCroppedImage}
              title="save"
              className="flex-1  "
            >
              <BiSave />
            </Button>
          </div>
        </div>
      ) : !imageSrc ? (
        <div className="flex flex-col items-start m-auto w-fit">
          {!isCameraOpen && (
            <>
              <Label
                htmlFor="file"
                value={translation.uploadImage}
                className="text-lg text-slate-700 "
              />
              <FileInput
                ref={fileInputRef}
                key={imageSrc}
                helperText={`${translation.acceptedImage} JPG, PNG, JPEG`}
                id="file"
                name="image"
                className="mt-2"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onLoadImage}
              />
            </>
          )}
          <div className="w-full mx-3 my-2 flex justify-center text-neutral-700">
            OR
          </div>
          {!isMobile && !isCameraOpen && (
            <Button color="dark" onClick={toggleCamera} className="self-center">
              <FaCamera className="mr-2" />
              <p>Take Photo</p>
            </Button>
          )}

          {isCameraOpen && !isMobile && <WebcamCapture setImageUrl={newFile} />}
          {isMobile && (
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
                className="opacity-0 h-0"
                onChange={onFileChange}
              />
            </>
          )}

          {!isMobile && isCameraOpen && (
            <CancelButton color="gray" type="reset" onClick={toggleCamera}>
              <RxCross2 />
            </CancelButton>
          )}
        </div>
      ) : null}
      {!shouldCrop && imageSrc && (
        <img
          src={imageSrc}
          alt="uploaded image"
          className="w-full  object-contain max-h-[35vh]"
        />
      )}
      {imageSrc && !shouldCrop && (
        <div className="flex justify-end py-2 px-1 border-t border-t-dark_text-secondary dark:border-t-light_text-secondary">
          <Button onClick={handleSubmitImage}>
            <span className="pr-2">{translation?.scan}</span>
            <IoSend size={18} />
          </Button>
        </div>
      )}
    </>
  );
};

function base64toFile(base64String, filename, mimeType) {
  // Split the Base64 string into two parts
  const parts = base64String.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const rawBase64 = parts[1];

  // Convert the Base64 string to a Blob
  const byteCharacters = atob(rawBase64);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: mimeType });

  // Convert Blob to File
  return new File([blob], filename, { type: contentType });
}
