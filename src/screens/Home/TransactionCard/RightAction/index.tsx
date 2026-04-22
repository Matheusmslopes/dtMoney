import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { DeleteModal } from "./DeleteModal";
import * as transactionService from "@/shared/services/dtMoney/transactionService";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbarContext";

interface Params {
  transactionId: number;
}

export const RightAction: FC<Params> = ({ transactionId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(transactionId);
      notify({
        message: "Transação deletada com sucesso!",
        messageType: "SUCESS",
      });
      hideModal();
    } catch (error) {
      handleError(error, "Falha ao deletar a transação");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <TouchableOpacity
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
        activeOpacity={0.8}
        onPress={showModal}
      >
        <MaterialIcons name="delete-outline" color={colors.white} size={30} />
      </TouchableOpacity>
      <DeleteModal
        visible={modalVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
        loading={loading}
      />
    </>
  );
};
