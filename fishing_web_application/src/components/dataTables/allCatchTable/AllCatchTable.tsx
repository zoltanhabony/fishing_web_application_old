"use client";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "@/components/dataTables/allCatchTable/Columns";
import { DataTable } from "@/components/dataTables/allCatchTable/DataTable";
import { catchInLogBookSchema } from "@/data/schema";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Fogási napló",
  description: "Keresse vissza fogásait",
};
type schema = z.infer<typeof catchInLogBookSchema> | undefined;

export default function AllCatchTable() {
  const [catches, setCatches] = useState<any[]>([]);

  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/logBookHandler/isNotSaved");
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.catches.forEach((fish: any) => {
          transformedData.push({
            id: fish.catchId,
            fishName: fish.fish.fishName,
            fishImageUrl: fish.fish.fishImageUrl,
            date: new Date(fish.createdAt),
            weight: fish.weight + " " + fish.weightUnit,
            weightUnit: fish.weightUnit,
            length: fish.length + " " + fish.lengthUnit,
            lengthUint: fish.lengthUnit,
            waterAreaCode: fish.waterArea.waterAreaCode,
            waterAreaName: fish.waterArea.waterAreaName,
          });
        });
        setCatches(transformedData);
      }else{
        setCatches([])
      }
    }
    getRequest();
  }, [catches.values,setCatches]);
  return (
    <>
      <div className="w-full sm:w-[500px] md:w-[500px] lg:w-[800px] xl:w-[1000px] xxl:w-full overflow-scroll">
        <div className="text-left">
          <h1 className="text-2xl font-bold">Mentett fogások</h1>
          <p className="text-muted-foreground">
            A Lista a mentett, de a fogási naplóban nem szereplő fogásokat tartalmazza
          </p>
        </div>
        <DataTable data={catches}  columns={columns} />
        <Toaster />
      </div>
    </>
  );
}
