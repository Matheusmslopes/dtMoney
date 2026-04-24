import { useTransactionContext } from "@/context/transactionContext";
import { TransactionTypes } from "@/shared/enums/transactionTypes";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export const TypeFilter = () => {
  const { filters, handleFilters } = useTransactionContext();

  const selectType = (typeId: TransactionTypes) => {
    handleFilters({ key: "typeId", value: typeId });
  };
  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">Tipo de transação</Text>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionTypes.REVENUE)}
      >
        <Checkbox
          onValueChange={() => selectType(TransactionTypes.REVENUE)}
          className="mr-4"
          value={filters.typeId === TransactionTypes.REVENUE}
        />
        <Text className="text-lg text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionTypes.EXPENSE)}
      >
        <Checkbox
          onValueChange={() => selectType(TransactionTypes.EXPENSE)}
          className="mr-4"
          value={filters.typeId === TransactionTypes.EXPENSE}
        />
        <Text className="text-lg text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
};
