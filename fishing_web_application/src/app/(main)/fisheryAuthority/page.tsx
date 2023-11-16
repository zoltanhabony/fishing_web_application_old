import { options } from "@/app/api/auth/[...nextauth]/options";
import CreateFisheryAuthority from "@/components/fisheryAuthority/createFisheryAuthority";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";

const FisheryAuthority = async () => {
  const session = await getServerSession(options);
  if (session) {
    if (session.user.role === "ADMIN") {
      return (
        <Tabs defaultValue="createAuthority" className="w-[100%] h-full flex flex-col">
          <TabsList>
            <TabsTrigger value="createAuthority">Egyesület létrehozása</TabsTrigger>
            <TabsTrigger value="allAuthority">Egyesületek listája</TabsTrigger>
          </TabsList>
          <TabsContent value="createAuthority" className="h-full w-full">
             <CreateFisheryAuthority/>
          </TabsContent>
          <TabsContent value="allAuthority" className="">
            <div className="text-md flex flex-col justify-center items-center text-center p-10">
              <p>Egyesületek listája</p>
              <p className="text-sm mt-3 text-muted-foreground">
                A felület elkészítése folyamatban...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
    }
  }
  return <p>Access Denied</p>;
};

export default FisheryAuthority;
