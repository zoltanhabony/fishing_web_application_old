"use client";
import { Column, Row, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import ModifySavedCatchForm from "../../form/ModifySavedCatch";
import CatchInformation from "@/components/catches/CatchInformation";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { table } from "console";
;


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  fishImageUrl: string;
  fishName: string;
  table: Table<TData>
  column: Column<TData>
}


export function DataTableRowActions<TData>({
  table,
  row,
  fishImageUrl,
  fishName,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const deleteCatch = async () => {
    const response = await fetch("/api/catchHandler?catchId="+row.getValue("id"), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen törlés!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
      
    } else {
      toast({
        variant: "default",
        title: "Sikeres törlés!",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
      router.push("/dashboard")
    }
    
    
    
  }

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
              <img src={fishImageUrl} alt="" className=" w-[100px] h-[100px]" />
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
            <CatchInformation catchId={row.getValue("id")} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" className="w-full">
              Törlés
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-scroll max-h-screen items-center ">
            <DialogHeader>
              <DialogTitle className="relative">Fogás törlése</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-destructive">
              A(z) {row.getValue("id")} azonosítójú hal adatait készül törölni!
            </DialogDescription>
            <p className="text-sm"><b>Biztos benne, hogy törölni szeretné?</b></p>
            <p className="text-xs">A művelet nem visszavonható!</p>
            <DialogClose asChild>
            <Button onClick={deleteCatch}>Törlés</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

//<DropdownMenuItem>Megtekintés</DropdownMenuItem>
