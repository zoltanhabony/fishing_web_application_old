"use client";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { catchInLogBookSchema } from "@/data/schema";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Fogási napló ellenőrzése",
  description: "Ellenőrizze a felhasználók fogásait",
};
type schema = z.infer<typeof catchInLogBookSchema> | undefined;

interface CheckCatchTableProps {
  data:any
}
const CheckCatchTable : React.FC<CheckCatchTableProps> = ({data}) => {
  
  
  return (
    <>
      <div className="grid h-auto w-full overflow-scroll pt-[20px]">
        <div className="text-left">
          <h1 className="text-2xl font-bold">Fogási napló ellenőrzése</h1>
          <p className="text-muted-foreground">
            Ellenőrizze a felhasználók fogásait
          </p>
        </div>
        <DataTable data={data}  columns={columns} />
        <Toaster />
      </div>
    </>
  );
}

export default CheckCatchTable