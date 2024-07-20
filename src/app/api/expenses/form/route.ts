import { NextResponse } from 'next/server';
import { db } from '@/db';
import { expenses } from '@/db/schema';
import { eq } from 'drizzle-orm'; 

function generateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const paidby = formData.get('paidby') as string;
    const paidto = formData.get('paidto') as string;
    const date = formData.get('date') as string;
    const amount = formData.get('amount') as string;
    const invoiceFile = formData.get('invoiceFile') as string;

    const expenseId = generateUniqueId();
    await db.insert(expenses).values({
      id: expenseId,
      category,
      description,
      paidby,
      paidto,
      date,
      invoiceFile,
      amount: parseFloat(amount),
    }).run();

    return NextResponse.json({ message: 'Expense added successfully' });
  } catch (error) {
    console.error('Error adding expense:', error);
    return NextResponse.json({ message: 'Error adding expense' }, { status: 500 });
  }
}
