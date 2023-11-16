/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Catches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unitType` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('MASS', 'LENGTH', 'TEMPERATURE');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Catches" DROP CONSTRAINT "Catches_fishId_fkey";

-- DropForeignKey
ALTER TABLE "Catches" DROP CONSTRAINT "Catches_logBookId_fkey";

-- DropForeignKey
ALTER TABLE "Catches" DROP CONSTRAINT "Catches_unitTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Catches" DROP CONSTRAINT "Catches_waterAreaId_fkey";

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

-- AlterTable
ALTER TABLE "Fish" ADD COLUMN     "banPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "banPeriodStart" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "unitType" "UnitType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Catches";

-- CreateTable
CREATE TABLE "Catch" (
    "catchId" TEXT NOT NULL,
    "logBookId" TEXT NOT NULL,
    "waterAreaId" TEXT NOT NULL,
    "fishId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER,
    "weightUnit" TEXT,
    "legth" INTEGER,
    "lengthUnit" TEXT,
    "isInjured" BOOLEAN,
    "fishingBait" TEXT,
    "temperature" INTEGER NOT NULL,
    "temperatureUnit" TEXT,
    "isStored" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Catch_pkey" PRIMARY KEY ("catchId")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsFishing" ADD CONSTRAINT "IsFishing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_logBookId_fkey" FOREIGN KEY ("logBookId") REFERENCES "LogBook"("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_waterAreaId_fkey" FOREIGN KEY ("waterAreaId") REFERENCES "WaterArea"("waterAreaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("fishId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
