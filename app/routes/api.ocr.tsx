import { ActionFunction } from "@remix-run/node";
import { saveInference } from "~/modal/inference.server";
import { getUser } from "~/modal/user.server";
import { auth } from "~/services/auth.server";
import { uploadToS3 } from "~/services/uploadToS3.server";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let files = formdata.getAll("files") as string[] | File[];
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);
  let jobs = [];
  let URL_File = process.env.FILE_SUBMIT_URL;
  for (var i = 0; i < files.length; i++) {
    let formData = new FormData();
    formData.append("file", files[i]);
    let job;
    try {
      let res = await fetch(URL_File + "/ocr/queue", {
        method: "POST",
        body: formData,
      });
      job = await res.json();
    } catch (e) {
      throw new Error("file server error");
    }
    const key = `OCR/input/${files[i].name}`;
    const arrayBuffer = await files[i].arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const url = await uploadToS3(buffer, key, files[i].type);
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "ocr",
      input: url,
      type: "file",
      output: "",
      jobId: job?.jobId,
    });
    jobs.push(job?.jobId);
  }
  return jobs;
};
