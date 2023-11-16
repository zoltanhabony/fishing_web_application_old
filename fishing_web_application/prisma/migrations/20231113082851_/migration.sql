/*
  Warnings:

  - A unique constraint covering the columns `[fishCode]` on the table `Fish` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fish_fishCode_key" ON "Fish"("fishCode");
