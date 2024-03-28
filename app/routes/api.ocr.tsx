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
  let zip_input_url = formdata.get("zip_input_url") as string;
  let PDFurls = formdata.get("pdf_file") as string;
  let filename = formdata.get("file_name") as string;

  let imageUrl = formdata.get("imageUrl") as string;
  if (imageUrl) {
    let formData = new FormData();
    formData.append("imageUrl", imageUrl);

    let res = await fetch(URL_File + "/ocr/upload", {
      method: "POST",
      body: formData,
    });

    let data = await res.json();
    if (data?.error) {
      return {
        error_message: data.error,
      };
    }
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "ocr",
      input: imageUrl,
      type: "file",
      output: data.content,
      jobId: null,
    });
    return { text: inferenceData.output };
  }
  if (zip_input_url) {
    let formData = new FormData();
    formData.append("zip_input_url", zip_input_url);
    let res = await fetch(URL_File + "/ocr/zip", {
      method: "POST",
      body: formData,
    });
    let job = await res.json();
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "ocr",
      input: zip_input_url,
      type: "file",
      output: "",
      jobId: job?.jobId,
    });
    console.log(inferenceData);
    return inferenceData;
  }
  if (PDFurls) {
    let job;
    try {
      let formData = new FormData();
      formData.append("PDFurls", PDFurls);
      formData.append("filename", filename);

      let res = await fetch(URL_File + "/ocr/pdf", {
        method: "POST",
        body: formData,
      });
      job = await res.json();
      await saveInference({
        userId: user?.id,
        model: "ocr",
        input: filename,
        type: "file",
        output: "",
        jobId: job?.jobId,
      });
      return PDFurls;
    } catch (e) {
      throw new Error("file server error");
    }
  }
  return null;
};
