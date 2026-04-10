import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";

import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransactionRequest";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheetContext";
import { TransactionTypeSelector } from "../SelectType";

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });

  const setTransactionData = (key: keyof CreateTransactionInterface, value: string | number) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="flex-row w-full items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Nova Transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          placeholder="descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData("description", text)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />
        <CurrencyInput
          value={transaction.value}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />
      </View>
    </View>
  );
};
