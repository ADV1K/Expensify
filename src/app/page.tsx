import Header from "@/app/components/Header";
import TransactionForm from "@/app/components/TransactionForm";
import TransactionList from "@/app/components/TransactionList";
import ModalContextProvider from "@/app/contexts/modal-context";
import { getTransactions } from "@/app/actions";

export default async function ExpenseTracker() {
  const { totalIncome, totalExpense, transactions } = await getTransactions();

  return (
    <ModalContextProvider>
      <div className="mx-auto max-h-screen max-w-md">
        <div className="m-2">
          <Header income={totalIncome} expense={totalExpense} />
          <TransactionList transactions={transactions} />
          <TransactionForm />
        </div>
      </div>
    </ModalContextProvider>
  );
}
