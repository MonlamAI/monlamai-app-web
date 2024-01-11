import { ActionFunction, json } from "@remix-run/node";
import inputReplace from "~/component/utils/ttsReplace.server";
import { verifyDomain } from "~/component/utils/verifyDomain";
import { checkIfInferenceExist, saveInference } from "~/modal/inference";
import { getUser } from "~/modal/user";
import { auth } from "~/services/auth.server";

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
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        inputs: inputReplace(userInput),
      }),
    });
    const data = await response.json();
    const { audio_base64 } = data;

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
        output: audio_base64,
        responseTime: responseTime,
      });
      return { data: audio_base64, inferenceData };
    } else {
      return { data: audio_base64, inferenceData: checkifModelExist };
    }
  } catch (e) {
    return {
      error: "There was a problem with the API :" + e,
    };
  }
};
