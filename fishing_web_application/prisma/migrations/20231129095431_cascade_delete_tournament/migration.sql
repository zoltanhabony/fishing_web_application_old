-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_tournamentId_fkey";

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("tournamentId") ON DELETE CASCADE ON UPDATE CASCADE;
