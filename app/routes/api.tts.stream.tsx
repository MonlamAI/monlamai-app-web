import type { LoaderFunctionArgs } from "@remix-run/node";
import { userPrefs } from "../services/cookies.server";
import { eng_languagesOptions } from "~/helper/const";
import { getHeaders } from "~/component/utils/getHeaders.server";
import { auth } from "~/services/auth.server";
import inputReplace from "~/component/utils/ttsReplace.server";


export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let text = url.searchParams.get("text") as string;
  console.log(text)
  let user = await auth.isAuthenticated(request);
  const API_URL = process.env?.API_URL;
  let api_url = API_URL + "/api/v1/tts/stream";
  let token=user ? user?.id_token : null;
  const body = JSON.stringify({
    input: inputReplace(text),
  });
  let headers = await getHeaders(request,token);
  return fetch(api_url, {
    method: "POST",
    body,
    headers,
  });
}
