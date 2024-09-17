import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { saveInference } from "~/modal/inference.server";
import { getUserDetail } from "~/services/session.server";
import { getHeaders } from "../component/utils/getHeaders.server";

export const action: ActionFunction = async ({ request }) => {
  let { user } = await getUserDetail(request);
  const formData = await request.formData();
  const API_URL = process.env.API_URL as string;
  let audioURL = formData.get("audioURL") as string;
  let data;
  try {
    const token = user ? user?.token : null;
    let body = JSON.stringify({
      input: audioURL,
      id_token: token,
    });
    let headers = await getHeaders(request);
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
