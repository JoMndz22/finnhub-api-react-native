import { create } from "zustand";

interface StoreSymbolAlert {
  symbolValue: string;
  alertUsdValue: string | number;
  setSymbolValue: (symbolValue: string) => void;
  setAlertUsdValue: (alertUsdValue: number | string) => void;
}

export const useStoreSymbolAlert = create<StoreSymbolAlert>((set) => ({
  symbolValue: "",
  alertUsdValue: "",
  setSymbolValue: (symbolValue: string) =>
    set({
      symbolValue,
    }),
  setAlertUsdValue: (alertUsdValue: number | string) =>
    set({
      alertUsdValue,
    }),
}));
