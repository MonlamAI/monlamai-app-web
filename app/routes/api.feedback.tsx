import type { ActionFunction } from "@remix-run/node";
import { createVote, getExistingVote } from "~/modal/vote.server";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let inferenceId = formdata.get("inferenceId") as string;
  let action = formdata.get("action") as string;
  let existingVote = await getExistingVote(inferenceId);

  let liked: boolean | null = null;
  let disliked: boolean | null = null;

  if (action === "liked") {
    liked = existingVote?.liked ? false : true;
    disliked = false;
  } else if (action === "disliked") {
    disliked = existingVote?.disliked ? false : true;
    liked = false;
  }

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
