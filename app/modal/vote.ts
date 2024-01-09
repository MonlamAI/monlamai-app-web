import { db } from "~/services/db.server";

export async function createVote(vote: any) {
  console.log("create vote is", vote);
  return await db.vote.upsert({
    where: {
      inferenceId: vote.inferenceId,
    },
    create: vote,
    update: vote,
  });
}
