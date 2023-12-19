"use client";

interface EventCardProps {
  eventType: "Post" | "Tournament";
  title: string;
  description: string;
  deadline: string;
  fishType: string;
  tournamentType: string;
  maxParticipants: string;
  fullDescription: string;
  inPage: boolean;
  eventId: string;
  date: string;
  refreshData: () => void;
}

import { Trophy, BookOpen, Pencil, Trash2, Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import ModifyTournamentForm from "../form/ModifyTournament";

const TournamentEventCard: React.FC<EventCardProps> = ({
  eventType,
  tournamentType,
  deadline,
  fishType,
  maxParticipants,
  title,
  description,
  fullDescription,
  inPage,
  eventId,
  date,
  refreshData,
}) => {
  const { data: session } = useSession();

  const deletePost = async () => {
    const response = await fetch("/api/postHandler?eventId=" + eventId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen törlés!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
    } else {
      toast({
        variant: "default",
        title: "Sikeres törlés!",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
      refreshData();
    }
  };

  const applyTournament = async () => {
    const data = {
      eventId: eventId,
    };

    const response = await fetch("/api/tournamentHandler/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen jelentkezés!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
    } else {
      toast({
        variant: "default",
        title: "Sikeres jelentkezés",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
    }
  };

  const deleteTournament = async () => {
    const response = await fetch(
      "/api/tournamentHandler?eventId=" + eventId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen törlés!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
    } else {
      toast({
        variant: "default",
        title: "Sikeres törlés!",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
      refreshData()
    }
  }

  return (
    <div className=" relative felx bg-white rounded-xl text-gray-500 shadow-xl p-3 w-full">
      <div className=" relative pl-1">
        <div className="relative flex justify-between items-center w-full">
          <div className="relative flex justify-center items-center w-[32px] h-[32px]  bg-black rounded-sm p-[5px] ">
            {eventType === "Post" ? (
              <BookOpen className="text-white" />
            ) : (
              <Trophy className="text-white" />
            )}
          </div>
          {session?.user.role === "ADMIN" && inPage ? (
            <div className="flex">
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="ghost">
                    <Trash2 className="w-[20px] h-[20px] text-black hover:text-red-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle className="relative">
                      Verseny törlése
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-destructive "></DialogDescription>
                  <p className="text-sm">
                    <b>Biztos benne, hogy törölni szeretné?</b>
                  </p>
                  <p className="text-xs">A művelet nem visszavonható!</p>
                  <DialogClose asChild>
                    <Button onClick={deleteTournament}>Törlés</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="ghost">
                    <Pencil className="w-[20px] h-[20px] text-black hover:text-red-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-y-scroll max-h-screen items-center justify-center">
                  <DialogHeader>
                    <DialogTitle className="relative">
                      Bejegyzés adatainak módosítása
                    </DialogTitle>
                    <DialogDescription>
                      A(z) {eventId} azonosítójú verseny adatait készül
                      módosítani!
                    </DialogDescription>
                  </DialogHeader>
                  <ModifyTournamentForm
                    tournamentId={eventId}
                    tournamentName={title}
                    tournamentDescription={fullDescription}
                    deadline={deadline}
                    startDate={date}
                    maxParticipants={Number(maxParticipants)}
                    refreshData={refreshData}
                    tournamentType={tournamentType}
                    fishType={fishType}
                  />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative flex flex-col justify-center  w-full">
          <p className=" text-gray-900 break-words pt-2">{title}</p>
          <p className="text-xs break-words pt-2">{description}</p>
          <Dialog>
            <DialogTrigger asChild>
              <p className="text-blue-500 text-sm cursor-pointer pt-[5px]">
                Megtekintés
              </p>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-screen items-center ">
              <DialogHeader>
                <DialogTitle className="relative mt-4 text-xl">
                  {title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Jelentkezési határidő: {date}
              </DialogDescription>
              <h3 className="text-md">
                <b>Verseny leírása:</b>
              </h3>
              <p>{fullDescription}</p>
              <p className="text-sm">
                <b>Verseny kezdete:</b> {date}
              </p>
              <p className="text-sm">
                <b>Verseny kategóriája:</b> {tournamentType}
              </p>
              <p className="text-sm">
                <b>Értékelendő haltípus:</b> {fishType}
              </p>
              {session?.user.role === "USER" ? (
                <Button
                  onClick={applyTournament}
                  type="button"
                  className="md:w-[200px] text-center"
                >
                  Jelentkezés
                </Button>
              ) : (
                ""
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TournamentEventCard;
