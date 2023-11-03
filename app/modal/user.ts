import { db } from "~/services/db.server";

export async function getOrCreateUser(session) {
  try {
    let user = await db.user.findFirst({
      where: { username: session?.name },
    });
    if (!user) {
      user = await db.user.create({
        data: {
          username: session?.name,
          email: session?.email,
          picture: session?.picture,
        },
      });
    }
    return user;
  } catch (e) {
    throw new Error(e + "user not found");
  }
}

export async function getUser(email: string) {
  return await db.user.findFirst({
    where: { email },
  });
}

export async function getUsers(value: string) {
  if (!value && value === "") {
    return await db.user.findMany();
  }

  return await db.user.findMany({
    where: {
      OR: [{ username: { contains: value } }, { email: { contains: value } }],
    },
  });
}
