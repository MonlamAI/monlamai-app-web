import { db } from "~/services/db.server";

export async function getExistingVote(inferenceId) {
  return await db.vote.findUnique({
    where: { inferenceId },
  });
}
export async function createVote(vote: any) {
  return await db.vote.upsert({
    where: {
      inferenceId: vote.inferenceId,
    },
    create: vote,
    update: vote,
  });
}
