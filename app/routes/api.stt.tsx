import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { getHeaders } from "../component/utils/getHeaders.server";
import { auth } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  let user = await auth.isAuthenticated(request);
  const formData = await request.formData();
  const API_URL = process.env.API_URL as string;
  let audioURL = formData.get("audioURL") as string;
  let data;
  try {
    const token = user ? user?.id_token : null;
    let body = JSON.stringify({
      input: audioURL,
    });
    let headers = await getHeaders(request,token);
    let response = await fetch(API_URL + "/api/v1/stt", {
      method: "POST",
      body,
      headers,
    });
    if (!response.ok)
      return {
        error: API_ERROR_MESSAGE,
      };
    data = await response.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const { output,id } = data;

  if (!output) return json({ error: API_ERROR_MESSAGE });

  return json({ text: output,id });
};
