import { pgTable, uuid, text, numeric, date, boolean, integer, timestamp, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(), // References auth.users
  name: text('name').notNull(),
  icon: text('icon'),
  color: text('color'),
  type: text('type').notNull(), // 'income' or 'expense'
  isDefault: boolean('is_default').default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
  budgets: many(budgets),
}));

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  type: text('type').notNull(), // 'income' or 'expense'
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  date: date('date').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const budgets = pgTable('budgets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'cascade' }),
  limitAmount: numeric('limit', { precision: 15, scale: 2 }).notNull(),
  spent: numeric('spent', { precision: 15, scale: 2 }).default('0'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const budgetsRelations = relations(budgets, ({ one }) => ({
  category: one(categories, {
    fields: [budgets.categoryId],
    references: [categories.id],
  }),
}));
