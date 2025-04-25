import { create } from 'zustand';
import { FinancialItem, IncomeItem, CURRENCIES, TAX_CONFIGS } from './types';
import { calculateNetIncome } from './utils';

interface FinancialState {
  currency: typeof CURRENCIES[number];
  assets: FinancialItem[];
  liabilities: FinancialItem[];
  income: IncomeItem[];
  setCurrency: (currency: typeof CURRENCIES[number]) => void;
  addAsset: (asset: FinancialItem) => void;
  editAsset: (id: string, asset: Partial<FinancialItem>) => void;
  removeAsset: (id: string) => void;
  addLiability: (liability: FinancialItem) => void;
  editLiability: (id: string, liability: Partial<FinancialItem>) => void;
  removeLiability: (id: string) => void;
  addIncome: (income: IncomeItem) => void;
  editIncome: (id: string, income: Partial<IncomeItem>) => void;
  removeIncome: (id: string) => void;
  calculateTotalAssets: () => number;
  calculateTotalLiabilities: () => number;
  calculateNetWorth: () => number;
  calculateTotalMonthlyIncome: () => number;
  calculateTotalMonthlyExpenses: () => number;
  calculateMonthlyCashFlow: () => number;
}

// Find GBP in the CURRENCIES array
const defaultCurrency = CURRENCIES.find(c => c.code === "GBP") || CURRENCIES[0];

export const useFinancialStore = create<FinancialState>((set, get) => ({
  currency: defaultCurrency,
  assets: [],
  liabilities: [],
  income: [],

  setCurrency: (currency) => set({ currency }),

  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
  editAsset: (id, asset) => set((state) => ({
    assets: state.assets.map(a => a.id === id ? { ...a, ...asset } : a)
  })),
  removeAsset: (id) => set((state) => ({ assets: state.assets.filter(a => a.id !== id) })),

  addLiability: (liability) => set((state) => ({ liabilities: [...state.liabilities, liability] })),
  editLiability: (id, liability) => set((state) => ({
    liabilities: state.liabilities.map(l => l.id === id ? { ...l, ...liability } : l)
  })),
  removeLiability: (id) => set((state) => ({ liabilities: state.liabilities.filter(l => l.id !== id) })),

  addIncome: (income) => {
    console.log("Store: Adding income", income);
    set((state) => {
      const newIncome = [...state.income, income];
      console.log("New income state:", newIncome);
      return { income: newIncome };
    });
  },
  editIncome: (id, income) => set((state) => ({
    income: state.income.map(i => i.id === id ? { ...i, ...income } : i)
  })),
  removeIncome: (id) => set((state) => ({
    income: state.income.filter(i => i.id !== id)
  })),

  calculateTotalAssets: () => {
    const state = get();
    return state.assets.reduce((sum, item) => {
      if (item.type === "property" && item.currentValue && item.mortgageOwing) {
        const effectiveMortgage = Math.max(0, item.mortgageOwing - (item.offsetAccount || 0));
        return sum + (item.currentValue - effectiveMortgage);
      }
      return sum + item.value;
    }, 0);
  },

  calculateTotalLiabilities: () => {
    return get().liabilities.reduce((sum, item) => sum + item.value, 0);
  },

  calculateNetWorth: () => {
    const state = get();
    return state.calculateTotalAssets() - state.calculateTotalLiabilities();
  },

  calculateTotalMonthlyIncome: () => {
    const state = get();
    console.log("Calculating monthly income for state:", {
      currency: state.currency.code,
      incomeCount: state.income.length,
      income: state.income
    });

    const taxBrackets = TAX_CONFIGS[state.currency.code]?.brackets ?? [];
    console.log("Using tax brackets:", taxBrackets);

    let total = 0;
    for (const item of state.income) {
      console.log("Processing income item:", item);
      const netIncome = calculateNetIncome(
        item.amount,
        item.frequency,
        item.isSalary ?? false,
        taxBrackets
      );
      console.log("Net income calculated for item:", netIncome);
      total += netIncome;
    }
    
    console.log("Final total monthly income:", total);
    return total;
  },

  calculateTotalMonthlyExpenses: () => {
    return get().assets.reduce((sum, item) => {
      if (item.type === "property" && item.monthlyRepayment) {
        return sum + item.monthlyRepayment;
      }
      return sum;
    }, 0);
  },

  calculateMonthlyCashFlow: () => {
    const state = get();
    return state.calculateTotalMonthlyIncome() - state.calculateTotalMonthlyExpenses();
  },
})); 