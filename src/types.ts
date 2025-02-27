import { expenseCategories, incomeCategories } from "@/app/constants";

export type TransactionCategory =
    | keyof typeof expenseCategories
    | keyof typeof incomeCategories;
export type TransactionSubcategory =
    (typeof expenseCategories)[keyof typeof expenseCategories][number]; // not validating types

// interface Transaction {
//     id: string;
//     category: string;
//     subcategory?: string;
//     amount: number;
//     type: "expense" | "income";
//     date: string;
// }

// interface DailyTransactions {
//     totalIncome: number;
//     totalExpense: number;
//     items: Transaction[];
// }

// interface TransactionsByDate {
//     [date: string]: DailyTransactions;
// }

// interface TransactionListProps {
//     transactions: TransactionsByDate;
// }
