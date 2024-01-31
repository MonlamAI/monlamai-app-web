//get users about data

import { db } from "~/services/db.server";

export async function getUserAboutData(userId: number) {
  try {
    const about_data = await db.aboutUser.findUnique({
      where: {
        userId,
      },
    });
    return about_data;
  } catch (e) {
    throw new Error("cannot get about data");
  }
}

export async function updateUserAboutData(
  { organization, profession, q1, q2, q3, q4 }: any,
  user_id: number
) {
  try {
    let about_data = await db.aboutUser.upsert({
      where: { id: user_id },
      update: {
        organization: organization,
        profession: profession,
        user: {
          connect: {
            id: user_id,
          },
        },
        mtq: q1,
        sttq: q2,
        ttsq: q3,
        ocrq: q4,
      },
      create: {
        organization: organization,
        profession: profession,
        user: {
          connect: {
            id: user_id,
          },
        },
        mtq: q1,
        sttq: q2,
        ttsq: q3,
        ocrq: q4,
      },
    });
    return about_data;
  } catch (e) {
    throw new Error(e);
  }
}
