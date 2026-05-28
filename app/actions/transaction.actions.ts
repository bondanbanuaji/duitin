"use server";

import { db } from "@/lib/db";
import { transactions, categories } from "@/lib/db/schema";
import { eq, desc, sql, gte, lte, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTransactions(userId: string) {
  try {
    const data = await db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
      with: {
        category: true,
      },
      orderBy: [desc(transactions.date), desc(transactions.createdAt)],
    });
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function addTransaction(data: any) {
  try {
    await db.insert(transactions).values(data);
    revalidatePath("/dashboard");
    revalidatePath("/transaksi");
    revalidatePath("/laporan");
    return { success: true };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return { success: false, error };
  }
}

export async function getDashboardMetrics(userId: string) {
  try {
    // Get current month stats
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    
    const stats = await db
      .select({
        type: transactions.type,
        total: sql<number>`sum(amount)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          gte(transactions.date, startOfMonth)
        )
      )
      .groupBy(transactions.type);

    let income = 0;
    let expense = 0;

    stats.forEach((s) => {
      if (s.type === "income") income = Number(s.total);
      if (s.type === "expense") expense = Number(s.total);
    });

    // Total balance (all time)
    const totalStats = await db
      .select({
        type: transactions.type,
        total: sql<number>`sum(amount)`,
      })
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .groupBy(transactions.type);

    let totalIncome = 0;
    let totalExpense = 0;
    totalStats.forEach((s) => {
      if (s.type === "income") totalIncome = Number(s.total);
      if (s.type === "expense") totalExpense = Number(s.total);
    });

    return {
      income,
      expense,
      balance: totalIncome - totalExpense,
    };
  } catch (error) {
    console.error("Error getting metrics:", error);
    return { income: 0, expense: 0, balance: 0 };
  }
}
