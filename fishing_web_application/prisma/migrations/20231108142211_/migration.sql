/*
  Warnings:

  - A unique constraint covering the columns `[accessRightId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessRightId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccessRight" DROP CONSTRAINT "AccessRight_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessRightId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_accessRightId_key" ON "User"("accessRightId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accessRightId_fkey" FOREIGN KEY ("accessRightId") REFERENCES "AccessRight"("accessRightId") ON DELETE RESTRICT ON UPDATE CASCADE;
