import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { useAuthContext } from "@/context/authContext";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <View>
        <AppHeader />
        <Text className="color-white">Home</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
