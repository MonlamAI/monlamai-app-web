/*
  Warnings:

  - You are about to drop the column `feedback` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `output` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inferenceId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inferenceId` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "feedback",
DROP COLUMN "model",
DROP COLUMN "output",
DROP COLUMN "source",
DROP COLUMN "userId",
ADD COLUMN     "inferenceId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Inference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "model" "models" NOT NULL,
    "modelVersion" TEXT,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "responseTime" INTEGER,
    "edited" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_inferenceId_key" ON "Feedback"("inferenceId");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_inferenceId_fkey" FOREIGN KEY ("inferenceId") REFERENCES "Inference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inference" ADD CONSTRAINT "Inference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
