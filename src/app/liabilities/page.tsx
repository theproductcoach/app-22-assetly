"use client";

import { useState } from "react";
import { FinancialItem } from "@/lib/types";
import { useFinancialStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { ActionButton } from "@/components/ActionButton";

export default function Liabilities() {
  const {
    currency,
    liabilities,
    addLiability,
    editLiability,
    removeLiability,
  } = useFinancialStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLiability, setNewLiability] = useState({
    label: "",
    value: "",
    interestRate: "",
    monthlyRepayment: "",
  });

  const handleAddLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLiability.label && newLiability.value) {
      addLiability({
        id: Date.now().toString(),
        type: "simple",
        label: newLiability.label,
        value: parseFloat(newLiability.value),
        interestRate: parseFloat(newLiability.interestRate || "0"),
        monthlyRepayment: parseFloat(newLiability.monthlyRepayment || "0"),
      });
      setNewLiability({
        label: "",
        value: "",
        interestRate: "",
        monthlyRepayment: "",
      });
    }
  };

  const handleEditLiability = (liability: FinancialItem) => {
    setEditingId(liability.id);
    setNewLiability({
      label: liability.label,
      value: liability.value.toString(),
      interestRate: (liability.interestRate || 0).toString(),
      monthlyRepayment: (liability.monthlyRepayment || 0).toString(),
    });
  };

  const handleUpdateLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    if (newLiability.label && newLiability.value) {
      editLiability(editingId, {
        type: "simple",
        label: newLiability.label,
        value: parseFloat(newLiability.value),
        interestRate: parseFloat(newLiability.interestRate || "0"),
        monthlyRepayment: parseFloat(newLiability.monthlyRepayment || "0"),
      });
    }

    setEditingId(null);
    setNewLiability({
      label: "",
      value: "",
      interestRate: "",
      monthlyRepayment: "",
    });
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
          <form
            onSubmit={editingId ? handleUpdateLiability : handleAddLiability}
            className="space-y-4 mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Liability name"
                value={newLiability.label}
                onChange={(e) =>
                  setNewLiability({ ...newLiability, label: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newLiability.value}
                onChange={(e) =>
                  setNewLiability({ ...newLiability, value: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                step="0.01"
                min="0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                step="0.01"
                min="0"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              {editingId ? "Update Liability" : "Add Liability"}
            </button>
          </form>

          <ul className="space-y-3">
            {liabilities.map((liability) => (
              <li
                key={liability.id}
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {liability.label}
                      </span>
                    </div>
                    <span className="text-rose-600 dark:text-rose-400 font-medium block mt-1">
                      {formatCurrency(liability.value, currency)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <ActionButton
                      onClick={() => handleEditLiability(liability)}
                      variant="edit"
                      label="Edit liability"
                    />
                    <ActionButton
                      onClick={() => removeLiability(liability.id)}
                      variant="delete"
                      label="Delete liability"
                    />
                  </div>
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
