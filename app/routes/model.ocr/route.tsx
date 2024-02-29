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
  const formData = await request.formData();
  const ocrFormData = new FormData();
  let blob = formData.get("image") as Blob;
  ocrFormData.append("file", blob);
  let url = process.env?.OCR_API_URL as string;
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = `OCR/playground/${uuidv4() + "-" + blob.name}`;
  const locationOnS3 = await uploadToS3(buffer, key, "image/*");
  const startTime = Date.now();
  try {
    const response = await fetch(url, {
      method: "POST",
      body: ocrFormData,
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("message", message);
      return {
        error_message: message?.detail,
      };
    }
    const data = await response.json();
    const ocrtxt = data.output.join("\n");
    if (!ocrtxt || ocrtxt.length === 0) {
      return {
        error_message: "No text detected in the image",
      };
    }

    // Calculate the response time
    const responseTime = Date.now() - startTime;
    // // save inference in db
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "ocr",
      input: locationOnS3,
      output: ocrtxt,
      responseTime: responseTime,
    });

    return json({
      text: ocrtxt,
      id: inferenceData?.id,
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
