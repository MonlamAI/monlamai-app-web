import { ActionFunction } from "@remix-run/node";
import { saveInference } from "~/modal/inference.server";
import applyReplacements from "./model.ocr/utils/replacements";
import { getUserDetail } from "~/services/session.server";
import getIpAddressByRequest from "~/component/utils/getIpAddress";
import { API_ERROR_MESSAGE } from "~/helper/const";

export const action: ActionFunction = async ({ request }) => {
  let ip = getIpAddressByRequest(request);
  let formdata = await request.formData();
  let { user } = await getUserDetail(request);
  let URL_File = process.env.API_URL;
  const AccessKey = process.env?.API_ACCESS_KEY;
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
      headers: {
        Accept: "application/json",
        Authorization: AccessKey,
        "Content-Type": "application/json",
      },
    });

    data = await res.json();
  } catch (e) {
    return {
      error: API_ERROR_MESSAGE,
    };
  }
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  if (data?.output) {
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "ocr",
      input: imageUrl,
      type: "image",
      output: data?.output,
      jobId: null,
      ip,
      responseTime: responseTime,
    });
    return {
      text: inferenceData.output,
      coordinate: show_coordinate ? data?.coordinates : null,
      inferenceId: inferenceData?.id,
    };
  }
  return {
    error: API_ERROR_MESSAGE,
  };
};
