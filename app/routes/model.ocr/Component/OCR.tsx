import React, { useEffect } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import { useState } from "react";
import CopyToClipboard from "~/component/CopyToClipboard";
import { BiQuestionMark } from "react-icons/bi";
import { Tooltip } from "flowbite-react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import ReactionButtons from "~/component/ReactionButtons";
import ListInput from "~/component/ListInput";
import { MdDeleteForever, MdRefresh } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import timeSince from "~/component/utils/timeSince";

function OCR() {
  const { inferenceList } = useLoaderData();
  const [ImageUrl, setImageUrl] = useState<string | null>(null);
  const [images, setImages] = useState([]);
  const [selectedTool, setSelectedTool] = useState("single");
  const fetcher = useFetcher();
  const multipleFileFetcher = useFetcher();
  const likeFetcher = useFetcher();
  const data = fetcher.data;
  const inferenceId = fetcher.data?.id;
  const isActionSubmission = fetcher.state !== "idle";
  const errorMessage = data?.error_message;
  let { translation } = uselitteraTranlation();
  const handleFileChange = (event) => {
    if (event.target.files.length < 2) {
      const file = event.target.files[0];
      if (file) {
        let url = URL.createObjectURL(file);
        setImageUrl(url);
      }
    } else {
      const files = event.target.files;
      const chosenFiles = Array.prototype.slice.call(files);
      setImages(chosenFiles);
    }
  };

  const handleFormClear = () => {
    setImageUrl(null);
    resetFetcher(fetcher);
    resetFetcher(multipleFileFetcher);
  };
  useEffect(() => {
    setImages([]);
    setImageUrl("");
    handleFormClear();
  }, [selectedTool]);
  const revalidator = useRevalidator();
  const refresh = () => {
    console.log("refresh");
    revalidator.revalidate();
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <ListInput
        options={["single", "multiple"]}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <div className="flex w-full gap-3">
        <Card className="md:w-1/2 relative">
          <div className="absolute  top-2 right-2 cursor-pointer hover:text-orange-400  bg-gray-200 p-1 rounded-full">
            <Tooltip
              content="Please ensure that the image is of high quality and that it includes a lengthy text that is easily readable."
              animation="duration-500"
              placement="left"
              className="w-[200px] md:w-[400px] font-poppins text-xs"
              style="light"
            >
              <BiQuestionMark />
            </Tooltip>
          </div>
          {selectedTool === "single" && (
            <fetcher.Form method="post" encType="multipart/form-data">
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
                    helperText={`${translation.acceptedImage} JPG, PNG, JPEG`}
                    id="file"
                    name="image"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                  />
                </div>
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
                <Button type="submit" isProcessing={isActionSubmission}>
                  <div className="pt-1">{translation.submit}</div>
                </Button>
              </div>
            </fetcher.Form>
          )}
          {selectedTool === "multiple" && (
            <multipleFileFetcher.Form
              action="/api/ocr"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="w-full min-h-[45vh] flex flex-col items-center justify-center gap-5">
                <div className={images.length > 0 ? "hidden" : ""}>
                  <div className="mb-5 block">
                    <Label
                      htmlFor="file"
                      value={translation.uploadImage}
                      className="text-lg text-slate-700"
                    />
                  </div>
                  <FileInput
                    helperText={`${translation.acceptedImage} JPG, PNG, JPEG,PDF`}
                    id="file"
                    name="files"
                    accept="image/png, image/jpeg, image/jpg, .pdf"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
                <div className="flex flex-col gap-2 flex-wrap">
                  {Array.from(images).length > 0 &&
                    Array.from(images).map((image, index) => (
                      <MultipleFiles key={"file-" + index} image={image} />
                    ))}
                </div>
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
                  type="submit"
                  isProcessing={multipleFileFetcher.state !== "idle"}
                >
                  <div className="pt-1">{translation.submit}</div>
                </Button>
              </div>
            </multipleFileFetcher.Form>
          )}
        </Card>
        <Card className="md:w-1/2">
          {selectedTool === "multiple" && (
            <button
              type="button"
              className="float-right max-w-fit cursor-pointer hover:bg-gray-300 p-1 rounded"
              onClick={refresh}
            >
              <MdRefresh />
            </button>
          )}
          <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
            {isActionSubmission ? (
              <div className="h-full flex justify-center items-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="text-lg  tracking-wide leading-loose overflow-auto">
                {errorMessage && (
                  <div className="text-red-500">{errorMessage}</div>
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
            {selectedTool === "multiple" &&
              inferenceList.map((inference) => {
                return (
                  <EachInference inference={inference} key={inference.id} />
                );
              })}
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
    </div>
  );
}

export default OCR;

function MultipleFiles({ image }) {
  let url = URL.createObjectURL(image);

  return (
    <div
      key={image.size}
      className="flex gap-2 max-w-sm rounded overflow-hidden shadow-lg"
    >
      <img className="max-w-[80px] object-contain" src={url} alt={image.name} />
      <div className="px-6 py-4 flex-1">
        <div className=" mb-2">{image.name}</div>
      </div>
    </div>
  );
}

let timer;

function EachInference({ inference }: any) {
  const { fileUploadUrl } = useLoaderData();
  const deleteFetcher = useFetcher();
  let filename = inference.input.split("/OCR/input/")[1];
  let updatedAt = new Date(inference.updatedAt);
  const revalidator = useRevalidator();
  let outputURL = inference.output;
  let isComplete = !!outputURL;

  useEffect(() => {
    if (!inference.output) {
      timer = setInterval(() => {
        revalidator.revalidate();
      }, 3000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  function deleteHandler() {
    deleteFetcher.submit(
      { id: inference.id },
      {
        method: "DELETE",
        action: "/testupload",
      }
    );
  }

  return (
    <div className="rounded-lg  flex  justify-between items-center px-1 mx-2 mb-2 pb-1 border-b-2 border-gray-400">
      <div>
        <span className="text-gray-800 truncate">
          {decodeURIComponent(filename)}
        </span>
        <span className="text-gray-500 text-xs block">
          {updatedAt ? timeSince(updatedAt) : ""}
        </span>
      </div>
      <div className="flex gap-5 items-center">
        {isComplete && (
          <a
            href={outputURL}
            className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
          >
            <FaDownload />
          </a>
        )}
        <button onClick={deleteHandler} className=" hover:text-red-400">
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}
