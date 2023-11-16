/*
  Warnings:

  - A unique constraint covering the columns `[fisheryAuthorityName]` on the table `FisheryAuthority` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FisheryAuthority_fisheryAuthorityName_key" ON "FisheryAuthority"("fisheryAuthorityName");
