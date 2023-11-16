/*
  Warnings:

  - The primary key for the `AccessRight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accessRightId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accessRightId_fkey";

-- DropIndex
DROP INDEX "User_accessRightId_key";

-- AlterTable
ALTER TABLE "AccessRight" DROP CONSTRAINT "AccessRight_pkey",
ALTER COLUMN "accessRightId" DROP DEFAULT,
ALTER COLUMN "accessRightId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AccessRight_pkey" PRIMARY KEY ("accessRightId");
DROP SEQUENCE "AccessRight_accessRightId_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessRightId";

-- AddForeignKey
ALTER TABLE "AccessRight" ADD CONSTRAINT "AccessRight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
