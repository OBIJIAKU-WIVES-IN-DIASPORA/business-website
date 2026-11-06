export const CURRENCIES = {
  NGN: { symbol: "₦", label: "Naira", min: 500, presets: [5000, 10000, 25000, 50000] },
  USD: { symbol: "$", label: "US Dollar", min: 5, presets: [10, 25, 50, 100] },
  GBP: { symbol: "£", label: "Pound", min: 5, presets: [10, 25, 50, 100] },
  EUR: { symbol: "€", label: "Euro", min: 5, presets: [10, 25, 50, 100] },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
export const isCurrency = (c: string): c is CurrencyCode => c in CURRENCIES;

export const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency, currencyDisplay: "narrowSymbol", maximumFractionDigits: 2 }).format(amount);
