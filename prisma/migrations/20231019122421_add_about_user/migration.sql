-- CreateTable
CREATE TABLE "AboutUser" (
    "id" SERIAL NOT NULL,
    "organization" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "mtq" TEXT NOT NULL,
    "sttq" TEXT NOT NULL,
    "ttsq" TEXT NOT NULL,
    "ocrq" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AboutUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AboutUser_userId_key" ON "AboutUser"("userId");

-- AddForeignKey
ALTER TABLE "AboutUser" ADD CONSTRAINT "AboutUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
