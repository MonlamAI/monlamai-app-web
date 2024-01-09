import { db } from "~/services/db.server";

// here saved all the inference data like - user(userid), modal, input, output, response time?, edited?,
export async function saveInference(inference: any) {
  console.log("create inference is", inference);
  return await db.inference.create({
    data: inference,
  });
}

export async function updateEdit(inferenceId: string, edited: string) {
  return await db.inference.update({
    where: { id: parseInt(inferenceId) },
    data: {
      edited,
    },
  });
}
