import type { ActionFunction } from "@remix-run/node";
import inputReplace from "~/component/utils/ttsReplace.server";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { getHeaders } from "../component/utils/getHeaders.server";
import { auth } from "~/services/auth.server";
import {validateInput} from "~/lib/inputValidator.server";

export const action: ActionFunction = async ({ request }) => {
  let user = await auth.isAuthenticated(request);
  const formdata = await request.formData();
  const input_data = formdata.get("input") as string;
  const API_URL = process.env.API_URL as string;
  let url = API_URL + "/api/v1/tts/stream";
  const validation = validateInput(input_data);
  if (!validation.isValid) {
    return {
      error: validation.error,
      charCount: validation.charCount
    };
  }
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
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }

};
