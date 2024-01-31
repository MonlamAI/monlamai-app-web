-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_inferenceId_fkey";

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_inferenceId_fkey" FOREIGN KEY ("inferenceId") REFERENCES "Inference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
