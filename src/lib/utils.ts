import { Currency, TaxBracket } from "./types";

export const formatCurrency = (value: number, currency: Currency) => {
  return `${currency.symbol}${value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const calculateTax = (income: number, taxBrackets: TaxBracket[]): number => {
  console.log("calculateTax input:", { income, taxBrackets });
  console.log("taxBrackets type:", Object.prototype.toString.call(taxBrackets));
  console.log("taxBrackets length:", taxBrackets.length);
  
  let tax = 0;
  const remainingIncome = income;

  // Sort brackets by min value to ensure correct order
  const sortedBrackets = [...taxBrackets].sort((a, b) => a.min - b.min);
  console.log("Sorted brackets:", sortedBrackets);

  for (const bracket of sortedBrackets) {
    if (remainingIncome <= bracket.min) {
      console.log(`Skipping bracket (income ${remainingIncome} <= min ${bracket.min}):`, bracket);
      continue;
    }

    const taxableAmount = Math.min(
      remainingIncome - bracket.min,
      (bracket.max || Infinity) - bracket.min
    );
    const taxForBracket = taxableAmount * bracket.rate;
    
    console.log("Processing bracket:", {
      bracket,
      remainingIncome,
      taxableAmount,
      taxForBracket
    });

    tax += taxForBracket;
  }

  console.log("Final tax calculated:", tax);
  return tax;
};

export const calculateNetIncome = (
  amount: number,
  frequency: "monthly" | "annually",
  isSalary: boolean,
  taxBrackets: TaxBracket[]
): number => {
  console.log("Calculating net income:", { amount, frequency, isSalary, taxBrackets });

  if (!isSalary) {
    const result = frequency === "monthly" ? amount : amount / 12;
    console.log("Non-salary income result:", result);
    return result;
  }

  const annualAmount = frequency === "monthly" ? amount * 12 : amount;
  console.log("Annual amount:", annualAmount);

  const annualTax = calculateTax(annualAmount, taxBrackets);
  console.log("Annual tax:", annualTax);

  const netAnnualAmount = annualAmount - annualTax;
  console.log("Net annual amount:", netAnnualAmount);

  const monthlyAmount = netAnnualAmount / 12;
  console.log("Monthly amount:", monthlyAmount);

  return monthlyAmount;
}; 