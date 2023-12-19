"use client";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { catchInLogBookSchema } from "@/data/schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import ModifySavedCatchForm from "../../form/ModifySavedCatch";
import CatchInformation from "@/components/catches/CatchInformation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  fishImageUrl:string
  fishName:string
}

export function DataTableRowActions<TData>({
  row,
  fishImageUrl,
  fishName
}: DataTableRowActionsProps<TData>) {
  const catches = catchInLogBookSchema.parse(row.original);

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
              Módosítás
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-scroll max-h-screen items-center justify-center">
            <DialogHeader>
              <DialogTitle className="relative">Fogás módosítása</DialogTitle>
              <img
                src={fishImageUrl}
                alt=""
                className=" w-[100px] h-[100px]"
              />
              <DialogDescription>
                A(z) {row.getValue("id")} azonosítójú hal adatait készül
                módosítani!
              </DialogDescription>
            </DialogHeader>
            <ModifySavedCatchForm catchId={row.getValue("id")} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" className="w-full">
              Megtekintés
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-scroll max-h-screen items-center ">
            <DialogHeader>
              <DialogTitle className="relative">Fogás Adatai</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Az alábbi összesítésben a fogással kapcsolatos adatokat láthatja
          </DialogDescription>
            <img
                src={fishImageUrl}
                alt={fishName}
                className=" w-[100px] h-[100px]"
              />
            <CatchInformation catchId={row.getValue("id")}/>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

//<DropdownMenuItem>Megtekintés</DropdownMenuItem>
