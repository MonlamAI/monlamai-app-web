import React from "react";
import { useFetcher } from "@remix-run/react";
import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import { useState } from "react";
import CopyToClipboard from "~/component/CopyToClipboard";
import { BiQuestionMark } from "react-icons/bi";
import { Tooltip } from "flowbite-react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import ReactionButtons from "~/component/ReactionButtons";

function OCR() {
  const [ImageUrl, setImageUrl] = useState<string | null>(null);
  const fetcher = useFetcher();
  const likeFetcher = useFetcher();
  const data = fetcher.data;
  const inferenceId = fetcher.data?.id;
  const isActionSubmission = fetcher.state !== "idle";
  const errorMessage = data?.error_message;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleFormClear = () => {
    setImageUrl(null);
    resetFetcher(fetcher);
  };
  let { translation } = uselitteraTranlation();
  return (
    <>
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
    </>
  );
}

export default OCR;
