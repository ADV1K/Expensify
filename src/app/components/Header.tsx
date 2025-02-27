/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/app/constants";

export default function Header({ income, expense }: any) {
  const cashflow = income - expense;

  let defaultTheme = lightTheme;
  if (typeof window !== "undefined")
    defaultTheme = localStorage?.getItem("theme") ?? lightTheme;
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage?.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="sticky top-0 z-10 mb-1 flex flex-col gap-1 bg-base-100">
      <header className="text-center text-4xl font-bold">Expensify</header>
      <div className="flex justify-between">
        {/* Month Switcher */}
        <div className="flex gap-2">
          <div className="join">
            <button className="join-item">
              <ChevronLeftIcon className="sm:size-8" />
            </button>
            <button className="join-item px-2 text-sm sm:text-xl">
              Feb 2026
            </button>
            <button className="join-item">
              <ChevronRightIcon className="sm:size-8" />
            </button>
          </div>
        </div>
        <div className="mx-2 flex gap-2">
          {/* Search */}
          <button className="btn btn-circle btn-ghost">
            <SearchIcon />
          </button>

          {/* Theme Switcher */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-switcher"
              checked={theme === darkTheme}
              onChange={(e) => {
                setTheme(e.target.checked ? darkTheme : lightTheme);
              }}
            />
            <SunIcon className="swap-on fill-current" />
            <MoonIcon className="swap-off fill-current" />
          </label>
        </div>
      </div>

      {/* Summary */}
      <div className="stats border text-center text-sm sm:text-lg">
        <div className="stat px-1 text-center">
          <div className="stat-title">Income</div>
          <div className="stat-value text-lg text-success sm:text-2xl">
            {income.toLocaleString()}
          </div>
        </div>
        <div className="stat px-1 text-center">
          <div className="stat-title">Expenses</div>
          <div className="stat-value text-lg text-error sm:text-2xl">
            {expense.toLocaleString()}
          </div>
        </div>
        <div className="stat px-1 text-center">
          <div className="stat-title">Cashflow</div>
          <div
            className={`${cashflow > 0 ? "text-success" : "text-error"} stat-value text-lg sm:text-2xl`}
          >
            {cashflow.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
