/*
  Warnings:

  - You are about to drop the column `lengthUnitId` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureUnitId` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `weightUnitId` on the `Catch` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Catch" DROP CONSTRAINT "Catch_lengthUnitId_fkey";

-- DropForeignKey
ALTER TABLE "Catch" DROP CONSTRAINT "Catch_temperatureUnitId_fkey";

-- DropForeignKey
ALTER TABLE "Catch" DROP CONSTRAINT "Catch_weightUnitId_fkey";

-- AlterTable
ALTER TABLE "Catch" DROP COLUMN "lengthUnitId",
DROP COLUMN "temperatureUnitId",
DROP COLUMN "weightUnitId",
ADD COLUMN     "lengthUnit" TEXT,
ADD COLUMN     "temperatureUnit" TEXT,
ADD COLUMN     "weightUnit" TEXT;
