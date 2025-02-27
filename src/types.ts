import { expenseCategories, incomeCategories } from "@/app/constants";

export type TransactionCategory =
    | keyof typeof expenseCategories
    | keyof typeof incomeCategories;
export type TransactionSubcategory =
    (typeof expenseCategories)[keyof typeof expenseCategories][number]; // not validating types

export interface Transaction {
    id: number;
    amount: number;
    type: "income" | "expense";
    category: TransactionCategory;
    subcategory: TransactionSubcategory;
    date: Date;
    note: string;
}

export type TransactionState = {
    success: boolean;
    message: string;
    errors: string[];
    inputs: Omit<Transaction, "id">;
};

export interface DailyTransactions {
    date: string;
    dayOfWeek: string;
    income: number;
    expense: number;
    transactions: Transaction[];
}
