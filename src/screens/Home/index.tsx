import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { useAuthContext } from "@/context/authContext";
import { useEffect } from "react";
import { useTransactionContext } from "@/context/transactionContext";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  const { fetchCategories, fetchTransactions, transactions, refreshTransactions, loading } =
    useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([await handleFetchCategories(), await fetchTransactions()]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        className="bg-background-secondary"
        refreshControl={<RefreshControl onRefresh={refreshTransactions} refreshing={loading} />}
      />
    </SafeAreaView>
  );
};
