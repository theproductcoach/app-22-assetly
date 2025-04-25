"use client";

import { useState } from "react";
import { FinancialItem, CURRENCIES } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function Liabilities() {
  const [currency] = useState<(typeof CURRENCIES)[number]>(CURRENCIES[0]);
  const [liabilities, setLiabilities] = useState<FinancialItem[]>([]);
  const [newLiability, setNewLiability] = useState({
    label: "",
    value: "",
    interestRate: "",
    monthlyRepayment: "",
  });

  const handleAddLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLiability.label && newLiability.value) {
      setLiabilities([
        ...liabilities,
        {
          id: Date.now().toString(),
          type: "simple",
          label: newLiability.label,
          value: parseFloat(newLiability.value),
          interestRate: parseFloat(newLiability.interestRate || "0"),
          monthlyRepayment: parseFloat(newLiability.monthlyRepayment || "0"),
        },
      ]);
      setNewLiability({
        label: "",
        value: "",
        interestRate: "",
        monthlyRepayment: "",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Liabilities
          </h2>
        </div>

        <div className="px-6 py-6">
          <form onSubmit={handleAddLiability} className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Liability name"
              value={newLiability.label}
              onChange={(e) =>
                setNewLiability({ ...newLiability, label: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Amount"
                value={newLiability.value}
                onChange={(e) =>
                  setNewLiability({ ...newLiability, value: e.target.value })
                }
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                step="0.01"
                min="0"
              />
              <div className="relative">
                <input
                  type="number"
                  placeholder="Interest Rate (%)"
                  value={newLiability.interestRate}
                  onChange={(e) =>
                    setNewLiability({
                      ...newLiability,
                      interestRate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 pr-8 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  step="0.01"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  %
                </span>
              </div>
              <input
                type="number"
                placeholder="Monthly Repayment"
                value={newLiability.monthlyRepayment}
                onChange={(e) =>
                  setNewLiability({
                    ...newLiability,
                    monthlyRepayment: e.target.value,
                  })
                }
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                step="0.01"
                min="0"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Add Liability
            </button>
          </form>

          <ul className="space-y-3">
            {liabilities.map((liability) => (
              <li
                key={liability.id}
                className="py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {liability.label}
                  </span>
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    {formatCurrency(liability.value, currency)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span>{(liability.interestRate || 0).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Repayment:</span>
                    <span>
                      {formatCurrency(
                        liability.monthlyRepayment || 0,
                        currency
                      )}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
