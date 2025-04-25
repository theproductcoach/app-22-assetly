import { FinancialItem, IncomeItem } from "./types";

// Helper function to generate dates and values for the last 3 years
const generateHistoricalData = () => {
  const data = [];
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear() - 3);

  // Initial net worth (3 years ago) - about 60% of current
  let netWorth = 175000;
  
  // Generate monthly data points
  while (startDate <= endDate) {
    // Add some randomness to the growth (-1% to +3% monthly change)
    const randomGrowth = 1 + (Math.random() * 0.04 - 0.01);
    netWorth *= randomGrowth;

    data.push({
      date: new Date(startDate).toISOString(),
      value: Math.round(netWorth)
    });

    startDate.setMonth(startDate.getMonth() + 1);
  }

  return data;
};

export const demoNetWorthHistory = generateHistoricalData();

export const demoAssets: FinancialItem[] = [
  {
    id: "demo-house",
    label: "Family Home",
    value: 500000,
    type: "property",
    dateAcquired: "2020-01-15",
    purchasePrice: 450000,
    currentValue: 500000,
    mortgageOwing: 350000,
    offsetAccount: 25000,
    interestRate: 4.5,
    monthlyRepayment: 1800
  },
  {
    id: "demo-car",
    label: "Tesla Model 3",
    value: 45000,
    type: "simple",
    dateAcquired: "2022-06-01"
  },
  {
    id: "demo-savings",
    label: "Emergency Fund",
    value: 15000,
    type: "simple",
    dateAcquired: "2021-03-10"
  },
  {
    id: "demo-stocks",
    label: "Investment Portfolio",
    value: 75000,
    type: "simple",
    dateAcquired: "2019-12-01"
  }
];

export const demoLiabilities: FinancialItem[] = [
  {
    id: "demo-car-loan",
    label: "Car Loan",
    value: 25000,
    type: "simple",
    dateAcquired: "2022-06-01"
  },
  {
    id: "demo-credit-card",
    label: "Credit Card",
    value: 2500,
    type: "simple",
    dateAcquired: "2023-12-15"
  }
];

export const demoIncome: IncomeItem[] = [
  {
    id: "demo-salary",
    label: "Software Engineer Salary",
    value: 85000,
    frequency: "annually",
    isSalary: true
  },
  {
    id: "demo-freelance",
    label: "Freelance Work",
    value: 2000,
    frequency: "monthly",
    isSalary: false
  },
  {
    id: "demo-dividends",
    label: "Investment Dividends",
    value: 3600,
    frequency: "annually",
    isSalary: false
  }
]; 