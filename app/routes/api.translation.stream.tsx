import type { LoaderFunctionArgs } from "@remix-run/node";
import { userPrefs } from "../services/cookies.server";
import { eng_languagesOptions } from "~/helper/const";
import { getHeaders } from "~/component/utils/getHeaders.server";
import { auth } from "~/services/auth.server";
import {validateInput} from "~/lib/inputValidator.server";


export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let text = url.searchParams.get("text") as string;
  let target = url.searchParams.get("target") as string;
  let model = url.searchParams.get("model") as string;
  let user = await auth.isAuthenticated(request);
  const validation = validateInput(text);

  const API_URL = process.env?.API_URL;
  let api_url = API_URL;
  if(model==='MONLAM-MITRA'){
    api_url = API_URL + "/api/v1/translation/mt/stream";
  }

  if(model==='MONLAM-MELONG'){
    api_url = API_URL + "/api/v1/translation/stream";
  }
  let body = JSON.stringify({
    input: text,
    target,
  });
  let headers = await getHeaders(request,user);
  return fetch(api_url, {
    method: "POST",
    body,
    headers,
  });
}
