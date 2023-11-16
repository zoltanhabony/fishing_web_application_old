/*
  Warnings:

  - A unique constraint covering the columns `[currencyName]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Currency_currencyName_key" ON "Currency"("currencyName");
