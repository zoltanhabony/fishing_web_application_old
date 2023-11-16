/*
  Warnings:

  - You are about to drop the column `currencyId` on the `LogBook` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LogBook" DROP CONSTRAINT "LogBook_currencyId_fkey";

-- AlterTable
ALTER TABLE "LogBook" DROP COLUMN "currencyId",
ADD COLUMN     "currencyCurrencyId" TEXT,
ALTER COLUMN "feeId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Fee" (
    "feeId" TEXT NOT NULL,
    "baseFee" INTEGER NOT NULL,
    "eszh" INTEGER,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("feeId")
);

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("feeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE;
