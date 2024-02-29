import { ActionFunction, json } from "@remix-run/node";
import { base64ToBuffer } from "~/component/utils/base64ToBuffer";
import inputReplace from "~/component/utils/ttsReplace.server";
import { verifyDomain } from "~/component/utils/verifyDomain";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { checkIfInferenceExist, saveInference } from "~/modal/inference.server";
import { getUser } from "~/modal/user.server";
import { auth } from "~/services/auth.server";
import { uploadToS3 } from "~/services/uploadToS3.server";
import { v4 as uuidv4 } from "uuid";

export const action: ActionFunction = async ({ request }) => {
  const isDomainAllowed = verifyDomain(request);
  if (!isDomainAllowed) {
    // If the referer is not from the expected domain, return a forbidden response
    return json({ message: "Access forbidden" }, { status: 403 });
  }

  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let user = await getUser(userdata?._json.email);
  const formdata = await request.formData();
  const startTime = Date.now();
  // const voiceType = formdata.get("voice") as string;
  const userInput = formdata.get("sourceText") as string;
  const API_URL = process.env.TTS_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "application/json",
  };
  let data;
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        inputs: inputReplace(userInput),
      }),
    });
    data = await response.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const { audio_base64 } = data;

  // upload to s3 and get the url
  const buffer = base64ToBuffer(audio_base64);
  const key = `TTS/playground/${uuidv4()}.mp3`;
  // Upload the audio and get the URL
  const url = await uploadToS3(buffer, key, "audio/mpeg");
  const responseTime = Date.now() - startTime; // Calculate response time
  const checkifModelExist = await checkIfInferenceExist(
    userInput,
    "tts",
    user?.id
  );

  if (!checkifModelExist && audio_base64) {
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "tts",
      input: userInput,
      output: url,
      responseTime: responseTime,
    });
    return { data: audio_base64, inferenceData };
  } else {
    return { data: audio_base64, inferenceData: checkifModelExist };
  }
};
