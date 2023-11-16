/*
  Warnings:

  - A unique constraint covering the columns `[taxId]` on the table `FisheryAuthority` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FisheryAuthority_taxId_key" ON "FisheryAuthority"("taxId");
