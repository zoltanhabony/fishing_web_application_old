"use client";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "@/components/dataTables/savedCatchTable/Columns";
import { DataTable } from "@/components/dataTables/savedCatchTable/DataTable";
import { catchInLogBookSchema } from "@/data/schema";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Fogási napló",
  description: "Keresse vissza fogásait",
};
type schema = z.infer<typeof catchInLogBookSchema> | undefined;

export default function Table() {
  const [catches, setCatches] = useState<any[]>([]);

  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/logBookHandler/isSaved");
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
  }, []);
  return (
    <>
      <div className="relative h-auto w-full sm:w-[500px] md:w-[500px] lg:w-[800px] xl:w-[1000px] xxl:w-full">
        <div className="text-left w-full">
          <h1 className="text-2xl font-bold">Fogási napló</h1>
          <p className="text-muted-foreground">
            Lista a fogási naplóban szereplő halakról
          </p>
        </div>
        <DataTable data={catches} columns={columns} />
      </div>
    </>
  );
}
