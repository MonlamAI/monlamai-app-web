import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import React, { useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import TooltipComponent from "./Tooltip";
import { useFetcher } from "@remix-run/react";
import ReactionButtons from "~/component/ReactionButtons";
import CopyToClipboard from "~/component/CopyToClipboard";

function SingleInptSection({ fetcher }: any) {
  const [ImageUrl, setImageUrl] = useState<string | null>(null);
  let { translation } = uselitteraTranlation();
  const likeFetcher = useFetcher();
  const data = fetcher?.data;
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

  return (
    <div className="flex w-full gap-3">
      <Card className="md:w-1/2 relative">
        <TooltipComponent />
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
            <Button type="submit" isProcessing={fetcher.state !== "idle"}>
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
                <div className="font-poppins capitalize text-red-300">
                  {errorMessage}
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
