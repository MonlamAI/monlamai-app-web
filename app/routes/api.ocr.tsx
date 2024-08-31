import { ActionFunction } from "@remix-run/node";
import { saveInference } from "~/modal/inference.server";
import applyReplacements from "./model.ocr/utils/replacements";
import { getUserDetail } from "~/services/session.server";
import getIpAddressByRequest from "~/component/utils/getIpAddress";
export let FILE_SERVER_ISSUE_MESSAGE =
  "File upload is not working temporarily! Please try again later.";

export const action: ActionFunction = async ({ request }) => {
  let ip = getIpAddressByRequest(request);
  let formdata = await request.formData();
  let user = await getUserDetail(request);
  let URL_File = process.env.FILE_SUBMIT_URL;
  let zip_input_url = formdata.get("zip_input_url") as string;
  let PDFurls = formdata.get("pdf_file") as string;
  let filename = formdata.get("file_name") as string;
  let show_coordinate = formdata.get("show_coordinate") as string;

  let imageUrl = formdata.get("imageUrl") as string;
  let formData = new FormData();
  formData.append("imageUrl", imageUrl);
  let data;
  try {
    let res = await fetch(URL_File + "/ocr/upload", {
      method: "POST",
      body: formData,
      headers: {
        "x-api-key": process.env?.API_ACCESS_KEY!,
      },
    });

    data = await res.json();
    if (data?.error) {
      return {
        error_message: data.error,
      };
    }
  } catch (e) {
    return {
      error_message: "API server is not working! Please try again later.",
    };
  }

  const inferenceData = await saveInference({
    userId: user?.id,
    model: "ocr",
    input: imageUrl,
    type: "image",
    output: data.content,
    jobId: null,
    ip,
    responseTime: data.responseTime,
  });
  // let with_replacement = applyReplacements(inferenceData.output);

  return {
    text: inferenceData.output,
    coordinate: show_coordinate ? data?.coordinates : null,
    inferenceId: inferenceData?.id,
  };

  return null;
};
