/*
  Warnings:

  - You are about to drop the column `userId` on the `AccessRight` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AccessRight_userId_key";

-- AlterTable
ALTER TABLE "AccessRight" DROP COLUMN "userId";
