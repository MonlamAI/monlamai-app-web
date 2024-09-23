import type { LoaderFunctionArgs } from "@remix-run/node";
import { userPrefs } from "../services/cookies.server";
import { eng_languagesOptions } from "~/helper/const";
import { getHeaders } from "~/component/utils/getHeaders.server";
import { auth } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let text = url.searchParams.get("text") as string;
  let target = url.searchParams.get("target") as string;
  let inference_id = url.searchParams.get("id") as string;
  let user = await auth.isAuthenticated(request);
  const API_URL = process.env?.API_URL;
  let api_url = API_URL + "/api/v1/translation/stream";
  let token=user ? user?.id_token : null;
  let body = JSON.stringify({
    input: text,
    target,
    inference_id,
  });
  let headers = await getHeaders(request,token);
  console.log(headers)
  return fetch(api_url, {
    method: "POST",
    body,
    headers,
  });
}
