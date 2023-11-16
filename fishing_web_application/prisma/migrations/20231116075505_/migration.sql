/*
  Warnings:

  - Made the column `weight` on table `Catch` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Catch" ADD COLUMN     "method" TEXT,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "temperature" DROP NOT NULL;
