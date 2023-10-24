import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import parse from "html-react-parser";
import { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6/index.js";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user: userdata };
}
function toParaTags(textLines: string[]) {
  return textLines
    .map((line) => {
      if (line.trim() === "") {
        return "</p><p>";
      }
      return "<p>" + line + "</p>";
    })
    .join(" ");
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const ocrFormData = new FormData();
  ocrFormData.append("file", formData.get("image") as Blob);
  try {
    const response = await fetch("https://ocr.pecha.tools/", {
      method: "POST",
      body: ocrFormData,
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("message", message);
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return json({
      text: data.output,
    });
  } catch (error) {
    return {
      error_message: "There was a problem with the fetch operation:" + error,
    };
  }
}

export default function Index() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fetcher = useFetcher();
  const data = fetcher.data;
  const isActionSubmission = fetcher.state !== "idle";
  const errorMessage = data?.error_message;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  let isEmptyData = data?.text?.length === 1 && data?.text[0].trim() === "";
  const handleFormClear = () => {
    setSelectedFile(null);
    fetcher.submit(
      {},
      {
        method: "POST",
        action: "/reset_actiondata",
      }
    );
  };

  return (
    <main className="mx-auto w-11/12 lg:4/5">
      <h1 className="mb-10 text-2xl lg:text-3xl text-center text-slate-700">
        ཡིག་འཛིན་རིག་ནུས།
      </h1>

      <div className="mt-1 flex flex-col md:flex-row items-strech gap-5">
        <Card className="md:w-1/2">
          <fetcher.Form method="post" encType="multipart/form-data">
            <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-5">
              <div className={selectedFile ? "hidden" : ""}>
                <div className="mb-5 block">
                  <Label
                    htmlFor="file"
                    value="འདིར་པར་རིས་འཇུག་རོགས།"
                    className="text-lg text-slate-700"
                  />
                </div>
                <FileInput
                  helperText="ངོས་ལེན་ཡོད་པའི་པར་རྣམ། JPG, PNG, JPEG"
                  id="file"
                  name="image"
                  accept="image/png, image/jpeg, image/jpg"
                  required
                  onChange={handleFileChange}
                />
              </div>

              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="selected file"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
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
                <div className="pt-1">བསྐྱར་སྒྲིག།</div>
              </Button>
              <Button type="submit" isProcessing={isActionSubmission}>
                <div className="pt-1">ཐོངས།</div>
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
                {data && parse(toParaTags(data.text))}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button color="white" disabled={data ? false : true}>
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white" disabled={data ? false : true}>
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
            <CopyToClipboard
              textToCopy={data?.text?.join("\n")}
              disabled={data ? false : true}
            />
          </div>
        </Card>
      </div>
    </main>
  );
}
