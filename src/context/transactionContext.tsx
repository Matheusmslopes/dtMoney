import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import { TransactionCategory } from "@/shared/interfaces/https/transactionCategoryResponse";

import * as transactionService from "@/shared/services/dtMoney/transactionService";
import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransactionRequest";
import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/totalTransactions";

export type TransactionContextType = {
  fetchCategories: () => {};
  categories: TransactionCategory[];
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0,
  });

  const fetchCategories = async () => {
    const categorisResponse = await transactionService.getTransactionCategories();
    setCategories(categorisResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction);
  };

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionService.getTransactions({
      page: 0,
      perPage: 10,
    });

    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
