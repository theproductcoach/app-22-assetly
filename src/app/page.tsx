"use client";

import { useFinancialStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const store = useFinancialStore();

  // Calculate values
  const netWorth = store.calculateNetWorth();
  const totalAssets = store.calculateTotalAssets();
  const totalLiabilities = store.calculateTotalLiabilities();
  const monthlyIncome = store.calculateTotalMonthlyIncome();
  const monthlyExpenses = store.calculateTotalMonthlyExpenses();
  const monthlyCashFlow = store.calculateMonthlyCashFlow();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Net Worth Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Net Worth
        </h2>
        <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(netWorth, store.currency)}
        </p>
      </div>

      {/* Assets and Liabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Assets
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalAssets, store.currency)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Liabilities
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(totalLiabilities, store.currency)}
          </p>
        </div>
      </div>

      {/* Monthly Cash Flow Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
          Monthly Cash Flow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(monthlyIncome, store.currency)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monthly Income
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">
              {formatCurrency(monthlyExpenses, store.currency)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monthly Expenses
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(monthlyCashFlow, store.currency)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Net Monthly Cash Flow
          </p>
        </div>
      </div>
    </div>
  );
}
