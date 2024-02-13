import { models } from "@prisma/client";
import { db } from "~/services/db.server";

// here saved all the inference data like - user(userid), modal, input, output, response time?, edited?,
export async function saveInference(inference: any) {
  return await db.inference.create({
    data: {
      userId: inference.userId,
      model: inference.model,
      input: inference.input,
      output: inference.output,
      responseTime: inference.responseTime,
      inputLang: inference.inputLang,
      outputLang: inference.outputLang,
    },
  });
}

// checkifInferenceExistwithsameInputandModel
export async function checkIfInferenceExist(
  input: string,
  model: models,
  userId: number
) {
  return await db.inference.findFirst({
    where: {
      input,
      model,
      userId,
    },
  });
}

export async function updateEdit(inferenceId: string, edited: string) {
  return await db.inference.update({
    where: { id: inferenceId },
    data: {
      edited,
    },
  });
}
