"use server";

import { transactionTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function getTransactions() {
    const sortedTransactions = await db
        .select()
        .from(transactionTable)
        .orderBy(desc(transactionTable.date));

    let totalIncome = 0;
    let totalExpense = 0;
    const transactions: any = sortedTransactions.reduce(
        (accumulator: any, transaction: any) => {
            const date = new Date(transaction.date);
            const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD format

            if (!accumulator[dateStr]) {
                accumulator[dateStr] = {
                    totalIncome: 0,
                    totalExpense: 0,
                    items: [],
                };
            }

            if (transaction.type === "income") {
                totalIncome += transaction.amount;
                accumulator[dateStr].totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
                accumulator[dateStr].totalExpense += transaction.amount;
            }

            accumulator[dateStr].items.push(transaction);
            return accumulator;
        },
        {},
    );

    return { totalIncome, totalExpense, transactions };
}

export async function createOrUpdateTransaction(
    previousState: unknown,
    formData: FormData,
) {
    console.log(formData);
    let ret;
    if (formData.get("id")) {
        ret = updateTransaction(previousState, formData);
    } else {
        ret = createTransaction(previousState, formData);
    }
    revalidatePath("/");
    return ret;
}

export async function createTransaction(
    previousState: unknown,
    formData: FormData,
) {
    try {
        await db.insert(transactionTable).values({
            date: formData.get("date") as string,
            type: formData.get("type") as string,
            amount: Number(formData.get("amount")),
            category: formData.get("category") as string,
            subcategory: formData.get("subcategory") as string,
            note: formData.get("note") as string,
        });

        return {
            success: true,
            message: "Transaction added successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to add transaction",
            errors: [error],
        };
    }
}

export async function updateTransaction(
    previousState: unknown,
    formData: FormData,
) {
    try {
        await db
            .update(transactionTable)
            .set({
                date: formData.get("date") as string,
                type: formData.get("type") as string,
                amount: Number(formData.get("amount")),
                category: formData.get("category") as string,
                subcategory: formData.get("subcategory") as string,
                note: formData.get("note") as string,
            })
            .where({ id: Number(formData.get("id")) });

        return {
            success: true,
            message: "Transaction updated successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to update transaction",
            errors: [error],
        };
    }
}

export async function deleteTransaction(id: number) {
    console.log(id);
    try {
        await db.delete(transactionTable).where(eq(transactionTable.id, id));
        revalidatePath("/");
        return {
            success: true,
            message: "Transaction deleted successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to delete transaction",
            errors: [error],
        };
    }
}
