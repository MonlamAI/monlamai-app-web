/*
  Warnings:

  - You are about to drop the column `target` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "target",
ADD COLUMN     "output" TEXT;
