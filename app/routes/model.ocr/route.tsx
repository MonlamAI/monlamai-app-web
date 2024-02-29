import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { auth } from "~/services/auth.server";
import { ErrorBoundary } from "../model.mt/route";
import ToolWraper from "~/component/ToolWraper";
import { useRouteLoaderData } from "@remix-run/react";
import DummyOCR from "~/routes/model.ocr/Component/DummyOCR";
import { v4 as uuidv4 } from "uuid";
import OCR from "./Component/OCR";
import { uploadToS3 } from "~/services/uploadToS3.server";

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
  const formData = await request.formData();
  const ocrFormData = new FormData();
  let blob = formData.get("image") as Blob;
  ocrFormData.append("file", blob);
  let url = process.env?.OCR_API_URL as string;
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = `OCR/playground/${uuidv4() + "-" + blob.name}`;
  const locationOnS3 = await uploadToS3(buffer, key, "image/*");
  try {
    const response = await fetch(url, {
      method: "POST",
      body: ocrFormData,
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("message", message);
      return {
        error_message: "Network response was not ok.",
      };
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
  const { enable_ocr_model } = useRouteLoaderData("root");
  return (
    <ToolWraper title="OCR">
      <div className="flex flex-col md:flex-row gap-2">
        {enable_ocr_model ? <OCR /> : <DummyOCR />}
      </div>
    </ToolWraper>
  );
}

export { ErrorBoundary };
