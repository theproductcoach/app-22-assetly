"use client";

import { useState } from "react";
import { AssetType, FinancialItem } from "@/lib/types";
import { useFinancialStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { ActionButton } from "@/components/ActionButton";

export default function Assets() {
  const { currency, assets, addAsset, editAsset, removeAsset } =
    useFinancialStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAsset, setNewAsset] = useState({
    type: "simple" as AssetType,
    label: "",
    value: "",
    dateAcquired: new Date().toISOString().split("T")[0],
    purchasePrice: "",
    currentValue: "",
    mortgageOwing: "",
    offsetAccount: "",
    interestRate: "",
    monthlyRepayment: "",
  });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAsset.type === "property") {
      if (newAsset.label && newAsset.currentValue && newAsset.mortgageOwing) {
        addAsset({
          id: Date.now().toString(),
          type: "property",
          label: newAsset.label,
          dateAcquired: newAsset.dateAcquired,
          value:
            parseFloat(newAsset.currentValue) -
            Math.max(
              0,
              parseFloat(newAsset.mortgageOwing) -
                parseFloat(newAsset.offsetAccount || "0")
            ),
          purchasePrice: parseFloat(newAsset.purchasePrice || "0"),
          currentValue: parseFloat(newAsset.currentValue),
          mortgageOwing: parseFloat(newAsset.mortgageOwing),
          offsetAccount: parseFloat(newAsset.offsetAccount || "0"),
          interestRate: parseFloat(newAsset.interestRate || "0"),
          monthlyRepayment: parseFloat(newAsset.monthlyRepayment || "0"),
        });
        setNewAsset({
          type: "simple",
          label: "",
          value: "",
          dateAcquired: new Date().toISOString().split("T")[0],
          purchasePrice: "",
          currentValue: "",
          mortgageOwing: "",
          offsetAccount: "",
          interestRate: "",
          monthlyRepayment: "",
        });
      }
    } else {
      if (newAsset.label && newAsset.value) {
        addAsset({
          id: Date.now().toString(),
          type: "simple",
          label: newAsset.label,
          dateAcquired: newAsset.dateAcquired,
          value: parseFloat(newAsset.value),
        });
        setNewAsset({
          type: "simple",
          label: "",
          value: "",
          dateAcquired: new Date().toISOString().split("T")[0],
          purchasePrice: "",
          currentValue: "",
          mortgageOwing: "",
          offsetAccount: "",
          interestRate: "",
          monthlyRepayment: "",
        });
      }
    }
  };

  const handleEditAsset = (asset: FinancialItem) => {
    setEditingId(asset.id);
    setNewAsset({
      type: asset.type || "simple",
      label: asset.label,
      value: asset.value.toString(),
      dateAcquired: asset.dateAcquired,
      purchasePrice: (asset.purchasePrice || 0).toString(),
      currentValue: (asset.currentValue || 0).toString(),
      mortgageOwing: (asset.mortgageOwing || 0).toString(),
      offsetAccount: (asset.offsetAccount || 0).toString(),
      interestRate: (asset.interestRate || 0).toString(),
      monthlyRepayment: (asset.monthlyRepayment || 0).toString(),
    });
  };

  const handleUpdateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    if (newAsset.type === "property") {
      if (newAsset.label && newAsset.currentValue && newAsset.mortgageOwing) {
        editAsset(editingId, {
          type: "property",
          label: newAsset.label,
          dateAcquired: newAsset.dateAcquired,
          value:
            parseFloat(newAsset.currentValue) -
            Math.max(
              0,
              parseFloat(newAsset.mortgageOwing) -
                parseFloat(newAsset.offsetAccount || "0")
            ),
          purchasePrice: parseFloat(newAsset.purchasePrice || "0"),
          currentValue: parseFloat(newAsset.currentValue),
          mortgageOwing: parseFloat(newAsset.mortgageOwing),
          offsetAccount: parseFloat(newAsset.offsetAccount || "0"),
          interestRate: parseFloat(newAsset.interestRate || "0"),
          monthlyRepayment: parseFloat(newAsset.monthlyRepayment || "0"),
        });
      }
    } else {
      if (newAsset.label && newAsset.value) {
        editAsset(editingId, {
          type: "simple",
          label: newAsset.label,
          dateAcquired: newAsset.dateAcquired,
          value: parseFloat(newAsset.value),
        });
      }
    }

    setEditingId(null);
    setNewAsset({
      type: "simple",
      label: "",
      value: "",
      dateAcquired: new Date().toISOString().split("T")[0],
      purchasePrice: "",
      currentValue: "",
      mortgageOwing: "",
      offsetAccount: "",
      interestRate: "",
      monthlyRepayment: "",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Assets
          </h2>
        </div>

        <div className="px-6 py-6">
          <form
            onSubmit={editingId ? handleUpdateAsset : handleAddAsset}
            className="space-y-4 mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative w-full sm:w-40">
                <select
                  value={newAsset.type}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      type: e.target.value as AssetType,
                    })
                  }
                  className="w-full px-4 py-2 pr-8 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="simple">Simple Asset</option>
                  <option value="property">Property</option>
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
              <input
                type="text"
                placeholder={
                  newAsset.type === "property" ? "Property name" : "Asset name"
                }
                value={newAsset.label}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, label: e.target.value })
                }
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                value={newAsset.dateAcquired}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, dateAcquired: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {newAsset.type === "simple" ? (
                <input
                  type="number"
                  placeholder="Value"
                  value={newAsset.value}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, value: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  step="0.01"
                  min="0"
                />
              ) : null}
            </div>

            {newAsset.type === "property" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    type="number"
                    placeholder="Purchase Price"
                    value={newAsset.purchasePrice}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        purchasePrice: e.target.value,
                      })
                    }
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    step="0.01"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Current Value"
                    value={newAsset.currentValue}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        currentValue: e.target.value,
                      })
                    }
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    step="0.01"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Mortgage Owing"
                    value={newAsset.mortgageOwing}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        mortgageOwing: e.target.value,
                      })
                    }
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    step="0.01"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Offset Account"
                    value={newAsset.offsetAccount}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        offsetAccount: e.target.value,
                      })
                    }
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Interest Rate (%)"
                      value={newAsset.interestRate}
                      onChange={(e) =>
                        setNewAsset({
                          ...newAsset,
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
                    value={newAsset.monthlyRepayment}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        monthlyRepayment: e.target.value,
                      })
                    }
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              {editingId ? "Update Asset" : "Add Asset"}
            </button>
          </form>

          <ul className="space-y-3">
            {assets.map((asset) => (
              <li
                key={asset.id}
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {asset.label}
                      </span>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium block mt-1">
                      {formatCurrency(asset.value, currency)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <ActionButton
                      onClick={() => handleEditAsset(asset)}
                      variant="edit"
                      label="Edit asset"
                    />
                    <ActionButton
                      onClick={() => removeAsset(asset.id)}
                      variant="delete"
                      label="Delete asset"
                    />
                  </div>
                </div>
                {asset.type === "property" && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Purchase Price:</span>
                      <span>
                        {formatCurrency(asset.purchasePrice || 0, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Value:</span>
                      <span>
                        {formatCurrency(asset.currentValue || 0, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mortgage Owing:</span>
                      <span>
                        {formatCurrency(asset.mortgageOwing || 0, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Offset Account:</span>
                      <span>
                        {formatCurrency(asset.offsetAccount || 0, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Effective Mortgage:</span>
                      <span>
                        {formatCurrency(
                          Math.max(
                            0,
                            (asset.mortgageOwing || 0) -
                              (asset.offsetAccount || 0)
                          ),
                          currency
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span>{(asset.interestRate || 0).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Repayment:</span>
                      <span>
                        {formatCurrency(asset.monthlyRepayment || 0, currency)}
                      </span>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
