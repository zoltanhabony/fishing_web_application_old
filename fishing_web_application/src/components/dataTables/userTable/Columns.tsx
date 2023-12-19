"use client"
import { ColumnDef } from "@tanstack/react-table"
import { UserTableSchema} from "@/data/schema"
import { DataTableColumnHeader } from "@/components/dataTables/userTable/ColumnHeader"
import { DataTableRowActions } from "@/components/dataTables/userTable/RowActions"
import { CheckCircle2, XCircle } from "lucide-react"

export const columns: ColumnDef<UserTableSchema | undefined>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Felhasználóazonosító" />
    ),
    enableSorting: false,

    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("userId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Felhasználónév" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("userName")}
          </span>
        </div>
      )
    },
  },{
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vezetéknév" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("firstName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Utónév" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("lastName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "logBookId",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fogási napló azonosító" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("logBookId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "expiresDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Érvényesség vége" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {String(new Date(String(row.getValue("expiresDate"))))}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "haveAccessToPost",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Olvasási jog" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("haveAccessToPost")? <CheckCircle2 className="text-green-500"/> : <XCircle className="text-red-500"/>}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "haveAccessToTournament",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Versenyzési jog" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("haveAccessToTournament")? <CheckCircle2 className="text-green-500"/> : <XCircle className="text-red-500"/>}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "haveAccessToFishing",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Horgászási jog" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-left">
          <span className="w-full truncate font-medium">
            {row.getValue("haveAccessToFishing") ? <CheckCircle2 className="text-green-500"/> : <XCircle className="text-red-500"/>}
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]