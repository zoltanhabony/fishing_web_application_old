-- DropForeignKey
ALTER TABLE "LogBook" DROP CONSTRAINT "LogBook_fisheryAuthorityId_fkey";

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_fisheryAuthorityId_fkey" FOREIGN KEY ("fisheryAuthorityId") REFERENCES "FisheryAuthority"("fisheryAuthorityId") ON DELETE CASCADE ON UPDATE CASCADE;
