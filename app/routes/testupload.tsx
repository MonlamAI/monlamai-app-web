import {
  ActionFunctionArgs,
  UploadHandler,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { addFileInference, deleteInference } from "~/modal/inference.server";
import { getUser } from "~/modal/user.server";
import { auth } from "~/services/auth.server";
import { getUserDetail } from "~/services/session.server";
import { uploadFile } from "~/services/uploadFile.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "DELETE") {
    let formdata = await request.formData();
    let id = formdata.get("id") as string;
    if (request.method === "DELETE") {
      let delete_inference = await deleteInference({ id });
      return delete_inference;
    }
  }

  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
    uploadFile,
    unstable_createMemoryUploadHandler()
  );

  let user = await getUserDetail(request);
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const inputFileUrl = formData.get("file") as string;
  const targetLanguage = formData.get("target") as string;

  let inferenceData;
  try {
    var formdata = new FormData();
    formdata.append("link", inputFileUrl);
    formdata.append("language", targetLanguage);
    const url = process.env.FILE_SUBMIT_URL;
    let res = await fetch(url + `/mt/translate`, {
      method: "POST",
      body: formdata,
    });
    inferenceData = await res.json();
  } catch (e) {
    console.log(e);
  }
  if (inferenceData) {
    let inference_new = await addFileInference({
      userId: user?.id,
      input: inputFileUrl,
      type: "file",
      model: "mt",
      jobId: inferenceData?.id,
    });
    return inference_new;
  }
  return null;
};
