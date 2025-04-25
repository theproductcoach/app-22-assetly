export type AssetType = "simple" | "property";

export type FinancialItem = {
  id: string;
  label: string;
  value: number;
  type?: AssetType;
  dateAcquired: string; // ISO string format
  purchasePrice?: number;
  currentValue?: number;
  mortgageOwing?: number;
  offsetAccount?: number;
  interestRate?: number;
  monthlyRepayment?: number;
};

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type IncomeItem = {
  id: string;
  label: string;
  value: number;
  frequency: "monthly" | "annually";
  isSalary?: boolean;
};

export type TaxBracket = {
  min: number;
  max: number | typeof Infinity;
  rate: number;
};

export type TaxConfig = {
  brackets: TaxBracket[];
};

export const CURRENCIES: Currency[] = [
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" }
];

export const TAX_CONFIGS: Record<string, TaxConfig> = {
  GBP: {
    brackets: [
      { min: 0, max: 12570, rate: 0 },
      { min: 12571, max: 50270, rate: 0.2 },
      { min: 50271, max: 125140, rate: 0.4 },
      { min: 125141, max: Infinity, rate: 0.45 }
    ]
  },
  AUD: {
    brackets: [
      { min: 0, max: 18200, rate: 0 },
      { min: 18201, max: 45000, rate: 0.19 },
      { min: 45001, max: 120000, rate: 0.325 },
      { min: 120001, max: 180000, rate: 0.37 },
      { min: 180001, max: Infinity, rate: 0.45 }
    ]
  }
}; 