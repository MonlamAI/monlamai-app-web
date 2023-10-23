-- CreateEnum
CREATE TYPE "models" AS ENUM ('mt', 'stt', 'tts', 'ocr');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "model" "models" NOT NULL,
    "liked" BOOLEAN,
    "disliked" BOOLEAN,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
