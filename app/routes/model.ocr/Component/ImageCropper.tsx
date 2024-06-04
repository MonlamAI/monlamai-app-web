import React, { useState, ChangeEvent, useRef } from "react";
import { Button, FileInput, Label } from "flowbite-react";
import { useLoaderData } from "@remix-run/react";
import { FaCamera } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BiSave } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { Cropper, CropperRef } from "react-advanced-cropper";
import useLitteraTranslation from "~/component/hooks/useLitteraTranslation";
import WebcamCapture from "./WebcamCapture";
import { CancelButton } from "~/component/Buttons";
import { BsCrop } from "react-icons/bs";

export const ImageCropper = ({ uploadFile, handleReset, uploadProgress }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<CropperRef>(null);
  const [cropped, setCropped] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [filename, setFilename] = useState("");
  const [shouldCrop, setShouldCrop] = useState(false);
  const { translation, isTibetan } = useLitteraTranslation();
  const [isCameraOpen, setCameraOpen] = useState(false);
  const { isMobile } = useLoaderData();

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
  };

  const toggleCamera = () => setCameraOpen(!isCameraOpen);

  const handleCroppedImage = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      const newSrc = canvas?.toDataURL();
      if (newSrc) setImageSrc(newSrc);
    }
    setShouldCrop(false);
    setCropped(true);
  };

  async function handleSubmitImage() {
    let image_src = cropped ? imageSrc : originalImageSrc;
    let cropped_image = base64toFile(image_src, filename, "image/jpeg");
    uploadFile(cropped_image);
  }

  const cancelCrop = () => {
    setImageSrc(originalImageSrc);
    setCameraOpen(false);
    setCropped(false);
    setShouldCrop(false);
  };

  const handleFormClear = () => {
    handleReset();
    setCropped(false);
    setImageSrc(null);
    setShouldCrop(false);
  };

  const newFile = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImageSrc(reader.result as string);
        setImageSrc(reader.result as string);
        setShouldCrop(true);
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await newFile(file);
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
      {shouldCrop ? (
        <div className="flex-1 flex flex-col">
          <div className="relative w-full max-h-[40vh] flex-1 ">
            <Cropper
              ref={cropperRef}
              backgroundClassName="bg-neutral dark:bg-secondary-700"
              src={imageSrc}
            />
          </div>
          <div className="flex gap-2 w-full justify-between px-2 py-1">
            <Button onClick={cancelCrop} title="reset" color="neutral">
              <RxCross2 />
            </Button>
            <Button onClick={handleCroppedImage} title="save" size="sm">
              <BiSave /> {translation.save}
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
                className="text-lg text-slate-700"
              />
              <FileInput
                ref={fileInputRef}
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
                capture="environment"
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
          className="w-full max-h-[40vh] flex-1 object-contain "
          style={{
            opacity:
              uploadProgress && uploadProgress < 100
                ? 0.2 + (uploadProgress / 100) * 0.8
                : 1,
          }}
        />
      )}
      {imageSrc && !shouldCrop && (
        <div className="flex justify-between items-center py-2 px-1 border-t border-t-dark_text-secondary dark:border-t-light_text-secondary">
          {!shouldCrop && !!imageSrc && (
            <div
              onClick={() => setShouldCrop(true)}
              className={` flex gap-2 items-center cursor-pointer
              ${!isTibetan ? "font-poppins" : "font-monlam"}`}
            >
              <BsCrop size={18} />
              {translation.crop}
            </div>
          )}
          <Button
            size="xs"
            onClick={handleSubmitImage}
            className={` bg-secondary-500 dark:bg-primary-500 hover:bg-secondary-400 dark:hover:bg-primary-400 
            text-white dark:text-black 
            enabled:hover:bg-secondary-400 enabled:dark:hover:bg-primary-400
         ${!isTibetan ? "font-poppins" : "font-monlam"}`}
          >
            <span className={`pr-2`}>{translation?.scan}</span>
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
