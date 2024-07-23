import { db } from "@/db";
import { expenses } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allExpenses = await db.select().from(expenses).all();
    return NextResponse.json(allExpenses, {
      headers: {
        'Cache-Control': 's-maxage=10, stale-while-revalidate', // Caching header example
      },
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ message: 'Error fetching expenses' }, { status: 500 });
  }
}
