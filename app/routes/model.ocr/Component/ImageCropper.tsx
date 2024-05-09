import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  getCroppedImg,
  getRotatedImage,
} from "../../../component/utils/canvasUtils";
import { getOrientation } from "get-orientation/browser";
import { Button, FileInput, Label, RangeSlider } from "flowbite-react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import WebcamCapture from "./WebcamCapture";
import { useLoaderData } from "@remix-run/react";
import { FaCamera } from "react-icons/fa";
import { CancelButton, SubmitButton } from "~/component/Buttons";
import { RxCross2 } from "react-icons/rx";
import {
  BiRotateLeft,
  BiRotateRight,
  BiSave,
  BiZoomIn,
  BiZoomOut,
} from "react-icons/bi";
const ORIENTATION_TO_ANGLE = {
  "3": 180,
  "6": 90,
  "8": -90,
};

export const ImageCropper = ({
  uploadFile,
}: {
  uploadFile: (data: File) => void;
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [filename, setFilename] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await newFile(file);
    }
  };
  const newFile = async (file) => {
    let imageDataUrl = await readFile(file);

    try {
      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }
    } catch (e) {
      console.warn("failed to detect the orientation");
    }
    setImageSrc(imageDataUrl);
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
      setFilename(file.name);
    });
  }
  let { translation } = uselitteraTranlation();
  const [isCameraOpen, setCameraOpen] = useState(false);
  const { isMobile } = useLoaderData();

  const toggleCamera = () => {
    setCameraOpen(!isCameraOpen);
  };
  const submitCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      let file = await convertBlobToFile(croppedImage, filename);
      console.log(file);
      uploadFile(file);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {imageSrc ? (
        <div className="flex flex-col">
          <div className="relative w-[35vw] h-[35vh]">
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <div className="absolute z-50 flex gap-2  w-fit">
              <button
                className=" bg-neutral-800   text-white  p-2"
                onClick={() => setZoom((prev) => prev - 2)}
              >
                <BiZoomOut />
              </button>
              <button
                className=" bg-neutral-800 text-white  p-2"
                onClick={() => setZoom((prev) => prev + 2)}
              >
                <BiZoomIn />
              </button>
              <button
                className=" bg-neutral-800 text-white p-2"
                onClick={() => setRotation((prev) => prev + 10)}
              >
                <BiRotateRight />
              </button>
              <button
                className=" bg-neutral-800 text-white p-2"
                onClick={() => setRotation((prev) => prev - 10)}
              >
                <BiRotateLeft />
              </button>
            </div>
          </div>

          <Button onClick={submitCroppedImage}>
            <BiSave />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {!isCameraOpen && (
            <>
              <Label
                htmlFor="file"
                value={translation.uploadImage}
                className="text-lg text-slate-700 "
              />
              <FileInput
                key={imageSrc}
                helperText={`${translation.acceptedImage} JPG, PNG, JPEG`}
                id="file"
                name="image"
                className="mt-2"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onFileChange}
              />
              <div className="w-full mx-3 my-2 flex justify-center text-neutral-700">
                OR
              </div>
            </>
          )}
          {!isMobile && !isCameraOpen && (
            <Button color="dark" onClick={toggleCamera}>
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
      )}
    </>
  );
};

async function convertBlobToFile(url, filename) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let blob = await response.blob();
  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now(),
  });
}
