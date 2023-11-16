import { options } from "@/app/api/auth/[...nextauth]/options";
import AddCatch from "@/components/catches/AddCatch";
import CreateLogBook from "@/components/logBook/createLogBook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";

const LogBook = async () => {
  const session = await getServerSession(options);
  if (session) {
    if (session.user.role === "ADMIN") {
      return (
        <Tabs defaultValue="createLogBook" className="w-[100%] h-full flex flex-col">
          <TabsList>
            <TabsTrigger value="createLogBook">Napló létrehozása</TabsTrigger>
            <TabsTrigger value="checkLogBook">Napló ellenőrzés</TabsTrigger>
            <TabsTrigger value="allCatch">Összes fogás</TabsTrigger>
          </TabsList>
          <TabsContent value="createLogBook" className="h-full w-full">
            <CreateLogBook/>
          </TabsContent>
          <TabsContent value="checkLogBook" className="">
            <div className="text-md flex flex-col justify-center items-center text-center p-10">
              <p>Napló ellenőrzése</p>
              <p className="text-sm mt-3 text-muted-foreground">
                A felület elkészítése folyamatban...
              </p>
            </div>
          </TabsContent>
          <TabsContent value="allCatch">
            <div className="text-md flex flex-col justify-center items-center text-center p-10">
              <p>Összes fogás</p>
              <p className="text-sm mt-3 text-muted-foreground">
                A felület elkészítése folyamatban...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      );
    }
    return (
      <Tabs defaultValue="addCatch" className="w-[100%] h-full flex flex-col">
        <TabsList>
          <TabsTrigger value="addCatch">Fogás felvétele</TabsTrigger>
          <TabsTrigger value="savedCatch">Rögzített fogások</TabsTrigger>
          <TabsTrigger value="allCatch">Összes fogás</TabsTrigger>
        </TabsList>
        <TabsContent value="addCatch" className="h-full w-full">
          <AddCatch />
        </TabsContent>
        <TabsContent value="savedCatch" className="">
          <div className="text-md flex flex-col justify-center items-center text-center p-10">
            <p>Rögzített fogások</p>
            <p className="text-sm mt-3 text-muted-foreground">
              A felület elkészítése folyamatban...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="allCatch">
          <div className="text-md flex flex-col justify-center items-center text-center p-10">
            <p>Összes fogás</p>
            <p className="text-sm mt-3 text-muted-foreground">
              A felület elkészítése folyamatban...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
  return <p>Access Denied</p>;
};

export default LogBook;
