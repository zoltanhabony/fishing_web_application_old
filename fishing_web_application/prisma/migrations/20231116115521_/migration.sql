/*
  Warnings:

  - You are about to drop the column `date` on the `Catch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Catch" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
