"use client";

import { IndianRupeeIcon } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "@/app/contexts/modal-context";

export default function TransactionList({ transactions }) {
  const { setIsModalOpen } = useContext(ModalContext);

  if (transactions.length === 0) {
    return (
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>No transactions yet. Click the + button to add one.</span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {Object.entries(transactions).map(([dateStr, { totalIncome, totalExpense, items }]) => (
        <div key={dateStr} className="card border">
          <div className="card-body gap-0 divide-y p-0">
            <div className="flex items-center justify-between rounded-tl-xl rounded-tr-xl p-2">
              {/* Day of week */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold sm:text-2xl">
                  {new Date(dateStr).getDate()}
                </span>
                <span className="badge-neutral rounded px-1 text-sm text-white">
                  {new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", }) }
                </span>
              </div>

              {/* Daily Total */}
              <div className="flex gap-4 text-sm sm:text-lg">
                {totalIncome > 0 && (
                  <span className="flex items-center text-success">
                    <IndianRupeeIcon className="size-3 sm:size-4" />
                    {totalIncome.toLocaleString()}
                  </span>
                )}
                {totalExpense > 0 && (
                  <span className="flex items-center text-error">
                    <IndianRupeeIcon className="size-3 sm:size-4" />
                    {totalExpense.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="divide-y">
              {/* Transaction */}
              {items.map((transaction, index) => (
                <div
                  key={index}
                  onClick={() => { setIsModalOpen(true, transaction) }}
                  className="flex cursor-pointer appearance-none items-center justify-between p-2 transition-colors last:rounded-bl-xl last:rounded-br-xl hover:bg-base-200"
                >
                  {/* Category */}
                  <div>
                    <div className="font-medium">{transaction.category}</div>
                    {transaction.subcategory && (
                      <div className="text-sm text-secondary">
                        {transaction.subcategory}
                      </div>
                    )}
                  </div>
                  {/* Amount */}
                  <div
                    className={`flex items-center text-sm sm:text-lg ${transaction.type === "expense" ? "text-error" : "text-success"} `}
                  >
                    <IndianRupeeIcon className="size-3 sm:size-4" />
                    {transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
