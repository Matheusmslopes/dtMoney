import { dtMoneyApi } from "@/shared/api/dtMoney";
import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransactionRequest";
import {
  GetTransactionResponse,
  GetTransactionsParams,
} from "@/shared/interfaces/https/getTransactionRequest";
import { TransactionCategory } from "@/shared/interfaces/https/transactionCategoryResponse";
import qs from "qs";

export const getTransactionCategories = async (): Promise<TransactionCategory[]> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>("/transaction/categories");

  return data;
};

export const createTransaction = async (transaction: CreateTransactionInterface) => {
  await dtMoneyApi.post("/transaction", transaction);
};

export const getTransactions = async (
  params: GetTransactionsParams,
): Promise<GetTransactionResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionResponse>("/transaction", {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
  });

  return data;
};
