import { ActionFunctionArgs } from "@remix-run/node";

import { addFileInference, deleteInference } from "~/modal/inference.server";
import { getUserDetail } from "~/services/session.server";
import { FILE_SERVER_ISSUE_MESSAGE } from "./api.ocr";

export const action = async ({ request }: ActionFunctionArgs) => {
  let user = await getUserDetail(request);
  const formData = await request.formData();
  const inputFileUrl = formData.get("fileUrl") as string;
  const target_lang = formData.get("target_lang") as string;
  const source_lang = formData.get("source_lang") as string;

  let inference_new = await addFileInference({
    userId: user?.id,
    input: inputFileUrl,
    type: "file",
    model: "mt",
    jobId: null,
    target_lang,
    source_lang,
  });
  try {
    var formdata = new FormData();
    formdata.append("link", inputFileUrl);
    formdata.append("language", target_lang);
    formdata.append("inference_id", inference_new.id);

    const url = process.env.FILE_SUBMIT_URL;
    let res = await fetch(url + `/mt/translate`, {
      method: "POST",
      body: formdata,
    });
    return await res.json();
  } catch (e) {
    return { error: FILE_SERVER_ISSUE_MESSAGE };
  }
};
