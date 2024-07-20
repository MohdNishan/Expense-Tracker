
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { expenses } from '@/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case 'PUT':
      try {
        const { category, description, paidby, paidto, date, invoiceFile, amount } = body;

        const updatedExpense = await db.update(expenses)
          .set({
            category,
            description,
            paidby,
            paidto,
            date,
            invoiceFile,
            amount,
          })
          .where(expenses.id.eq(id)) 
          .run();

        res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
      } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
