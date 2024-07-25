import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/ui/columns"
import { DataTable } from "@/components/ui/data-table"
import { UserNav } from "@/components/ui/user-nav"
import { taskSchema } from "@/components/data/schema"
import { UserButton } from "@clerk/nextjs"
import { AddExpense } from "../Form/expenseform"
import { DrawerDialogDemo } from "../Form/expenseform1"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your expenses for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserButton />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      <DrawerDialogDemo/>
      </div>
    </>
  )
}