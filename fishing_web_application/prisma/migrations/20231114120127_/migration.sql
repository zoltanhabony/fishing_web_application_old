/*
  Warnings:

  - You are about to drop the `Fee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "LogBook" DROP CONSTRAINT "LogBook_feeId_fkey";

-- DropTable
DROP TABLE "Fee";

-- CreateTable
CREATE TABLE "Fees" (
    "feeId" TEXT NOT NULL,
    "baseFee" INTEGER NOT NULL,
    "eszh" INTEGER,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "Fees_pkey" PRIMARY KEY ("feeId")
);

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fees"("feeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE;
