-- DropForeignKey
ALTER TABLE "UserLog" DROP CONSTRAINT "UserLog_userId_fkey";

-- AlterTable
ALTER TABLE "UserLog" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserLog" ADD CONSTRAINT "UserLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
