"use client";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "@/components/dataTables/userTable/Columns";
import { DataTable } from "@/components/dataTables/userTable/DataTable";
import { userTableSchema } from "@/data/schema";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Fogási napló",
  description: "Keresse vissza fogásait",
};
type schema = z.infer<typeof userTableSchema> | undefined;

export default function UserTable() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/user/userDataAccess");
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.users.forEach((user: any) => {
          transformedData.push({
            userId: user.id,
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            logBookId: user.LogBook.serialNumber,
            expiresDate: new Date(user.LogBook.expiresDate),
            haveAccessToPost: user.accessRight.haveAccessToPost,
            haveAccessToTournament: user.accessRight.haveAccessToTournament,
            haveAccessToFishing: user.accessRight.haveAccessToFishing,
          });
        });
        setUsers(transformedData);
      } else {
        setUsers([]);
      }
    }
    getRequest();
  }, []);
  return (
    <>
      <div className="grid w-full ">
        <div className="text-left w-full">
          <h1 className="text-2xl font-bold pl-5">Felhasználókezelés</h1>
          <p className="text-muted-foreground pl-5">
            Lista az alkalmazás felhasználóiról
          </p>
        </div>
        <DataTable data={users} columns={columns} />
      </div>
    </>
  );
}
