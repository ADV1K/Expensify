import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const transactionTable = sqliteTable("transactions", {
    id: int().primaryKey({ autoIncrement: true }),
    type: text().notNull(),
    amount: int().notNull(),
    category: text().notNull(),
    subcategory: text(),
    date: text().notNull(),
    note: text().notNull(),
});
