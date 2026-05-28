"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export async function getCategories(userId: string) {
  try {
    const data = await db.query.categories.findMany({
      where: or(
        eq(categories.userId, userId),
        eq(categories.isDefault, true)
      ),
      orderBy: [categories.sortOrder],
    });
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getDefaultCategories() {
  try {
    const data = await db.query.categories.findMany({
      where: eq(categories.isDefault, true),
      orderBy: [categories.sortOrder],
    });
    return data;
  } catch (error) {
    console.error("Error fetching default categories:", error);
    return [];
  }
}
