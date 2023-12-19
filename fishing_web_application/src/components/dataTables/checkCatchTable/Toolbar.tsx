"use client"
import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/dataTables/savedCatchTable/Options"

//import { priorities, statuses } from "../data/data"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
       
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}