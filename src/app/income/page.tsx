"use client";

import { useState } from "react";
import { IncomeItem } from "@/lib/types";
import { useFinancialStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { ActionButton } from "@/components/ActionButton";

export default function Income() {
  const { currency, income, addIncome, editIncome, removeIncome } =
    useFinancialStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newIncome, setNewIncome] = useState({
    label: "",
    amount: "",
    frequency: "monthly" as "monthly" | "annually",
    isSalary: true,
  });

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIncome.label && newIncome.amount) {
      const incomeItem: IncomeItem = {
        id: Date.now().toString(),
        label: newIncome.label,
        amount: parseFloat(newIncome.amount),
        frequency: newIncome.frequency,
        isSalary: newIncome.isSalary,
      };
      console.log("Adding income:", incomeItem);
      addIncome(incomeItem);
      setNewIncome({
        label: "",
        amount: "",
        frequency: "monthly",
        isSalary: true,
      });
    }
  };

  const handleEditIncome = (item: IncomeItem) => {
    setEditingId(item.id);
    setNewIncome({
      label: item.label,
      amount: item.amount.toString(),
      frequency: item.frequency,
      isSalary: item.isSalary ?? true,
    });
  };

  const handleUpdateIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    if (newIncome.label && newIncome.amount) {
      const incomeItem: Partial<IncomeItem> = {
        label: newIncome.label,
        amount: parseFloat(newIncome.amount),
        frequency: newIncome.frequency,
        isSalary: newIncome.isSalary,
      };
      editIncome(editingId, incomeItem);
    }

    setEditingId(null);
    setNewIncome({
      label: "",
      amount: "",
      frequency: "monthly",
      isSalary: true,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Income
          </h2>
        </div>

        <div className="px-6 py-6">
          <form
            onSubmit={editingId ? handleUpdateIncome : handleAddIncome}
            className="space-y-4 mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Income source"
                value={newIncome.label}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, label: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newIncome.amount}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, amount: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                step="0.01"
                min="0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <select
                  value={newIncome.frequency}
                  onChange={(e) =>
                    setNewIncome({
                      ...newIncome,
                      frequency: e.target.value as "monthly" | "annually",
                    })
                  }
                  className="w-full px-4 py-2 pr-8 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isSalary"
                  checked={newIncome.isSalary}
                  onChange={(e) =>
                    setNewIncome({ ...newIncome, isSalary: e.target.checked })
                  }
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="isSalary"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  Subject to income tax
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              {editingId ? "Update Income" : "Add Income"}
            </button>
          </form>

          <ul className="space-y-3">
            {income.map((item) => (
              <li
                key={item.id}
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium block mt-1">
                      {formatCurrency(item.amount, currency)}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        /{item.frequency}
                      </span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <ActionButton
                      onClick={() => handleEditIncome(item)}
                      variant="edit"
                      label="Edit income"
                    />
                    <ActionButton
                      onClick={() => removeIncome(item.id)}
                      variant="delete"
                      label="Delete income"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.isSalary ? "Taxable income" : "Non-taxable income"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
