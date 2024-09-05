import { ActionFunction, json } from "@remix-run/node";
import { base64ToBuffer } from "~/component/utils/base64ToBuffer";
import inputReplace from "~/component/utils/ttsReplace.server";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { checkIfInferenceExist, saveInference } from "~/modal/inference.server";
import { getUserDetail } from "~/services/session.server";
import getIpAddressByRequest from "~/component/utils/getIpAddress";

export const action: ActionFunction = async ({ request }) => {
  let ip = getIpAddressByRequest(request);
  let AMPLIFICATION_LEVEL = 5; //1-5 value is safe
  let { user } = await getUserDetail(request);
  const formdata = await request.formData();
  const input_data = formdata.get("input") as string;
  const API_URL = process.env.API_URL as string;
  const AccessKey = process.env?.API_ACCESS_KEY;
  let data;
  let url = API_URL + "/api/v1/tts";
  try {
    const token = user ? user?.token : null;
    const body = JSON.stringify({
      input: inputReplace(input_data),
      id_token: token,
    });

    const response = await fetch(url, {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        Authorization: AccessKey,
        "Content-Type": "application/json",
      },
    });

    data = await response.json();
    console.log(data);
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const { output, responseTime } = data;

  if (output) {
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "tts",
      modelVersion: "v1",
      input: input_data,
      output,
      responseTime,
      ip,
    });
    return { output, inferenceData };
  }
  return null;
};
