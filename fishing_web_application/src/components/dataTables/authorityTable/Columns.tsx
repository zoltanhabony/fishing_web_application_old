"use client"
import { ColumnDef } from "@tanstack/react-table"
import { FisheryAuthorityTableSchema} from "@/data/schema"
import { DataTableColumnHeader } from "./ColumnHeader"
import { DataTableRowActions } from "./RowActions"


export const columns: ColumnDef<FisheryAuthorityTableSchema | undefined>[] = [
  {
    accessorKey: "fisheryAuthorityId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Azonosító szám" />
    ),
    enableSorting: false,

    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 min-w-[50px] text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("fisheryAuthorityId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "fisheryAuthorityName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Egyesület név" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("fisheryAuthorityName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "taxId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Adóazonosító" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("taxId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bejelentett cím" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("location")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "numberOfMember",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tagok száma" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("numberOfMember")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Műveletek" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} fisheryAuthorityId={row.getValue("fisheryAuthorityId")}/>,
  },
  
]