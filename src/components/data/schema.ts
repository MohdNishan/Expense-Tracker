
import { z } from "zod"

export const taskSchema = z.object({
  date: z.string(),
  Category: z.string(),
  Description: z.string(),
  Paidby: z.string(),
  label: z.string(),
  Paidto: z.string(),   
  amount: z.string(),
})

export type Task = z.infer<typeof taskSchema>
