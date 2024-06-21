import { ActionFunction, json } from "@remix-run/node";
import { base64ToBuffer } from "~/component/utils/base64ToBuffer";
import inputReplace from "~/component/utils/ttsReplace.server";
import { verifyDomain } from "~/component/utils/verifyDomain";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { checkIfInferenceExist, saveInference } from "~/modal/inference.server";
import { uploadToS3 } from "~/services/uploadToS3.server";
import { v4 as uuidv4 } from "uuid";
import { getUserDetail } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  const isDomainAllowed = verifyDomain(request);
  if (!isDomainAllowed) {
    // If the referer is not from the expected domain, return a forbidden response
    return json({ message: "Access forbidden" }, { status: 403 });
  }

  let user = await getUserDetail(request);

  const formdata = await request.formData();
  const startTime = Date.now();
  // const voiceType = formdata.get("voice") as string;
  const userInput = formdata.get("sourceText") as string;
  const API_URL = process.env.FILE_SUBMIT_URL as string;

  let data;
  try {
    let formData = new FormData();
    formData.append("input", inputReplace(userInput));
    let response = await fetch(API_URL + "/tts/playground", {
      method: "POST",
      body: formData,
      headers: {
        "x-api-key": process.env?.API_ACCESS_KEY!,
      },
    });
    data = await response.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const { output } = data;

  const responseTime = Date.now() - startTime; // Calculate response time
  const checkifModelExist = await checkIfInferenceExist(
    userInput,
    "tts",
    user?.id
  );

  if (!checkifModelExist) {
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "tts",
      modelVersion: "v1",
      input: userInput,
      output,
      responseTime: responseTime,
    });
    return { data: output, inferenceData };
  } else {
    return { data: output, inferenceData: checkifModelExist };
  }
};
