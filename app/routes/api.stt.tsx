import { ActionFunction, json } from "@remix-run/node";
import { verifyDomain } from "~/component/utils/verifyDomain";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { saveInference } from "~/modal/inference.server";
import { getUserDetail } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  const startTime = Date.now();
  const isDomainAllowed = verifyDomain(request);
  if (!isDomainAllowed) {
    // If the referer is not from the expected domain, return a forbidden response
    return json({ message: "Access forbidden" }, { status: 403 });
  }
  let user = await getUserDetail(request);
  const formData = await request.formData();
  const API_URL = process.env.FILE_SUBMIT_URL as string;

  let audioURL = formData.get("audioURL") as string;
  let selectedTool = formData.get("isFile") as string;
  let data;
  if (selectedTool === "audio") {
    try {
      let formData = new FormData();
      formData.append("audioURL", audioURL);
      let response = await fetch(API_URL + "/stt/playground", {
        method: "POST",
        body: formData,
      });
      data = await response.json();
    } catch (e) {
      return {
        error: API_ERROR_MESSAGE,
      };
    }
    const { output } = data;
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (output) {
      const { text } = output;
      // save inference to db
      const inferenceData = await saveInference({
        userId: user?.id,
        model: "stt",
        modelVersion: "wav2vec2_run10",
        input: audioURL,
        output: text,
        responseTime: responseTime,
        jobId: data?.id,
      });

      return json({ text, inferenceId: inferenceData?.id });
    } else {
      return json({ error_message: "Failed to send the audio to the server" });
    }
  }
  if (selectedTool === "file") {
    try {
      let formData = new FormData();
      formData.append("link", audioURL);
      let response = await fetch(API_URL + "/stt/synthesis", {
        method: "POST",
        body: formData,
      });
      data = await response.json();
      console.log(audioURL, "audioUrl");
    } catch (e) {
      console.log(e);
      return {
        error: API_ERROR_MESSAGE,
      };
    }
    const { id } = data;
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (id) {
      // save inference to db
      const inferenceData = await saveInference({
        userId: user?.id,
        model: "stt",
        modelVersion: "wav2vec2_run10",
        type: "file",
        input: audioURL,
        output: "",
        responseTime: responseTime,
        jobId: id,
      });
      console.log(inferenceData);
      return json({ text: "", inferenceId: inferenceData?.id });
    } else {
      return json({ error_message: "Failed to send the audio to the server" });
    }
  }
};
