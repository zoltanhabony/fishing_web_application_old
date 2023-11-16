/*
  Warnings:

  - You are about to drop the column `fishTypeId` on the `Catches` table. All the data in the column will be lost.
  - Added the required column `fishId` to the `Catches` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WaterAreaType" AS ENUM ('RIVER_WATER', 'STILL_WATER');

-- AlterTable
ALTER TABLE "Catches" DROP COLUMN "fishTypeId",
ADD COLUMN     "fishId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WaterArea" (
    "waterAreaId" TEXT NOT NULL,
    "waterAreaCode" TEXT NOT NULL,
    "waterAreaName" TEXT NOT NULL,
    "waterAreaType" "WaterAreaType" NOT NULL,

    CONSTRAINT "WaterArea_pkey" PRIMARY KEY ("waterAreaId")
);

-- CreateTable
CREATE TABLE "Fish" (
    "fishId" TEXT NOT NULL,
    "fishCode" INTEGER,
    "fishName" TEXT NOT NULL,
    "weightLimit" INTEGER,
    "lengthLimit" DECIMAL(65,30),
    "pieceLimit" INTEGER,

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("fishId")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaterArea_waterAreaCode_key" ON "WaterArea"("waterAreaCode");

-- CreateIndex
CREATE UNIQUE INDEX "Fish_fishCode_key" ON "Fish"("fishCode");

-- AddForeignKey
ALTER TABLE "Catches" ADD CONSTRAINT "Catches_waterAreaId_fkey" FOREIGN KEY ("waterAreaId") REFERENCES "WaterArea"("waterAreaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catches" ADD CONSTRAINT "Catches_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("fishId") ON DELETE RESTRICT ON UPDATE CASCADE;
