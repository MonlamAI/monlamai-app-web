import { ActionFunctionArgs } from "@remix-run/node";

import { addFileInference, deleteInference } from "~/modal/inference.server";
import { getUserDetail } from "~/services/session.server";
import { FILE_SERVER_ISSUE_MESSAGE } from "./api.ocr";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "DELETE") {
    let formdata = await request.formData();
    let id = formdata.get("id") as string;
    if (request.method === "DELETE") {
      let delete_inference = await deleteInference({ id });
      return delete_inference;
    }
  }

  let user = await getUserDetail(request);
  const formData = await request.formData();
  const inputFileUrl = formData.get("fileUrl") as string;
  const target_lang = formData.get("target_lang") as string;
  const source_lang = formData.get("source_lang") as string;

  let inferenceData;
  try {
    var formdata = new FormData();
    formdata.append("link", inputFileUrl);
    formdata.append("language", target_lang);
    const url = process.env.FILE_SUBMIT_URL;
    let res = await fetch(url + `/mt/translate`, {
      method: "POST",
      body: formdata,
    });
    inferenceData = await res.json();
  } catch (e) {
    return { error: FILE_SERVER_ISSUE_MESSAGE };
  }
  if (inferenceData) {
    let inference_new = await addFileInference({
      userId: user?.id,
      input: inputFileUrl,
      type: "file",
      model: "mt",
      jobId: inferenceData?.id,
      target_lang,
      source_lang,
    });
    return inference_new;
  }
  return null;
};
