import type { ActionFunction } from "@remix-run/node";
import { saveInference } from "~/modal/inference.server";
import { getUserDetail } from "~/services/session.server";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { getHeaders } from "../component/utils/getHeaders.server";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let { user } = await getUserDetail(request);
  let URL_File = process.env.API_URL;
  let show_coordinate = formdata.get("show_coordinate") as string;
  let imageUrl = formdata.get("imageUrl") as string;
  const token = user ? user?.id_token : null;
  let body = JSON.stringify({
    input: imageUrl,
    id_token: token,
  });
  let data;
  const startTime = performance.now();
  try {
    let res = await fetch(URL_File + "/api/v1/ocr", {
      method: "POST",
      body,
      headers: await getHeaders(request),
    });

    data = await res.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  if (!data?.output) return {
    error: API_ERROR_MESSAGE,
  };
  return {
    text: data?.output ?? "",
    coordinate: show_coordinate ? data?.coordinates : null,
    id: data?.id,
  };
  
};
