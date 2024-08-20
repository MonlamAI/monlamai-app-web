import { LoaderFunctionArgs } from "@remix-run/node";
import { verify_token } from "~/services/session.server";
import { userPrefs } from "../services/cookies.server";
import { eng_languagesOptions } from "~/helper/const";
import { useDharmaMitraAPI } from "../services/features.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let text = url.searchParams.get("text") as string;
  let target = url.searchParams.get("target") as string;
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  let csrfToken = cookie.token;
  let token_server = await verify_token(csrfToken);

  if (!token_server) {
    return new Response("Invalid token", { status: 403 });
  }

  const controller = new AbortController();
  const fileUploadUrl = process.env?.FILE_SUBMIT_URL;

  // if (useDharmaMitraAPI) {
  let api_url = "https://dharmamitra.org/api/translation-exp/";
  let DharmaKey = process.env?.DHARMA_API_KEY;
  let target_lang =
    eng_languagesOptions.find((l) => l.code === target)?.name ?? "tibetan";

  const data = {
    input_sentence: text,
    input_encoding: "auto",
    do_grammar_explanation: true,
    target_lang: target_lang,
    model: "gemma2",
  };
  return fetch(api_url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "x-key": DharmaKey!, // Replace with your actual access key
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  });
  // } else {
  //   const formData = new FormData();
  //   let api_url = fileUploadUrl + "/mt/playground/stream";
  //   const AccessKey = process.env?.API_ACCESS_KEY;
  //   formData.append("input", text);
  //   formData.append("direction", target);
  //   return fetch(api_url, {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       "x-api-key": AccessKey!, // Replace with your actual access key
  //     },
  //     signal: controller.signal,
  //   });
  // }
}
