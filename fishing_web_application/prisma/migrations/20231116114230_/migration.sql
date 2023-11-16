/*
  Warnings:

  - You are about to drop the column `legth` on the `Catch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Catch" DROP COLUMN "legth",
ADD COLUMN     "length" DECIMAL(65,30);
