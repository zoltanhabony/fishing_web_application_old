"use client";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import {userTableSchema } from "@/data/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import UpdateUserByAdminForm from "@/components/form/UpdateUserByAdminForm";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const users = userTableSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Menü</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" className="w-full">
              Felhasználó adat módosítás
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-scroll max-h-screen items-center justify-center">
            <DialogHeader>
              <DialogTitle className="relative mt-5">Felhasználói adatok módosítása</DialogTitle>
              <DialogDescription>
              <b>{row.getValue("userName")}</b> <p className="text-sm inline">felhasználó adatainak módosítása</p>
              </DialogDescription>
              
            </DialogHeader>
            <UpdateUserByAdminForm userName={row.getValue("userName")} email={row.getValue("email")} firstName={row.getValue("firstName")} lastName={row.getValue("lastName")} expiresDate={row.getValue("expiresDate")} haveAccessToPost={row.getValue("haveAccessToPost")} haveAccessToTournament={row.getValue("haveAccessToTournament")} haveAccessToFishing={row.getValue("haveAccessToFishing")} userId={row.getValue("userId")}/>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
