import { useFinancialStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function OverviewCards() {
  const store = useFinancialStore();
  const [values, setValues] = useState({
    netWorth: 0,
    totalAssets: 0,
    totalLiabilities: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyCashFlow: 0,
  });

  useEffect(() => {
    setValues({
      netWorth: store.calculateNetWorth(),
      totalAssets: store.calculateTotalAssets(),
      totalLiabilities: store.calculateTotalLiabilities(),
      monthlyIncome: store.calculateTotalMonthlyIncome(),
      monthlyExpenses: store.calculateTotalMonthlyExpenses(),
      monthlyCashFlow: store.calculateMonthlyCashFlow(),
    });
  }, [store]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Net Worth
        </h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(values.netWorth, store.currency)}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Total Assets
        </h3>
        <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          {formatCurrency(values.totalAssets, store.currency)}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Total Liabilities
        </h3>
        <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">
          {formatCurrency(values.totalLiabilities, store.currency)}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Monthly Income
        </h3>
        <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          {formatCurrency(values.monthlyIncome, store.currency)}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Monthly Expenses
        </h3>
        <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">
          {formatCurrency(values.monthlyExpenses, store.currency)}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Monthly Cash Flow
        </h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(values.monthlyCashFlow, store.currency)}
        </p>
      </div>
    </div>
  );
}
