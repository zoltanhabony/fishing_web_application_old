import { options } from "@/app/api/auth/[...nextauth]/options";
import AllAuthorityTable from "@/components/dataTables/authorityTable/AuthorityTable";
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
          <TabsContent value="createAuthority" className="relative h-full w-full overflow-scroll">
             <CreateFisheryAuthority/>
          </TabsContent>
          <TabsContent value="allAuthority" className="relative h-full w-full overflow-scroll">
            <div className=" grid text-md  flex-col justify-center items-center text-center p-10">
            <AllAuthorityTable/>
            </div>
          </TabsContent>
        </Tabs>
      );
    }
  }
  return <p>Access Denied</p>;
};

export default FisheryAuthority;
