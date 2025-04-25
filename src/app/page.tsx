"use client";

import { useState } from "react";
import { FinancialItem, IncomeItem, CURRENCIES } from "@/lib/types";
import { calculateNetIncome } from "./utils";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const [currency] = useState<(typeof CURRENCIES)[number]>(CURRENCIES[0]);
  const [assets] = useState<FinancialItem[]>([]);
  const [liabilities] = useState<FinancialItem[]>([]);
  const [income] = useState<IncomeItem[]>([]);

  const totalAssets = assets.reduce((sum, item) => {
    if (item.type === "property" && item.currentValue && item.mortgageOwing) {
      const effectiveMortgage = Math.max(
        0,
        item.mortgageOwing - (item.offsetAccount || 0)
      );
      return sum + (item.currentValue - effectiveMortgage);
    }
    return sum + item.value;
  }, 0);

  const totalLiabilities = liabilities.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const netWorth = totalAssets - totalLiabilities;

  const totalMonthlyIncome = income.reduce((sum, item) => {
    return sum + calculateNetIncome(item.amount, item.frequency, item.isSalary);
  }, 0);

  const totalMonthlyExpenses = assets.reduce((sum, item) => {
    if (item.type === "property" && item.monthlyRepayment) {
      return sum + item.monthlyRepayment;
    }
    return sum;
  }, 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Net Worth Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Net Worth
        </h2>
        <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(netWorth, currency)}
        </p>
      </div>

      {/* Assets and Liabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Assets
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalAssets, currency)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Liabilities
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(totalLiabilities, currency)}
          </p>
        </div>
      </div>

      {/* Monthly Cash Flow Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Monthly Cash Flow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(totalMonthlyIncome, currency)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monthly Income
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">
              {formatCurrency(totalMonthlyExpenses, currency)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monthly Expenses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
