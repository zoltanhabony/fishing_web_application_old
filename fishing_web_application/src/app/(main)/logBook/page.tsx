import { options } from "@/app/api/auth/[...nextauth]/options";
import AddCatch from "@/components/catches/AddCatch";
import CreateLogBook from "@/components/logBook/createLogBook";
import Table from "@/components/dataTables/savedCatchTable/savedCatchTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import AllCatchTable from "@/components/dataTables/allCatchTable/AllCatchTable";
import CheckLogBook from "@/components/logBook/CheckLogBook";
import CheckAllCatch from "@/components/logBook/CheckAllCatch";

const LogBook = async () => {
  const session = await getServerSession(options);
  if (session) {
    if (session.user.role === "ADMIN") {
      return (
        <Tabs
          defaultValue="createLogBook"
          className="w-[100%] h-full flex flex-col"
        >
          <TabsList>
            <TabsTrigger value="createLogBook">Napló létrehozása</TabsTrigger>
            <TabsTrigger value="checkLogBook">Napló ellenőrzés</TabsTrigger>
            <TabsTrigger value="allCatch">Összes fogás</TabsTrigger>
          </TabsList>
          <TabsContent value="createLogBook" className="h-full w-full">
            <CreateLogBook />
          </TabsContent>
          <TabsContent value="checkLogBook" className="relative h-full w-full overflow-scroll">
            <div className="text-md flex flex-col justify-center items-center text-center p-10 overflow-scroll">
              <CheckLogBook/>
            </div>
          </TabsContent>
          <TabsContent value="allCatch" className="overflow-scroll">
            <div className="grid text-md  flex-col justify-center items-center text-center p-10 overflow-scroll">
              <CheckAllCatch/>
            </div>
          </TabsContent>
        </Tabs>
      );
    }
    return (
      <Tabs defaultValue="addCatch" className="w-[100%] h-full flex flex-col ">
        <TabsList>
          <TabsTrigger value="addCatch">Fogás felvétele</TabsTrigger>
          <TabsTrigger value="savedCatch">Rögzített fogások</TabsTrigger>
          <TabsTrigger value="allCatch">Összes fogás</TabsTrigger>
        </TabsList>
        <TabsContent value="addCatch" className="h-full w-full ">
          <AddCatch />
        </TabsContent>
        <TabsContent
          value="savedCatch"
          className="relative h-full w-full overflow-scroll"
        >
          <div className="text-md flex flex-col justify-center items-center text-center p-10 w-full h-auto">
            <Table />
          </div>
        </TabsContent>
        <TabsContent value="allCatch" className="relative h-full w-full overflow-scroll">
          <div className="w-full text-md flex flex-col justify-center items-center text-center p-10 h-auto overflow-scroll ">
            <AllCatchTable />
          </div>
        </TabsContent>
      </Tabs>
    );
  }
  return <p>Hozzáférés megtagadva</p>;
};

export default LogBook;
