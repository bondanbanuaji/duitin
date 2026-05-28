"use server";

import { db } from "@/lib/db";
import { budgets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getBudgets(userId: string) {
  try {
    const data = await db.query.budgets.findMany({
      where: eq(budgets.userId, userId),
      with: {
        category: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return [];
  }
}
