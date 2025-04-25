"use client";

import NetWorthChart from "@/components/NetWorthChart";
import OverviewCards from "@/components/OverviewCards";
import SmartSummary from "@/components/SmartSummary";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <OverviewCards />

      <SmartSummary />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Net Worth Over Time
        </h2>
        <div className="h-[400px]">
          <NetWorthChart />
        </div>
      </div>
    </div>
  );
}
