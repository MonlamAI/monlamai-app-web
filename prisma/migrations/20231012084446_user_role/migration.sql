-- CreateEnum
CREATE TYPE "role" AS ENUM ('newUser', 'powerUser', 'waitlist');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "role" DEFAULT 'newUser';
