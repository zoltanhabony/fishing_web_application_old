"use client";
import { useEffect, useState } from "react";
import TournamentEventCard from "../news/TournamentEventCard";

const TournamentList = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/tournamentHandler");
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.tournaments.forEach((tournament: any) => {
          transformedData.push({
            tournamentId: tournament.tournamentId,
            tournamentName: tournament.tournamentName,
            tournamentDescription: tournament.tournamentDescription,
            deadline: tournament.deadline,
            startDate: tournament.startDate,
            isFinished: tournament.isFinished,
            fishType: tournament.fishType,
            maxParticipants:tournament.maxParticipants,
            tournamentType: tournament.tournamentType,
          });
        });
        console.log(transformedData);
        setTournaments(transformedData);
      } else {
        setTournaments([]);
      }
    }
    getRequest();
  }, []);

  const refreshData = async() =>{ 
    const response = await fetch("/api/tournamentHandler");
    if (response.ok) {
      const data = await response.json();
      const transformedData: any = [];
      data.tournaments.forEach((tournament: any) => {
        transformedData.push({
          tournamentId: tournament.tournamentId,
          tournamentName: tournament.tournamentName,
          tournamentDescription: tournament.tournamentDescription,
          deadline: tournament.deadline,
          startDate: tournament.startDate,
          isFinished: tournament.isFinished,
          fishType: tournament.fishType,
          maxParticipants:tournament.maxParticipants,
          tournamentType: tournament.tournamentType,
        });
      });
      console.log(transformedData);
      setTournaments(transformedData);
    } else {
      setTournaments([]);
    }
  }
  
  
  return (
    <>
      <div><h1 className="text-lg pl-5">Versenyek</h1></div>
      <div className="grid xxl:grid-cols-4 xxl:grid-rows-2 gap-3 grid-flow-row lg:grid-cols-2 sxl:grid-cols-2 cp1:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1  h-auto p-5">
        {!tournaments.length ? <p className="text-sm text-gray-500">Nincs elérhető vereny</p> : tournaments.map((tournament) => {
          return (
            <TournamentEventCard
                  key={tournament.tournamentId}
                  eventType={"Tournament"}
                  eventId={tournament.tournamentId}
                  title={tournament.tournamentName}
                  deadline={String(tournament.deadline)}
                  fishType={tournament.fishType}
                  tournamentType={tournament.tournamentType}
                  date={String(tournament.startDate)}
                  description={tournament.tournamentDescription.substring(0, 200) + "..."}
                  fullDescription={tournament.tournamentDescription}
                  inPage={true}
                  refreshData={refreshData} maxParticipants={tournament.maxParticipants}/>
          );
        })}
      </div>
    </>
  );
};

export default TournamentList;
