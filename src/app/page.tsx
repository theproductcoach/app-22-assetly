"use client";

import { useFinancialStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const store = useFinancialStore();

  // Calculate values
  const netWorth = store.calculateNetWorth();
  const totalAssets = store.calculateTotalAssets();
  const totalLiabilities = store.calculateTotalLiabilities();
  const monthlyIncome = store.calculateTotalMonthlyIncome();
  const monthlyExpenses = store.calculateTotalMonthlyExpenses();
  const monthlyCashFlow = store.calculateMonthlyCashFlow();

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(label).toLocaleDateString()}
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            {formatCurrency(payload[0].value, store.currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Sort history by date ascending for the chart
  const sortedHistory = [...store.netWorthHistory].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
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

      {/* Net Worth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Net Worth Over Time
        </h2>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sortedHistory}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#9CA3AF"
                tickFormatter={(value) =>
                  `${store.currency.symbol}${(value / 1000).toFixed(0)}k`
                }
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={CustomTooltip} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#10B981", stroke: "#064E3B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
