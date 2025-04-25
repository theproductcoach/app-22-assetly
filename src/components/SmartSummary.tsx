import { useState } from "react";
import { useFinancialStore } from "@/lib/store";
import type { FinancialOverviewData } from "@/lib/openai";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function SmartSummary() {
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    currency,
    assets,
    calculateNetWorth,
    calculateTotalAssets,
    calculateTotalLiabilities,
    calculateMonthlyCashFlow,
  } = useFinancialStore();

  const generateSummary = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Calculate asset type totals
      const assetTypes = assets.reduce((acc, asset) => {
        const type = asset.type || "other";
        const existing = acc.find((a) => a.type === type);
        if (existing) {
          existing.total += asset.value;
        } else {
          acc.push({ type, total: asset.value });
        }
        return acc;
      }, [] as { type: string; total: number }[]);

      const data: FinancialOverviewData = {
        netWorth: calculateNetWorth(),
        totalAssets: calculateTotalAssets(),
        totalLiabilities: calculateTotalLiabilities(),
        monthlyCashFlow: calculateMonthlyCashFlow(),
        assetTypes,
        currency: {
          code: currency.code,
          symbol: currency.symbol,
        },
      };

      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate summary");
      }

      if (result.summary) {
        setSummary(result.summary);
      } else {
        throw new Error("No summary received from the server");
      }
    } catch (error) {
      console.error("Error in SmartSummary:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Smart Summary
        </h3>
        <button
          onClick={generateSummary}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowPathIcon
            className={`-ml-1 mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Generating..." : "AI Summary"}
        </button>
      </div>

      <div className="prose dark:prose-invert prose-sm max-w-none">
        {error ? (
          <p className="text-rose-600 dark:text-rose-400">{error}</p>
        ) : summary ? (
          <p className="text-gray-600 dark:text-gray-300">{summary}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Click the generate button to generate an AI summary of your
            financial overview.
          </p>
        )}
      </div>
    </div>
  );
}
