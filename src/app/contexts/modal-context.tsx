"use client";

import { createContext, useState } from "react";
import { expenseCategories } from "@/app/constants";

export const ModalContext: any = createContext(null);

export default function ModalContextProvider({ children }: any) {
  const [id, setId] = useState(null);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isExpense, setIsExpense] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(expenseCategories)[0],
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  function setIsModalOpenPls(value: any, transaction: any) {
    if (transaction) {
      console.log(transaction);
      setId(transaction.id);
      setNote(transaction.note);
      setAmount(transaction.amount);
      setDate(new Date(transaction.date));
      setIsExpense(transaction.type === "expense");
      setSelectedCategory(transaction.category);
      setSelectedSubCategory(transaction.subcategory);
    }

    if (value === false) {
      setId(null);
      setNote("");
      setAmount(0);
      setDate(new Date());
      setIsExpense(true);
      setSelectedCategory(Object.keys(expenseCategories)[0]);
      setSelectedSubCategory(null);
    }

    setIsModalOpen(value);
  }

  return (
    <ModalContext.Provider
      value={{
        id,
        note,
        date,
        setId,
        amount,
        setNote,
        setDate,
        isExpense,
        setAmount,
        isModalOpen,
        setIsExpense,
        setIsModalOpen: setIsModalOpenPls,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
