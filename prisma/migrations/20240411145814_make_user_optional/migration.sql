-- DropForeignKey
ALTER TABLE "Inference" DROP CONSTRAINT "Inference_userId_fkey";

-- AlterTable
ALTER TABLE "Inference" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Inference" ADD CONSTRAINT "Inference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
