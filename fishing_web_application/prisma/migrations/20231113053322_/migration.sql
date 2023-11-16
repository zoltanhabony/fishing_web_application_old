/*
  Warnings:

  - Added the required column `countyName` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "countyName" TEXT NOT NULL;
