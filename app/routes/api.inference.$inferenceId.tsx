import { ActionFunction } from "@remix-run/node";
import { deleteInference } from "~/modal/inference.server";
import { db } from "~/services/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  const inferenceId = params.inferenceId;
  if (request.method === "DELETE") {
    let delete_inference = await deleteInference({ id: inferenceId });
    return delete_inference;
  }
  const formdata = await request.formData();
  const jobSource = formdata.get("jobSource") as string;

  const updatedJob = await db.inference.update({
    where: {
      id: inferenceId,
      type: "file",
    },
    data: {
      output: jobSource,
    },
  });

  return updatedJob;
};
