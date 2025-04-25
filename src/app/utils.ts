import { TAX_CONFIGS } from "@/lib/types";

export const calculateTax = (
  amount: number,
  frequency: "monthly" | "yearly",
  currencyCode: string
): number => {
  const yearlyAmount = frequency === "monthly" ? amount * 12 : amount;
  const config = TAX_CONFIGS[currencyCode];
  if (!config) return 0;

  let totalTax = 0;
  for (const bracket of config.brackets) {
    if (yearlyAmount > bracket.min) {
      const taxableInBracket = Math.min(
        yearlyAmount - bracket.min,
        bracket.max - bracket.min
      );
      totalTax += (taxableInBracket * bracket.rate) / 100;
    }
  }

  return frequency === "monthly" ? totalTax / 12 : totalTax;
};

export const calculateNetIncome = (
  amount: number,
  frequency: "monthly" | "yearly",
  isSalary: boolean = false,
  currencyCode: string = "USD"
): number => {
  const monthlyAmount = frequency === "monthly" ? amount : amount / 12;
  if (isSalary) {
    const tax = calculateTax(amount, frequency, currencyCode);
    return monthlyAmount - tax / (frequency === "monthly" ? 1 : 12);
  }
  return monthlyAmount;
}; 