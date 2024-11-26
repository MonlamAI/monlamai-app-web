import type { ActionFunction } from "@remix-run/node";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { getHeaders } from "../component/utils/getHeaders.server";
import { auth } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let user = await auth.isAuthenticated(request);
  let URL_File = process.env.API_URL;
  let show_coordinate = formdata.get("show_coordinate") as string;
  let imageUrl = formdata.get("imageUrl") as string;
  let body = JSON.stringify({
    input: imageUrl,
  });
  let data;
  try {
    let res = await fetch(URL_File + "/api/v1/ocr", {
      method: "POST",
      body,
      headers: await getHeaders(request,user),
    });

    data = await res.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  if (!data?.output) return {
    error: API_ERROR_MESSAGE,
  };
  return {
    text: data?.output ?? "",
    coordinate: show_coordinate ? data?.coordinates : null,
    id: data?.id,
  };
  
};
