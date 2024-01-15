import { ActionFunction, json } from "@remix-run/node";
import { verifyDomain } from "~/component/utils/verifyDomain";
import { saveInference } from "~/modal/inference.server";
import { getUser } from "~/modal/user.server";
import { auth } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const startTime = Date.now();
  const isDomainAllowed = verifyDomain(request);
  if (!isDomainAllowed) {
    // If the referer is not from the expected domain, return a forbidden response
    return json({ message: "Access forbidden" }, { status: 403 });
  }

  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let user = await getUser(userdata?._json.email);
  const formData = await request.formData();
  const apiUrl = process.env.STT_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "audio/flac",
  };
  try {
    let audio = formData.get("audio") as string;
    const blob = await fetch(audio).then((res) => res.blob());
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: blob,
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (response.ok) {
      const data = await response.json();
      // save inference to db
      const inferenceData = await saveInference({
        userId: user?.id,
        model: "stt",
        modelVersion: "v3",
        input: audio,
        output: data?.text,
        responseTime: responseTime,
      });
      return json({ text: data?.text, inferenceId: inferenceData?.id });
    } else {
      return json({ error_message: "Failed to send the audio to the server" });
    }
  } catch (error) {
    return { error_message: "Error during submission:" + error };
  }
};
