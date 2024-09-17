import type { LoaderFunctionArgs } from "@remix-run/node";
import { userPrefs } from "../services/cookies.server";
import { eng_languagesOptions } from "~/helper/const";
import { getUserDetail, verify_token } from "~/services/session.server";
import { getHeaders } from "../component/utils/getHeaders.server";
export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let text = url.searchParams.get("text") as string;
  let target = url.searchParams.get("target") as string;
  let inference_id = url.searchParams.get("id") as string;
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  let csrfToken = cookie.token;
  let token_server = await verify_token(csrfToken);

  if (!token_server) {
    return new Response("Invalid token", { status: 403 });
  }
  let { user } = await getUserDetail(request);
  const API_URL = process.env?.API_URL;
  
  let api_url = API_URL + "/api/v1/translation/stream";
  let body = JSON.stringify({
    input: text,
    target,
    id_token: user ? user?.token : null,
    inference_id,
  });
  let headers = await getHeaders(request);
  return fetch(api_url, {
    method: "POST",
    body,
    headers,
  });
}
