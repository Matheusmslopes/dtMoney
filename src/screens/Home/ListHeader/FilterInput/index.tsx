import { useBottomSheetContext } from "@/context/bottomsheetContext";
import { useTransactionContext } from "@/context/transactionContext";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TransactionFilters } from "./TransactionFilters";

export const FilterInput = () => {
  const { pagination, setSearchText, searchText, fetchTransactions } = useTransactionContext();
  const { openBottomSheet } = useBottomSheetContext();

  const [text, setText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(text);
    }, 500);
    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    async () => {
      try {
        await fetchTransactions({ page: 1 });
      } catch (error) {}
    };
  }, [searchText]);

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center mt-4 mb-3">
        <Text className="text-white text-lg font-bold">transações</Text>
        <Text className="text-gray-700 text-base">
          {pagination.totalRows} {pagination.totalRows === 1 ? "Item" : "Items"}
        </Text>
      </View>

      <TouchableOpacity className="flex-row items-center justify-between h-16">
        <TextInput
          value={text}
          onChangeText={setText}
          className="h-[50] w-full text-white bg-background-primary text-lg pl-4"
          placeholderTextColor={colors.gray[600]}
          placeholder="Busque uma transação"
        />
        <TouchableOpacity
          className="absolute right-0"
          onPress={() => openBottomSheet(<TransactionFilters />, 1)}
        >
          <MaterialIcons
            name="filter-list"
            size={26}
            className="mr-3"
            color={colors["accent-brand-light"]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
