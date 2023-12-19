/*
  Warnings:

  - You are about to drop the column `lengthUnit` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureUnit` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `weightUnit` on the `Catch` table. All the data in the column will be lost.
  - Added the required column `weightUnitId` to the `Catch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catch" DROP COLUMN "lengthUnit",
DROP COLUMN "temperatureUnit",
DROP COLUMN "weightUnit",
ADD COLUMN     "lengthUnitId" TEXT,
ADD COLUMN     "temperatureUnitId" TEXT,
ADD COLUMN     "weightUnitId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_weightUnitId_fkey" FOREIGN KEY ("weightUnitId") REFERENCES "Unit"("unitTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_lengthUnitId_fkey" FOREIGN KEY ("lengthUnitId") REFERENCES "Unit"("unitTypeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_temperatureUnitId_fkey" FOREIGN KEY ("temperatureUnitId") REFERENCES "Unit"("unitTypeId") ON DELETE SET NULL ON UPDATE CASCADE;
