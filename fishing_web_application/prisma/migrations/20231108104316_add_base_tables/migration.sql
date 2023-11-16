/*
  Warnings:

  - You are about to drop the column `waterAreaName` on the `Catches` table. All the data in the column will be lost.
  - The primary key for the `IsFishing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `IsFishing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `IsFishing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feeId]` on the table `LogBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `waterAreaId` to the `Catches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `LogBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feeId` to the `LogBook` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MarkerType" AS ENUM ('DEFAULT', 'FISING_SPOTS', 'FIRE_EMERGENCY', 'ENVIRONMENTAL_POLLUTION', 'FISHING_AUTHORITY', 'CATERING_FACILITIES');

-- AlterTable
ALTER TABLE "Catches" DROP COLUMN "waterAreaName",
ADD COLUMN     "waterAreaId" TEXT NOT NULL,
ALTER COLUMN "unitTypeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "IsFishing" DROP CONSTRAINT "IsFishing_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "LogBook" ADD COLUMN     "currencyId" TEXT NOT NULL,
ADD COLUMN     "feeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageSrc" TEXT;

-- CreateTable
CREATE TABLE "Currency" (
    "currencyId" TEXT NOT NULL,
    "currencyName" TEXT NOT NULL,
    "currencyAcronyms" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("currencyId")
);

-- CreateTable
CREATE TABLE "AccessRight" (
    "accessRightId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "haveAccessToPost" BOOLEAN NOT NULL DEFAULT true,
    "haveAccessToTournament" BOOLEAN NOT NULL DEFAULT true,
    "haveAccessToFishing" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AccessRight_pkey" PRIMARY KEY ("accessRightId")
);

-- CreateTable
CREATE TABLE "Unit" (
    "unitTypeId" TEXT NOT NULL,
    "unitName" TEXT NOT NULL,
    "unitAcronyms" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("unitTypeId")
);

-- CreateTable
CREATE TABLE "Participant" (
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Tournament" (
    "tournamentId" TEXT NOT NULL,
    "tournamentName" TEXT NOT NULL,
    "tournamentDescription" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "maxParticipants" INTEGER NOT NULL,
    "tournamentType" TEXT,
    "fishType" TEXT,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("tournamentId")
);

-- CreateTable
CREATE TABLE "Map" (
    "markerId" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "markerType" "MarkerType" NOT NULL DEFAULT 'DEFAULT',
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("markerId")
);

-- CreateTable
CREATE TABLE "Post" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessRight_userId_key" ON "AccessRight"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_tournamentId_userId_key" ON "Participant"("tournamentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "IsFishing_userId_date_key" ON "IsFishing"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "LogBook_feeId_key" ON "LogBook"("feeId");

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catches" ADD CONSTRAINT "Catches_unitTypeId_fkey" FOREIGN KEY ("unitTypeId") REFERENCES "Unit"("unitTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRight" ADD CONSTRAINT "AccessRight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("tournamentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
