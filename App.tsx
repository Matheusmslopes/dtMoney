import NavigationRoutes from "@/routes";

import { Snackbar } from "@/components/Snackbar";

import { AuthContextProvider } from "@/context/authContext";
import { SnackBarContextProvider } from "@/context/snackbarContext";

import "@/styles/global.css";
import { BottomSheetProvider } from "@/context/bottomsheetContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackBarContextProvider>
        <AuthContextProvider>
          <BottomSheetProvider>
            <NavigationRoutes />
            <Snackbar />
          </BottomSheetProvider>
        </AuthContextProvider>
      </SnackBarContextProvider>
    </GestureHandlerRootView>
  );
}
