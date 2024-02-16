import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  UploadHandler,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import { useRef, useState, useMemo, useLayoutEffect } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import { BiQuestionMark } from "react-icons/bi";
import { Tooltip } from "flowbite-react";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import ReactionButtons from "~/component/ReactionButtons";
import { saveInference } from "~/modal/inference.server";
import { getUser } from "~/modal/user.server";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [...parentMeta, { title: "Monlam | ཡིག་འཛིན་རིག་ནུས།" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user: userdata };
}

export async function action({ request }: ActionFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);

  // if (request.method === "POST") {
  //   const uploadHandler: UploadHandler = composeUploadHandlers(
  //     uploadImageToS3,
  //     createMemoryUploadHandler()
  //   );
  //   const formData = await parseMultipartFormData(request, uploadHandler);
  //   console.log("formData", formData);
  // }
  const formData = await request.formData();
  let base64String = formData.get("base64String");
  const blob = formData.get("image") as Blob;
  const ocrFormData = new FormData();
  ocrFormData.append("file", blob);
  const startTime = Date.now();

  try {
    const response = await fetch("https://ocr.pecha.tools/", {
      method: "POST",
      body: ocrFormData,
    });

    // Calculate the response time
    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      const message = await response.text();
      console.error("message", message);
      return {
        error_message: "Network response was not ok.",
      };
    }
    const data = await response.json();
    const ocrtxt = data.output.join("\n");

    // // save inference in db
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "ocr",
      input: base64String,
      output: ocrtxt,
      responseTime: responseTime,
    });

    return json({
      text: data.output,
      id: inferenceData?.id,
    });
  } catch (error) {
    return {
      error_message: "There was a problem with the fetch operation:" + error,
    };
  }
}

export default function Index() {
  const [ImageUrl, setImageUrl] = useState<string>("");
  const fetcher = useFetcher();
  let likeFetcher = useFetcher();

  const data = fetcher.data;
  const inferenceId = fetcher.data?.id;
  const isActionSubmission = fetcher.state !== "idle";
  const errorMessage = data?.error_message;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // Once the file is loaded, set the image state to the data URL
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  let isEmptyData = data?.text?.length === 1 && data?.text[0].trim() === "";
  isEmptyData = isEmptyData || data?.text?.join("") === "";

  const handleFormClear = () => {
    setImageUrl(null);
    resetFetcher(fetcher);
  };
  let { translation } = uselitteraTranlation();
  console.log("inferenceId", inferenceId);
  return (
    <ToolWraper title="OCR">
      <main className="mx-auto w-11/12 lg:w-4/5">
        <div className="mt-1 flex flex-col md:flex-row  lg:h-[55vh] items-strech gap-5">
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
                  <div className="mb-2 block">
                    <Label
                      htmlFor="file"
                      value={translation.uploadImage}
                      className="text-lg text-slate-700"
                    />
                  </div>
                  <FileInput
                    helperText={`${translation.acceptedImage} JPG, PNG, JPEG, TIF`}
                    id="file"
                    name="image"
                    accept="image/png, image/jpeg, image/jpg, image/tiff"
                    onChange={handleFileChange}
                  />
                  <input type="hidden" name="base64String" value={ImageUrl} />
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
                  {isEmptyData && (
                    <div className="text-red-500">
                      བསྐྱར་དུ་པར་རིས་གཞན་པ་ཞིག་བཙལ་རོགས་གནང་།
                    </div>
                  )}
                  {errorMessage && (
                    <div className="text-red-500">{errorMessage}</div>
                  )}
                  {data?.text && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.text?.join("<br/>"),
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
                  output={data?.text?.join("\n")}
                  sourceText={ImageUrl}
                  inferenceId={inferenceId}
                />
                {data && data?.text?.join("\n") && (
                  <CopyToClipboard textToCopy={data?.text?.join("\n")} />
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </ToolWraper>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}
