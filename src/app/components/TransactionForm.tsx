/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useContext } from "react";
import { TransactionCategory } from "@/types";
import {
  CalendarIcon,
  ChevronRightIcon,
  Edit3Icon,
  IndianRupeeIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { createOrUpdateTransaction, deleteTransaction } from "@/app/actions";
import { ModalContext } from "@/app/contexts/modal-context";
import { incomeCategories, expenseCategories } from "@/app/constants";

export default function TransactionForm() {
  const {
    id,
    note,
    date,
    amount,
    setNote,
    setDate,
    isExpense,
    setAmount,
    isModalOpen,
    setIsExpense,
    setIsModalOpen,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
  }: any = useContext(ModalContext);

  // const [state, formAction, isLoading] = useActionState(
  //   createOrUpdateTransaction,
  // );

  return (
    <>
      {/* Add Transaction Button */}
      <span className="sticky bottom-6 left-full z-10 mx-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-circle btn-primary size-14 text-white"
        >
          <PlusIcon />
        </button>
      </span>

      {/* Add Transaction Dialog */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="w-sm modal-box max-w-sm p-0">
          {/* Top Bar */}
          <div className="flex items-center justify-center p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                deleteTransaction(id);
                setIsModalOpen(false);
              }}
              className={`${id ? "" : "hidden"}`}
            >
              <button className="btn btn-circle btn-ghost absolute left-0 top-0 text-error">
                <Trash2Icon className="size-5" />
              </button>
            </form>
            <div className="text-xl font-bold">
              {isExpense ? "Expense" : "Income"}
            </div>
            <form method="dialog">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-circle btn-ghost absolute right-0 top-0"
              >
                <XIcon className="size-5" />
              </button>
            </form>
          </div>

          <form
            // action={formAction}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              if (id) formData.set("id", id);
              createOrUpdateTransaction(null, formData);
              setIsModalOpen(false);
            }}
          >
            {/* Income or Expense? */}
            <div className="form-control flex flex-row border-y">
              <label className="btn flex w-1/2 items-center justify-center rounded-none bg-base-200 p-3 has-[:checked]:bg-green-100 has-[:checked]:text-green-500">
                Income
                <input
                  className="hidden"
                  type="radio"
                  name="type"
                  value="income"
                  checked={!isExpense}
                  onChange={(e) => {
                    setIsExpense(!e.target.checked);
                    setSelectedCategory(
                      Object.keys(incomeCategories)[0] as TransactionCategory,
                    );
                  }}
                />
              </label>
              <label className="btn flex w-1/2 items-center justify-center rounded-none bg-base-200 p-3 has-[:checked]:bg-red-100 has-[:checked]:text-red-500">
                Expense
                <input
                  className="hidden"
                  type="radio"
                  name="type"
                  value="expense"
                  checked={isExpense}
                  onChange={(e) => {
                    setIsExpense(e.target.checked);
                    setSelectedCategory(
                      Object.keys(expenseCategories)[0] as TransactionCategory,
                    );
                  }}
                />
              </label>
            </div>

            {/* Amount */}
            <div className="form-control relative border-b border-b-base-200 p-4">
              <div className="relative">
                <IndianRupeeIcon
                  className={`absolute left-3 top-3 size-5 ${isExpense ? "text-red-500" : "text-green-500"}`}
                />
                <input
                  type="number"
                  name="amount"
                  min="0"
                  step="any"
                  value={amount ? amount : ""}
                  onChange={(e) => {
                    setAmount(e.target.valueAsNumber);
                  }}
                  placeholder="0.00"
                  required
                  autoFocus
                  className={`input input-bordered w-full px-10 text-center text-xl`}
                />
              </div>
            </div>

            {/* Category & SubCategory */}
            <div className="flex h-full items-start justify-center border-b-2 pb-4">
              <div className="join join-vertical w-1/2 divide-y divide-base-100 rounded-none">
                {Object.keys(
                  isExpense ? expenseCategories : incomeCategories,
                ).map((category, index) => (
                  <div className="relative" key={category}>
                    <label
                      className={`btn join-item flex w-full items-center justify-center rounded-none border-0 bg-base-200 p-3 ${isExpense ? "has-[:checked]:bg-red-100 has-[:checked]:text-red-500 has-[:checked]:hover:bg-red-200" : "has-[:checked]:bg-green-100 has-[:checked]:text-green-500"}`}
                    >
                      <input
                        className="hidden"
                        type="radio"
                        name="category"
                        value={category}
                        defaultChecked={index === 0}
                        onChange={() => {
                          setSelectedCategory(category as TransactionCategory);
                          setSelectedSubCategory("");
                        }}
                      />
                      {category}
                      <ChevronRightIcon className="absolute right-2 top-1/2 size-4 -translate-y-1/2" />
                    </label>
                  </div>
                ))}
              </div>

              {/* SubCategory */}
              <div className="join join-vertical w-1/2 divide-y divide-base-100 rounded-none">
                {(isExpense
                  ? (expenseCategories as any)[selectedCategory] || []
                  : (incomeCategories as any)[selectedCategory] || []
                ).map((subcategory: string) => (
                  <label
                    key={subcategory}
                    className={`btn join-item flex w-full items-center justify-center rounded-none border-0 bg-base-200 p-3 ${isExpense ? "has-[:checked]:bg-red-100 has-[:checked]:text-red-500" : "has-[:checked]:bg-green-100 has-[:checked]:text-green-500"}`}
                  >
                    {subcategory}
                    <input
                      className="hidden"
                      type="radio"
                      name="subcategory"
                      value={subcategory}
                      checked={selectedSubCategory === subcategory}
                      onChange={() => setSelectedSubCategory(subcategory)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Date and Note */}
            <div className="flex border-b p-2">
              <label
                className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-2 text-sm hover:bg-base-200"
                onClick={() => {
                  const input = document.getElementById("date-switcher") as any;
                  input.showPicker();
                }}
              >
                <CalendarIcon size={16} />
                <input
                  type="date"
                  id="date-switcher"
                  name="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => {
                    setDate(e.target.valueAsDate ?? new Date());
                  }}
                  className="absolute h-0 w-0 opacity-0"
                />
                {date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </label>
              <div className="flex-1 px-2 py-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Edit3Icon size={16} />
                  <input
                    type="text"
                    name="note"
                    defaultValue={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                    placeholder="Add a note"
                    className="flex-1 border-none bg-transparent p-0 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save and Continue */}
            <div className="modal-action m-0 justify-around p-4">
              <button
                type="submit"
                value="save"
                className={`btn btn-primary flex flex-grow border-0 ${isExpense ? "bg-red-100 text-red-500 hover:bg-red-200" : "bg-green-100 text-green-500 hover:bg-green-200"}`}
              >
                Save
              </button>
              <button
                type="submit"
                value="continue"
                className={`btn btn-secondary flex border-0`}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}
