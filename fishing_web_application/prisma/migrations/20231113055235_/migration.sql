/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postalCode` on the `FisheryAuthority` table. All the data in the column will be lost.
  - The required column `cityId` was added to the `City` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `cityId` to the `FisheryAuthority` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FisheryAuthority" DROP CONSTRAINT "FisheryAuthority_postalCode_fkey";

-- DropIndex
DROP INDEX "City_postalCode_key";

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
ADD COLUMN     "cityId" TEXT NOT NULL,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("cityId");

-- AlterTable
ALTER TABLE "FisheryAuthority" DROP COLUMN "postalCode",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FisheryAuthority" ADD CONSTRAINT "FisheryAuthority_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("cityId") ON DELETE RESTRICT ON UPDATE CASCADE;
