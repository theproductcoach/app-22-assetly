import { Currency } from "./types";

export const formatCurrency = (value: number, currency: Currency) => {
  return `${currency.symbol}${value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}; 