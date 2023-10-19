import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import parse from "html-react-parser";
import { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6/index.js";

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
      text: toParaTags(data.output),
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export default function Index() {
  const [selectedFile, setSelectedFile] = useState(null);

  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isActionSubmission = navigation.state == "submitting";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <main className="mx-auto w-11/12 lg:4/5">
      <h1 className="mb-10 text-4xl lg:text-5xl text-center text-slate-700">
        Monlam OCR
      </h1>

      <div className="mt-1 flex flex-col md:flex-row items-strech gap-5">
        <Card className="md:w-1/2">
          <Form method="post" encType="multipart/form-data">
            <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-5">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload your image here" />
                </div>
                <FileInput
                  helperText="Supports PNG, JPG or JPEG"
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
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                isProcessing={isActionSubmission}
                className=""
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card>

        <Card className="md:w-1/2">
          <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
            {isActionSubmission ? (
              <div className="h-full flex justify-center items-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="text-lg font-monlam tracking-wide leading-loose overflow-auto">
                {data && parse(data.text)}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button color="white">
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white">
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
