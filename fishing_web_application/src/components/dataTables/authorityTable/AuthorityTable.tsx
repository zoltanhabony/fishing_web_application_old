"use client";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./Columns";
import { AuthorityDataTable } from "./AuthorityDataTable";
import { fischeryAuthorityTableSchema } from "@/data/schema";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Fogási napló",
  description: "Keresse vissza fogásait",
};
type schema = z.infer<typeof fischeryAuthorityTableSchema> | undefined;

export default function AllAuthorityTable() {
  const [authorities, setAuthorities] = useState<schema[]>([]);

  useEffect(() => {
    async function getRequest() {
      const response = await fetch(
        "/api/fisheryAuthorityHandler/getAllAuthority"
      );
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.authorities.forEach((authority: any) => {
          transformedData.push({
            fisheryAuthorityId: authority.fisheryAuthorityId,
            fisheryAuthorityName: authority.fisheryAuthorityName,
            taxId: authority.taxId,
            location:
              authority.city.postalCode +
              " " +
              authority.city.cityName +
              ", " +
              authority.streetName +
              " " +
              authority.streetNumber +
              " " +
              (authority.floor ? authority.floor +
                " emelet " : "") +
              (authority.door ? authority.door +
                " ajtó " : "") ,
            numberOfMember: authority._count.LogBook
          });
        });
        setAuthorities(transformedData);
      } else {
        setAuthorities([]);
      }
    }
    getRequest();
  }, []);
  return (
    <>
      <div className="grid relative h-auto w-full overflow-scroll pt-[20px]">
        <div className="text-left">
          <h1 className="text-2xl font-bold">Egyesületek listája</h1>
          <p className="text-muted-foreground">
            A Lista az alkalmazásban létrehozott egyesületektet tartalmazza
          </p>
        </div>
        <AuthorityDataTable data={authorities} columns={columns} />
      </div>
    </>
  );
}
