import type { ActionFunction } from "@remix-run/node";
import { createVote, getExistingVote } from "~/modal/vote.server";
import { getHeaders } from "~/component/utils/getHeaders.server";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let inferenceId = formdata.get("inferenceId") as string;
  let inferenceType=formdata.get("inferenceType") as string;
  let action = formdata.get("action") as string;
  
  const api_url = process.env?.API_URL + `/api/v1/${inferenceType}/${inferenceId}?action=${action}`;
  
  const headers=await getHeaders(request);
  const data=await fetch(api_url, {
    method: "PUT",
    headers,
  });
  const res=await data.json();
  return {
    like: res.data?.liked_count,
    dislike: res.data?.disliked_count,
    message: true ? "བཀའ་དྲིན་ཆེ།" : "དགོངས་འགལ་མེད་པ་ཞུ།",
  };
};
