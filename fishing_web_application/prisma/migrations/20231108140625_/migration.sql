/*
  Warnings:

  - The primary key for the `AccessRight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `accessRightId` column on the `AccessRight` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accessRightId` on the `User` table. All the data in the column will be lost.
  - The `userId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `AccessRight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AccessRight` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `IsFishing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `LogBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Participant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "IsFishing" DROP CONSTRAINT "IsFishing_userId_fkey";

-- DropForeignKey
ALTER TABLE "LogBook" DROP CONSTRAINT "LogBook_userId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accessRightId_fkey";

-- DropIndex
DROP INDEX "User_accessRightId_key";

-- AlterTable
ALTER TABLE "AccessRight" DROP CONSTRAINT "AccessRight_pkey",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "accessRightId",
ADD COLUMN     "accessRightId" SERIAL NOT NULL,
ADD CONSTRAINT "AccessRight_pkey" PRIMARY KEY ("accessRightId");

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "IsFishing" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LogBook" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "accessRightId",
DROP COLUMN "userId",
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccessRight_userId_key" ON "AccessRight"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "IsFishing_userId_date_key" ON "IsFishing"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "LogBook_userId_key" ON "LogBook"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_tournamentId_userId_key" ON "Participant"("tournamentId", "userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsFishing" ADD CONSTRAINT "IsFishing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRight" ADD CONSTRAINT "AccessRight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
