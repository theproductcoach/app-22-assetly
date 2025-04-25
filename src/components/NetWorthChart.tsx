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
  TooltipProps,
} from "recharts";

export default function NetWorthChart() {
  const store = useFinancialStore();

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(label).toLocaleDateString()}
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            {formatCurrency(payload[0].value as number, store.currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  const sortedHistory = [...store.netWorthHistory].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
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
  );
}
