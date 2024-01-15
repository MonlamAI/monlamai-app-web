import { db } from "~/services/db.server";

export type modelType = "mt" | "stt" | "tts" | "ocr";

export async function checkIfExist(
  source: string,
  userId: number,
  model: modelType
) {
  let checkDublicate = await db.feedback.findFirst({
    where: {
      userId,
      source,
      model,
    },
  });
  return checkDublicate;
}

export async function likedata(
  source: string,
  output: string,
  userId: number,
  model: modelType
) {
  let data = await checkIfExist(source, userId, model);
  if (!!data?.id) {
    return await db.feedback.update({
      where: {
        id: data.id,
      },
      data: {
        liked: true,
        disliked: false,
      },
    });
  } else {
    return await db.feedback.create({
      data: {
        source: source,
        output: output,
        liked: true,
        disliked: false,
        model,
        userId: userId,
      },
    });
  }
}

export async function dislikedata(
  source: string,
  output: string,
  userId: number,
  model: modelType
) {
  let data = await checkIfExist(source, userId, model);
  if (!!data?.id) {
    return await db.feedback.update({
      where: {
        id: data.id,
      },
      data: {
        liked: false,
        disliked: true,
      },
    });
  } else {
    return await db.feedback.create({
      data: {
        source: source,
        output: output,
        liked: false,
        disliked: true,
        model,
        userId: userId,
      },
    });
  }
}
