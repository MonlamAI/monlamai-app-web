import { db } from "~/services/db.server";

export async function checkIfExist(source, userId, model) {
  let checkDublicate = await db.feedback.findFirst({
    where: {
      userId,
      source,
      model,
    },
  });
  return checkDublicate;
}

export async function likeMTdata(
  source: string,
  output: string,
  userId: number
) {
  let data = await checkIfExist(source, userId, "mt");
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
        model: "mt",
        userId: userId,
      },
    });
  }
}

export async function dislikeMTdata(
  source: string,
  output: string,
  userId: number
) {
  let data = await checkIfExist(source, userId, "mt");
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
        model: "mt",
        userId: userId,
      },
    });
  }
}
