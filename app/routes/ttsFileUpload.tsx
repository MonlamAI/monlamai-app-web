import { ActionFunctionArgs } from "@remix-run/node";

import { addFileInference, deleteInference } from "~/modal/inference.server";
import { getUser } from "~/modal/user.server";
import { auth } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "DELETE") {
    let formdata = await request.formData();
    let id = formdata.get("id") as string;
    if (request.method === "DELETE") {
      let delete_inference = await deleteInference({ id });
      return delete_inference;
    }
  }

  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let user = await getUser(userdata?._json.email);
  const formData = await request.formData();
  const inputFileUrl = formData.get("fileUrl") as string;
  let inference_new = await addFileInference({
    userId: user?.id,
    input: inputFileUrl,
    type: "file",
    model: "tts",
    jobId: null,
  });
  try {
    var formdata = new FormData();
    formdata.append("link", inputFileUrl);
    formdata.append("inference_id", inference_new?.id);

    const url = process.env.FILE_SUBMIT_URL;
    let inferenceData;
    let res = await fetch(url + `/tts/synthesis`, {
      method: "POST",
      body: formdata,
    });
    inferenceData = await res.json();
  } catch (e) {
    console.log(e);
  }

  return inference_new;
};
