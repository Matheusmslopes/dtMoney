import { useAuthContext } from "@/context/authContext";
import { Text, TouchableOpacity, View } from "react-native";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  return (
    <View className="items-center justify-center flex-1">
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
