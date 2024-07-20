import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const expenses = sqliteTable('expenses', {
    id: text('id').primaryKey().notNull(),
    category: text('category').notNull(),
    description: text('description').notNull(),
    paidby: text('paidby').notNull(),
    paidto: text('paidto').notNull(),
    date: text('date').notNull(),
    invoiceFile: text('invoiceFile'), 
    amount: integer('amount').notNull(),
  });
  