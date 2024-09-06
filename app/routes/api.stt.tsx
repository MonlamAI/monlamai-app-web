import { ActionFunction, json } from "@remix-run/node";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { saveInference } from "~/modal/inference.server";
import { getUserDetail } from "~/services/session.server";
import getIpAddressByRequest from "~/component/utils/getIpAddress";

export const action: ActionFunction = async ({ request }) => {
  let ip = getIpAddressByRequest(request);

  let { user } = await getUserDetail(request);
  const formData = await request.formData();
  const API_URL = process.env.API_URL as string;
  const AccessKey = process.env?.API_ACCESS_KEY;
  let audioURL = formData.get("audioURL") as string;
  let data;
  try {
    const token = user ? user?.token : null;
    let body = JSON.stringify({
      input: audioURL,
      id_token: token,
    });
    let response = await fetch(API_URL + "/api/v1/stt", {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        Authorization: AccessKey,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return {
        error: API_ERROR_MESSAGE,
      };
    }
    data = await response.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const { output, responseTime } = data;

  if (output) {
    // save inference to db
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "stt",
      modelVersion: "wav2vec2_run10",
      input: audioURL,
      output: output,
      responseTime,
      jobId: data?.id,
      ip,
    });

    return json({ text: output, inferenceId: inferenceData?.id });
  }
  return json({ error: API_ERROR_MESSAGE });
};
