"use client";

import { useState } from "react";

type FinancialItem = {
  id: string;
  label: string;
  value: number;
};

const CURRENCIES = [
  { code: "GBP", symbol: "£", label: "GBP (£)" },
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "AUD", symbol: "A$", label: "AUD (A$)" },
] as const;

export default function Home() {
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>(
    CURRENCIES[0]
  );
  const [assets, setAssets] = useState<FinancialItem[]>([]);
  const [liabilities, setLiabilities] = useState<FinancialItem[]>([]);
  const [newAsset, setNewAsset] = useState({ label: "", value: "" });
  const [newLiability, setNewLiability] = useState({ label: "", value: "" });
  const [isAssetsOpen, setIsAssetsOpen] = useState(true);
  const [isLiabilitiesOpen, setIsLiabilitiesOpen] = useState(true);

  const totalAssets = assets.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = liabilities.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const netWorth = totalAssets - totalLiabilities;

  const formatCurrency = (value: number) => {
    return `${currency.symbol}${value.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAsset.label && newAsset.value) {
      setAssets([
        ...assets,
        {
          id: Date.now().toString(),
          label: newAsset.label,
          value: parseFloat(newAsset.value),
        },
      ]);
      setNewAsset({ label: "", value: "" });
    }
  };

  const handleAddLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLiability.label && newLiability.value) {
      setLiabilities([
        ...liabilities,
        {
          id: Date.now().toString(),
          label: newLiability.label,
          value: parseFloat(newLiability.value),
        },
      ]);
      setNewLiability({ label: "", value: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] min-h-[400px] w-full bg-center bg-cover"
        style={{ backgroundImage: "url(/hero-bg.png)" }}
      >
        {/* Content */}
        <div className="relative h-full container mx-auto px-6">
          {/* Currency Selector */}
          <div className="absolute right-6 top-6 z-10">
            <select
              value={currency.code}
              onChange={(e) => {
                const newCurrency = CURRENCIES.find(
                  (c) => c.code === e.target.value
                );
                if (newCurrency) setCurrency(newCurrency);
              }}
              className="block w-28 px-3 py-2 text-sm bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Select currency"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Financial Overview Section */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Net Worth Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Net Worth
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(netWorth)}
            </p>
          </div>

          {/* Assets and Liabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Assets Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Total Assets
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(totalAssets)}
              </p>
            </div>

            {/* Liabilities Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Total Liabilities
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">
                {formatCurrency(totalLiabilities)}
              </p>
            </div>
          </div>

          {/* Assets Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <button
              onClick={() => setIsAssetsOpen(!isAssetsOpen)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Assets
              </h2>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isAssetsOpen ? "rotate-180" : ""
                }`}
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
            </button>

            {isAssetsOpen && (
              <div className="px-6 pb-6">
                <form
                  onSubmit={handleAddAsset}
                  className="flex flex-col sm:flex-row gap-4 mb-6"
                >
                  <input
                    type="text"
                    placeholder="Asset name"
                    value={newAsset.label}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, label: e.target.value })
                    }
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Value"
                    value={newAsset.value}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, value: e.target.value })
                    }
                    className="w-full sm:w-32 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    step="0.01"
                    min="0"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                  >
                    Add Asset
                  </button>
                </form>

                <ul className="space-y-3">
                  {assets.map((asset) => (
                    <li
                      key={asset.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <span className="text-gray-900 dark:text-white">
                        {asset.label}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {formatCurrency(asset.value)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Liabilities Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setIsLiabilitiesOpen(!isLiabilitiesOpen)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Liabilities
              </h2>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isLiabilitiesOpen ? "rotate-180" : ""
                }`}
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
            </button>

            {isLiabilitiesOpen && (
              <div className="px-6 pb-6">
                <form
                  onSubmit={handleAddLiability}
                  className="flex flex-col sm:flex-row gap-4 mb-6"
                >
                  <input
                    type="text"
                    placeholder="Liability name"
                    value={newLiability.label}
                    onChange={(e) =>
                      setNewLiability({
                        ...newLiability,
                        label: e.target.value,
                      })
                    }
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Value"
                    value={newLiability.value}
                    onChange={(e) =>
                      setNewLiability({
                        ...newLiability,
                        value: e.target.value,
                      })
                    }
                    className="w-full sm:w-32 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    step="0.01"
                    min="0"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
                  >
                    Add Liability
                  </button>
                </form>

                <ul className="space-y-3">
                  {liabilities.map((liability) => (
                    <li
                      key={liability.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <span className="text-gray-900 dark:text-white">
                        {liability.label}
                      </span>
                      <span className="text-rose-600 dark:text-rose-400 font-medium">
                        {formatCurrency(liability.value)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
