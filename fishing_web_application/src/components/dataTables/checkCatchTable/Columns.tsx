"use client"
import { ColumnDef } from "@tanstack/react-table"
import { CatchInLogBookSchema} from "@/data/schema"
import { DataTableColumnHeader } from "./ColumnHeader"

export const columns: ColumnDef<CatchInLogBookSchema | undefined>[] = [
  {
    accessorKey: "fishImageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kép" />
    ),
    enableSorting: false,

    cell: ({row}) => {
      console.log(row.getValue("fishImageUrl"))
      return (
        <div className="flex space-x-2 min-w-[50px] text-left">
          <img src={row.getValue("fishImageUrl")} alt="" className="max-w-[80px] max-h-[80px]"/>
        </div>
      )
    },
  },
  {
    accessorKey: "fishName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Faj" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("fishName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dátum" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      const year = date.getFullYear()
      const month = date.getMonth()
      let day = ""
      if(date.getDay().toLocaleString().length === 1){
        day = "0"+date.getDay()
      }else{
        day = ""+date.getDay()
      }
      let hour = ""
      let minute = ""
      if(date.getHours().toLocaleString().length === 1){
        hour = "0"+date.getHours()
      }else{
        hour = ""+date.getHours()
      }
      if(date.getMinutes().toLocaleString().length === 1){
        minute = "0"+date.getMinutes()
      }else{
        minute = ""+date.getMinutes()
      }
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {String(year+"."+month+"."+day+" "+hour+":"+minute)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "waterAreaCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vízterület kódja" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("waterAreaCode")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "waterAreaName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vízterület neve" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("waterAreaName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mennyiség" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("weight")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Méret" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <p className={row.getValue("length") === "0 null" ? "w-full truncate font-medium text-gray-400" : "w-full truncate font-medium"}>
            {row.getValue("length") === "0 null" ? "nincs megadva" : row.getValue("length")}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fogás azonosító" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <p className="w-full truncate font-medium">
            {row.getValue("id")}
          </p>
        </div>
      )
    },
  },
]