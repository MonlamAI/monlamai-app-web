import type { ActionFunction } from "@remix-run/node";
import { createVote } from "~/modal/vote.server";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let inferenceId = formdata.get("inferenceId") as string;
  let action = formdata.get("action") as string;

  let liked: boolean = action === "liked" ? true : false;
  let disliked: boolean = action === "disliked" ? true : false;

  const vote = await createVote({
    inferenceId,
    liked,
    disliked,
  });

  return {
    vote,
    message: liked ? "བཀའ་དྲིན་ཆེ།" : "དགོངས་འགལ་མེད་པ་ཞུ།",
  };
};
