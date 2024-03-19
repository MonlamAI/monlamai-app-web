import { ActionFunction } from "@remix-run/node";
import { db } from "~/services/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  const jobId = params.job;
  const formdata = await request.formData();
  const jobSource = formdata.get("jobSource") as string;
  const inferenceSelected = await db.inference.findFirst({
    where: { jobId: jobId },
  });
  if (inferenceSelected) {
    const updatedJob = await db.inference.update({
      where: {
        id: inferenceSelected?.id,
        type: "file",
      },
      data: {
        output: jobSource,
      },
    });
    return updatedJob;
  }
  return { job: jobId, error: "job not found" };
};
