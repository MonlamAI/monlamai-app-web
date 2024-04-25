import { ActionFunction } from "@remix-run/node";
import { saveInference } from "~/modal/inference.server";
import applyReplacements from "./model.ocr/utils/replacements";
import { getUserDetail } from "~/services/session.server";

export let FILE_SERVER_ISSUE_MESSAGE =
  "File upload is not working temporarily!";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let user = await getUserDetail(request);
  let URL_File = process.env.FILE_SUBMIT_URL;
  let zip_input_url = formdata.get("zip_input_url") as string;
  let PDFurls = formdata.get("pdf_file") as string;
  let filename = formdata.get("file_name") as string;
  let show_coordinate = formdata.get("show_coordinate") as string;

  let imageUrl = formdata.get("imageUrl") as string;
  if (imageUrl) {
    let formData = new FormData();
    formData.append("imageUrl", imageUrl);
    let data;
    try {
      let res = await fetch(URL_File + "/ocr/upload", {
        method: "POST",
        body: formData,
      });

      data = await res.json();
      if (data?.error) {
        return {
          error_message: data.error,
        };
      }
    } catch (e) {
      return {
        error_message: "API not working.",
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
    let with_replacement = applyReplacements(inferenceData.output);

    return {
      text: with_replacement,
      coordinate: show_coordinate ? data?.coordinates : null,
      inferenceId: inferenceData?.id,
    };
  }
  if (zip_input_url) {
    let formData = new FormData();
    try {
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
      return inferenceData;
    } catch (e) {
      return { error: FILE_SERVER_ISSUE_MESSAGE };
    }
  }
  if (PDFurls) {
    let job;
    console.log("filename", filename);
    let formData = new FormData();
    formData.append("PDFurls", PDFurls);
    formData.append("filename", filename);

    try {
      let res = await fetch(URL_File + "/ocr/pdf", {
        method: "POST",
        body: formData,
      });
      job = await res.json();
      await saveInference({
        userId: user?.id,
        model: "ocr",
        input: PDFurls,
        type: "file",
        output: "",
        jobId: job?.jobId,
      });
      return PDFurls;
    } catch (e) {
      return { error: FILE_SERVER_ISSUE_MESSAGE };
    }
  }
  return null;
};
