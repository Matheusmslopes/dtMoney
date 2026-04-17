import { useTransactionContext } from "@/context/transactionContext";
import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
}

import Checkbox from "expo-checkbox";

export const SelectCategoryModal: FC<Props> = ({ selectedCategory, onSelect }) => {
  const [showModal, setShowModal] = useState(false);

  const { categories } = useTransactionContext();

  const handleModal = () => setShowModal((prevState) => !prevState);

  const handleSelect = (categoryId: number) => {
    onSelect(categoryId);
    setShowModal(false);
  };

  const selected = useMemo(
    () => categories.find(({ id }) => id === selectedCategory),
    [categories, selectedCategory],
  );

  return (
    <>
      <TouchableOpacity
        className="h-[50] bg-background-primary my-2 rounded-[6] pl-4 justify-center"
        onPress={handleModal}
      >
        <Text className={clsx("text-lg", selected ? "text-white" : "text-gray-700")}>
          {selected?.name ?? "Categoria"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl ">
              <Text className="text-white text-lg mb-4">Selecione uma categoria</Text>
              <FlatList
                keyExtractor={(item) => `category-${item.id}`}
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row items-center bg-gray-800 rounded-lg mb-2 p-4"
                    onPress={() => handleSelect(item.id)}
                  >
                    <Checkbox
                      value={selected?.id === item.id}
                      onValueChange={() => handleSelect(item.id)}
                      className="mr-2"
                    />
                    <Text className="text-white text-lg">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
