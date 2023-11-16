-- DropIndex
DROP INDEX "FisheryAuthority_taxId_key";

-- AlterTable
ALTER TABLE "FisheryAuthority" ALTER COLUMN "taxId" SET DATA TYPE TEXT;
