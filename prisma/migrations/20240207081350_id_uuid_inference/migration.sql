/*
  Warnings:

  - The primary key for the `Inference` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_inferenceId_fkey";

-- AlterTable
ALTER TABLE "Inference" DROP CONSTRAINT "Inference_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Inference_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Inference_id_seq";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "inferenceId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_inferenceId_fkey" FOREIGN KEY ("inferenceId") REFERENCES "Inference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
