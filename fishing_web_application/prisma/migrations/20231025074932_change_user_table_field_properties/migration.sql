/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "userName" DROP NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
