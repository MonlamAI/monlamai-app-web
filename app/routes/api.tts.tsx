import type { ActionFunction } from "@remix-run/node";
import inputReplace from "~/component/utils/ttsReplace.server";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { getHeaders } from "../component/utils/getHeaders.server";
import { auth } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  let user = await auth.isAuthenticated(request);
  const formdata = await request.formData();
  const input_data = formdata.get("input") as string;
  const API_URL = process.env.API_URL as string;
  let data;
  let url = API_URL + "/api/v1/tts";
  try {
    const body = JSON.stringify({
      input: inputReplace(input_data),
    });
    const headers = await getHeaders(request,user);
    const response = await fetch(url, {
      method: "POST",
      body,
      headers,
    });

    data = await response.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const { output,id } = data;

  if (!output)
    return {
      error: API_ERROR_MESSAGE,
    };

  return { output ,id};
};
