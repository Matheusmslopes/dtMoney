import { TransactionTypes } from "@/shared/enums/transactionTypes";
import { TransactionCardType } from "..";

interface CardData {
  label: string;
  bgColor: string;
}

export const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.REVENUE]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  [TransactionTypes.EXPENSE]: {
    label: "Saída",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};
