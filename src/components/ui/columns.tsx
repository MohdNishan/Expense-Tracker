"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { ImageIcon } from "@radix-ui/react-icons"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div className="w-[80px] ">{row.getValue("date")}</div>,

  },
  {
    accessorKey: "Category",
    
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("Category")}</div>,

  },
  {
    accessorKey: "Description",
    
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Description")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "Paidby",

    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("Paidby")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "Paidto",
    
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("Paidto")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "Invoicefile",
    
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("Invoicefile")}
    <a href="" className="text-blue-700 underline ml-3 text-sm">View File</a></div>,

  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div className="w-[80px] font-semibold">₹ {row.getValue("amount")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]