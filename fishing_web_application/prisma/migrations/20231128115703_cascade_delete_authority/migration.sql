-- DropForeignKey
ALTER TABLE "Catch" DROP CONSTRAINT "Catch_logBookId_fkey";

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_logBookId_fkey" FOREIGN KEY ("logBookId") REFERENCES "LogBook"("serialNumber") ON DELETE CASCADE ON UPDATE CASCADE;
