import { options } from "@/app/api/auth/[...nextauth]/options";
import CreatePost from "@/components/post/CreatePost";
import PostList from "@/components/post/PostList";
import CreateTournament from "@/components/tournament/CreateTournament";
import TournamentList from "@/components/tournament/TournamentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth/next";

const Tournament = async () => {
  const session = await getServerSession(options);
  if (session) {
    if (session.user.role === "ADMIN") {
      return (
        <>
          <Tabs
            defaultValue="tournament"
            className="w-[100%] h-full flex flex-col"
          >
            <TabsList>
              <TabsTrigger value="tournament">Versenyek</TabsTrigger>
              <TabsTrigger value="createTournament">
                Verseny létrehozása
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tournament" className="h-full w-full">
              <TournamentList />
            </TabsContent>
            <TabsContent
              value="createTournament"
              className="relative h-full w-full overflow-scroll"
            >
              <div className="text-md flex flex-col p-10">
                <CreateTournament />
              </div>
            </TabsContent>
          </Tabs>
          <Toaster />
        </>
      );
    }
    if (session.user.role === "USER") {
      return (
        <>
          <TournamentList />
          <Toaster />
        </>
      );
    }
  }
  return <p>Hozzáférés megtagadva</p>;
};

export default Tournament;
