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
      type: inference?.type,
      jobId: inference?.jobId,
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

export async function getTodayInferenceByUserIdCountModel(
  userId: number,
  model: models
) {
  return await db.inference.count({
    where: {
      userId,
      model,
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });
}

export async function addFileInference({ input, userId, type, model, jobId }) {
  return await db.inference.create({
    data: {
      input,
      model,
      userId,
      type,
      output: "",
      jobId,
    },
  });
}

export async function getUserFileInferences({ userId, model }) {
  return await db.inference.findMany({
    where: {
      userId,
      type: "file",
      model,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 20,
  });
}

export async function deleteInference({ id }) {
  return await db.inference.delete({
    where: {
      id,
    },
  });
}

export async function getInferences({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  return await db.inference.findMany({
    where: {
      updatedAt: {
        gte: new Date(startDate), // gte means "greater than or equal to"
        lte: new Date(endDate), // lte means "less than or equal to"
      },
      model: { not: "ocr" },
    },
  });
}
